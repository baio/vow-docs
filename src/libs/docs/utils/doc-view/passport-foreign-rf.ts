import { DocPassportForeignRF, DocPassportRF, DocView } from '../../models';
import { format } from 'date-fns';

export const passportForeignRF = (doc: DocPassportForeignRF): DocView => ({
  title: 'Загран РФ',
  fields: [
    {
      label: 'Номер паспорта / Passport No.',
      value: doc.identifier,
    },
    {
      label: 'Фамилия Имя Очество',
      value:
        doc.lastName || doc.firstName || doc.middleName
          ? [doc.lastName, doc.firstName, doc.middleName].join(' ')
          : null,
    },
    {
      label: 'Surname and Given Names',
      value:
        doc.lastNameEn || doc.firstNameEn || doc.middleNameEn
          ? [doc.lastNameEn, doc.firstNameEn, doc.middleNameEn].join(' ')
          : null,
    },
    {
      label: 'Дата рождения / Date of birth',
      value: doc.dateOfBirth && format(new Date(doc.dateOfBirth), 'dd.MM.yyyy'),
    },
    {
      col1: {
        label: 'Пол / Sex',
        value: doc.sex ? (doc.sex === 'male' ? 'M/M' : 'Ж/F') : null,
      },
      col2: {
        label: 'Место рождения / Place of Bith',
        value: `${doc.placeOfBirth || ''}/${doc.placeOfBirthEn || ''}`,
      },
    },
    {
      col1: {
        label: 'Дата выдачи / Date of Issue',
        value: doc.issueDate && format(new Date(doc.issueDate), 'dd.MM.yyyy'),
      },
      col2: {
        label: 'Дата окончания / Date of Expiry',
        value: doc.expiryDate && format(new Date(doc.expiryDate), 'dd.MM.yyyy'),
      },
    },
    {
      label: 'Орган Выдавший Документ / Authority',
      value: doc.issuer,
    },
  ],
});
