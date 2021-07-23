import { Doc, DocFormatted, DocPassportRF, DocView } from '../../models';
import { passportRF } from './passport-rf';
import { unknown } from './unknown';

export const docFormattedToView = (doc: DocFormatted): DocView => {
  switch (doc.kind) {
    case 'passport-rf':
      return passportRF(doc);
    case 'unknown':
      return unknown(doc);
    default:
      return null;
  }
};
