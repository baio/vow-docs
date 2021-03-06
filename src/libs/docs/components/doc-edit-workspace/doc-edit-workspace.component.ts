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

  readonly formTypes: OptItem[] = [
    {
      key: 'unknown',
      label: 'Другое',
    },
    {
      key: 'passport-rf',
      label: 'Паспорт РФ',
    },
    {
      key: 'passport-foreign-rf',
      label: 'Загран РФ',
    },
    {
      key: 'snils-rf',
      label: 'СНИЛС РФ',
    },
    {
      key: 'driver-license-rf',
      label: 'Водительское РФ',
    },
    {
      key: 'pts-rf',
      label: 'ПТС РФ',
    },
    {
      key: 'kasko-rf',
      label: 'КАСКО РФ',
    },
    {
      key: 'osago-rf',
      label: 'ОСАГО РФ',
    },
    {
      key: 'birth-certificate-rf',
      label: 'Свидетельство о Рождении РФ',
    },
    {
      key: 'inn-rf',
      label: 'ИНН РФ',
    },
    {
      key: 'med-insurance-international-rf',
      label: 'МЕЖДУНАРОДНАЯ МЕД СТРАХОВКА РФ',
    },
    {
      key: 'med-insurance-rf',
      label: 'МЕД СТРАХОВКА РФ',
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
        activeDocLabel: !activeDocLabel
          ? doc.labeled?.label || 'unknown'
          : activeDocLabel,
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
        docFormatted: { ...docFormatted, kind: docLabel } as any,
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
