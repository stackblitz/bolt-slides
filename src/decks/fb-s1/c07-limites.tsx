import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import Slide from '../../deck/Slide';
import Build from '../../deck/Build';
import Reveal from '../../deck/Reveal';
import { useInView } from '../../deck/useInView';
import Accordion from '../../components/Accordion';
import { Kicker, card, source, n } from './ui';

/* Capsule « Les limites » — s1-e27 to s1-e31. */

const head: CSSProperties = { fontSize: 'clamp(28px, 3.8vw, 52px)', maxWidth: '24ch' };
const body: CSSProperties = { fontSize: 'clamp(17px, 1.7vw, 24px)', lineHeight: 1.45 };
const center: CSSProperties = { textAlign: 'center', marginInline: 'auto' };

/* s1-e27 — the three candidates and their probabilities, as the text gives them. */
const P = [
  { v: '7 ans', p: 0.42 },
  { v: '5 ans', p: 0.31 },
  { v: '10 ans', p: 0.18 },
] as const;
const fr = (p: number) => p.toFixed(2).replace('.', ',');

const BEFORE = 'Ce matériau convient à un usage extérieur, et tient';
const AFTER = 'avant de se dégrader.';

function Sentence({ slot }: { slot: ReactNode }) {
  return (
    <p
      style={{
        fontFamily: 'var(--font-head)',
        fontSize: 'clamp(26px, 3.6vw, 50px)',
        lineHeight: 1.25,
        maxWidth: '28ch',
        ...center,
      }}
    >
      « {BEFORE} {slot} {AFTER} »
    </p>
  );
}

const Gap = ({ children }: { children: ReactNode }) => (
  <span
    style={{
      color: 'var(--accent)',
      textDecoration: 'underline',
      textDecorationThickness: '0.08em',
      textUnderlineOffset: '0.15em',
    }}
  >
    {children}
  </span>
);

const Hallucination = () => (
  <p style={{ ...body, maxWidth: '50ch', ...center }}>
    Il lui manque une information ? Il la remplace par <strong>la version la plus probable</strong>, pas
    la vraie. C'est une <strong className="accent-text">hallucination</strong> : rien, dans la phrase, ne
    signale le trou. Le modèle ne ment pas : il complète.
  </p>
);

/* « L'or aux Olympiades contre l'horloge en appui » */
const Appui = () => (
  <div style={{ maxWidth: 820, marginInline: 'auto' }}>
    <div className="cols" style={{ gap: 14 }}>
      <div style={{ ...card, textAlign: 'center' }}>
        <div style={{ ...body, fontWeight: 600 }}>L'or aux Olympiades de mathématiques</div>
      </div>
      <div style={{ ...card, textAlign: 'center', background: 'var(--gold-soft)' }}>
        <div style={{ ...body, fontWeight: 600 }}>
          L'heure sur une horloge à aiguilles : une fois sur deux, et alors fausse d'une à trois heures
        </div>
      </div>
    </div>
    <p style={{ ...source, textAlign: 'center' }}>
      Le meilleur modèle de 2026 · Source : Stanford AI Index 2026, p. 71, 96 et 104.
    </p>
  </div>
);

