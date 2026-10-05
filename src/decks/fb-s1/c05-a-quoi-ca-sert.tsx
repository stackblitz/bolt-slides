import type { CSSProperties, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Slide from '../../deck/Slide';
import Build from '../../deck/Build';
import Reveal from '../../deck/Reveal';
import { useDeck } from '../../deck/DeckContext';
import Prompt from '../../components/Prompt';
import { Kicker, n } from './ui';

/* Pause (s1-e20) + capsule « À quoi ça sert » (s1-e21 → s1-e24). */

const center: CSSProperties = { textAlign: 'center', marginInline: 'auto' };
const small: CSSProperties = { fontSize: 'clamp(14px, 1.3vw, 18px)', color: 'var(--fg-muted)', lineHeight: 1.45 };

/* ── s1-e21 · six forms, drawn as plain stroke pictograms ─────────── */
const FORMS: { label: string; d: string }[] = [
  { label: 'Texte', d: 'M5 6h14M5 10h14M5 14h10M5 18h12' },
  { label: 'Image', d: 'M4 5h16v14H4zM4 16l5-5 4 4 3-3 4 4M15.5 9.5h.01' },
  { label: 'Code', d: 'M9 7l-5 5 5 5M15 7l5 5-5 5M13 5l-2 14' },
  { label: '3D', d: 'M12 3l8 4.5v9L12 21l-8-4.5v-9zM12 12l8-4.5M12 12L4 7.5M12 12v9' },
  { label: 'Audio', d: 'M4 12h2M8 8v8M12 4v16M16 8v8M20 11v2' },
  { label: 'Vidéo', d: 'M3 6h13v12H3zM16 10l5-3v10l-5-3' },
];

function Pictogram({ d, lit, i }: { d: string; lit: boolean; i: number }) {
  const { isStatic } = useDeck();
  const reduce = useReducedMotion();
  return (
    <motion.svg
      viewBox="0 0 24 24"
      width="100%"
      fill="none"
      strokeWidth={1.6}
      strokeLinecap="round"
      strokeLinejoin="round"
      style={{ stroke: lit ? 'var(--accent)' : 'var(--fg)', maxWidth: 96 }}
      initial={isStatic || reduce ? false : { opacity: 1 }}
      animate={{ opacity: lit ? 1 : 0.28 }}
      // all six show, then the five others pale while « texte » stays lit
      transition={{ duration: 0.8, delay: 0.9 + i * 0.08 }}
      aria-hidden
    >
      <path d={d} />
    </motion.svg>
  );
}

/* ── s1-e23 · one line icon per family: pen, bar chart, magnifier ─── */
const FAMILY_ICONS = [
  ['Génération', 'M4 20l4-1 11-11-3-3L5 16zM14 7l3 3'],
  ['Analyse', 'M4 20h16M7 16v-4M12 16V7M17 16v-7'],
  ['Recherche', 'M10.5 17a6.5 6.5 0 100-13 6.5 6.5 0 000 13zM15.5 15.5L20 20'],
] as const;
const FamilyIcon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width={40} height={40} fill="none" stroke="currentColor" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

/* ── s1-e22 · the three families, the screen's own wording ────────── */
type Family = { title: string; short: string; prompt: string };
const FAMILIES: Family[] = [
  {
    title: 'Générer et réécrire',
    short: 'Produire un premier jet ou transformer un texte.',
    prompt: 'Écris la réponse à ce client mécontent, ferme mais courtoise.',
  },
  {
    title: 'Analyser, synthétiser, raisonner',
    short: 'Digérer de la matière existante.',
    prompt: 'Voici trois soumissions de fournisseurs : fais-moi un tableau comparatif.',
  },
  {
    title: 'Chercher du savoir',
    short: 'Se faire expliquer, apprendre, explorer — et vérifier tout fait précis.',
    prompt: 'Explique-moi ce qu’est un profil colorimétrique, comme à quelqu’un qui débute.',
  },
];
const COMBINE = (
  <>
    <strong>Les trois se combinent</strong> : analyser une demande, puis générer la réponse, en s’étant fait
    expliquer le vocabulaire au passage.
  </>
);

function FamiliesHead() {
  return (
    <Reveal>
      <div className="kicker" style={{ ...center, marginBottom: 10 }}>
        Une notion : la famille d’usages
      </div>
      <h2 className="headline" style={center}>
        Trois familles d’usages
      </h2>
    </Reveal>
  );
}

/* Venn of the three families; the last click traces analyser → chercher → générer. */
function Venn() {
  const { clicks, isStatic } = useDeck();
  const traced = isStatic || clicks >= 1;
  const circles = [
    { cx: 150, cy: 120, label: 'Générer', color: 'var(--accent)' },
    { cx: 250, cy: 120, label: 'Analyser', color: 'var(--gold)' },
    { cx: 200, cy: 205, label: 'Chercher', color: 'var(--fg-muted)' },
  ];
  return (
    <svg viewBox="0 0 400 330" width="100%" style={{ maxWidth: 520, display: 'block', marginInline: 'auto' }} aria-hidden>
      {circles.map((c) => (
        <circle
          key={c.label}
          cx={c.cx}
          cy={c.cy}
          r={95}
          style={{ fill: `color-mix(in srgb, ${c.color} 12%, transparent)`, stroke: c.color, strokeWidth: 2 }}
        />
      ))}
      {circles.map((c, i) => (
        <text
          key={c.label}
          x={c.cx + [-38, 38, 0][i]}
          y={c.cy + [-28, -28, 52][i]}
          textAnchor="middle"
          style={{ fill: c.color, font: '700 22px var(--font-head)' }}
        >
          {c.label}
        </text>
      ))}
      {/* analyser the request → have the vocabulary explained → generate the answer */}
      <motion.path
        d="M 285 140 C 290 230, 220 260, 200 235 C 180 210, 140 200, 130 140"
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
        style={{ stroke: 'var(--accent)' }}
        initial={false}
        animate={{ pathLength: traced ? 1 : 0, opacity: traced ? 1 : 0 }}
        transition={{ duration: isStatic ? 0 : 1.8, ease: 'easeInOut' }}
      />
      <motion.path
        d="M 122 152 L 130 140 L 140 151"
        fill="none"
        strokeWidth={4}
        strokeLinecap="round"
        strokeLinejoin="round"
        style={{ stroke: 'var(--accent)' }}
        initial={false}
        animate={{ opacity: traced ? 1 : 0 }}
        transition={{ duration: 0.3, delay: isStatic ? 0 : traced ? 1.7 : 0 }}
      />
    </svg>
  );
}

export default [
  /* s1-e20 */
  <Slide key="s1-e20" center nav="Pause" notes={n('Aucun minuteur à l’écran.', 'Annoncer l’heure du retour dans le clavardage.')}>
    <Reveal>
      <p className="display" style={{ fontSize: 'clamp(96px, 16vw, 220px)', lineHeight: 1, color: 'var(--accent)' }}>
        Pause
      </p>
      <p className="lead" style={{ ...center, marginTop: 'clamp(20px, 4vh, 40px)', maxWidth: '40ch' }}>
        Caméras et micros peuvent rester fermés.
      </p>
      <p style={{ ...small, ...center, marginTop: 10 }}>L’heure du retour est annoncée dans le clavardage.</p>
    </Reveal>
  </Slide>,

  /* s1-e21 */
  <Slide
    key="s1-e21"
    center
    nav="Six formes"
    notes={n(
      'Six formes : texte, image, code, 3D, audio, vidéo.',
      'Ce parcours travaille surtout le texte ; les autres sont seulement aperçues en séance 4.'
    )}
  >
    <div style={{ display: 'grid', justifyItems: 'center' }}>
      <Kicker step={4} />
    </div>
    <h2 className="headline" style={center}>
      Six formes de contenu
    </h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(110px, 30%), 1fr))',
        gap: 'clamp(16px, 3vw, 40px)',
        maxWidth: 1000,
        marginInline: 'auto',
        marginTop: 'clamp(28px, 5vh, 56px)',
      }}
    >
      {FORMS.map((f, i) => (
        <div key={f.label} style={{ display: 'grid', justifyItems: 'center', gap: 12 }}>
          <Pictogram d={f.d} lit={i === 0} i={i} />
          <span
            style={{
              font: '600 clamp(16px, 1.6vw, 22px) var(--font-head)',
              color: i === 0 ? 'var(--accent)' : 'var(--fg-faint)',
            }}
          >
            {f.label}
          </span>
        </div>
      ))}
    </div>
    <p className="lead" style={{ ...center, marginTop: 'clamp(28px, 5vh, 56px)', maxWidth: '44ch' }}>
      On travaille surtout le <strong className="accent-text">texte</strong>, là où se joue l’essentiel de votre
      quotidien.
    </p>
    <Build at={1}>
      <p style={{ ...small, ...center, marginTop: 14, maxWidth: '56ch' }}>
        Les autres existent : vous en verrez à la séance 4 (présentations, transcription de réunions).
      </p>
    </Build>
  </Slide>,

  /* s1-e22 */
  <Slide
    key="s1-e22"
    nav="Trois familles"
    notes={n(
      'Tout ce qu’on demande à l’IA tient dans ces trois familles.',
      'Une tâche réelle les enchaîne souvent : analyser la demande, se faire expliquer le vocabulaire, générer la réponse.'
    )}
  >
    <FamiliesHead />
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(360px, 100%), 1fr))',
        gap: 'clamp(16px, 3vw, 40px)',
        alignItems: 'center',
        marginTop: 'clamp(12px, 2vh, 24px)',
      }}
    >
      <Venn />
      <div style={{ display: 'grid', gap: 14 }}>
        {FAMILIES.map((f) => (
          <div key={f.title} style={{ display: 'grid', gap: 6 }}>
            <h3 style={{ fontSize: 'clamp(17px, 1.6vw, 22px)' }}>{f.title}</h3>
            <p style={small}>{f.short}</p>
            <Prompt label="Exemple" size="sm">
              {f.prompt}
            </Prompt>
          </div>
        ))}
      </div>
    </div>
    <Build at={1}>
      <p className="lead" style={{ ...center, marginTop: 'clamp(10px, 2vh, 20px)', maxWidth: '60ch' }}>
        {COMBINE}
      </p>
    </Build>
  </Slide>,

  /* s1-e23 */
  <Slide
    key="s1-e23"
    center
    nav="Réflexion ensemble"
    notes={n(
      'En plénière, pas en binôme : prendre une tâche, la mettre à l’écran, le groupe dit sa famille.',
      'Le désaccord est le but : une tâche réelle en combine souvent deux.',
      'Règle de rythme : jamais plus de cinq minutes de théorie sans que le groupe fasse quelque chose.'
    )}
  >
    <Reveal>
      <div className="kicker" style={{ marginBottom: 12 }}>
        Petite réflexion ensemble
      </div>
      <p className="lead" style={{ ...center, maxWidth: '52ch' }}>
        Qui a une tâche en tête ? Une vraie, celle qui vous a occupé cette semaine. On la met à l’écran.
      </p>
      <h2 className="headline" style={{ ...center, marginTop: 'clamp(18px, 3vh, 30px)', maxWidth: '22ch' }}>
        Génération, analyse, recherche — <span className="accent-text">ou deux à la fois ?</span>
      </h2>
    </Reveal>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(220px, 100%), 1fr))',
        gap: 'clamp(12px, 2vw, 22px)',
        maxWidth: 960,
        marginInline: 'auto',
        marginTop: 'clamp(24px, 4vh, 44px)',
      }}
    >
      {FAMILY_ICONS.map(([l, d]) => (
        <div
          key={l}
          style={{
            border: '2px dashed var(--hair)',
            borderRadius: 'var(--radius)',
            padding: 'clamp(14px, 2vw, 22px)',
            minHeight: 'clamp(90px, 14vh, 150px)',
            textAlign: 'left',
          }}
        >
          <span style={{ display: 'flex', alignItems: 'center', gap: 12, color: 'var(--accent)' }}>
            <FamilyIcon d={d} />
            <span style={{ font: '600 clamp(17px, 1.7vw, 23px) var(--font-head)', color: 'var(--fg)' }}>{l}</span>
          </span>
        </div>
      ))}
    </div>
    <p style={{ ...small, ...center, marginTop: 'clamp(18px, 3vh, 28px)', maxWidth: '56ch' }}>
      Vous faites à peu près le même métier : la tâche d’un seul parle à tout le monde.
    </p>
  </Slide>,

  /* s1-e24 */
  <Slide
    key="s1-e24"
    center
    nav="Le bon réflexe"
    notes={n(
      'Traduire « est-ce que l’IA peut m’aider ? » en « génération, analyse ou recherche ? ».',
      'C’est presque toujours l’une des trois, donc la réponse est oui.'
    )}
  >
    <Reveal>
      <div className="kicker" style={{ marginBottom: 'clamp(20px, 4vh, 36px)' }}>
        Le bon réflexe
      </div>
    </Reveal>
    <Translate
      from="Est-ce que l’IA peut m’aider là-dessus ?"
      to={
        <>
          Génération, analyse <span style={{ whiteSpace: 'nowrap' }}>ou recherche ?</span>
        </>
      }
    />
    <p className="lead" style={{ ...center, marginTop: 'clamp(24px, 4vh, 44px)', maxWidth: '50ch' }}>
      Si c’est l’une des trois, et c’est presque toujours le cas, <strong>la réponse est oui</strong>.
    </p>
    <Build at={1}>
      <p style={{ ...small, ...center, marginTop: 14 }}>
        L’inventaire qui suit va le prouver sur <strong style={{ color: 'var(--fg)' }}>vos</strong> tâches.
      </p>
    </Build>
  </Slide>,
];

