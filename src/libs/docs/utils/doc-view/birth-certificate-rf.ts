import { format } from 'date-fns';
import { BirthCertificateRF, DocView } from '../../models';
import { joinStr, asStr, asDate } from './utils';

export const birthCertificateRF = (doc: BirthCertificateRF): DocView => ({
  title: 'Свидетельство о рождении',
  fields: [
    {
      label: 'Фамилия Имя Очество',
      value: joinStr([doc.lastName, doc.firstName, doc.middleName]),
    },
    {
      label: 'Номер Акта',
      value: asStr(doc.identifier),
    },
    {
      label: 'Номер документа',
      value: asStr(doc.docNumber),
    },
    {
      label: 'Дата Рождения',
      value: asDate(doc.birthDate),
    },
    {
      label: 'Место Рождения',
      value: asStr(doc.docNumber),
    },
    {
      label: 'Дата документа',
      value: asDate(doc.authorityDate),
    },
    {
      label: 'Отец Фамилия Имя Очество',
      value: joinStr([
        doc.fatherLastName,
        doc.fatherFirstName,
        doc.fatherMiddleName,
      ]),
    },
    {
      label: 'Мать Фамилия Имя Очество',
      value: joinStr([
        doc.motherLastName,
        doc.motherFirstName,
        doc.motherMiddleName,
      ]),
    },
  ],
});
