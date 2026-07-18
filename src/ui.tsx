import type { ReactNode } from 'react';

export function formatINR(n: number): string {
  return '₹' + n.toLocaleString('en-IN');
}

export function cn(...parts: (string | false | undefined | null)[]): string {
  return parts.filter(Boolean).join(' ');
}

export function Stars({ rating, className = '' }: { rating: number; className?: string }) {
  return (
    <span className={cn('inline-flex items-center gap-1 text-charcoal-700', className)}>
      <svg viewBox="0 0 20 20" className="h-3.5 w-3.5 fill-terracotta-500" aria-hidden>
        <path d="M10 1.5l2.6 5.3 5.9.9-4.3 4.2 1 5.9L10 15l-5.2 2.8 1-5.9L1.5 7.7l5.9-.9L10 1.5z" />
      </svg>
      <span className="font-semibold">{rating.toFixed(1)}</span>
    </span>
  );
}

export function VegMark({ veg }: { veg: boolean }) {
  return (
    <span
      className={cn(
        'inline-flex h-4 w-4 items-center justify-center rounded-[3px] border',
        veg ? 'border-emerald2-600' : 'border-terracotta-600',
      )}
      aria-label={veg ? 'Vegetarian' : 'Non-vegetarian'}
    >
      <span className={cn('h-2 w-2 rounded-full', veg ? 'bg-emerald2-600' : 'bg-terracotta-600')} />
    </span>
  );
}

export function Badge({ children, tone = 'neutral' }: { children: ReactNode; tone?: 'neutral' | 'green' | 'orange' | 'dark' }) {
  const tones: Record<string, string> = {
    neutral: 'bg-charcoal-100 text-charcoal-700',
    green: 'bg-emerald2-100 text-emerald2-800',
    orange: 'bg-terracotta-100 text-terracotta-700',
    dark: 'bg-charcoal-900 text-white',
  };
  return <span className={cn('inline-flex items-center rounded-full px-2.5 py-0.5 text-[11px] font-semibold', tones[tone])}>{children}</span>;
}

export function Spinner({ className = '' }: { className?: string }) {
  return (
    <svg className={cn('animate-spin', className)} viewBox="0 0 24 24" fill="none" aria-hidden>
      <circle className="opacity-20" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" />
      <path className="opacity-90" d="M22 12a10 10 0 00-10-10" stroke="currentColor" strokeWidth="3" strokeLinecap="round" />
    </svg>
  );
}