/* « question » → « translated question », the arrow drawing itself once on enter. */
function Translate({ from, to }: { from: string; to: ReactNode }) {
  const { isStatic } = useDeck();
  const reduce = useReducedMotion();
  const still = isStatic || !!reduce;
  const quote: CSSProperties = {
    font: '600 clamp(22px, 3vw, 42px)/1.2 var(--font-head)',
    maxWidth: '16ch',
    textAlign: 'center',
  };
  return (
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 'clamp(16px, 3vw, 40px)',
      }}
    >
      <p style={{ ...quote, color: 'var(--fg-muted)' }}>« {from} »</p>
      <svg viewBox="0 0 120 40" fill="none" aria-hidden style={{ flexShrink: 0, width: 'clamp(70px, 9vw, 120px)' }}>
        <motion.path
          d="M4 20 H108 M94 8 L110 20 L94 32"
          strokeWidth={4}
          strokeLinecap="round"
          strokeLinejoin="round"
          style={{ stroke: 'var(--accent)' }}
          initial={still ? false : { pathLength: 0 }}
          animate={{ pathLength: 1 }}
          transition={{ duration: 1.2, delay: 0.5, ease: 'easeInOut' }}
        />
      </svg>
      <p style={{ ...quote, color: 'var(--accent)' }}>« {to} »</p>
    </div>
  );
}
