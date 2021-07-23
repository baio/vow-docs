import {
    Doc,
    DocFormatted,
    DocPassportRFMainPage,
    DocView,
} from '../../models';
import { passportRFMainPage } from './passport-rf';

export const docFormattedToView = (doc: DocFormatted): DocView => {
    if (doc.kind === 'passport-rf') {
        return passportRFMainPage(doc);
    } else {
        return null;
    }
};
