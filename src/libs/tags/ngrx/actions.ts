import { createAction, props } from '@ngrx/store';
import { Tag } from '../models';

export const rehydrateTags = createAction('[Tags] Rehydrate Tags');

export const rehydrateTagsSuccess = createAction(
  '[Tags] Rehydrate Tags Success',
  props<{ tags: Tag[] }>()
);

export const createTag = createAction(
  '[Tags] Create Tag',
  props<{ name: string; date: number }>()
);

export const removeTag = createAction(
  '[Tags] Remove Tag',
  props<{ name: string }>()
);

export const importTagsFromCloudSuccess = createAction(
  '[Tags] Import Tags From Cloud Success',
  props<{ tags: Tag[] }>()
);
