import { format } from 'date-fns';
import {
  DocPassportForeignRF,
  DocView,
  MedInsuranceInternationalRF,
} from '../../models';
import { asDate, asStr, joinStr } from './utils';

export const medInsuranceInternationalRF = (
  doc: MedInsuranceInternationalRF
): DocView => ({
  title: 'Международный Страховой Полис',
  fields: [
    {
      label: '№ Полиса / Policy number',
      value: asStr(doc.identifier),
    },
    {
      label: 'Застрахованный / Policy holder',
      value: joinStr([doc.lastName, doc.firstName, doc.middleName]),
    },
    {
      label: 'Дата рождения / Date of Birth',
      value: asDate(doc.birthDate),
    },
    {
      label: 'Адресс / Address',
      value: asStr(doc.address),
    },
    {
      label: 'Паспорт № / Passport No',
      value: asStr(doc.passportNo),
    },
    {
      label: 'Дата выдачи / Issue Date',
      value: asDate(doc.issueDate),
    },
    {
      label: 'С / Start Date',
      value: asDate(doc.startDate),
    },
    {
      label: 'По / End Date',
      value: asDate(doc.endDate),
    },
    {
      label: 'Страховщик / Issuer',
      value: asStr(doc.issuer),
    },
    {
      label: 'Особые условия / Special Terms',
      value: asStr(doc.specialTerms),
    },
    {
      label: 'Страна / Country',
      value: asStr(doc.country),
    },
    {
      label: 'Территория / Territorialityy',
      value: asStr(doc.territory),
    },
    {
      label: 'Программа / Coverage',
      value: asStr(doc.territory),
    },
  ],
});
