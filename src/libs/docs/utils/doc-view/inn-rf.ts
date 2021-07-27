import { format } from 'date-fns';
import { DocSNILSRF, DocView, InnRF } from '../../models';
import { asDate, asSex, asStr, joinStr } from './utils';

export const innRF = (doc: InnRF): DocView => ({
  title: 'ИНН РФ',
  fields: [
    {
      label: 'ИНН',
      value: asStr(doc.identifier),
    },
    {
      label: 'Фамилия Имя Очество',
      value: joinStr([doc.lastName, doc.firstName, doc.middleName]),
    },
    {
      label: 'Пол',
      value: asSex(doc.sex),
    },
    {
      label: 'Дата рождения',
      value: asDate(doc.birthDate),
    },
    {
      label: 'Место рождения',
      value: asStr(doc.birthPlace),
    },
    {
      label: 'Дата постановки на учет',
      value: asDate(doc.issueDate),
    },
    {
      label: 'Налоговый орган',
      value: asDate(doc.authority),
    },
    {
      label: 'Код налогового органа',
      value: asDate(doc.authorityCode),
    },
    {
      label: 'Номер документа',
      value: asDate(doc.docNumber),
    },
  ],
});
