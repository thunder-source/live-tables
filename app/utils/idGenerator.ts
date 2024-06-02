const generateUniqueId = (prefix: string): string => {
  const randomString = Math.random().toString(36).substr(2, 10); // 10 characters from random string
  const timestamp = Date.now().toString(36).slice(-3); // 3 characters from timestamp
  return (prefix + randomString + timestamp).slice(0, 15); // Ensure total length is 15 characters
};

export const generateBaseId = (): string => generateUniqueId('base');
export const generateTableId = (): string => generateUniqueId('table');
export const generateColumnId = (): string => generateUniqueId('column');
export const generateRowId = (): string => generateUniqueId('row');
export const generateCellId = (): string => generateUniqueId('cell');
