import { Receipt, Navigation } from "lucide-react";
import type { BasketItem } from "../types";
import { formatINR } from "../ui";
export default function OrderSummaryCard({
  basket,
  cookTime,
}: {
  basket: BasketItem[];
  cookTime: number;
}) {
 return (
  <div className="rounded-2xl bg-white p-4 shadow-soft ring-1 ring-charcoal-100 lg:p-5">
    <div className="flex items-center gap-2 text-sm font-bold text-charcoal-900">
      <Receipt className="h-4 w-4 text-terracotta-600" />
      Order Summary
    </div>

    <div className="mt-3 space-y-2.5">
      {basket.map((i) => (
        <div
          key={i.id}
          className="flex items-center justify-between text-sm"
        >
          <span className="text-charcoal-700">
            {i.qty}× {i.name}
          </span>

          <span className="font-semibold text-charcoal-900">
            {formatINR(i.qty * i.price)}
          </span>
        </div>
      ))}
    </div>

    <div className="mt-3 flex items-center gap-1.5 rounded-lg bg-terracotta-50 px-3 py-2 text-[11px] font-medium text-terracotta-700">
      <Navigation className="h-3.5 w-3.5" />
      Longest cook time {cookTime} mins — kitchen syncs to your ETA.
    </div>
  </div>
);
}
