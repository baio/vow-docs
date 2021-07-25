import { format } from 'date-fns';
import { DocDriverLicenseRF, DocView } from '../../models';

export const driverLicenseRF = (doc: DocDriverLicenseRF): DocView => ({
  title: 'Водительское РФ',
  fields: [
    {
      label: 'Номер / No.',
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
      label: 'Место Рождения / Place of Birth',
      value: `${doc.regionOfBirth}/${doc.regionOfBirthEn}`,
    },
    {
      col1: {
        label: 'Дата Выдачи / Date of Issue',
        value: doc.issueDate && format(new Date(doc.issueDate), 'dd.MM.yyyy'),
      },
      col2: {
        label: 'Дата Окончания / Date of Expiry',
        value: doc.expiryDate && format(new Date(doc.expiryDate), 'dd.MM.yyyy'),
      },
    },
    {
      label: 'Регион / Region',
      value: `${doc.issuerRegion}/${doc.issuerRegionEn}`,
    },
    {
      label: 'Категории / Categories',
      value: doc.categories || '',
    },
  ],
});
