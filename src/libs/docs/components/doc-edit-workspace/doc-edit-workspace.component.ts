import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
} from '@angular/core';
import { ModalController } from '@ionic/angular';
import { Store } from '@ngrx/store';
import { BehaviorSubject, combineLatest, Observable, of } from 'rxjs';
import { map, switchMap } from 'rxjs/operators';
import { Doc, DocFormatted, DocLabel, OptItem } from '../../models';
import { showFullScreenImage, updateDocFormatted } from '../../ngrx/actions';
import { selectDoc } from '../../ngrx/selectors';

export interface UploadImageModalView {
  doc: Doc;
  activeDocLabel: DocLabel;
  activeDocFormatted: DocFormatted;
}

@Component({
  selector: 'app-doc-edit-workspace',
  templateUrl: 'doc-edit-workspace.component.html',
  styleUrls: ['doc-edit-workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocEditWorkspaceComponent implements OnInit {
  view$: Observable<UploadImageModalView>;
  activeDocLabel$ = new BehaviorSubject<DocLabel>(null);

  @Input() title: string;
  @Input() documentId: string;
  @Input() isNew = false;

  readonly formTypes: OptItem[] = [
    {
      key: 'passport-rf-main-page',
      label: 'Гражданский Пасспорт РФ',
    },
  ];

  constructor(
    private readonly store: Store,
    private readonly modalController: ModalController
  ) {}

  ngOnInit() {
    const id$ = of(this.documentId); //this.activatedRoute.params.pipe(map(({ id }) => id));
    const doc$ = id$.pipe(switchMap((id) => this.store.select(selectDoc(id))));
    this.view$ = combineLatest([doc$, this.activeDocLabel$]).pipe(
      map(([doc, activeDocLabel]) => ({
        doc,
        activeDocLabel: !activeDocLabel ? doc.labeled?.label : activeDocLabel,
        activeDocFormatted: doc.formatted,
      }))
    );
  }

  trackByOptItem(_, optItem: OptItem) {
    return optItem.key;
  }

  onSave(doc: Doc, docLabel: DocLabel, docFormatted: DocFormatted) {
    this.store.dispatch(
      updateDocFormatted({
        id: doc.id,
        docFormatted: { ...docFormatted, kind: docLabel },
      })
    );

    this.modalController.dismiss();
  }

  onDocTypeChanged(docType: any) {
    this.activeDocLabel$.next(docType.detail.value);
  }

  onViewImage(doc: Doc) {
    this.store.dispatch(showFullScreenImage({ doc }));
  }
}
