/* A "us vs. them" feature matrix. One value column is highlighted (your
   column) and reads as a framed accent strip through the table; booleans
   render as circled check/cross chips; rows cascade in on view.
   <Comparison cols={['', 'Acme', 'Legacy']} highlight={0}
     rows={[{ label: 'Realtime sync', values: [true, false] },
            { label: 'Price', values: ['$29', '$99'] }]} />
   values are booleans (→ ✓/✗) or strings; `highlight` indexes the value columns. */
import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useInView } from '../deck/useInView';
import { useDeck } from '../deck/DeckContext';

export type CompRow = { label: string; values: (boolean | string)[] };

const Check = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.6}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M5 12.5l4.5 4.5L19 6.5" />
  </svg>
);
const Cross = () => (
  <svg
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth={2.3}
    strokeLinecap="round"
    strokeLinejoin="round"
  >
    <path d="M7 7l10 10M17 7L7 17" />
  </svg>
);

export default function Comparison({
  cols,
  rows,
  highlight = 0,
}: {
  cols: string[];
  rows: CompRow[];
  highlight?: number;
}) {
  const { ref, inView } = useInView<HTMLDivElement>(0.25);
  const reduce = useReducedMotion();
  const { isStatic } = useDeck();
  const vcols = cols.length - 1;
  return (
    <div
      ref={ref}
      className="cmp mat"
      style={{ '--vcols': vcols } as CSSProperties}
    >
      <div className="cmp-row cmp-head">
        {cols.map((c, i) => (
          <div
            key={i}
            className={'cmp-cell cmp-h' + (i - 1 === highlight ? ' hl' : '')}
          >
            {c}
          </div>
        ))}
      </div>
      {rows.map((r, ri) => (
        <motion.div
          key={ri}
          className="cmp-row"
          initial={isStatic || reduce ? false : { opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : undefined}
          transition={{
            duration: 0.45,
            delay: 0.1 + ri * 0.07,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          <div className="cmp-cell cmp-label">{r.label}</div>
          {r.values.map((v, vi) => (
            <div
              key={vi}
              className={'cmp-cell' + (vi === highlight ? ' hl' : '')}
            >
              {typeof v === 'boolean' ? (
                <span className={'cmp-chip ' + (v ? 'ok' : 'no')}>
                  {v ? <Check /> : <Cross />}
                </span>
              ) : (
                <span className="cmp-val">{v}</span>
              )}
            </div>
          ))}
        </motion.div>
      ))}
    </div>
  );
}
