import { motion, useReducedMotion } from 'framer-motion';
import type { ReactNode } from 'react';
import { useInView } from '../deck/useInView';
import { useDeck } from '../deck/DeckContext';

/* A vertical timeline / roadmap. The connector draws in, milestones are
   glowing rings with accent cores, and time labels are mono chips. Reveals
   in sequence when scrolled into view; self-centers when standalone.
   <Timeline items={[{ time: 'Q1', title: 'Launch', body: '…' }, …]} /> */
export type TimelineItem = { time: string; title: string; body?: ReactNode };

export default function Timeline({ items }: { items: TimelineItem[] }) {
  const { ref, inView } = useInView<HTMLDivElement>(0.2);
  const reduce = useReducedMotion();
  const { isStatic } = useDeck();
  return (
    <div className="tl" ref={ref}>
      <div className="tl-line">
        <motion.span
          className="tl-line-fill"
          initial={isStatic || reduce ? false : { scaleY: 0 }}
          animate={{ scaleY: inView ? 1 : 0 }}
          transition={{
            duration: isStatic || reduce ? 0 : 0.9,
            ease: [0.16, 1, 0.3, 1],
          }}
        />
      </div>
      <div className="tl-items">
        {items.map((it, i) => (
          <motion.div
            key={i}
            className="tl-item"
            initial={isStatic || reduce ? false : { opacity: 0, x: -14 }}
            animate={inView ? { opacity: 1, x: 0 } : undefined}
            transition={{
              delay: 0.15 + i * 0.12,
              duration: isStatic || reduce ? 0 : 0.5,
              ease: [0.16, 1, 0.3, 1],
            }}
          >
            <span className="tl-dot" />
            <div className="tl-content">
              <span className="chip tl-time">{it.time}</span>
              <h3>{it.title}</h3>
              {it.body && <p>{it.body}</p>}
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
