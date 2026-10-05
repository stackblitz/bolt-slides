import { useEffect, useState } from 'react';

/* Slide review (dev only, R or the dock button): a decision and a note per
   screen id, saved to src/decks/<deck>/revue.json through the dev server.
   Claude reads that file on « applique la revue », does the work and sets
   `fait: true`; a new note on the same screen reopens it. */
export type Decision = 'ok' | 'modifier' | 'retirer';
export type Entry = { slide: number; decision: Decision; note: string; fait: boolean; maj: string };
type Revue = Record<string, Entry>;

const deck = window.location.pathname.split('/').filter(Boolean)[0] || 's2-gc';
const url = `/__review?deck=${deck}`;
const LABELS: Record<Decision, string> = { ok: 'OK', modifier: 'Modifier', retirer: 'Retirer' };

export default function Review({ id, slide, onClose }: { id: string; slide: number; onClose: () => void }) {
  const [revue, setRevue] = useState<Revue>({});
  const [decision, setDecision] = useState<Decision>('ok');
  const [note, setNote] = useState('');
  const [etat, setEtat] = useState<'' | 'enregistré' | 'erreur'>('');

  useEffect(() => {
    fetch(url)
      .then((r) => r.json() as Promise<Revue>)
      .then((r) => {
        setRevue(r);
        setDecision(r[id]?.decision ?? 'ok');
        setNote(r[id]?.note ?? '');
        setEtat('');
      })
      .catch(() => setEtat('erreur'));
  }, [id]);

  const save = async () => {
    const next = { ...revue, [id]: { slide: slide + 1, decision, note, fait: false, maj: new Date().toISOString() } };
    const r = await fetch(url, { method: 'POST', body: JSON.stringify(next) }).catch(() => null);
    if (r?.ok) setRevue(next);
    setEtat(r?.ok ? 'enregistré' : 'erreur');
  };

  const e = revue[id];
  const ouvertes = Object.values(revue).filter((x) => !x.fait && x.decision !== 'ok').length;

  return (
    <div
      role="dialog"
      aria-label={`Revue de ${id}`}
      onKeyDown={(k) => {
        k.stopPropagation();
        if (k.key === 'Escape') onClose();
        if (k.key === 'Enter' && (k.metaKey || k.ctrlKey)) save();
      }}
      style={{
        position: 'fixed',
        right: 16,
        bottom: 88,
        zIndex: 60,
        width: 'min(360px, calc(100vw - 32px))',
        display: 'grid',
        gap: 10,
        padding: 16,
        borderRadius: 'var(--radius-sm)',
        background: 'var(--surface)',
        border: '1px solid var(--hair)',
        boxShadow: 'var(--shadow)',
        color: 'var(--fg)',
        font: '14px/1.4 var(--font-body)',
      }}
    >
      <div style={{ display: 'flex', justifyContent: 'space-between', gap: 8 }}>
        <strong>
          Revue · {id} <span style={{ color: 'var(--fg-muted)', fontWeight: 400 }}>(slide {slide + 1})</span>
        </strong>
        <button type="button" onClick={onClose} aria-label="Fermer la revue" style={btn(false)}>
          ✕
        </button>
      </div>
      {e?.fait && <span style={{ color: 'var(--fg-muted)' }}>Traité par Claude — une nouvelle note rouvre l'écran.</span>}
      <div role="radiogroup" aria-label="Décision" style={{ display: 'flex', gap: 6 }}>
        {(Object.keys(LABELS) as Decision[]).map((d) => (
          <button key={d} type="button" role="radio" aria-checked={decision === d} onClick={() => setDecision(d)} style={btn(decision === d)}>
            {LABELS[d]}
          </button>
        ))}
      </div>
      <textarea
        autoFocus
        rows={4}
        value={note}
        onChange={(t) => setNote(t.target.value)}
        placeholder="Ce qu'il faut changer sur ce slide…"
        style={{
          resize: 'vertical',
          padding: 10,
          borderRadius: 8,
          border: '1px solid var(--hair)',
          background: 'var(--bg)',
          color: 'var(--fg)',
          font: 'inherit',
        }}
      />
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', gap: 8 }}>
        <span style={{ color: 'var(--fg-muted)', fontSize: 12 }} aria-live="polite">
          {etat || `${ouvertes} écran${ouvertes > 1 ? 's' : ''} à traiter`}
        </span>
        <button type="button" onClick={save} style={btn(true)}>
          Enregistrer ⌘↵
        </button>
      </div>
    </div>
  );
}

const btn = (on: boolean) => ({
  padding: '6px 12px',
  borderRadius: 999,
  border: '1px solid var(--hair)',
  background: on ? 'var(--primary)' : 'transparent',
  color: on ? 'var(--accent-ink)' : 'var(--fg)',
  font: '600 13px/1.4 var(--font-body)',
  cursor: 'pointer',
});
