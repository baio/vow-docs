import { DocForm } from '../../../models';

export const unknownForm: DocForm = {
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
      kind: 'date',
      name: 'issueDate',
      label: 'Дата',
    },
    {
      kind: 'text-area',
      name: 'text',
      label: 'Текст',
    },
  ],
};
