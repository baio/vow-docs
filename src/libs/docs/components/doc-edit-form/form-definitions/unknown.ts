import { DocForm } from '../../../models';

export const unknownForm: DocForm = {
  fields: [
    {
      kind: 'text-area',
      name: 'text',
      label: 'Текст',
    },
  ],
};
