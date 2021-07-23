import { format, parse } from 'date-fns';
import { DocPassportRFMainPage } from '../../models';
import { DocMeta } from './doc-meta';

export const formatUnknownCloudText = (meta: DocMeta) => {
  const VERSION = 1;
  const text = `
  ВЕРСИЯ
  ${VERSION}
  ТИП ДОКУМЕНТА
  НЕИЗВЕСТНЫЙ
  ТАГИ
  ${(meta.tags || []).join(',')}
  КОММЕНТАРИЙ
  ${meta.comment || ''}
  СИСТЕМНАЯ ДАТА
  ${meta.date}
  `;
  return text;
};

export const parseUnknownCloudText = (text: string) => {
  const lines = text.split('\n');
  if (lines[3] === 'ПАССПОРТ РФ') {
    const docFormatted = {
      kind: 'passport-rf',
      lastName: lines[5] || null,
      firstName: lines[7] || null,
      middleName: lines[9] || null,
      identifier: lines[11] || null,
      issuer: lines[13] || null,
      issueDate: lines[15]
        ? parse(lines[15], 'dd.MM.yyyy', null).toISOString()
        : null,
      sex: lines[17] ? (lines[17] === 'мужской' ? 'male' : 'feamle') : null,
      dateOfBirth: lines[19],
      placeOfBirth: lines[21]
        ? parse(lines[21], 'dd.MM.yyyy', null).toISOString()
        : null,
      departmentCode: lines[23] || null,
    } as DocPassportRFMainPage;

    const docMeta = {
      tags: (lines[25] || '').split(','),
      comment: lines[27] || null,
      date: lines[29] ? +lines[29] : null,
    } as DocMeta;
  } else {
    return null;
  }
};
