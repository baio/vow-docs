import { SocialAuthProvider } from 'src/libs/profile/models';
import { Doc, DocFormatted } from '../../models';
import { DocMeta } from './doc-meta';
import { formatEmptyCloudText, parseEmptyCloudText } from './empty-cloud-text';
import {
  formatPassportRFCloudText,
  parsePassportRFCloudText,
} from './passport-rf-cloud-text';
import {
  formatUnknownCloudText,
  parseUnknownCloudText,
} from './unknown-cloud-text';

export const formatCloudText = (doc: Doc) => {
  const meta = {
    tags: doc.tags,
    date: doc.date,
    comment: doc.comment,
    attachments: doc.attachments,
  } as DocMeta;
  if (doc.formatted) {
    switch (doc.formatted.kind) {
      case 'passport-rf':
        return formatPassportRFCloudText(doc.formatted, meta);
      case 'unknown':
        return formatUnknownCloudText(doc.formatted, meta);
      default:
        return formatEmptyCloudText(meta);
    }
  } else {
    return formatEmptyCloudText(meta);
  }
};

export const parseCloudText = (
  id: string,
  provider: SocialAuthProvider,
  text: string,
  imgBase64: string,
  viewUrl: string
): Doc => {
  let data: { docFormatted: DocFormatted; docMeta: DocMeta } =
    parsePassportRFCloudText(text);
  if (!data) {
    data = parseUnknownCloudText(text);
  }
  if (!data) {
    data = parseEmptyCloudText(text);
  }
  if (!data) {
    return null;
  } else {
    return {
      id,
      imgBase64,
      date: data.docMeta.date,
      tags: data.docMeta.tags,
      comment: data.docMeta.comment,
      attachments: data.docMeta.attachments,
      stored: {
        provider,
        url: viewUrl,
        status: 'success',
        date: data.docMeta.date,
      },
      labeled: { label: data.docFormatted.kind },
      formatted: data.docFormatted,
    };
  }
};
