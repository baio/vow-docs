import { OptItem } from './opt-item';

export interface DocFormFieldBase {
  name: string;
  label: string;
  group?: string | number;
}

export interface DocFormTextField extends DocFormFieldBase {
  kind: 'text';
}

export interface DocFormNumberField extends DocFormFieldBase {
  kind: 'number';
}

export interface DocFormDateField extends DocFormFieldBase {
  kind: 'date';
}

export interface DocFormTextAreaField extends DocFormFieldBase {
  kind: 'text-area';
}

export interface DocFormSelectField extends DocFormFieldBase {
  kind: 'select';
  items: OptItem[];
}

export interface DocFormSexField extends DocFormFieldBase {
  kind: 'sex';
}

export type DocFormField =
  | DocFormTextField
  | DocFormDateField
  | DocFormNumberField
  | DocFormTextAreaField
  | DocFormSelectField
  | DocFormSexField;

export interface DocForm {
  title: string;
  fields: DocFormField[];
}
