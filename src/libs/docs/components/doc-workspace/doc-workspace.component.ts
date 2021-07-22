import {
  ChangeDetectionStrategy,
  Component,
  Input,
  OnInit,
  ViewChild,
} from '@angular/core';
import { selectSocialAuthState } from '@app/profile';
import {
  ActionSheetController,
  IonSelect,
  IonTextarea,
  ModalController,
} from '@ionic/angular';
import { Store } from '@ngrx/store';
import { Observable, of } from 'rxjs';
import { map, switchMap, withLatestFrom } from 'rxjs/operators';
import { SocialAuthState } from 'src/libs/profile/models';
import { Doc, DocView } from '../../models';
import {
  addDocTag,
  copyClipboard,
  deleteDoc,
  editDoc,
  removeCloudDoc,
  removeDocTag,
  setDocComment,
  shareDoc,
  showFullScreenImage,
  uploadCloudDoc,
} from '../../ngrx/actions';
import { selectDoc } from '../../ngrx/selectors';
import { docFormattedToView } from '../../utils';

export interface UploadImageModalView {
  doc: Doc;
  docView: DocView;
  socialAuthState: SocialAuthState;
}

@Component({
  selector: 'app-doc-workspace',
  templateUrl: 'doc-workspace.component.html',
  styleUrls: ['doc-workspace.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppDocWorkspaceComponent implements OnInit {
  view$: Observable<UploadImageModalView>;
  segment = 'main';

  @Input() documentId: string;

  @ViewChild(IonSelect) docTypeSelect: IonSelect;
  @ViewChild(IonTextarea) commentTextArea: IonTextarea;

  constructor(
    private readonly store: Store,
    private readonly modalController: ModalController,
    private readonly actionSheetController: ActionSheetController
  ) {}

  ngOnInit() {
    const id$ = of(this.documentId);
    const socialAuthState$ = this.store.select(selectSocialAuthState);
    this.view$ = id$.pipe(
      switchMap((id) => this.store.select(selectDoc(id))),
      withLatestFrom(socialAuthState$),
      map(([doc, socialAuthState]) => ({
        doc,
        docView: doc.formatted ? docFormattedToView(doc.formatted) : null,
        socialAuthState,
      }))
    );
  }

  async onDelete(doc: Doc) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Удалить документ',
      buttons: [
        {
          text: 'Удалить безвозвратно',
          icon: 'alert-outline',
          handler: () => {
            this.store.dispatch(deleteDoc({ id: doc.id }));
            this.modalController.dismiss();
          },
        },
        {
          text: 'Отмена',
          icon: 'close-outline',
          handler: () => {},
        },
      ],
    });

    await actionSheet.present();
  }

  onEdit(doc: Doc) {
    this.store.dispatch(editDoc({ id: doc.id }));
  }

  async onShare(doc: Doc) {
    const actionSheet = await this.actionSheetController.create({
      header: 'Поделиться документом',
      buttons: [
        {
          text: 'Изображение и данные',
          icon: 'images-outline',
          handler: () => {
            this.store.dispatch(shareDoc({ doc, share: 'doc-and-image' }));
          },
        },
        {
          text: 'Только данные',
          icon: 'document-outline',
          handler: () => {
            this.store.dispatch(shareDoc({ doc, share: 'doc-only' }));
          },
        },
        {
          text: 'Только изображение',
          icon: 'image-outline',
          handler: () => {
            this.store.dispatch(shareDoc({ doc, share: 'image-only' }));
          },
        },
        {
          text: 'Отмена',
          icon: 'close-outline',
          handler: () => {},
        },
      ],
    });

    await actionSheet.present();
  }

  onViewImage(doc: Doc) {
    this.store.dispatch(showFullScreenImage({ doc }));
  }

  onCopyClipboard(doc: Doc) {
    this.store.dispatch(copyClipboard({ doc }));
  }

  onAddTag(doc: Doc, tag: string) {
    this.store.dispatch(addDocTag({ id: doc.id, tag }));
  }

  onRemoveTag(doc: Doc, tag: string) {
    this.store.dispatch(removeDocTag({ id: doc.id, tag }));
  }

  onCommentChange(doc: Doc, event$: any) {
    const comment = event$.detail.value;
    this.store.dispatch(setDocComment({ id: doc.id, comment }));
  }

  onCloudUpload(doc: Doc, socialAuthState: SocialAuthState) {
    this.store.dispatch(
      uploadCloudDoc({ doc, socialAuthState, date: new Date().getTime() })
    );
  }

  onCloudRemove(doc: Doc, socialAuthState: SocialAuthState) {
    this.store.dispatch(removeCloudDoc({ id: doc.id, socialAuthState }));
  }
}
