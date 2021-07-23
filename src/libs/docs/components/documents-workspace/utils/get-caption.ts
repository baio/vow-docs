import { DocFormatted } from '../../../models';

export interface DocCaption {
  title: string;
  subTitle: string;
}

export const getCaption = (formatted: DocFormatted): DocCaption => {
  switch (formatted.kind) {
    case 'unknown':
      return {
        title: formatted.text && formatted.text.substring(0, 20),
        subTitle: 'Другое',
      };
    case 'passport-rf':
      return {
        title:
          formatted.lastName || formatted.firstName || formatted.middleName
            ? [formatted.lastName, formatted.firstName, formatted.middleName]
                .join(' ')
                .trim()
            : null,
        subTitle: 'Паспорт РФ',
      };
    default:
      return null;
  }
};
