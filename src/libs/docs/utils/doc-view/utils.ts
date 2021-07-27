import { format } from 'date-fns';

export const asDate = (str: string) =>
  (str && format(new Date(str), 'dd.MM.yyyy')) || '';

export const joinStr = (str: string[], chr = ' ') => {
  const filtered = str.filter((f) => !!f);
  return filtered.length > 0 ? filtered.join(chr) : '';
};

export const asStr = (str: string) => str || '';

export const asSex = (str: string) =>
  str ? (str === 'male' ? 'мужской' : 'женский') : '';
