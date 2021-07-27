import { format } from 'date-fns';
import { DocDriverLicenseRF, DocView } from '../../models';
import { asDate, asStr, joinStr } from './utils';

export const driverLicenseRF = (doc: DocDriverLicenseRF): DocView => ({
  title: 'Водительское РФ',
  fields: [
    {
      label: 'Номер / No.',
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
      label: 'Дата рождения / Date of birth',
      value: asDate(doc.dateOfBirth),
    },
    {
      label: 'Место Рождения / Place of Birth',
      value: joinStr(
        [asStr(doc.regionOfBirth), asStr(doc.regionOfBirthEn)],
        '/'
      ),
    },
    {
      label: 'Дата Выдачи / Date of Issue',
      value: asDate(doc.issueDate),
    },
    {
      label: 'Дата Окончания / Date of Expiry',
      value: asDate(doc.expiryDate),
    },

    {
      label: 'Регион / Region',
      value: joinStr([asStr(doc.issuerRegion), asStr(doc.issuerRegionEn)], '/'),
    },
    {
      label: 'Категории / Categories',
      value: asStr(doc.categories),
    },
  ],
});
