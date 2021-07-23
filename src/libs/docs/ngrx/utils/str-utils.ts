export const flatStr = (str: string) => (str ? str.replace(/\n/g, '|') : '');
export const unFlatStr = (str: string) =>
  str ? str.replace(/|/g, '/n') : null;

export const flatTags = (str: string[]) => (str ? str.join(',') : '');
export const unFlatTags = (str: string) => (str || '').split(',');