/* « relancer » draws 7, 5 or 10 ans in the text's proportions (renormalised over the three). */
function Tirage() {
  const [last, setLast] = useState<string>(P[0].v);
  const [tally, setTally] = useState<Record<string, number>>({});
  const relancer = () => {
    const total = P.reduce((s, c) => s + c.p, 0);
    let r = Math.random() * total;
    const hit = P.find((c) => (r -= c.p) < 0) ?? P[0];
    setLast(hit.v);
    setTally((t) => ({ ...t, [hit.v]: (t[hit.v] ?? 0) + 1 }));
  };
  const max = Math.max(1, ...Object.values(tally));
  return (
    <>
      <Sentence slot={<Gap>{last}</Gap>} />
      <div style={{ display: 'flex', gap: 'clamp(14px, 3vw, 40px)', justifyContent: 'center', alignItems: 'center', flexWrap: 'wrap', marginTop: 'clamp(14px, 3vh, 30px)' }}>
        <button
          onClick={relancer}
          style={{
            font: '600 clamp(16px, 1.6vw, 22px)/1 var(--font-body)',
            padding: '14px 26px',
            borderRadius: 999,
            border: 'none',
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            cursor: 'pointer',
          }}
        >
          Relancer
        </button>
        {P.map((c) => (
          <div key={c.v} style={{ display: 'grid', gap: 6, minWidth: 110, textAlign: 'center' }}>
            <span style={{ ...body, fontWeight: 600, color: c.v === last ? 'var(--accent)' : 'var(--fg)' }}>
              {c.v} · {fr(c.p)}
            </span>
            <div style={{ height: 10, borderRadius: 5, background: 'var(--hair)', overflow: 'hidden' }}>
              <div style={{ height: '100%', width: `${((tally[c.v] ?? 0) / max) * 100}%`, background: 'var(--accent)', transition: 'width 0.5s' }} />
            </div>
            <span style={{ fontSize: 13, color: 'var(--fg-faint)' }}>{tally[c.v] ?? 0} tirage(s)</span>
          </div>
        ))}
      </div>
      <Build at={1} style={{ marginTop: 'clamp(12px, 3vh, 28px)' }}>
        <Hallucination />
      </Build>
      <Build at={2} style={{ marginTop: 'clamp(12px, 2.5vh, 24px)' }}>
        <Appui />
      </Build>
    </>
  );
}

/* s1-e28 — a 0–100 % range bar. */
function Range({ from, to, label, tone }: { from: number; to: number; label: string; tone: string }) {
  return (
    <div style={{ display: 'grid', gap: 8 }}>
      <div style={{ ...body, display: 'flex', justifyContent: 'space-between', gap: 12 }}>
        <span>{label}</span>
        <strong style={{ color: tone, fontVariantNumeric: 'tabular-nums' }}>
          {from} % à {to} %
        </strong>
      </div>
      <div style={{ position: 'relative', height: 18, borderRadius: 9, background: 'var(--surface-2)' }}>
        <div
          style={{
            position: 'absolute',
            left: `${from}%`,
            width: `${Math.max(to - from, 1.5)}%`,
            top: 0,
            bottom: 0,
            borderRadius: 9,
            background: tone,
          }}
        />
      </div>
    </div>
  );
}

const col = (title: ReactNode, items: string[], lit: boolean) => (
  <div style={{ ...card, background: lit ? 'var(--accent-soft)' : 'var(--gold-soft)', border: 'none' }}>
    <h3 style={{ fontSize: 'clamp(19px, 2vw, 27px)', marginBottom: 12, color: lit ? 'var(--accent)' : 'var(--gold)' }}>{title}</h3>
    <ul style={{ ...body, display: 'grid', gap: 8, paddingLeft: '1.1em', margin: 0 }}>
      {items.map((i) => (
        <li key={i}>{i}</li>
      ))}
    </ul>
  </div>
);

function Signature() {
  const { ref, inView } = useInView<SVGSVGElement>(0.3);
  const reduce = useReducedMotion();
  return (
    <svg ref={ref} viewBox="0 0 420 90" style={{ width: 'min(420px, 70vw)', display: 'block', marginInline: 'auto' }} aria-hidden>
      <motion.path
        d="M10 62 C 40 20, 60 20, 66 52 S 92 80, 110 44 S 140 18, 150 50 C 158 72, 176 70, 190 46 C 204 24, 214 30, 220 52 C 228 76, 250 60, 268 40 C 290 18, 300 50, 320 54 C 345 58, 370 36, 410 30"
        fill="none"
        stroke="var(--accent)"
        strokeWidth={3}
        strokeLinecap="round"
        initial={false}
        animate={{ pathLength: inView ? 1 : 0 }}
        transition={{ duration: reduce ? 0 : 2.4, delay: reduce ? 0 : 0.6, ease: 'easeInOut' }}
      />
      <line x1="10" y1="84" x2="410" y2="84" stroke="var(--hair)" strokeWidth={2} />
    </svg>
  );
}

const RETENIR = [
  "L'hallucination est normale et silencieuse : les faits que vous n'avez pas fournis se vérifient.",
  'Jamais de données clients ni de renseignements personnels dans un outil public.',
  'Vous signez, donc vous vérifiez. Ce temps-là reste, en général, plus court que tout faire à la main.',
];

