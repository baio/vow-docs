import { format } from 'date-fns';
import { DocPassportForeignRF, DocView } from '../../models';
import { asDate, asStr, joinStr } from './utils';

export const passportForeignRF = (doc: DocPassportForeignRF): DocView => ({
  title: 'Загран РФ',
  fields: [
    {
      label: 'Номер паспорта / Passport No.',
      value: asStr(doc.identifier),
    },
    {
      label: 'Фамилия Имя Очество',
      value: joinStr([doc.lastName, doc.firstName, doc.middleName]),
    },
    {
      label: 'Surname and Given Names',
      value: joinStr([doc.lastNameEn, doc.firstNameEn, doc.middleNameEn]),
    },
    {
      label: 'Место рождения / Place of Birth',
      value: `${doc.placeOfBirth || ''}/${doc.placeOfBirthEn || ''}`,
    },
    {
      label: 'Пол / Sex',
      value: doc.sex ? (doc.sex === 'male' ? 'M/M' : 'Ж/F') : null,
    },
    {
      label: 'Дата рождения / Date of birth',
      value: asDate(doc.dateOfBirth),
    },
    {
      label: 'Дата выдачи / Date of Issue',
      value: asDate(doc.issueDate),
    },
    {
      label: 'Дата окончания / Date of Expiry',
      value: asDate(doc.expiryDate),
    },
    {
      label: 'Орган Выдавший Документ / Authority',
      value: asStr(doc.issuer),
    },
    {
      label: 'Тип / Type',
      value: asStr(doc.type),
    },
  ],
});
