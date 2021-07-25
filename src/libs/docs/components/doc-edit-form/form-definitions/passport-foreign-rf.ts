import { DocForm } from '../../../models';

export const docFormRFPassportForeign: DocForm = {
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
      kind: 'select',
      name: 'sex',
      label: 'Пол / Sex',
      items: [
        {
          key: 'male',
          label: 'мужской/male',
        },
        {
          key: 'female',
          label: 'женский/female',
        },
      ],
    },
    {
      kind: 'date',
      name: 'dateOfBirth',
      label: 'Дата рождения / Date of Birth',
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
      name: 'placeOfBirth',
      label: 'Место рождения',
    },
    {
      kind: 'text',
      name: 'placeOfBirthEn',
      label: 'Place of Birth',
    },
    {
      kind: 'text',
      name: 'issuer',
      label: 'Орган, выдавший документ / Authority',
    },
    {
      kind: 'text',
      name: 'type',
      label: 'Тип / Type',
    },
  ],
};
