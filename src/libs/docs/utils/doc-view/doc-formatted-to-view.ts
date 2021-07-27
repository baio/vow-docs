import { DocFormatted, DocView } from '../../models';
import { birthCertificateRF } from './birth-certificate-rf';
import { driverLicenseRF } from './driver-license-rf';
import { innRF } from './inn-rf';
import { kaskoRF } from './kasko-rf';
import { medInsuranceInternationalRF } from './med-insurance-international-rf';
import { medInsuranceRF } from './med-insurance-rf';
import { osagoRF } from './osago-rf';
import { passportForeignRF } from './passport-foreign-rf';
import { passportRF } from './passport-rf';
import { ptsRF } from './pts-rf';
import { snilsRF } from './snils-rf';
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
      return snilsRF(doc);
    case 'pts-rf':
      return ptsRF(doc);
    case 'kasko-rf':
      return kaskoRF(doc);
    case 'osago-rf':
      return osagoRF(doc);
    case 'birth-certificate-rf':
      return birthCertificateRF(doc);
    case 'inn-rf':
      return innRF(doc);
    case 'med-insurance-rf':
      return medInsuranceRF(doc);
    case 'med-insurance-international-rf':
      return medInsuranceInternationalRF(doc);
    case 'unknown':
      return unknown(doc);
    default:
      return null;
  }
};
