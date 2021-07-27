import { DocPassportRF, DocView } from '../../models';
import { format } from 'date-fns';
import { asDate, asStr, joinStr } from './utils';

export const passportRF = (doc: DocPassportRF): DocView => ({
  title: 'Паспорт РФ',
  fields: [
    {
      label: 'Фамилия Имя Очество',
      value: joinStr([doc.lastName, doc.firstName, doc.middleName]),
    },
    {
      label: 'Серия Номер',
      value: asStr(doc.identifier),
    },
    {
      label: 'Паспорт выдан',
      value: asStr(doc.issuer),
    },
    {
      col1: {
        label: 'Дата выдачи',
        value: asDate(doc.issueDate),
      },
      col2: {
        label: 'Код подразделения',
        value: asStr(doc.departmentCode),
      },
    },
    {
      col1: {
        label: 'Пол',
        value: doc.sex ? (doc.sex === 'male' ? 'мужской' : 'женский') : '',
      },
      col2: {
        label: 'Дата рождения',
        value: asDate(doc.dateOfBirth),
      },
    },
    {
      label: 'Место рождения',
      value: asStr(doc.placeOfBirth),
    },
  ],
});
