import { format } from 'date-fns';
import { DocSNILSRF, DocView } from '../../models';
import { asDate, asStr, joinStr } from './utils';

export const snilsRF = (doc: DocSNILSRF): DocView => ({
  title: 'СНИЛС РФ',
  fields: [
    {
      label: 'Номер',
      value: asStr(doc.identifier),
    },
    {
      label: 'Фамилия Имя Очество',
      value: joinStr([doc.lastName, doc.firstName, doc.middleName]),
    },
    {
      label: 'Дата рождения / Date of birth',
      value: asDate(doc.dateOfBirth),
    },
    {
      label: 'Место рождения',
      value: asStr(doc.placeOfBirth),
    },
    {
      label: 'Пол',
      value: doc.sex ? (doc.sex === 'male' ? 'мужской' : 'женский') : '',
    },
  ],
});
