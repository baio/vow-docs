import format from 'date-fns/format';
import { DocUnknown, DocView } from '../../models';
import { asDate, asStr, joinStr } from './utils';

export const unknown = (doc: DocUnknown): DocView => ({
  title: 'Другое',
  fields: [
    {
      label: 'Фамилия Имя Очество',
      value: joinStr([doc.lastName, doc.firstName, doc.middleName]),
    },
    {
      label: 'Номер',
      value: asStr(doc.identifier),
    },
    {
      label: 'Дата',
      value: asDate(doc.date),
    },
    {
      label: 'Текст',
      value: asStr(doc.text),
    },
  ],
});
