import { DocForm } from '../../../models';

export const docFormDriverLicenseRF: DocForm = {
  fields: [
    {
      kind: 'text',
      name: 'lastName',
      label: 'Фамилия',
    },
    {
      kind: 'text',
      name: 'lastNameEn',
      label: 'Surname',
    },
    {
      kind: 'text',
      name: 'firstName',
      label: 'Имя',
    },
    {
      kind: 'text',
      name: 'firstNameEn',
      label: 'Given Name',
    },
    {
      kind: 'text',
      name: 'middleName',
      label: 'Отчество',
    },
    {
      kind: 'text',
      name: 'middleNameEn',
      label: 'Middle Name',
    },
    {
      kind: 'number',
      name: 'identifier',
      label: 'Номер',
    },
    {
      kind: 'date',
      name: 'dateOfBirth',
      label: 'Дата рождения / Date of Birth',
    },
    {
      kind: 'text',
      name: 'regionOfBirth',
      label: 'Место рождения',
    },
    {
      kind: 'text',
      name: 'regionOfBirthEn',
      label: 'Place of Birth',
    },
    {
      kind: 'date',
      name: 'issueDate',
      label: 'Дата выдачи / Date of Issue',
    },
    {
      kind: 'date',
      name: 'expiryDate',
      label: 'Дата окончания срока / Date of Expiry',
    },
    {
      kind: 'text',
      name: 'issuer',
      label: 'Орган, выдавший документ',
    },
    {
      kind: 'text',
      name: 'issuerEn',
      label: 'Authority',
    },
    {
      kind: 'text',
      name: 'issuerRegion',
      label: 'Место выдачи',
    },
    {
      kind: 'text',
      name: 'issuerRegionEn',
      label: 'Authority Location',
    },
    {
      kind: 'text',
      name: 'categories',
      label: 'Категории / Categories',
    },
  ],
};
