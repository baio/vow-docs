import { DocForm } from '../models';

export const ptsRF: DocForm = {
  title: 'Паспорт Транспортного Средства',
  fields: [
    {
      name: 'lastName',
      kind: 'text',
      label: 'Фамилия',
    },
    {
      name: 'firstName',
      kind: 'text',
      label: 'Имя',
    },
    {
      name: 'middleName',
      kind: 'text',
      label: 'Очество',
    },
    {
      label: 'Серия Номер',
      name: 'identifier',
      kind: 'text',
    },
    {
      label: 'Идентификационный номер (VIN)',
      name: 'issuer',
      kind: 'text',
    },
    {
      label: 'Модель',
      name: 'model',
      kind: 'text',
    },
    {
      label: 'Наименование (Тип ТС)',
      name: 'vehicleType',
      kind: 'text',
    },
    {
      label: 'Категория ТС',
      name: 'vehicleCategory',
      kind: 'text',
    },
    {
      label: 'Год изготовления',
      name: 'vehicleYear',
      kind: 'text',
    },
    {
      label: 'Модель, № Двигателя',
      name: 'engineNo',
      kind: 'text',
    },
    {
      label: 'Шасси (рама) №',
      name: 'engineModelNo',
      kind: 'text',
    },
    {
      label: 'Кузов (кабина, прицеп) №',
      name: 'bodyNo',
      kind: 'text',
    },
  ],
};
