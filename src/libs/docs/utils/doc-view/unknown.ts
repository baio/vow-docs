import format from 'date-fns/format';
import { DocUnknown, DocView } from '../../models';

export const unknown = (doc: DocUnknown): DocView => ({
  title: 'Другое',
  fields: [
    {
      label: 'Текст',
      value: doc.text || null,
    },
    {
      label: 'Фамилия Имя Очество',
      value:
        doc.lastName || doc.firstName || doc.middleName
          ? [doc.lastName, doc.firstName, doc.middleName].join(' ')
          : null,
    },
    {
      label: 'Номер',
      value: doc.identifier,
    },
    {
      label: 'Дата',
      value: doc.date && format(new Date(doc.date), 'dd.MM.yyyy'),
    },
  ],
});
