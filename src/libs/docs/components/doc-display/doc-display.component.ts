import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Input,
  Output,
} from '@angular/core';
import { DocView, DocViewFieldOrRow } from '../../models';
import { ImageClickEvent } from '../doc-image/doc-image.component';

@Component({
  selector: 'app-doc-display',
  templateUrl: 'doc-display.component.html',
  styleUrls: ['doc-display.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocDisplayComponent {
  @Input() imgBase64: string;
  @Input() attachmentsBase64: string[];
  @Input() docView: DocView;

  @Output() cameraClick = new EventEmitter();
  @Output() linkClick = new EventEmitter();
  @Output() unlinkClick = new EventEmitter<number>();
  @Output() imageClick = new EventEmitter<ImageClickEvent>();

  getFieldType(field: DocViewFieldOrRow): 'one-col' | 'two-col' {
    if ('col1' in field) {
      return 'two-col';
    } else {
      return 'one-col';
    }
  }
}
