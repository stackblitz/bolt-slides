import { useEffect, useRef } from 'react';
import { motion } from 'framer-motion';
import { useDeck } from '../deck/DeckContext';

/* A phone-frame texting conversation that reveals beat-by-beat on click —
   Couch's product surface IS a Messages thread, so the demo is the slide.
   Each beat is one advance (→ / space): messages drip in like a real
   exchange, a typing indicator holds a beat before Mia replies, and time
   separators mark the hours-later cadence. Thumbnails render the full
   final state. All colors come from the theme tokens. */

export type PhoneBeat =
  | { kind: 'sep'; text: string }
  | { kind: 'msg'; from: 'mia' | 'me'; text: string; tail?: boolean }
  | { kind: 'typing' }
  | { kind: 'status'; text: string };

function TypingDots() {
  return (
    <span className="pc-typing" aria-label="typing">
      <span />
      <span />
      <span />
    </span>
  );
}

export default function PhoneChat({ beats }: { beats: PhoneBeat[] }) {
  const { clicks, isStatic, registerMax } = useDeck();

  // one click per beat, except separators + statuses ride with the element
  // before/after them. Assign click indices: msg + typing each consume one.
  let click = 0;
  const timed = beats.map((b) => {
    if (b.kind === 'msg' || b.kind === 'typing') click += 1;
    return { beat: b, at: click };
  });
  const maxClicks = click;

  // typing indicators show only in their own window (hidden once passed);
  // everything else is cumulative. Register the click budget after render,
  // exactly like the engine's own <Build> does.
  useEffect(() => {
    if (!isStatic) registerMax?.(maxClicks);
  }, [isStatic, maxClicks, registerMax]);

  // keep the newest bubble in view when the thread is taller than the phone
  // (small screens) — exactly how a real Messages thread behaves.
  const bodyRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const el = bodyRef.current;
    if (!el) return;
    el.scrollTo({
      top: el.scrollHeight,
      behavior: isStatic ? 'auto' : 'smooth',
    });
  }, [clicks, isStatic]);

  return (
    <div className="pc-phone mat">
      <div className="pc-sbar" aria-hidden>
        <span>11:41 ☾</span>
        <span className="pc-sbar-right">
          <span className="pc-sig">
            <span />
            <span />
            <span />
            <span />
          </span>
          <span className="pc-batt">
            <i />
          </span>
        </span>
      </div>
      <div className="pc-notch" aria-hidden />
      <div className="pc-head">
        <span className="pc-ava" aria-hidden>
          M
        </span>
        <span className="pc-name">Mia ›</span>
      </div>
      <div className="pc-body" ref={bodyRef}>
        {timed.map(({ beat, at }, i) => {
          const shown = isStatic
            ? beat.kind !== 'typing'
            : beat.kind === 'typing'
            ? clicks === at
            : clicks >= at;
          if (beat.kind === 'typing') {
            if (!shown) return null;
            return (
              <motion.div
                key={i}
                className="pc-msg mia"
                initial={isStatic ? false : { opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
              >
                <TypingDots />
              </motion.div>
            );
          }
          if (!shown) return null;
          if (beat.kind === 'sep')
            return (
              <motion.div
                key={i}
                className="pc-sep"
                initial={isStatic ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                {beat.text}
              </motion.div>
            );
          if (beat.kind === 'status')
            return (
              <motion.div
                key={i}
                className="pc-status"
                initial={isStatic ? false : { opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.35 }}
              >
                {beat.text}
              </motion.div>
            );
          return (
            <motion.div
              key={i}
              className={'pc-msg ' + beat.from + (beat.tail ? ' tail' : '')}
              initial={isStatic ? false : { opacity: 0, y: 10, scale: 0.97 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            >
              {beat.text}
            </motion.div>
          );
        })}
      </div>
      <div className="pc-input" aria-hidden>
        <span>iMessage</span>
      </div>
    </div>
  );
}
