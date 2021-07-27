import { DocView, MedInsuranceRF } from '../../models';
import { asStr, joinStr } from './utils';

export const medInsuranceRF = (doc: MedInsuranceRF): DocView => ({
  title: 'Медицинский полис (ОМС)',
  fields: [
    {
      label: 'Фамилия Имя Очество',
      value: joinStr([doc.lastName, doc.firstName, doc.middleName]),
    },
    {
      label: 'Персональный Номер',
      value: asStr(doc.identifier),
    },
    {
      label: 'Дата Рождения',
      value: asStr(doc.birthDate),
    },
    {
      label: 'Пол',
      value: doc.sex ? (doc.sex === 'male' ? 'мужской' : 'женский') : '',
    },
  ],
});
