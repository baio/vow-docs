import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { IonSlides } from '@ionic/angular';

export interface DocImageView {
  src: string;
  kind: 'main' | 'attachment';
}

@Component({
  selector: 'app-doc-image',
  templateUrl: 'doc-image.component.html',
  styleUrls: ['doc-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocImageComponent implements OnChanges {
  showCameraButton = true;
  linkButtonMode: 'link' | 'unlink' = 'link';
  images: DocImageView[] = [];

  @Input() imgBase64: string;
  @Input() attachmentsBase64: string[];

  @Output() cameraClick = new EventEmitter();
  @Output() linkClick = new EventEmitter();
  @Output() unlinkClick = new EventEmitter<number>();

  @ViewChild(IonSlides) ionSlides: IonSlides;

  slideOpts = {
    initialSlide: 0,
    speed: 50,
    loop: false,
  };

  constructor(private readonly cdr: ChangeDetectorRef) {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.imgBase64) {
      /*
      const images = [
        ...(changes.imageBase64.currentValue
          ? [changes.imageBase64.currentValue]
          : []),
        ,
        ...(this.attachmentsBase64 || []),
      ] as string[];
      this.images = images.map((src, i) => ({
        src,
        kind: i === 0 ? 'main' : 'attachment',
      }));
      */
      const imgView = {
        src: changes.imgBase64.currentValue,
        kind: 'main' as 'main',
      };
      this.images.splice(0, 0, imgView);
      console.log('change 1');
    }
    if (changes.attachmentsBase64) {
      console.log('change 2');
      const imgViews = (changes.attachmentsBase64.currentValue || []).map(
        (m) => ({ src: m, kind: 'attachment' as 'attachment' })
      );
      this.images.splice(1, this.images.length - 1, ...imgViews);
      console.log('!!!', this.images);
    }
  }

  trackByImage(_, img: DocImageView) {
    return img.src;
  }

  async onSlideChanged() {
    const activeIndex = await this.ionSlides.getActiveIndex();
    const activeImageView = this.images[activeIndex];
    this.showCameraButton = activeImageView.kind === 'main';
    this.linkButtonMode = activeImageView.kind === 'main' ? 'link' : 'unlink';
    this.cdr.markForCheck();
  }

  onCameraClicked($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    this.cameraClick.emit();
  }

  async onLinkClicked($event: MouseEvent) {
    $event.preventDefault();
    $event.stopPropagation();
    const activeIndex = await this.ionSlides.getActiveIndex();
    console.log('wtf ?', activeIndex);
    if (activeIndex === 0) {
      this.linkClick.emit();
    } else {
      this.unlinkClick.emit(activeIndex - 1);
    }
  }
}
