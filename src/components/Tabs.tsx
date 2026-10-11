import { useId, useState, type ReactNode } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

/* Tabbed content with a sliding accent pill (framer layoutId, scoped per
   instance so multiple Tabs coexist) and a cross-fade between panels. The bar
   is keyboard-navigable (←/→) and the block self-centers when standalone.
   <Tabs tabs={[{ label: 'Overview', content: <…/> }, …]} /> */
export type Tab = { label: string; content: ReactNode };

export default function Tabs({
  tabs,
  defaultTab = 0,
}: {
  tabs: Tab[];
  defaultTab?: number;
}) {
  const pillId = useId();
  const reduce = useReducedMotion();
  const [active, setActive] = useState(defaultTab);

  function onKeyDown(e: React.KeyboardEvent) {
    if (e.key !== 'ArrowRight' && e.key !== 'ArrowLeft') return;
    e.preventDefault();
    e.stopPropagation(); // don't page the deck while switching tabs
    const next =
      e.key === 'ArrowRight'
        ? (active + 1) % tabs.length
        : (active - 1 + tabs.length) % tabs.length;
    setActive(next);
    const bar = e.currentTarget as HTMLElement;
    (bar.children[next] as HTMLElement | undefined)?.focus();
  }

  return (
    <div className="tabs">
      <div className="tabs-bar-row">
        <div className="tabs-bar" role="tablist" onKeyDown={onKeyDown}>
          {tabs.map((t, i) => (
            <button
              key={i}
              id={`tab-${pillId}-${i}`}
              className={'tab' + (i === active ? ' on' : '')}
              onClick={() => setActive(i)}
              role="tab"
              aria-selected={i === active}
              aria-controls={`tabpanel-${pillId}-${i}`}
              tabIndex={i === active ? 0 : -1}
            >
              {i === active && (
                <motion.span
                  layoutId={pillId}
                  className="tab-pill"
                  transition={
                    reduce
                      ? { duration: 0 }
                      : { type: 'spring', stiffness: 380, damping: 32 }
                  }
                />
              )}
              <span className="tab-label">{t.label}</span>
            </button>
          ))}
        </div>
      </div>
      <div
        className="tabs-panel"
        role="tabpanel"
        id={`tabpanel-${pillId}-${active}`}
        aria-labelledby={`tab-${pillId}-${active}`}
        tabIndex={0}
      >
        <AnimatePresence mode="wait">
          <motion.div
            key={active}
            className="tabs-panel-inner"
            initial={{ opacity: 0, y: 8, filter: 'blur(2px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            exit={{ opacity: 0, y: -8, filter: 'blur(2px)' }}
            transition={{
              duration: reduce ? 0 : 0.25,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            {tabs[active].content}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
