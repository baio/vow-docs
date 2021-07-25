import { DocUnknown } from '../../models';
import { DocMeta } from './doc-meta';
import {
  flatStr,
  flatTags,
  parseLines,
  unFlatStr,
  unFlatTags,
} from './str-utils';

export const formatUnknownCloudText = (
  docFormatted: DocUnknown,
  meta: DocMeta
) => {
  const VERSION = 1;
  const text = `
  ВЕРСИЯ
  ${VERSION}
  ТИП ДОКУМЕНТА
  НЕИЗВЕСТНЫЙ
  ТЕКСТ
  ${flatStr(docFormatted.text)}
  ТАГИ
  ${flatTags(meta.tags)}
  КОММЕНТАРИЙ
  ${flatStr(meta.comment)}
  СИСТЕМНАЯ ДАТА
  ${meta.date}
  ПРИЛОЖЕНИЯ
  ${flatTags(meta.attachments)}
  `;
  return text;
};

export const parseUnknownCloudText = (text: string) => {
  const lines = parseLines(text);
  if (lines[3] === 'НЕИЗВЕСТНЫЙ') {
    const docFormatted = {
      kind: 'unknown',
      text: unFlatStr(lines[5]),
    } as DocUnknown;

    const docMeta = {
      tags: unFlatTags(lines[7]),
      comment: unFlatStr(lines[9]),
      date: lines[11] ? +lines[11] : null,
      attachments: unFlatTags(lines[13]),
    } as DocMeta;
    return {
      docFormatted,
      docMeta,
    };
  } else {
    return null;
  }
};
