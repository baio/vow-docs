import { DocForm } from '../../../models';

export const snilsRFForm: DocForm = {
  fields: [
    {
      kind: 'text',
      name: 'lastName',
      label: 'Фамилия',
    },
    {
      kind: 'text',
      name: 'firstName',
      label: 'Имя',
    },
    {
      kind: 'text',
      name: 'middleName',
      label: 'Отчество',
    },
    {
      kind: 'number',
      name: 'identifier',
      label: 'Номер',
    },
    {
      kind: 'select',
      name: 'sex',
      label: 'Пол',
      items: [
        {
          key: 'male',
          label: 'мужской',
        },
        {
          key: 'female',
          label: 'женской',
        },
      ],
    },
    {
      kind: 'date',
      name: 'dateOfBirth',
      label: 'Дата рождения',
    },
    {
      kind: 'text-area',
      name: 'placeOfBirth',
      label: 'Место рождения',
    },
  ],
};
