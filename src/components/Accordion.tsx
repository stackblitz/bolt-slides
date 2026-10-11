import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/* An expand/collapse accordion. Data-driven like Bento/StatGrid. Mono index,
   a +/× morph affordance, and an accent-lit open state. Self-centers when it
   stands alone on a slide.
   <Accordion items={[{ title: 'Q', body: 'A' }, …]} />
   - single (default true): only one panel open at a time.
   - defaultOpen: index open on mount (null = all closed). */
export type AccordionItem = { title: string; body: ReactNode };

export default function Accordion({
  items,
  single = true,
  defaultOpen = 0,
}: {
  items: AccordionItem[];
  single?: boolean;
  defaultOpen?: number | null;
}) {
  const baseId = useId();
  const reduce = useReducedMotion();
  const [open, setOpen] = useState<number[]>(
    defaultOpen == null ? [] : [defaultOpen]
  );
  const isOpen = (i: number) => open.includes(i);
  const toggle = (i: number) =>
    setOpen((cur) => {
      const has = cur.includes(i);
      if (single) return has ? [] : [i];
      return has ? cur.filter((x) => x !== i) : [...cur, i];
    });

  return (
    <div className="accordion">
      {items.map((it, i) => (
        <div key={i} className={'acc-item mat' + (isOpen(i) ? ' open' : '')}>
          <button
            id={`acc-head-${baseId}-${i}`}
            className="acc-head"
            onClick={() => toggle(i)}
            aria-expanded={isOpen(i)}
            aria-controls={`acc-body-${baseId}-${i}`}
          >
            <span className="acc-index">{String(i + 1).padStart(2, '0')}</span>
            <h3>{it.title}</h3>
            <span className="acc-plus" aria-hidden />
          </button>
          <AnimatePresence initial={false}>
            {isOpen(i) && (
              <motion.div
                id={`acc-body-${baseId}-${i}`}
                role="region"
                aria-labelledby={`acc-head-${baseId}-${i}`}
                className="acc-body"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{
                  duration: reduce ? 0 : 0.34,
                  ease: [0.16, 1, 0.3, 1],
                }}
              >
                <div className="acc-body-inner">{it.body}</div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      ))}
    </div>
  );
}
