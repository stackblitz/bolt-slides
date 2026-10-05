import type { CSSProperties, ReactNode } from 'react';
import Slide from '../../deck/Slide';
import Build from '../../deck/Build';
import Reveal from '../../deck/Reveal';
import { Kicker, n } from './ui';

/* Capsule « Vivre la magie… et le raté » — s1-e09, s1-e10. s1-e10 echoes s1-e09's two frames. */

function Frames({ left, right }: { left?: ReactNode; right?: ReactNode }) {
  const frame = (label: string, content: ReactNode, tone: string, delay: number) => (
    <Reveal delay={delay} style={{ display: 'grid', gap: 12 }}>
      <span className="kicker" style={{ textAlign: 'center' }}>{label}</span>
      <div
        style={{
          minHeight: 'clamp(200px, 34vh, 340px)',
          borderRadius: 'var(--radius)',
          border: content ? `2px solid ${tone}` : '2px dashed var(--hair)',
          background: 'var(--surface)',
          display: 'grid',
          placeItems: 'center',
          padding: content ? 'clamp(14px, 1.8vw, 24px)' : 0,
        }}
      >
        {content}
      </div>
    </Reveal>
  );
  return (
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))', gap: 'clamp(16px, 2.4vw, 32px)', width: '100%', maxWidth: 1100, marginInline: 'auto', marginTop: 'clamp(16px, 3vh, 32px)' }}>
      {frame('Sur un document réel', left, 'var(--accent)', 0.1)}
      {frame('Hors du document', right, 'var(--gold)', 0.22)}
    </div>
  );
}

/* s1-e10 — what went in, what came out: the document is why the magic worked, its absence why it missed. */
const small: CSSProperties = { fontSize: 'clamp(15px, 1.5vw, 20px)', lineHeight: 1.35 };

const Doc = ({ empty }: { empty?: boolean }) => (
  <svg viewBox="0 0 40 48" width={44} height={52} fill="none" strokeWidth={2.4} strokeLinecap="round" aria-hidden
    style={{ stroke: empty ? 'var(--fg-faint)' : 'var(--accent)', strokeDasharray: empty ? '4 4' : undefined }}>
    <path d="M6 3h20l8 8v34H6z" />
    {!empty && <path d="M12 18h16M12 25h16M12 32h11" />}
  </svg>
);

function Flow({ word, tone, soft, input, output, why }: { word: string; tone: string; soft: string; input: ReactNode; output: ReactNode; why: string }) {
  const box: CSSProperties = { borderRadius: 12, padding: 'clamp(10px, 1.2vw, 16px)', display: 'grid', gap: 8, alignContent: 'center', justifyItems: 'center', textAlign: 'center', height: '100%' };
  return (
    <div style={{ display: 'grid', gap: 'clamp(10px, 2vh, 18px)', width: '100%' }}>
      <span className="display" style={{ fontSize: 'clamp(40px, 5.6vw, 76px)', color: tone, textAlign: 'center', lineHeight: 1 }}>{word}</span>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', alignItems: 'stretch', gap: 'clamp(6px, 1vw, 12px)' }}>
        <div style={{ ...box, border: '1px solid var(--hair)' }}>{input}</div>
        <div style={{ display: 'grid', alignContent: 'center', justifyItems: 'center', gap: 4, color: 'var(--fg-muted)' }}>
          <span className="kicker" style={{ fontSize: 'clamp(10px, 0.9vw, 12px)' }}>le modèle</span>
          <svg viewBox="0 0 48 16" width={48} height={16} fill="none" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" aria-hidden style={{ stroke: tone }}>
            <path d="M2 8h42M36 2l8 6-8 6" />
          </svg>
        </div>
        <div style={{ ...box, background: soft }}>{output}</div>
      </div>
      <p style={{ ...small, fontWeight: 600, textAlign: 'center', color: 'var(--fg)' }}>{why}</p>
    </div>
  );
}

const MAGIE = (
  <Flow
    word="magie"
    tone="var(--accent)"
    soft="var(--accent-soft)"
    input={<><Doc /><span style={small}>Un document réel du secteur</span></>}
    output={<span style={small}><strong>Cinq pistes</strong> classées et datées,<br />puis <strong>un plan</strong> en trois étapes</span>}
    why="La connaissance était là : on la lui a donnée."
  />
);

const RATE = (
  <Flow
    word="raté"
    tone="var(--gold)"
    soft="var(--gold-soft)"
    input={<><Doc empty /><span style={{ ...small, color: 'var(--fg-muted)' }}>Aucun document<br />« Que dit la norme CSA Z-417 ? »</span></>}
    output={<span style={small}>Un contenu <strong>crédible</strong>, dit avec assurance… <strong style={{ color: 'var(--gold)' }}>et faux</strong></span>}
    why="Rien à lire : la connaissance est inventée."
  />
);

export default [
  /* s1-e09 */
  <Slide
    key="s1-e09"
    center
    nav="La magie et le raté"
    notes={n(
      'Acte 1 — la magie : conversation neuve, document public du secteur, cinq pistes classées et datées + plan en trois étapes. « Combien de temps ça vous aurait pris ? »',
      'Acte 2 — le raté : norme CSA Z-417, études fantômes, menu InDesign inexistant. Puis révéler.',
      'Acte 3 : « Pourquoi la même machine fait les deux ? » Hypothèses du groupe ; réponse à la capsule suivante.'
    )}
  >
    <Kicker step={2} />
    <h2 className="headline" style={{ marginInline: 'auto', maxWidth: '24ch' }}>Le même modèle, la même conversation</h2>
    <Frames />
    <p className="lead" style={{ marginTop: 'clamp(18px, 3.5vh, 32px)', maxWidth: '52ch' }}>
      D'un côté, cinq pistes et un plan ; de l'autre, un contenu crédible et faux. La seule différence, c'est ce qu'on lui demande.
    </p>
    <p className="chip" style={{ marginTop: 16, fontSize: 'clamp(12px, 1.2vw, 15px)' }}>Regardez l'écran partagé — rien à taper de votre côté</p>
  </Slide>,

  /* s1-e10 */
  <Slide
    key="s1-e10"
    center
    nav="Résultat cible"
    notes={n(
      "Les deux faces de la même machine, vues avant toute théorie : l'enthousiasme et la vigilance sur un pied d'égalité.",
      "« Pourquoi il ne dit pas qu'il ne sait pas ? » : garder pour la capsule générative vs traditionnelle."
    )}
  >
    <h2 className="headline" style={{ marginInline: 'auto', maxWidth: '30ch', fontSize: 'clamp(24px, 3.2vw, 40px)' }}>
      Les deux faces de la même machine, avant toute théorie
    </h2>
    <Frames left={MAGIE} right={RATE} />
    <p className="lead" style={{ marginTop: 'clamp(12px, 2.5vh, 24px)' }}>L'enthousiasme est légitime, la vigilance aussi.</p>
    <Build at={1} style={{ marginTop: 'clamp(8px, 1.5vh, 16px)' }}>
      <p style={{ fontFamily: 'var(--font-head)', fontWeight: 600, fontSize: 'clamp(24px, 3.2vw, 40px)', color: 'var(--fg)' }}>
        Personne n'oubliera la norme inventée.
      </p>
    </Build>
  </Slide>,
];
