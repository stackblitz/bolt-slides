import type { CSSProperties, ReactNode } from 'react';

/* Shared pieces of the Formabois S1 deck. Capsule files import from here so
   every screen speaks the same visual language. */

/** The day's path (s1-e04 « Le chemin d'aujourd'hui »), no durations on screen (D115). */
export const JOUR = [
  'Accueil',
  'Pourquoi vous êtes ici',
  'La magie et le raté',
  'Générative vs traditionnelle',
  'À quoi ça sert',
  'Espèces et échelle',
  'Les limites',
  "L'inventaire des irritants",
] as const;

/** Surtitre of a capsule's first screen: capsule name + the day's path, current step lit
    (deck-wide rule of the storyboard: capsule title screens are out). */
export function Kicker({ step, children }: { step: number; children?: ReactNode }) {
  return (
    <div style={{ display: 'grid', gap: 10, justifyItems: 'inherit', marginBottom: 'clamp(16px, 3vh, 32px)' }}>
      <div style={{ display: 'flex', gap: 6 }} aria-hidden>
        {JOUR.map((_, i) => (
          <span
            key={i}
            style={{
              width: i === step ? 28 : 10,
              height: 6,
              borderRadius: 3,
              background: i === step ? 'var(--accent)' : i < step ? 'var(--fg-faint)' : 'var(--hair)',
            }}
          />
        ))}
      </div>
      <span className="kicker">{children ?? JOUR[step]}</span>
    </div>
  );
}

export const card: CSSProperties = {
  background: 'var(--surface)',
  border: '1px solid var(--hair)',
  borderRadius: 'var(--radius)',
  padding: 'clamp(16px, 2vw, 26px)',
  textAlign: 'left',
};

export const source: CSSProperties = {
  fontSize: 'clamp(11px, 1vw, 13px)',
  color: 'var(--fg-faint)',
  marginTop: 'clamp(12px, 2vh, 24px)',
};

/** Facilitator notes: bullets → the presenter's text. */
export const n = (...bullets: string[]) => bullets.map((b) => '• ' + b).join('\n');
