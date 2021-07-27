import { DocPassportRF, DocView, PtsRF } from '../../models';
import { format } from 'date-fns';
import { asStr, joinStr } from './utils';

export const ptsRF = (doc: PtsRF): DocView => ({
  title: 'Паспорт Транспортного Средства',
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
      label: 'Идентификационный номер (VIN)',
      value: asStr(doc.issuer),
    },
    {
      col1: {
        label: 'Модель',
        value: asStr(doc.model),
      },
      col2: {
        label: 'Наименование (Тип ТС)',
        value: asStr(doc.vehicleType),
      },
    },
    {
      col1: {
        label: 'Категория ТС',
        value: asStr(doc.vehicleCategory),
      },
      col2: {
        label: 'Год изготовления',
        value: asStr(doc.vehicleYear),
      },
    },
    {
      label: 'Модель, № Двигателя',
      value: asStr(doc.engineNo),
    },
    {
      label: 'Шасси (рама) №',
      value: asStr(doc.engineNo),
    },
    {
      label: 'Кузов (кабина, прицеп) №',
      value: asStr(doc.engineNo),
    },
  ],
});
