"use client";
import { InvoiceData } from "../invoice/schema";
import { Check, Download } from "lucide-react";

export const InvoiceDisplay = (props: InvoiceData) => {
  const total = props.items?.reduce((acc: number, item) => acc + (item.hours * (item.rate || 0)), 0) || 0;

  return (
    <div className="p-4 border-2 border-primary/20 rounded-lg bg-white shadow-md my-4">
      <h3 className="text-xl font-bold border-b pb-2 mb-4 text-zinc-800">
        Invoice: {props.clientName || "Drafting..."}
      </h3>
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b">
            <th className="text-left pb-2">Task</th>
            <th className="text-right pb-2">Hrs</th>
            <th className="text-right pb-2">Rate</th>
          </tr>
        </thead>
        <tbody>
          {props.items?.map((item, i: number) => (
            <tr key={i} className="border-b last:border-0">
              <td className="py-2">{item.description}</td>
              <td className="text-right py-2">{item.hours}</td>
              <td className="text-right py-2">${item.rate}</td>
            </tr>
          ))}
        </tbody>
      </table>
      <div className="mt-4 text-right">
        <p className="text-xs text-zinc-500 uppercase tracking-wider">Total Amount</p>
        <p className="text-2xl font-black text-primary">${total.toFixed(2)}</p>
      </div>
      <div className="mt-6 flex gap-3 no-print">
        <button 
          type="button"
          className="flex-1 flex items-center justify-center px-4 py-2 bg-green-600 hover:bg-green-700 text-white rounded-md transition-colors font-medium"
          onClick={() => window.print()}
        >
          <Download className="mr-2 h-4 w-4" /> Export PDF
        </button>
        <button 
          type="button"
          className="flex-1 flex items-center justify-center px-4 py-2 border border-border bg-background hover:bg-muted text-foreground rounded-md transition-colors font-medium"
          onClick={() => alert("Invoice sent to client!")}
        >
          <Check className="mr-2 h-4 w-4" /> Send to Client
        </button>
      </div>
    </div>
  );
};