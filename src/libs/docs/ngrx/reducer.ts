import { createReducer, on } from '@ngrx/store';
import { assocPath, fromPairs, omit, pipe } from 'lodash/fp';
import { DocAttachment, DocsState } from '../models';
import {
  addDocTag,
  deleteDocConfirmed,
  rehydrateDocsSuccess,
  removeCloudDocConfirmed,
  removeDocTag,
  setDocComment,
  updateDocFormatted,
  updateDocState,
  uploadCloudDocConfirmed,
  uploadCloudDocError,
  uploadCloudDocSuccess,
  addDocument,
  addDocSuccess,
  updateDocImage,
  addDocAttachment,
} from './actions';

export const initialState: DocsState = {
  docs: {},
  attachments: {},
};

export const docsReducer = createReducer(
  initialState,
  on(addDocument, (state, { id, base64, date }) =>
    assocPath(
      ['docs', id],
      { id, imgBase64: base64, date, upload: { status: 'progress' } },
      state
    )
  ),
  on(addDocSuccess, (state, { id }) =>
    assocPath(['docs', id, 'upload', 'status'], 'success', state)
  ),
  on(updateDocState, (state, { id, docState }) =>
    assocPath(['docs', id], { ...state.docs[id], ...docState }, state)
  ),
  on(updateDocImage, (state, { doc, base64 }) =>
    assocPath(['docs', doc.id, 'imgBase64'], base64, state)
  ),
  on(setDocComment, (state, { id, comment }) =>
    assocPath(['docs', id, 'comment'], comment, state)
  ),
  on(rehydrateDocsSuccess, (state, { docs, attachments }) => {
    const docsHash = fromPairs(docs.map((m) => [m.id, m]));
    const attachmentsHash = fromPairs(attachments.map((m) => [m.id, m]));
    state = assocPath(['docs'], docsHash, state);
    state = assocPath(['attachments'], attachmentsHash, state);
    return state;
  }),
  on(deleteDocConfirmed, (state, { id }) =>
    assocPath(['docs'], omit(id, state.docs), state)
  ),
  on(
    updateDocFormatted,
    (state, { id, docFormatted }) =>
      pipe(
        assocPath(['docs', id, 'formatted'], docFormatted),
        assocPath(
          ['docs', id, 'labeled', 'label'],
          docFormatted ? docFormatted.kind : null
        )
      )(state) as any
  ),
  on(addDocTag, (state, { id, tag }) => {
    const doc = state.docs[id];
    if (doc) {
      const tags = doc?.tags || [];
      if (!tags.includes(tag)) {
        return assocPath(['docs', id, 'tags'], [tag, ...tags], state);
      } else {
        return state;
      }
    } else {
      return state;
    }
  }),
  on(removeDocTag, (state, { id, tag }) => {
    const doc = state.docs[id];
    if (doc) {
      const tags = doc?.tags || [];
      if (tags.includes(tag)) {
        return assocPath(
          ['docs', id, 'tags'],
          tags.filter((f) => f !== tag),
          state
        );
      } else {
        return state;
      }
    } else {
      return state;
    }
  }),
  on(uploadCloudDocConfirmed, (state, { doc, date }) =>
    assocPath(
      ['docs', doc.id, 'stored'],
      {
        provider: null,
        url: null,
        status: 'progress',
        date,
      },
      state
    )
  ),
  on(uploadCloudDocSuccess, (state, { doc, url, provider }) => {
    state = assocPath(['docs', doc.id, 'stored', 'status'], 'success', state);
    state = assocPath(['docs', doc.id, 'stored', 'url'], url, state);
    state = assocPath(['docs', doc.id, 'stored', 'provider'], provider, state);
    return state;
  }),
  on(uploadCloudDocError, (state, { doc }) =>
    assocPath(['docs', doc.id, 'stored', 'status'], 'error', state)
  ),
  on(removeCloudDocConfirmed, (state, { id }) => {
    if (state.docs[id]) {
      return assocPath(['docs', id, 'stored'], null as any, state);
    } else {
      return state;
    }
  }),
  on(addDocAttachment, (state, { id, doc, base64 }) => {
    // doc attachment
    const docAttachments = doc.attachments || [];
    const updatedDocAttachments = [id, ...docAttachments];
    state = assocPath(
      ['docs', doc.id, 'attachments'],
      updatedDocAttachments,
      state
    );
    // attachments
    const attachment = {
      id,
      imgBase64: base64,
    } as DocAttachment;
    state = assocPath(['attachments', id], attachment, state);
    return state;
  })
);
