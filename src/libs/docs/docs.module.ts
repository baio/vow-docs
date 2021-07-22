import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppTagsModule } from '@app/tags';
import { IonicModule } from '@ionic/angular';
import { EffectsModule } from '@ngrx/effects';
import { StoreModule } from '@ngrx/store';
import { DbModule } from '../db/db.module';
import { AppDocDisplayComponent } from './components/doc-display/doc-display.component';
import { AppDocEditFormComponent } from './components/doc-edit-form/doc-edit-form.component';
import { AppDocEditWorkspaceComponent } from './components/doc-edit-workspace/doc-edit-workspace.component';
import { AppDocImageComponent } from './components/doc-image/doc-image.component';
import { AppDocTagsComponent } from './components/doc-tags/doc-tags.component';
import { AppDocWorkspaceComponent } from './components/doc-workspace/doc-workspace.component';
import { AppDocumentsWorkspaceComponent } from './components/documents-workspace/documents-workspace.component';
import { AppFullScreenImageComponent } from './components/full-screen-image/full-screen-image.component';
import { DocsEffects } from './ngrx/effects';
import { docsReducer } from './ngrx/reducer';
import { DocsRepositoryService } from './repository/docs.repository';
import { DocsDataAccessService } from './services/docs.data-access.service';
import { ImageService } from './services/image.service';

@NgModule({
  imports: [
    IonicModule,
    CommonModule,
    StoreModule.forFeature('docs', docsReducer),
    EffectsModule.forFeature([DocsEffects]),
    DbModule,
    FormsModule,
    ReactiveFormsModule,
    AppTagsModule,
  ],
  declarations: [
    AppDocumentsWorkspaceComponent,
    AppDocImageComponent,
    AppDocEditWorkspaceComponent,
    AppDocDisplayComponent,
    AppDocWorkspaceComponent,
    AppDocEditFormComponent,
    AppFullScreenImageComponent,
    AppDocTagsComponent,
  ],
  providers: [DocsDataAccessService, ImageService, DocsRepositoryService],
  exports: [AppDocumentsWorkspaceComponent, AppDocEditWorkspaceComponent],
})
export class AppDocsModule {}
