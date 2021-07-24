import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';

@Component({
  selector: 'app-doc-image',
  templateUrl: 'doc-image.component.html',
  styleUrls: ['doc-image.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocImageComponent implements OnChanges {
  images: string[] = [];

  @Input() imgBase64: string;
  @Input() attachmentsBase64: string[];

  @Output() cameraClick = new EventEmitter();
  @Output() linkClick = new EventEmitter();

  slideOpts = {
    initialSlide: 0,
    speed: 400,
  };

  constructor() {}

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.imageBase64) {
      this.images = [
        ...(changes.imageBase64.currentValue
          ? [changes.imageBase64.currentValue]
          : []),
        ,
        ...(this.attachmentsBase64 || []),
      ];
    } else if (changes.attachmentsBase64) {
      if (changes.attachmentsBase64.currentValue) {
        this.images = [
          ...(this.imgBase64 ? [this.imgBase64] : []),
          ...(changes.attachmentsBase64.currentValue || []),
        ];
      }
    }

    console.log('+++', this.images);
  }

  trackByImage(_, str: string) {
    console.log('===', str);
    return str;
  }
}
