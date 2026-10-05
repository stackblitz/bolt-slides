import { lazy, Suspense } from 'react';
import type { ComponentType } from 'react';

/* One deck per folder in src/decks/<id>/index.tsx, picked by the first path
   segment (/fb-s1/ → src/decks/fb-s1). The path, not a ?query, because the
   presenter tab is opened as pathname + '?presenter=1' and keeps only that. */
const decks = import.meta.glob<{ default: ComponentType }>('./decks/*/index.tsx');
const id = window.location.pathname.split('/').filter(Boolean)[0] || 's2-gc';
const load = decks[`./decks/${id}/index.tsx`];
const Deck = load ? lazy(load) : null;

export default function App() {
  if (!Deck)
    return (
      <p style={{ padding: 40 }}>
        Unknown deck « {id} ». Decks: {Object.keys(decks).map((k) => k.split('/')[2]).join(', ')}
      </p>
    );
  return (
    <Suspense fallback={null}>
      <Deck />
    </Suspense>
  );
}
