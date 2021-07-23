import { DocUnknown, DocView } from '../../models';

export const unknown = (doc: DocUnknown): DocView => ({
  title: 'Другое',
  fields: [
    {
      label: 'Текст',
      value: doc.text || null,
    },
  ],
});
