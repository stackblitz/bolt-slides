import { Children, useEffect, useState } from 'react';
import type { ReactNode } from 'react';
import { useDeck } from '../deck/DeckContext';

/* Storyboard variants (D122): a screen marked « à explorer » renders 2–3
   candidate treatments, one per piste. Press V on the live slide to cycle;
   the choice is kept per screen id in localStorage (shared with the
   presenter tab). Once Aurélien picks, the losing variants are deleted and
   the winner is inlined: <Variants> never ships in a final deck. */
export function Variant({ children }: { label: string; children: ReactNode }) {
  return <>{children}</>;
}

const key = (id: string) => `deck:variant:${id}`;
const read = (id: string) => {
  try {
    return Number(localStorage.getItem(key(id))) || 0;
  } catch {
    return 0;
  }
};

export default function Variants({ id, children }: { id: string; children: ReactNode }) {
  const items = Children.toArray(children) as { props: { label: string } }[];
  const { isStatic } = useDeck();
  const [i, setI] = useState(() => read(id) % items.length);

  useEffect(() => {
    const onStorage = (e: StorageEvent) => e.key === key(id) && setI(read(id) % items.length);
    window.addEventListener('storage', onStorage);
    if (isStatic) return () => window.removeEventListener('storage', onStorage);
    const onKey = (e: KeyboardEvent) => {
      if (e.key !== 'v' || e.metaKey || e.ctrlKey || e.target instanceof HTMLInputElement) return;
      setI((c) => {
        const n = (c + 1) % items.length;
        try {
          localStorage.setItem(key(id), String(n));
        } catch {
          /* private mode: the choice just isn't remembered */
        }
        return n;
      });
    };
    window.addEventListener('keydown', onKey);
    return () => {
      window.removeEventListener('storage', onStorage);
      window.removeEventListener('keydown', onKey);
    };
  }, [id, isStatic, items.length]);

  return (
    <>
      {/* ponytail: switching variants keeps the larger click count the engine
          already registered for this slide; reload the slide if a build is skipped. */}
      <div key={i} style={{ display: 'contents' }}>
        {items[i] as ReactNode}
      </div>
      {!isStatic && (
        <div
          aria-live="polite"
          style={{
            position: 'fixed',
            top: 12,
            right: 12,
            zIndex: 50,
            padding: '4px 10px',
            borderRadius: 999,
            font: '600 12px/1.6 var(--font-body)',
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
          }}
        >
          {id} · {items[i].props.label} ({i + 1}/{items.length}) · V
        </div>
      )}
    </>
  );
}
