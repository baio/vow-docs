import { DocFormatted, DocView } from '../../models';
import { driverLicenseRF } from './driver-license-rf';
import { passportForeignRF } from './passport-foreign-rf';
import { passportRF } from './passport-rf';
import { snilsRFForm } from './snils-rf';
import { unknown } from './unknown';

export const docFormattedToView = (doc: DocFormatted): DocView => {
  switch (doc.kind) {
    case 'passport-rf':
      return passportRF(doc);
    case 'passport-foreign-rf':
      return passportForeignRF(doc);
    case 'driver-license-rf':
      return driverLicenseRF(doc);
    case 'snils-rf':
      return snilsRFForm(doc);
    case 'unknown':
      return unknown(doc);
    default:
      return null;
  }
};
