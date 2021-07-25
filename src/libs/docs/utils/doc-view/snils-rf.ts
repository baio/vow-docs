import {
  DocPassportForeignRF,
  DocPassportRF,
  DocSNILSRF,
  DocView,
} from '../../models';
import { format } from 'date-fns';

export const snilsRF = (doc: DocSNILSRF): DocView => ({
  title: 'СНИЛС РФ',
  fields: [
    {
      label: 'Номер',
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
      label: 'Дата рождения / Date of birth',
      value: doc.dateOfBirth && format(new Date(doc.dateOfBirth), 'dd.MM.yyyy'),
    },
    {
      label: 'Место рождения',
      value: doc.placeOfBirth || '',
    },
    {
      label: 'Пол',
      value: doc.sex ? (doc.sex === 'male' ? 'мужской' : 'женский') : null,
    },
  ],
});
