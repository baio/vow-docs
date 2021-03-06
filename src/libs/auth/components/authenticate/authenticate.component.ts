import { ChangeDetectionStrategy, Component } from '@angular/core';
import { Router } from '@angular/router';
import { Notification, NotificationsService } from '@app/shared';
import { App } from '@capacitor/app';
import { BehaviorSubject, combineLatest, Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { AuthService } from '../../services/auth.service';

export interface AppAuthenticateView {
  pinError: boolean;
  supportsBiometric: boolean;
  mode: 'setup' | 'login';
}

@Component({
  selector: 'app-authenticate',
  templateUrl: 'authenticate.component.html',
  styleUrls: ['authenticate.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppAuthenticateComponent {
  pinError$ = new BehaviorSubject(false);
  readonly view$: Observable<AppAuthenticateView>;

  constructor(
    private readonly authService: AuthService,
    private readonly router: Router,
    private readonly notificationsService: NotificationsService
  ) {
    const setup$ = this.setupAuth();
    this.view$ = combineLatest([setup$, this.pinError$]).pipe(
      map(([setup, pinError]) => ({
        ...setup,
        pinError,
      }))
    );
  }

  private async setupAuth() {
    const pin = await this.authService.getPin();
    const securityKey = await this.authService.getSecurityKey();
    const supportsBiometric = await this.authService.isBiometricAvailable();
    let mode: 'setup' | 'login';
    if (!securityKey) {
      // security key is not setup consider first time authorization
      mode = 'setup';
    } else {
      if (pin) {
        // pin is setup ask it
        mode = 'login';
      } else {
        mode = 'setup';
        this.authenticateBiometric();
      }
    }
    return {
      supportsBiometric,
      mode,
    };
  }

  onExit() {
    App.exitApp();
  }

  async authenticateBiometric() {
    // was authorized with biometric

    const securityKey = await this.authService.getSecurityKey();
    const result = await this.authService.authenticateBiometric(!securityKey);
    if (result) {
      // authenticated !!!
      this.authService.setAuthenticated();
      this.router.navigateByUrl('/', { replaceUrl: true });
    }
  }

  async onPinSet(pin: string) {
    this.notificationsService.notify(Notification.SetPinSuccess);
    await this.authService.setPin(pin, true);
    this.authService.setAuthenticated();
    this.router.navigateByUrl('/', { replaceUrl: true });
  }

  async onPinEntered(pin: string) {
    this.pinError$.next(false);
    const expectedPin = await this.authService.getPin();
    if (pin !== expectedPin) {
      this.pinError$.next(true);
    } else {
      this.notificationsService.notify(Notification.LoginSuccess);
      this.authService.setAuthenticated();
      this.router.navigateByUrl('/');
    }
  }
}
