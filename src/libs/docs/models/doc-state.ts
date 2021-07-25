export type DocStoredStatus = 'progress' | 'success' | 'error';

export interface DocStored {
  provider: 'yandex';
  url: string;
  status: DocStoredStatus;
  date: number;
}

export type DocLabel = 'passport-rf' | 'unknown';

export interface DocLabeled {
  label: DocLabel;
}

export interface DocUnknown {
  kind: 'unknown';
  text: string;
}

export interface DocPassportRF {
  kind: 'passport-rf';
  lastName: string;
  firstName: string;
  middleName: string;
  identifier: string;
  issuer: string;
  issueDate: string;
  sex: string;
  dateOfBirth: string;
  placeOfBirth: string;
  departmentCode: string;
}

export type DocFormatted = DocPassportRF | DocUnknown;

export interface DocState {
  stored?: DocStored;
  labeled?: DocLabeled;
  formatted?: DocFormatted;
}

export interface Doc extends DocState {
  id: string;
  imgBase64: string;
  date: number;
  tags: string[];
  comment: string;
  attachments: string[];
}

export interface DocAttachment {
  id: string;
  imgBase64: string;
}

export interface DocsState {
  docs: { [id: string]: Doc };
  attachments: { [id: string]: DocAttachment };
}
