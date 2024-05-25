import { z } from 'zod';

// Define the table configuration schema
export const TableConfigSchema = z.object({
  id: z.string().length(15),
  name: z.string().min(3).max(20),
  config: z.object({}).passthrough(), // Assuming config is an object with unknown properties
});

// Define the base configuration schema
export const BaseConfigSchema = z.object({
  id: z.string().length(15),
  name: z.string().min(3).max(20),
  tables: z.record(TableConfigSchema),
  tableOrder: z.array(z.string()),
});

// Define the state schema
export const ConfigStateSchema = z.object({
  bases: z.record(BaseConfigSchema),
  baseOrder: z.array(z.string()),
});

// Export TypeScript types derived from Zod schemas
export type TableConfig = z.infer<typeof TableConfigSchema>;
export type BaseConfig = z.infer<typeof BaseConfigSchema>;
export type ConfigState = z.infer<typeof ConfigStateSchema>;
