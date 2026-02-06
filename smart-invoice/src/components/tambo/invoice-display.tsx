"use client";
import { InvoiceData } from "../invoice/schema";
import { Check, Download, Receipt, Building2, Calendar } from "lucide-react";
import { cn } from "@/lib/utils";



export const InvoiceDisplay = (props: InvoiceData) => {
  
  // 1. SAFE CALCULATIONS (Prevents NaN)
  // We default every value to 0 if it's missing
  const subtotal = (props.items || []).reduce((acc, item) => {
    const qty = item.quantity || 0;
    const rate = item.rate || 0;
    return acc + (qty * rate);
  }, 0);

  const taxRate = props.taxRate || 0;
  const taxAmount = (subtotal * taxRate) / 100;
  const discountAmount = props.discount || 0;
  const total = subtotal + taxAmount - discountAmount;

  return (
    <div className="w-full max-w-3xl mx-auto my-8 font-sans">
      
      {/* ───────────────── DOCUMENT SHEET ───────────────── */}
      <div className="bg-white rounded-xl shadow-2xl overflow-hidden print:shadow-none print:rounded-none">
        
        {/* Top Accent Strip */}
        <div className="h-2 w-full bg-emerald-500 print:bg-black" />

        <div className="p-8 md:p-12">
          
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row justify-between items-start mb-12">
            <div>
              <div className="flex items-center gap-2 mb-2 text-emerald-600">
                <Receipt size={24} />
                <span className="text-2xl font-black tracking-tight uppercase">Invoice</span>
              </div>
              <p className="text-gray-500 font-medium tracking-wide">#{props.invoiceNumber || "DRAFT"}</p>
            </div>

            <div className="mt-4 md:mt-0 text-right space-y-1">
              <div className="flex items-center justify-end gap-2 text-gray-500 text-sm">
                 <Calendar size={14} />
                 <span>Issued: {props.date || new Date().toLocaleDateString()}</span>
              </div>
              {props.dueDate && (
                 <div className="text-sm font-medium text-red-500 bg-red-50 px-2 py-0.5 rounded inline-block">
                    Due: {props.dueDate}
                 </div>
              )}
            </div>
          </div>

          {/* ADDRESS GRID */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-10 mb-12 border-t border-b border-gray-100 py-8">
            {/* Bill From */}
            <div>
               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Bill From</h4>
               <p className="font-bold text-gray-900 text-lg">{props.senderName || "Payload Agency"}</p>
               <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed">
                  {props.senderAddress || "123 Innovation Dr.\nTech City, CA 94000"}
               </p>
            </div>

            {/* Bill To */}
            <div className="md:text-right">
               <h4 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-3">Bill To</h4>
               <p className="font-bold text-gray-900 text-lg">{props.clientName || "Valued Client"}</p>
               {props.clientEmail && <p className="text-emerald-600 text-sm mb-1">{props.clientEmail}</p>}
               <p className="text-gray-500 text-sm whitespace-pre-line leading-relaxed">
                  {props.clientAddress || "Address not provided"}
               </p>
            </div>
          </div>

          {/* LINE ITEMS TABLE (Fixed Alignment) */}
          <div className="mb-10">
            <table className="w-full text-sm border-collapse">
              <thead>
                <tr className="border-b-2 border-gray-100">
                  <th className="text-left py-3 font-bold text-gray-900 pl-2">Description</th>
                  <th className="text-center py-3 font-bold text-gray-900 w-20">Qty</th>
                  <th className="text-right py-3 font-bold text-gray-900 w-32">Rate</th>
                  <th className="text-right py-3 font-bold text-gray-900 w-32 pr-2">Amount</th>
                </tr>
              </thead>
              <tbody className="text-gray-600">
                {(props.items || []).map((item, i) => {
                  const qty = item.quantity || 0;
                  const rate = item.rate || 0;
                  const lineTotal = qty * rate;

                  return (
                    <tr key={i} className="border-b border-gray-50 last:border-0 hover:bg-gray-50/50 transition-colors">
                      <td className="py-4 pl-2 font-medium">{item.description || "Item description"}</td>
                      <td className="text-center py-4">{qty}</td>
                      <td className="text-right py-4">${rate.toFixed(2)}</td>
                      <td className="text-right py-4 font-semibold text-gray-900 pr-2">
                        ${lineTotal.toFixed(2)}
                      </td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
            
            {/* Empty State if no items */}
            {(!props.items || props.items.length === 0) && (
                <div className="text-center py-8 text-gray-400 italic">
                    No items added yet.
                </div>
            )}
          </div>

          {/* FINANCIAL SUMMARY */}
          <div className="flex justify-end mb-12">
            <div className="w-full md:w-1/2 space-y-3">
              <div className="flex justify-between text-sm text-gray-500 px-2">
                <span>Subtotal</span>
                <span className="font-medium">${subtotal.toFixed(2)}</span>
              </div>
              
              {taxRate > 0 && (
                <div className="flex justify-between text-sm text-gray-500 px-2">
                  <span>Tax ({taxRate}%)</span>
                  <span>+${taxAmount.toFixed(2)}</span>
                </div>
              )}

              {discountAmount > 0 && (
                <div className="flex justify-between text-sm text-emerald-600 px-2">
                  <span>Discount</span>
                  <span>-${discountAmount.toFixed(2)}</span>
                </div>
              )}

              <div className="flex justify-between items-center pt-4 border-t-2 border-gray-100 mt-4 px-2">
                <span className="text-sm font-bold text-gray-400 uppercase tracking-wider">Total Due</span>
                <span className="text-3xl font-black text-gray-900 tracking-tight">
                  ${total.toFixed(2)}
                </span>
              </div>
            </div>
          </div>

          {/* NOTES / FOOTER */}
          {(props.notes) && (
             <div className="bg-gray-50 rounded-lg p-5 text-sm border border-gray-100">
                <p className="font-bold text-gray-900 mb-1">Notes / Terms</p>
                <p className="text-gray-500 leading-relaxed">{props.notes}</p>
             </div>
          )}
          
        </div>
      </div>

      {/* ───────────────── ACTION BAR (No Print) ───────────────── */}
      <div className="mt-6 flex flex-col sm:flex-row gap-3 print:hidden">
        <button 
          type="button"
          onClick={() => window.print()}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-[#111] hover:bg-black text-white rounded-xl transition-all font-medium shadow-lg shadow-black/20 active:scale-[0.98]"
        >
          <Download size={18} /> 
          <span>Download PDF</span>
        </button>
        
        <button 
          type="button"
          onClick={() => alert("Simulated Send!")}
          className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-emerald-500 hover:bg-emerald-400 text-black rounded-xl transition-all font-bold shadow-lg shadow-emerald-500/20 active:scale-[0.98]"
        >
          <Check size={18} /> 
          <span>Send Invoice</span>
        </button>
      </div>

    </div>
  );
};