import { z } from "zod";

export const InvoiceItemSchema = z.object({
  description: z.string().describe("The work performed (e.g., 'Logo Design')"),
  hours: z.number().describe("Number of hours spent"),
  rate: z.number().describe("Hourly rate in USD"),
});

export const InvoiceSchema = z.object({
  clientName: z.string().describe("Name of the client"),
  items: z.array(InvoiceItemSchema).describe("List of work items"),
  notes: z.string().optional().describe("Any extra notes for the client"),
});

export type InvoiceData = z.infer<typeof InvoiceSchema>;