const baseNameWords = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
const tableNameWords = ['Users', 'Orders', 'Products', 'Sales', 'Inventory'];

const generateRandomName = (words: string[]): string => {
  const index = Math.floor(Math.random() * words.length);
  return words[index] + Math.floor(Math.random() * 1000);
};

export const generateBaseName = (): string => generateRandomName(baseNameWords);
export const generateTableName = (): string => generateRandomName(tableNameWords);
