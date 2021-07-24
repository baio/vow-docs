import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-doc-image',
  templateUrl: 'doc-image.component.html',
  styleUrls: ['doc-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocImageComponent {
  @Input() imgBase64: string;
  @Output() cameraClick = new EventEmitter();
  @Output() linkClick = new EventEmitter();
  constructor() {}
}
