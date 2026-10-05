import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { useDeck } from '../../deck/DeckContext';

/* Five-step staircase drawn flat (oblique projection): fronts untransformed (crisp text), lids
   and sides are 2D skews painted in order — no preserve-3d, nothing to z-fight. The 3D lives in
   the entrance only (≤ 1 s, ends on transform: none). `lit` = the step in accent.
   Used by « L'échelle » and « Le parcours ». */
export type Marche = { n: number; name: string; what: string; where?: string };
const ease = [0.16, 1, 0.3, 1] as const;
const u = (k: number) => `calc(var(--u) * ${k})`;
const W = 24; // step width (u)
const D = 6; // drawn depth of lids and sides (u)
const HU = [17, 21, 25, 29, 40]; // step heights (u); level 4 taller

function Step({ l, i, top }: { l: Marche; i: number; top: boolean }) {
  const front = top ? 'var(--accent)' : 'var(--surface)';
  const lid = top ? 'color-mix(in srgb, var(--accent) 70%, var(--surface))' : 'var(--surface-2)';
  const side = top ? 'color-mix(in srgb, var(--accent) 75%, var(--fg))' : 'color-mix(in srgb, var(--fg) 12%, var(--surface))';
  const edge = top ? '1px solid var(--accent)' : '1px solid var(--hair)';
  const face: CSSProperties = { position: 'absolute', boxSizing: 'border-box', border: edge };
  return (
    <div style={{ position: 'absolute', left: u(W * i), bottom: 0, width: u(W), height: u(HU[i]) }}>
      {/* lid: skewed to the upper right; the next (taller) step, painted later, covers what it should */}
      <div
        aria-hidden
        style={{ ...face, left: 0, bottom: '100%', width: '100%', height: u(D), background: lid, transformOrigin: 'bottom left', transform: 'skewX(-45deg)' }}
      />
      {/* side: only the last step's stays visible */}
      <div
        aria-hidden
        style={{ ...face, left: '100%', top: 0, width: u(D), height: '100%', background: side, transformOrigin: 'top left', transform: 'skewY(-45deg)' }}
      />
      {/* front: flat, carries the text */}
      <div
        style={{
          ...face,
          inset: 0,
          background: front,
          color: top ? 'var(--accent-ink)' : 'var(--fg)',
          boxShadow: top ? 'var(--glow)' : 'none',
          padding: u(1.3),
          display: 'grid',
          alignContent: 'start',
          gap: u(0.5),
          textAlign: 'left',
        }}
      >
        <span style={{ font: `700 ${u(3.2)}/1 var(--font-head)`, opacity: top ? 1 : 0.5 }}>{l.n}</span>
        <span style={{ font: `700 ${u(2.4)}/1.1 var(--font-head)` }}>{l.name}</span>
        <span style={{ fontSize: u(1.85), lineHeight: 1.25, opacity: 0.85 }}>{l.what}</span>
        <span style={{ fontSize: u(1.55), lineHeight: 1.25, fontFamily: 'var(--font-mono)', opacity: 0.8 }}>{l.where}</span>
      </div>
    </div>
  );
}

export default function Escalier({ marches, lit }: { marches: Marche[]; lit: number }) {
  const { isStatic } = useDeck();
  const reduce = useReducedMotion();
  const still = isStatic || !!reduce;
  return (
    <div
      style={
        {
          '--u': 'min(1vh, 0.75vw)',
          perspective: 1400,
          display: 'grid',
          justifyItems: 'center',
          marginTop: u(D + 2),
        } as CSSProperties
      }
    >
      <motion.div
        initial={still ? false : { opacity: 0, rotateY: -28, rotateX: 8, y: 16 }}
        animate={{ opacity: 1, rotateY: 0, rotateX: 0, y: 0 }}
        transition={{ duration: 0.9, ease }}
        style={{ position: 'relative', width: u(W * 5 + D), height: u(HU[4]) }}
      >
        {marches.map((l, i) => (
          <Step key={l.n} l={l} i={i} top={i === lit} />
        ))}
      </motion.div>
    </div>
  );
}
