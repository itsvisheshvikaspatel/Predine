import { formatINR } from "../ui";

interface Props {
  subtotal: number;
  tax: number;
  fee: number;
  total: number;
}

export default function PriceBreakdownCard({
  subtotal,
  tax,
  fee,
  total,
}: Props) {
  return (
    <div className="rounded-2xl bg-white p-4 shadow-card ring-1 ring-charcoal-100 lg:p-5">
      <h2 className="mb-3 text-sm font-bold text-charcoal-900">
        Price Breakdown
      </h2>

      <Row label="Subtotal" value={formatINR(subtotal)} />
      <Row label="Taxes & GST (5%)" value={formatINR(tax)} />
      <Row
        label="Table Automation Fee"
        value={formatINR(fee)}
        hint="Covers auto-allocation & host bypass"
      />

      <div className="my-3 border-t border-dashed border-charcoal-200" />

      <div className="flex items-center justify-between">
        <span className="text-sm font-bold text-charcoal-900">
          Total Payable
        </span>

        <span className="text-xl font-extrabold text-charcoal-900">
          {formatINR(total)}
        </span>
      </div>
    </div>
  );
}

function Row({
  label,
  value,
  hint,
}: {
  label: string;
  value: string;
  hint?: string;
}) {
  return (
    <div className="flex items-center justify-between py-1.5">
      <div>
        <p className="text-sm text-charcoal-600">{label}</p>
        {hint && <p className="text-[10px] text-charcoal-400">{hint}</p>}
      </div>

      <span className="text-sm font-semibold text-charcoal-900">
        {value}
      </span>
    </div>
  );
}