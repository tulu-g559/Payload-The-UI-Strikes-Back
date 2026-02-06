import { z } from "zod";

export const InvoiceItemSchema = z.object({
  description: z.string().describe("The work performed (e.g., 'Logo Design')"),
  quantity: z.number().default(1).describe("Number of hours or units"),
  rate: z.number().describe("Unit price or hourly rate"),
});

export const InvoiceSchema = z.object({
  invoiceNumber: z.string().describe("Unique invoice ID (e.g. INV-001)"),
  date: z.string().describe("Issue date (YYYY-MM-DD)"),
  dueDate: z.string().optional().describe("Payment due date (YYYY-MM-DD)"),
  
  // Client Details
  clientName: z.string().describe("Name of the client"),
  clientEmail: z.string().optional().describe("Client's email address"),
  clientAddress: z.string().optional().describe("Client's physical address"),
  
  // Sender Details (Optional - AI can generate or you can hardcode defaults)
  senderName: z.string().optional().describe("Your name or company name"),
  senderAddress: z.string().optional().describe("Your address"),
  
  items: z.array(InvoiceItemSchema).describe("List of services or products"),
  
  // Financials
  taxRate: z.number().optional().describe("Tax percentage (0-100)"),
  discount: z.number().optional().describe("Discount amount in dollars"),
  
  notes: z.string().optional().describe("Payment instructions or thank you note"),
});

export type InvoiceData = z.infer<typeof InvoiceSchema>;