import { BaseConfig, TableConfig } from '@/types';

const baseNameWords = ['Alpha', 'Beta', 'Gamma', 'Delta', 'Epsilon'];
const tableNameWords = ['Users', 'Orders', 'Products', 'Sales', 'Inventory'];

const generateRandomName = (words: string[]): string => {
  const index = Math.floor(Math.random() * words.length);
  return words[index] + Math.floor(Math.random() * 1000);
};

export const generateRandomBaseName = (): string => generateRandomName(baseNameWords);
export const generateRandomTableName = (): string => generateRandomName(tableNameWords);

export const generateTableName = (tables: { [key: string]: TableConfig }) => {
  const tableArray = Object.values(tables);
  const tableNames = tableArray.map(({ name }) => name.toLowerCase());
  let newTableIndex = tableArray.length + 1;
  let newTableName = `Table ${newTableIndex}`;

  while (tableNames.includes(newTableName.toLowerCase())) {
    newTableIndex += 1;
    newTableName = `Table ${newTableIndex}`;
  }
  return newTableName;
};

export const generateBaseName = (bases: { [key: string]: BaseConfig }) => {
  const baseArray = Object.values(bases);
  const baseNames = baseArray.map(({ name }) => name.toLowerCase());
  let newBaseIndex = baseArray.length + 1;
  let newBaseName = `Base ${newBaseIndex}`;

  while (baseNames.includes(newBaseName.toLowerCase())) {
    newBaseIndex += 1;
    newBaseName = `Base ${newBaseIndex}`;
  }
  return newBaseName;
};
