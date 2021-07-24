import { Doc } from '../../models';
import { DocMeta } from './doc-meta';
import { formatEmptyCloudText } from './empty-cloud-text';
import { formatPassportRFCloudText } from './passport-rf-cloud-text';
import { formatUnknownCloudText } from './unknown-cloud-text';

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
