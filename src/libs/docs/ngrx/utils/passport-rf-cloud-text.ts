import { format, parse } from 'date-fns';
import { DocPassportRFMainPage } from '../../models';
import { DocMeta } from './doc-meta';

export const formatPassportRFCloudText = (
  docFormatted: DocPassportRFMainPage,
  meta: DocMeta
) => {
  const VERSION = 1;
  const text = `
  ВЕРСИЯ
  ${VERSION}
  ТИП ДОКУМЕНТА
  ПАССПОРТ РФ
  ФАМИЛИЯ
  ${docFormatted.lastName || ''}
  ИМЯ
  ${docFormatted.firstName || ''}
  ОЧЕСТВО
  ${docFormatted.middleName || ''}
  СЕРИЯ НОМЕР
  ${docFormatted.identifier || ''}
  ПАСПОРТ ВЫДАН
  ${docFormatted.issuer || ''}
  ДАТА ВЫДАЧИ
  ${
    docFormatted.issueDate
      ? format(new Date(docFormatted.issueDate), 'dd.MM.yyyy')
      : ''
  }
  КОД ПОДРАЗДЕЛЕНИЯ
  ${docFormatted.departmentCode || ''}
  ПОЛ
  ${
    docFormatted.sex
      ? docFormatted.sex === 'male'
        ? 'мужской'
        : 'женский'
      : ''
  }
  ДАТА РОЖДЕНИЯ
  ${
    docFormatted.dateOfBirth
      ? format(new Date(docFormatted.dateOfBirth), 'dd.MM.yyyy')
      : ''
  }
  МЕСТО РОЖДЕНИЯ
  ${docFormatted.placeOfBirth || ''}
  ТАГИ
  ${(meta.tags || []).join(',')}
  КОММЕНТАРИЙ
  ${meta.comment || ''}
  СИСТЕМНАЯ ДАТА
  ${meta.date}
  `;
  return text;
};

export const parsePassportRFCloudText = (text: string) => {
  const lines = text.split('\n');
  if (lines[3] === 'ПАССПОРТ РФ') {
    const docFormatted = {
      kind: 'passport-rf-main-page',
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

    return {
      docFormatted,
      docMeta,
    };
  } else {
    return null;
  }
};