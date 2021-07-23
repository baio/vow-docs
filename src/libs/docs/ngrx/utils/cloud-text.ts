import { Doc } from '../../models';
import { DocMeta } from './doc-meta';
import { formatPassportRFCloudText } from './passport-rf-cloud-text';
import { formatUnknownCloudText } from './unknown-cloud-text';

export const formatCloudText = (doc: Doc) => {
  const meta = {
    tags: doc.tags,
    date: doc.date,
    comment: doc.comment,
  } as DocMeta;
  if (doc.formatted && doc.formatted) {
    switch (doc.formatted.kind) {
      case 'passport-rf':
        return formatPassportRFCloudText(doc.formatted, meta);
    }
  } else {
    return formatUnknownCloudText(meta);
  }
};
