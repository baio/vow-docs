import { format } from 'date-fns';
import { DocView, KaskoRF } from '../../models';
import { asDate, asStr, joinStr } from './utils';

export const kaskoRF = (doc: KaskoRF): DocView => ({
  title: 'КАСКО',
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
      label: 'Идентификационный номер (VIN)',
      value: asStr(doc.vin),
    },
    {
      col1: {
        label: 'ПТС №',
        value: asStr(doc.ptsNo),
      },
      col2: {
        label: 'Номер',
        value: asStr(doc.plateNo),
      },
    },
    {
      col1: {
        label: 'Дата начала',
        value: asDate(doc.startDate),
      },
      col2: {
        label: 'Дата окончания',
        value: asDate(doc.endDate),
      },
    },
  ],
});
