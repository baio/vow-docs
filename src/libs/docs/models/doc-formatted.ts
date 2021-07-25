export interface DocUnknown {
  kind: 'unknown';
  text: string;
  lastName: string;
  firstName: string;
  middleName: string;
  identifier: string;
  date: string;
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