export default [
  /* s1-e27 */
  <Slide
    key="s1-e27"
    center
    nav="Repartons du raté"
    notes={n(
      "Trois contrôles avant le document qui part avec votre nom : faits non fournis vérifiés, ce qu'on a collé, qui signe. L'IA n'engage rien.",
      'Le modèle ne ment pas : il comble le trou avec le plus probable, rien ne signale l’endroit inventé.',
      'Exemple dans les mots du groupe ; le texte reste neutre de mandat.'
    )}
  >
    <div style={{ display: 'grid', justifyItems: 'center' }}>
      <Kicker step={6} />
    </div>
    <Tirage />
  </Slide>,

  /* s1-e28 */
  <Slide
    key="s1-e28"
    center
    nav="Où le risque est élevé"
    notes={n(
      "Le risque dépend de l'origine de la matière : texte fourni par vous = faible ; faits, références, calculs ajoutés = vérifier.",
      'Sceptiques ? Rejouer un piège en direct sur une question d’un participant, dans son domaine.',
      'Viser la vigilance, pas la méfiance : on veut qu’ils osent l’inventaire juste après.'
    )}
  >
    <Reveal>
      <h2 className="headline" style={{ ...head, ...center }}>
        Où le risque est élevé, et où il est presque nul
      </h2>
    </Reveal>
    <div className="cols" style={{ gap: 18, maxWidth: 1100, marginInline: 'auto', marginTop: 'clamp(16px, 3vh, 30px)' }}>
      {col('Risque élevé — l’IA comble ce qui manque', ['Les faits précis : chiffres, dates, noms, prix', 'Les références : normes, lois, articles, sources', 'Les calculs en série', "Tout ce qui n'était pas dans votre demande"], false)}
      {col('Risque faible — la matière vient de vous', ['Reformuler ou résumer un texte que VOUS fournissez', 'Structurer, classer, faire un plan', 'Générer des variantes, brainstormer', 'Traduire, changer le ton'], true)}
    </div>
    <Build at={1} style={{ maxWidth: 1100, marginInline: 'auto', marginTop: 'clamp(16px, 3vh, 28px)', display: 'grid', gap: 14, textAlign: 'left' }}>
      <Range from={22} to={94} label="Culture générale, sans texte fourni : ils inventent" tone="var(--gold)" />
      <Range from={2} to={5} label="Avec le texte à résumer fourni" tone="var(--accent)" />
      <p style={{ ...source, marginTop: 0 }}>Selon le modèle · Source : Stanford AI Index 2026, p. 136.</p>
    </Build>
    <Build at={2} style={{ marginTop: 'clamp(10px, 2vh, 20px)' }}>
      <p style={{ ...body, fontWeight: 600, maxWidth: '56ch', ...center }}>
        Plus la réponse contient de faits que vous n'avez pas fournis, plus elle se vérifie avant de servir.
      </p>
    </Build>
  </Slide>,

  /* s1-e29 */
  <Slide
    key="s1-e29"
    center
    nav="La confidentialité"
    notes={n(
      'Ce qui est écrit dans un outil d’IA sort de chez vous : public et interne banal passent, clients et personnes jamais.',
      'La règle vaut aussi pour le LibreChat de la formation.',
      'On y revient à la séance 3 avec une grille de tri complète.'
    )}
  >
    <Reveal>
      <p style={{ ...body, color: 'var(--fg-muted)', ...center, maxWidth: '50ch' }}>
        Ce que vous écrivez dans un outil d'IA public <strong style={{ color: 'var(--fg)' }}>sort de chez vous</strong>. Avant de coller quoi que ce soit :
      </p>
      <h2 className="headline" style={{ ...head, ...center, maxWidth: '26ch', marginTop: 10 }}>
        Serais-je à l'aise que ce texte se retrouve <span className="accent-text">ailleurs</span> ?
      </h2>
    </Reveal>
    <div style={{ display: 'grid', gap: 10, maxWidth: 900, marginInline: 'auto', marginTop: 'clamp(14px, 3vh, 28px)', textAlign: 'left' }}>
      {[
        ['✅', 'Public ou interne banal', 'texte de votre site, procédure générique : allez-y.', 'var(--accent-soft)'],
        ['❌', 'Données de clients, chiffres sensibles, secrets d’affaires', 'non.', 'var(--gold-soft)'],
        ['❌', 'Renseignements sur des personnes', 'noms, coordonnées, dossiers : jamais. C’est aussi la loi (Loi 25).', 'var(--gold-soft)'],
      ].map(([icon, t, d, bg]) => (
        <div key={t} style={{ ...card, background: bg, border: 'none', display: 'flex', gap: 14, alignItems: 'baseline', padding: '12px 20px' }}>
          <span style={{ fontSize: 'clamp(18px, 1.8vw, 24px)' }} aria-hidden>{icon}</span>
          <span style={body}>
            <strong>{t}</strong> — {d}
          </span>
        </div>
      ))}
    </div>
    <div style={{ maxWidth: 900, marginInline: 'auto', marginTop: 14, textAlign: 'left' }}>
      <Accordion
        defaultOpen={null}
        items={[
          {
            title: 'Et LibreChat ?',
            body: "L'outil de votre formation est hébergé par Mhosaic, au Canada, et je relis vos conversations. Les mêmes règles s'appliquent donc ici : pas de données de clients, pas de renseignements personnels.",
          },
          {
            title: 'Et ChatGPT, Copilot, Gemini ?',
            body: "Gratuit, ce que vous y écrivez sert à entraîner le modèle. Payer, c'est passer un accord : ce que l'éditeur fait de vos données y est écrit, et vous gagnez la main sur la mémoire et l'entraînement. Un forfait d'affaires va plus loin : le contrat exclut l'entraînement. Lisez l'accord, faites les réglages ; le texte reste sur leurs serveurs. La règle ne change pas selon l'outil, seulement ce que vous savez de la suite.",
          },
        ]}
      />
    </div>
    <p style={{ ...source, textAlign: 'center' }}>On y revient en profondeur à la séance 3, avec une grille de tri complète.</p>
  </Slide>,

  /* s1-e30 */
  <Slide
    key="s1-e30"
    center
    nav="Qui signe, décide"
    notes={n(
      "L'IA produit un brouillon et n'engage rien ; vous vérifiez, corrigez, tranchez.",
      'Le document qui part porte votre nom et celui de votre entreprise.'
    )}
  >
    <Reveal>
      <p style={{ ...body, color: 'var(--fg-muted)', maxWidth: '48ch', ...center }}>
        Le résultat qui sort de votre bureau (courriel, soumission, rapport) engage{' '}
        <strong style={{ color: 'var(--fg)' }}>votre nom et votre entreprise</strong>, pas l'outil.
      </p>
      <h2 className="display" style={{ fontSize: 'clamp(38px, 6vw, 84px)', maxWidth: '18ch', marginTop: 'clamp(14px, 3vh, 28px)', ...center }}>
        L'IA produit un brouillon ; <span className="accent-text">vous restez l'auteur.</span>
      </h2>
    </Reveal>
    <div style={{ marginTop: 'clamp(20px, 5vh, 48px)' }}>
      <Signature />
    </div>
  </Slide>,

  /* s1-e31 */
  <Slide
    key="s1-e31"
    center
    nav="À retenir — limites"
    notes={n(
      "Trois réflexes : vérifier les faits non fournis, rien de confidentiel dans un outil public, la vérification fait partie du travail.",
      '« En général » : des médecins gagnent du temps en relisant ; des développeurs expérimentés ont été plus lents (non reproduit).'
    )}
  >
    <Reveal>
      <h2 className="headline" style={{ ...head, ...center }}>À retenir</h2>
    </Reveal>
    <div style={{ display: 'grid', gap: 14, maxWidth: 940, marginInline: 'auto', marginTop: 'clamp(16px, 3vh, 30px)', textAlign: 'left' }}>
      {RETENIR.map((t, i) => (
        <Build key={i} at={i + 1}>
          <div style={{ ...card, display: 'flex', gap: 20, alignItems: 'center' }}>
            <span className="figure" style={{ fontSize: 'clamp(30px, 3.6vw, 48px)', color: 'var(--accent)', minWidth: '1.2em' }}>
              {i + 1}
            </span>
            <span style={body}>{t}</span>
          </div>
        </Build>
      ))}
    </div>
  </Slide>,
];
