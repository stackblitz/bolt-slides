import type { CSSProperties } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Slide from '../../deck/Slide';
import Reveal from '../../deck/Reveal';
import { useDeck } from '../../deck/DeckContext';
import { Kicker, n } from './ui';
import Escalier from './escalier';

/* Capsules « La carte des espèces d'IA » (s1-e25) and « L'échelle » (s1-e26). */

const center: CSSProperties = { textAlign: 'center', marginInline: 'auto' };
const small: CSSProperties = { fontSize: 'clamp(13px, 1.2vw, 17px)', color: 'var(--fg-muted)', lineHeight: 1.4 };
const ease = [0.16, 1, 0.3, 1] as const;

/* ── s1-e25 · the species map (piste C retained) ──────────────────────
   Centre = the whole parcours, ring = one séance each, dashed edge = glimpsed only. */
type Species = { name: string; phrase: string; example: string; tag: string; kind: 'core' | 'peek' | 'seance' };
const SPECIES: Species[] = [
  { name: 'IA générative', phrase: 'Produit du contenu à la demande', example: 'ChatGPT qui rédige votre courriel', tag: 'Tout le parcours', kind: 'core' },
  { name: 'IA prédictive', phrase: 'Classe et prédit à partir de données', example: 'La détection de fraude de votre banque', tag: 'Aperçu seulement', kind: 'peek' },
  { name: 'Vision numérique', phrase: '« Voit » et interprète images et documents', example: 'L’outil qui lit une facture numérisée', tag: 'Séance 3 · fichiers', kind: 'seance' },
  { name: 'Automatisation', phrase: 'Enchaîne des étapes selon des règles, sans IA', example: '« Quand un courriel arrive, classe-le dans ce dossier »', tag: 'Séance 5', kind: 'seance' },
  { name: 'Copilote / assistant', phrase: 'Une IA configurée pour vous épauler dans UN contexte', example: 'Votre assistant « préparation de soumissions »', tag: 'Séance 3 · à bâtir', kind: 'seance' },
  { name: 'Agent', phrase: 'Une IA qui agit : elle enchaîne des actions au lieu de seulement répondre', example: 'Il lit la demande, prépare le brouillon, crée le suivi', tag: 'Séance 5', kind: 'seance' },
];
const ISLANDS: { s: Species; x: number; y: number; w: number }[] = [
  { s: SPECIES[0], x: 50, y: 47, w: 30 },
  { s: SPECIES[2], x: 16, y: 20, w: 30 },
  { s: SPECIES[4], x: 84, y: 20, w: 30 },
  { s: SPECIES[3], x: 16, y: 76, w: 30 },
  { s: SPECIES[5], x: 84, y: 76, w: 30 },
  { s: SPECIES[1], x: 50, y: 11, w: 34 },
];

function useEnter(delay: number) {
  const { isStatic } = useDeck();
  const reduce = useReducedMotion();
  return {
    initial: isStatic || reduce ? false : { opacity: 0, scale: 0.94 },
    animate: { opacity: 1, scale: 1 },
    transition: { duration: 0.5, delay, ease },
  } as const;
}

function Island({ s, x, y, w, i }: { s: Species; x: number; y: number; w: number; i: number }) {
  const core = s.kind === 'core';
  const peek = s.kind === 'peek';
  return (
    <motion.div
      {...useEnter(0.1 + i * 0.1)}
      style={{
        position: 'absolute',
        left: `${x}%`,
        top: `${y}%`,
        width: `${w}%`,
        translateX: '-50%',
        translateY: '-50%',
        padding: 'clamp(10px, 1.3vw, 18px)',
        borderRadius: '42% 58% 48% 52% / 55% 45% 55% 45%',
        background: core ? 'var(--accent)' : peek ? 'transparent' : 'var(--surface)',
        color: core ? 'var(--accent-ink)' : 'var(--fg)',
        border: peek ? '2px dashed var(--fg-faint)' : core ? 'none' : '1px solid var(--hair)',
        boxShadow: core ? 'var(--glow)' : 'var(--shadow)',
        textAlign: 'center',
        display: 'grid',
        gap: 3,
        justifyItems: 'center',
      }}
    >
      <span className="chip" style={core ? { background: 'var(--accent-ink)', color: 'var(--accent)' } : undefined}>
        {s.tag}
      </span>
      <strong style={{ font: `700 ${core ? 'clamp(18px, 2vw, 28px)' : 'clamp(15px, 1.4vw, 20px)'} var(--font-head)` }}>
        {s.name}
      </strong>
      <span style={{ ...small, color: 'inherit', opacity: 0.85 }}>{s.phrase}</span>
      <span style={{ ...small, color: 'inherit', opacity: 0.7, fontStyle: 'italic', fontSize: 'clamp(12px, 1.05vw, 15px)' }}>
        {s.example}
      </span>
    </motion.div>
  );
}

/* Séance 4 is not a species: a landmark (a signpost on the outer ring), not an island.
   Text only from the brief: « le retrouver dans vos outils », level 3 in demonstration,
   other forms glimpsed (présentations, transcription de réunions). */
