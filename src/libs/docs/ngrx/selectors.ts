import { createFeatureSelector, createSelector } from '@ngrx/store';
import { orderBy, pickBy, sortBy } from 'lodash/fp';
import { Doc, DocsState } from '../models';

export const selectDocsState = createFeatureSelector<DocsState>('docs');

export const selectDocs = createSelector(
  selectDocsState,
  (state) => state.docs
);

export const selectAttachments = createSelector(
  selectDocsState,
  (state) => state.attachments
);

export const selectDoc = (id: string) =>
  createSelector(selectDocs, (docs) => docs[id]);

export const selectDocsAsSortedList = createSelector(selectDocs, (docs) =>
  orderBy((a) => new Date(a.date), 'desc', Object.values(docs))
);

export const selectDocAttachments = (docId: string) =>
  createSelector(selectDoc(docId), selectAttachments, (doc, attachments) => {
    const docAttachments = doc.attachments || [];
    if (docAttachments.length > 0) {
      return docAttachments.map((m) => attachments[m]);
    } else {
      return [];
    }
  });

export const selectDocAttachmentsBase64 = (docId: string) =>
  createSelector(selectDocAttachments(docId), (attachments) =>
    attachments.map((m) => m.imgBase64)
  );
