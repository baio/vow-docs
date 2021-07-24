import { DocUnknown } from '../../models';
import { DocMeta } from './doc-meta';
import { flatStr, flatTags, unFlatStr, unFlatTags } from './str-utils';

export const formatEmptyCloudText = (meta: DocMeta) => {
  const VERSION = 1;
  const text = `
  ВЕРСИЯ
  ${VERSION}
  ТИП ДОКУМЕНТА
  ПУСТОЙ
  ТАГИ
  ${flatTags(meta.tags)}
  КОММЕНТАРИЙ
  ${flatStr(meta.comment)}
  СИСТЕМНАЯ ДАТА
  ${meta.date}
  `;
  return text;
};

export const emptyCloudText = (text: string) => {
  const lines = text.split('\n');
  if (lines[3] === 'ПУСТОЙ') {
    const docMeta = {
      tags: unFlatTags(lines[5]),
      comment: unFlatStr(lines[7]),
      date: lines[9] ? +lines[9] : null,
    } as DocMeta;
    return {
      docFormatted: null,
      docMeta,
    };
  } else {
    return null;
  }
};