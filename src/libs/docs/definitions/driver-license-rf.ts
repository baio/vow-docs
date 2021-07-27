import { format } from 'date-fns';
import { DocForm } from '../models';

export const driverLicenseRF: DocForm = {
  title: 'Водительское РФ',
  fields: [
    {
      label: 'Номер / No.',
      name: 'identifier',
      kind: 'text',
    },
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
      name: 'lastNameEn',
      kind: 'text',
      label: 'Last Name',
    },
    {
      name: 'firstNameEn',
      kind: 'text',
      label: 'First Name',
    },
    {
      name: 'middleNameEn',
      kind: 'text',
      label: 'Middle Name',
    },
    {
      label: 'Дата рождения / Date of birth',
      kind: 'date',
      name: 'dateOfBirth',
    },
    {
      label: 'Место Рождения / Place of Birth',
      name: 'regionOfBirth',
      kind: 'text-area',
    },
    {
      label: 'Дата Выдачи / Date of Issue',
      name: 'issueDate',
      kind: 'date',
    },
    {
      label: 'Дата Окончания / Date of Expiry',
      name: 'expiryDate',
      kind: 'date',
    },
    {
      label: 'Регион Region',
      name: 'issuerRegion',
      kind: 'text',
    },
    {
      label: 'Region',
      name: 'issuerRegionEn',
      kind: 'text',
    },
    {
      label: 'Категории / Categories',
      name: 'categories',
      kind: 'text',
    },
  ],
};