function Seance4() {
  return (
    <motion.div
      {...useEnter(0.75)}
      style={{
        position: 'absolute',
        left: '50%',
        top: '85%',
        width: '36%',
        translateX: '-50%',
        translateY: '-50%',
        display: 'grid',
        justifyItems: 'center',
        gap: 4,
        padding: 'clamp(6px, 0.8vw, 10px) clamp(10px, 1.2vw, 16px)',
        borderRadius: 'var(--radius-sm)',
        background: 'var(--bg)',
        border: '2px solid var(--accent)',
        textAlign: 'center',
      }}
    >
      <span className="kicker" style={{ color: 'var(--accent)' }}>
        Repère · Séance 4
      </span>
      <strong style={{ font: '700 clamp(15px, 1.4vw, 20px) var(--font-head)' }}>Le retrouver dans vos outils</strong>
      <span style={{ ...small, color: 'var(--fg)', fontSize: 'clamp(12px, 1.05vw, 15px)' }}>
        L’assistant qui agit, en démonstration · autres formes : présentations, transcription de réunions
      </span>
    </motion.div>
  );
}

/* ── s1-e26 · the ladder (piste C retained, reworked) ─────────────────
   An oblique-projection staircase drawn flat: fronts are untransformed (crisp text), lids and
   sides are 2D skews painted in order, so there is no preserve-3d and nothing to z-fight.
   The 3D is in the entrance: the picture swings in once (≤ 1 s) and ends on transform: none. */
type Level = { n: number; name: string; what: string; where: string };
const LEVELS: Level[] = [
  { n: 0, name: 'Sans IA', what: 'Procédure, outil déjà payé, règle simple', where: 'Séance 5' },
  { n: 1, name: 'Le chat', what: 'L’outil tel quel, vous relisez', where: 'Séances 1 et 2' },
  { n: 2, name: 'L’assistant', what: 'Il connaît votre matière', where: 'Séances 3 et 4' },
  { n: 3, name: 'L’assistant qui agit', what: 'Connecté à vos outils, il exécute', where: 'Séance 4, en démonstration' },
  { n: 4, name: 'Le projet structurant', what: 'Processus revu, sur mesure', where: 'Séance 5' },
];

export default [
  /* s1-e25 */
  <Slide
    key="s1-e25"
    nav="Espèces d’IA"
    notes={n(
      'Six espèces d’IA, dont une non-IA (l’automatisation), chacune avec sa séance.',
      'Bonne première question : « laquelle ? ».',
      'Assistant et agent se rangent sur l’échelle qui suit : assistant = niveau 2, agent = niveau 3.'
    )}
  >
    <Reveal style={{ display: 'grid', justifyItems: 'center' }}>
      <Kicker step={5} />
      <h2 className="headline" style={center}>
        La carte des espèces d’IA
      </h2>
    </Reveal>
    <div style={{ position: 'relative', height: 'clamp(300px, 45vh, 520px)', marginTop: 'clamp(12px, 2.5vh, 28px)' }}>
      {[
        [44, 'var(--accent-soft)', 'solid'],
        [96, 'transparent', 'dashed'],
      ].map(([size, bg, style]) => (
        <div
          key={String(size)}
          aria-hidden
          style={{
            position: 'absolute',
            left: '50%',
            top: '50%',
            width: `${size}%`,
            height: `${Number(size) * 1.05}%`,
            transform: 'translate(-50%, -50%)',
            borderRadius: '50%',
            background: String(bg),
            border: `2px ${style} var(--hair)`,
          }}
        />
      ))}
      {ISLANDS.map((it, i) => (
        <Island key={it.s.name} {...it} i={i} />
      ))}
      <Seance4 />
    </div>
    <p className="lead" style={{ ...center, marginTop: 'clamp(12px, 2.5vh, 26px)', marginBottom: 'clamp(24px, 5vh, 48px)', maxWidth: '62ch' }}>
      « On devrait mettre de l’IA là-dessus » ? Première question : <strong className="accent-text">laquelle ?</strong>{' '}
      Bien des déceptions viennent d’avoir pris une espèce pour une autre.
    </p>
  </Slide>,

  /* s1-e26 */
  <Slide
    key="s1-e26"
    nav="L’échelle"
    notes={n(
      'Cinq niveaux, on gravit du bas vers le haut ; le niveau 0 est souvent la bonne réponse.',
      'Exemple à l’oral : préparer une soumission, monter les cinq barreaux.',
      'L’inventaire qui suit demande un niveau estimé par ligne.'
    )}
  >
    <Reveal>
      <div className="kicker" style={{ ...center, marginBottom: 10 }}>
        Cinq niveaux, du chat au projet
      </div>
      <h2 className="headline" style={center}>
        L’échelle
      </h2>
    </Reveal>
    <Escalier marches={LEVELS} lit={4} />
    {/* bottom margin keeps the rule clear of the deck's dock (fixed, bottom 22px) */}
    <p className="lead" style={{ ...center, marginTop: 'clamp(14px, 2.5vh, 24px)', marginBottom: 'clamp(32px, 5vh, 56px)', maxWidth: '62ch' }}>
      On monte d’un niveau quand le précédent a prouvé quelque chose, jamais parce qu’il a déçu. À chaque idée, une seule
      question : <strong className="accent-text">à quel niveau ça se joue ?</strong>
    </p>
  </Slide>,
];
