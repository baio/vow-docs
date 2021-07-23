import { createReducer, on } from '@ngrx/store';
import { assocPath, fromPairs, omit, pipe } from 'lodash/fp';
import { DocsState } from '../models';
import {
  addDocTag,
  deleteDocConfirmed,
  rehydrateDocsSuccess,
  removeCloudDocConfirmed,
  removeDocTag,
  setDocComment,
  setImageBase64,
  updateDocFormatted,
  updateDocState,
  uploadCloudDoc,
  uploadCloudDocConfirmed,
  uploadCloudDocError,
  uploadCloudDocSuccess,
  uploadImage,
  uploadImageSuccess,
} from './actions';

export const initialState: DocsState = {
  docs: {},
};

export const docsReducer = createReducer(
  initialState,
  on(uploadImage, (state, { id, base64, date }) =>
    assocPath(
      ['docs', id],
      { id, imgBase64: base64, date, upload: { status: 'progress' } },
      state
    )
  ),
  on(setImageBase64, (state, { id, base64 }) =>
    assocPath(['docs', id, 'imgBase64'], base64, state)
  ),
  on(uploadImageSuccess, (state, { id }) =>
    assocPath(['docs', id, 'upload', 'status'], 'success', state)
  ),
  on(updateDocState, (state, { id, docState }) =>
    assocPath(['docs', id], { ...state.docs[id], ...docState }, state)
  ),
  on(setDocComment, (state, { id, comment }) =>
    assocPath(['docs', id, 'comment'], comment, state)
  ),
  on(rehydrateDocsSuccess, (state, { docs }) => {
    const hash = fromPairs(docs.map((m) => [m.id, m]));
    return assocPath(['docs'], hash, state);
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
  on(uploadCloudDocSuccess, (state, { doc, url }) => {
    state = assocPath(['docs', doc.id, 'stored', 'status'], 'success', state);
    state = assocPath(['docs', doc.id, 'stored', 'url'], url, state);
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
  })
);
