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

export interface DocPassportForeignRF {
  kind: 'passport-foreign-rf';
  lastName: string;
  lastNameEn: string;
  firstName: string;
  firstNameEn: string;
  middleName: string;
  middleNameEn: string;
  identifier: string;
  issuer: string;
  issueDate: string;
  expiryDate: string;
  sex: string;
  dateOfBirth: string;
  placeOfBirth: string;
  placeOfBirthEn: string;
  type: string;
}

export interface DocSNILSRF {
  kind: 'snils-rf';
  lastName: string;
  firstName: string;
  middleName: string;
  identifier: string;
  sex: string;
  dateOfBirth: string;
  placeOfBirth: string;
}

export interface DocDriverLicenseRF {
  kind: 'driver-license-rf';
  lastName: string;
  lastNameEn: string;
  firstName: string;
  firstNameEn: string;
  middleName: string;
  middleNameEn: string;
  identifier: string;
  dateOfBirth: string;
  regionOfBirth: string;
  regionOfBirthEn: string;
  issueDate: string;
  expiryDate: string;
  issuer: string;
  issuerEn: string;
  issuerRegion: string;
  issuerRegionEn: string;
  categories: string;
}

export type DocFormatted =
  | DocPassportRF
  | DocUnknown
  | DocPassportForeignRF
  | DocSNILSRF
  | DocDriverLicenseRF;
