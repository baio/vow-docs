import { DocForm } from '../models';

export const birthCertificateRF: DocForm = {
  title: 'Свидетельство о рождении',
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
      kind: 'date',
      label: 'Дата Рождения',
      name: 'birthDate',
    },
    {
      kind: 'text-area',
      label: 'Место Рождения',
      name: 'birthPlace',
    },
    {
      name: 'authorityDate',
      label: 'Дата Акта',
      kind: 'date',
    },
    {
      name: 'identifier',
      label: 'Номер Акта',
      kind: 'text',
    },
    {
      name: 'fatherLastName',
      kind: 'text',
      label: 'Фамилия Отца',
    },
    {
      name: 'fatherFirstName',
      kind: 'text',
      label: 'Имя Отца',
    },
    {
      name: 'fatherMiddleName',
      kind: 'text',
      label: 'Очество Отца',
    },
    {
      name: 'matherLastName',
      kind: 'text',
      label: 'Фамилия Матери',
    },
    {
      name: 'matherFirstName',
      kind: 'text',
      label: 'Имя Матери',
    },
    {
      name: 'matherMiddleName',
      kind: 'text',
      label: 'Очество Матери',
    },
    {
      name: 'issueDate',
      kind: 'date',
      label: 'Дата Выдачи',
    },
    {
      kind: 'text',
      label: 'Номер документа',
      name: 'docNumber',
    },
  ],
};
