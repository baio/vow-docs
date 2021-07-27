import { format } from 'date-fns';
import {
  DocForm,
  DocFormatted,
  DocFormField,
  DocView,
  DocViewField,
  OptItem,
} from '../models';

export const asDate = (str: string) =>
  (str && format(new Date(str), 'dd.MM.yyyy')) || '';

export const joinStr = (str: string[], chr = ' ') => {
  const filtered = str.filter((f) => !!f);
  return filtered.length > 0 ? filtered.join(chr) : '';
};

export const asStr = (str: string) => str || '';

export const asSex = (str: string) =>
  str ? (str === 'male' ? 'мужской' : 'женский') : '';

export const asOptItem = (str: string, optItems: OptItem[]) => {
  const item = optItems.find((f) => f.key === str);
  return item ? item.label : '';
};

const formatFormFieldValue = (formField: DocFormField, val: string): string => {
  switch (formField.kind) {
    case 'date':
      return asDate(val);
    case 'sex':
      return asSex(val);
    case 'select':
      return asOptItem(val, formField.items);
    default:
      return asStr(val);
  }
};

const docFormFieldToDocViewField =
  (docFormatted: DocFormatted) =>
  (field: DocFormField): DocViewField => ({
    label: field.label,
    value: docFormatted[field.name]
      ? formatFormFieldValue(field, docFormatted[field.name])
      : '',
  });

export const docFormToView = (docFormatted: DocFormatted, docForm: DocForm) =>
  ({
    title: docForm.title,
    fields: docForm.fields
      .map(docFormFieldToDocViewField(docFormatted))
      .filter((f) => !!f.value),
  } as DocView);
