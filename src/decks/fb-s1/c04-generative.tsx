import { useState } from 'react';
import type { CSSProperties, ReactNode } from 'react';
import Slide from '../../deck/Slide';
import Build from '../../deck/Build';
import Reveal from '../../deck/Reveal';
import { Kicker, card, source, n } from './ui';

/* Capsule « IA générative vs IA traditionnelle » — s1-e11 to s1-e19. */

const center: CSSProperties = { textAlign: 'center', marginInline: 'auto' };
const h2: CSSProperties = { ...center, fontSize: 'clamp(28px, 3.8vw, 50px)', maxWidth: '26ch' };
const body: CSSProperties = { fontSize: 'clamp(16px, 1.6vw, 22px)', lineHeight: 1.4 };
const muted: CSSProperties = { ...body, color: 'var(--fg-muted)' };
const grid = (min = 220, gap = 18): CSSProperties => ({
  display: 'grid',
  gridTemplateColumns: `repeat(auto-fit, minmax(min(${min}px, 100%), 1fr))`,
  gap,
  width: '100%',
});
const label: CSSProperties = {
  fontFamily: 'var(--font-mono)',
  fontSize: 'clamp(12px, 1.1vw, 15px)',
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: 'var(--fg-muted)',
};

const Icon = ({ d }: { d: string }) => (
  <svg viewBox="0 0 24 24" width={44} height={44} fill="none" stroke="var(--accent)" strokeWidth={1.8} strokeLinecap="round" strokeLinejoin="round" aria-hidden>
    <path d={d} />
  </svg>
);

/* ---------- s1-e12: word bars stand for answers (no invented answer text) ---------- */

const SAME = [5, 3, 6, 4, 7, 3, 5];
const GEN = [
  [5, 3, 6, 4, 7, 3, 5],
  [5, 3, 6, 2, 4, 8, 3],
  [5, 3, 4, 7, 3, 6, 2],
  [5, 6, 3, 5, 2, 4, 7],
];

function Bars({ w, ref0 }: { w: number[]; ref0?: number[] }) {
  return (
    <div style={{ display: 'flex', gap: 6, flexWrap: 'wrap', minHeight: 18 }}>
      {w.map((x, i) => (
        <Reveal key={i} y={0} delay={i * 0.22} style={{ display: 'inline-block' }}>
          <span
            style={{
              display: 'block',
              width: x * 9,
              height: 16,
              borderRadius: 4,
              background: ref0 && ref0[i] !== x ? 'var(--accent)' : 'var(--fg-faint)',
            }}
          />
        </Reveal>
      ))}
    </div>
  );
}

function Column({ title, sign, children }: { title: string; sign: string; children: ReactNode }) {
  return (
    <div style={{ ...card, display: 'grid', gap: 14 }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}>
        <span style={label}>{title}</span>
        <span style={{ fontSize: 'clamp(32px, 4vw, 52px)', fontWeight: 600, color: 'var(--accent)' }}>{sign}</span>
      </div>
      {children}
    </div>
  );
}

const MagieRate = ({ from }: { from: number }) => (
  <div style={{ ...grid(280), marginTop: 22 }}>
    <Build at={from}>
      <div style={{ ...card, borderColor: 'var(--accent)' }}>
        <div style={label}>La magie · un bon document</div>
        <p style={{ ...body, marginTop: 6 }}>Le plus plausible <strong>EST</strong> le bon.</p>
      </div>
    </Build>
    <Build at={from + 1}>
      <div style={{ ...card, borderColor: 'var(--gold)', background: 'var(--gold-soft)' }}>
        <div style={label}>Le raté · une norme qui n'existe pas</div>
        <p style={{ ...body, marginTop: 6 }}>Le plus plausible <strong>n'est PAS</strong> le vrai.</p>
      </div>
    </Build>
  </div>
);

function Redemander() {
  const [k, setK] = useState(0);
  return (
    <div style={grid(300)}>
      <Column title="Traditionnelle · mêmes données" sign="=">
        <Bars w={SAME} />
        <Bars w={SAME} />
      </Column>
      <Column title="Générative · même question" sign="≠">
        <Bars w={GEN[0]} />
        <div key={k}>
          <Bars w={GEN[1 + (k % 3)]} ref0={GEN[0]} />
        </div>
        <button
          type="button"
          onClick={() => setK(k + 1)}
          style={{
            justifySelf: 'start',
            padding: '10px 18px',
            borderRadius: 999,
            border: 'none',
            background: 'var(--accent)',
            color: 'var(--accent-ink)',
            font: '600 clamp(14px, 1.3vw, 17px) var(--font-body)',
            cursor: 'pointer',
          }}
        >
          Redemander
        </button>
      </Column>
    </div>
  );
}

/* ---------- s1-e13: skills crossing the human line (years from the screen text only) ---------- */

const SRC12 = 'Source : Stanford AI Index 2026, p. 75–76 et 94 — scores ramenés à la performance humaine (100 %).';
const PUNCH12 = 'Ce que les modèles savent, ils le savent de mieux en mieux. Ces examens ne disent rien de ce qu’ils inventent.';

// ponytail: curve shapes are illustrative like the source SVG; only the crossing years are data.
const HL = 200; // y of the human line
const X1 = 760; // x of 2026
const xOf = (year: number) => 60 + (year - 2012) * 50;
const SKILLS = [
  { what: 'Reconnaître une image', year: '2015', from: 2012, y0: 290, cross: 2015, end: 70 },
  { what: 'Lire et répondre', year: '2019', from: 2016, y0: 280, cross: 2019, end: 100 },
  { what: 'Niveau universitaire', year: '2024', from: 2020, y0: 290, cross: 2024, end: 130 },
  { what: 'Science, niveau doctorat', year: 'fin 2024', from: 2022.5, y0: 310, cross: 2024.9, end: 160 },
];
const curve = (x0: number, y0: number, xc: number, yE: number) => {
  const a = Math.min(30, (X1 - xc) / 2);
  const k = (y0 - HL) * 0.35;
  return `M${x0} ${y0} C${x0 + (xc - x0) * 0.45} ${y0} ${xc - a} ${HL + k} ${xc} ${HL} C${xc + a} ${HL - k} ${X1 - (X1 - xc) * 0.4} ${yE} ${X1} ${yE}`;
};
const t = (size: number, fill = 'var(--fg)', weight = 500): CSSProperties => ({ fontSize: size, fill, fontWeight: weight, fontFamily: 'var(--font-body)' });

const SkillsChart = () => (
  <svg viewBox="0 0 1060 356" role="img" style={{ width: '100%', maxHeight: '50vh', display: 'block' }}
    aria-label="Quatre compétences franchissent la ligne de la performance humaine : 2015, 2019, 2024, fin 2024. Deux restent sous la ligne.">
    <line x1={60} y1={30} x2={60} y2={320} stroke="var(--hair)" strokeWidth={1.5} />
    <line x1={60} y1={320} x2={X1 + 10} y2={320} stroke="var(--hair)" strokeWidth={1.5} />
    {[2012, 2015, 2018, 2021, 2024, 2026].map((y) => (
      <text key={y} x={xOf(y)} y={344} textAnchor="middle" style={t(15, 'var(--fg-muted)')}>{y}</text>
    ))}
    <line x1={60} y1={HL} x2={X1 + 10} y2={HL} stroke="var(--fg)" strokeWidth={2.5} />
    <text x={52} y={HL + 6} textAnchor="end" style={t(16, 'var(--fg)', 700)}>100 %</text>
    <text x={52} y={HL + 24} textAnchor="end" style={t(13, 'var(--fg-muted)')}>humain</text>
    {SKILLS.map((s) => (
      <path key={s.what} d={curve(xOf(s.from), s.y0, xOf(s.cross), s.end)} fill="none" stroke="var(--accent)" strokeWidth={4} strokeLinecap="round" />
    ))}
    {SKILLS.map((s, i) => (
      <g key={s.what}>
        <circle cx={xOf(s.cross)} cy={HL} r={7.5} fill="var(--accent)" stroke="var(--surface)" strokeWidth={2.5} />
        <text
          x={xOf(s.cross) + (i === 2 ? 4 : i === 3 ? -4 : 0)}
          y={HL + (i === 3 ? 48 : 28)}
          textAnchor={i === 2 ? 'end' : i === 3 ? 'start' : 'middle'}
          style={t(18, 'var(--accent)', 700)}
        >
          {s.year}
        </text>
        <text x={X1 + 14} y={s.end + 6} style={t(17)}>{s.what}</text>
      </g>
    ))}
    <text x={X1 + 14} y={HL - 14} style={t(14, 'var(--gold)', 700)}>2025 : 93 % contre 81 % (experts)</text>
    <text x={X1 + 14} y={HL + 36} style={{ ...t(13, 'var(--fg-muted)'), fontFamily: 'var(--font-mono)', letterSpacing: '0.06em' }}>ENCORE SOUS LA LIGNE</text>
    <text x={X1 + 14} y={HL + 62} style={t(16, 'var(--fg-muted)')}>Programmer seul de bout en bout</text>
    <text x={X1 + 14} y={HL + 86} style={t(16, 'var(--fg-muted)')}>Se servir d’un ordinateur</text>
    <text x={X1 + 14} y={HL + 108} style={t(16, 'var(--fg-muted)')}>comme vous</text>
  </svg>
);

/* ---------- s1-e14: two stacked timelines, each proportional to time within itself ---------- */

type D = [number, number, number];
type Ev = { d: D; model: string; when: string; full: string };
// ponytail: month-only dates in the screen text sit on the 1st of the month; ranges on their first day.
const OLD: Ev[] = [
  { d: [2025, 2, 1], model: 'Claude Code', when: 'févr. 2025', full: "Des agents qui travaillent dans le terminal d'un développeur (Claude Code, février 2025)." },
  { d: [2025, 4, 1], model: 'o3', when: 'avr. 2025', full: 'Une nouvelle génération de modèles qui raisonnent avant de répondre (o3, avril 2025).' },
  { d: [2025, 5, 1], model: 'Claude 4', when: 'mai 2025', full: "Des modèles qui lisent des centaines de pages d'un coup (Claude 4, mai 2025)." },
  { d: [2025, 8, 1], model: 'GPT-5', when: 'août 2025', full: "Un modèle grand public qui choisit lui-même son niveau d'effort (GPT-5, août 2025)." },
  { d: [2025, 9, 1], model: 'Sora 2', when: 'sept. 2025', full: 'De la vidéo avec son et dialogue synchronisés (Sora 2, septembre 2025).' },
  { d: [2025, 11, 1], model: 'Gemini 3, Opus 4.5', when: 'nov. 2025', full: 'Des modèles qui pilotent un navigateur à votre place (Gemini 3 et Opus 4.5, novembre 2025).' },
  { d: [2025, 12, 1], model: 'Cowork', when: 'déc. 2025', full: "L'agent qui sort du terminal pour entrer dans l'application de bureau de tout le monde (Cowork, décembre 2025)." },
  { d: [2026, 4, 1], model: 'Claude Mythos', when: 'avr. 2026', full: 'Un modèle annoncé sans être mis en vente, d’abord réservé à des partenaires en cybersécurité défensive (Claude Mythos · Project Glasswing, avril 2026).' },
];
const NEW: Ev[] = [
  { d: [2026, 6, 30], model: 'Sonnet 5', when: '30 juin', full: 'Le prix d’un bon modèle s’effondre : 2 $ le million de jetons — les « mots » du modèle — en entrée (Claude Sonnet 5, 30 juin 2026).' },
  { d: [2026, 7, 8], model: 'Grok 4.5, GPT-5.6', when: '8–9 juil.', full: 'Deux grands modèles concurrents à un jour d’écart (Grok 4.5 le 8 juillet, GPT-5.6 le 9 juillet 2026).' },
  { d: [2026, 8, 1], model: 'Qwen3.8-Max', when: 'août', full: 'Le plus gros modèle chinois devient installable chez soi, en accès libre (Qwen3.8-Max, août 2026).' },
  { d: [2026, 8, 5], model: 'FLUX 3 Video', when: '5 août', full: 'Vingt secondes de vidéo, son et dialogues synchronisés, ouverts à tous (FLUX 3 Video, 5 août 2026).' },
  { d: [2026, 8, 6], model: 'GPT-5.6 Sol', when: '6 août', full: 'Un curseur pour choisir : réfléchir plus longtemps, ou répondre plus vite (GPT-5.6 Sol, 6 août 2026).' },
  { d: [2026, 8, 27], model: 'Nvidia + Hugging Face', when: '27 août', full: 'Le fabricant de puces rachète la place publique des modèles ouverts, 12,9 milliards de dollars (Nvidia et Hugging Face, 27 août 2026).' },
  { d: [2026, 9, 1], model: 'Quatre modèles', when: '1er–3 sept.', full: 'Quatre laboratoires sortent un modèle frontière en trois jours ; l’un dépasse l’humain sur 96 % des niveaux d’un test de raisonnement abstrait (Claude Fable 5.1, Gemini 3.8 Flash, Muse Spark 1.3, GPT-6 Astra, 1er–3 septembre 2026).' },
  { d: [2026, 9, 3], model: 'K2 Horizon', when: '3 sept.', full: 'Six modèles entièrement ouverts, publiés avec leur code et leurs données d’entraînement (K2 Horizon, 3 septembre 2026).' },
];
const day = ([y, m, d]: D) => Date.UTC(y, m - 1, d) / 864e5;
const TOP: [number, number] = [day([2025, 1, 1]), day([2026, 9, 30])];
const ZOOM: [number, number] = [day([2026, 6, 1]), day([2026, 9, 30])];
const pct = (d: D, [a, b]: [number, number]) => ((day(d) - a) / (b - a)) * 100;
const P_JUNE = pct([2026, 6, 1], TOP);
const TITLE13 = 'Dix-huit mois, huit dates. Depuis juin, huit de plus.';
const FOOT13 = 'Ce n’est pas une période exceptionnelle : c’est le rythme normal. Et il s’accélère.';

const abs = (left: number, extra?: CSSProperties): CSSProperties => ({ position: 'absolute', left: `${left}%`, ...extra });
const Dot = ({ at, color, r = 16, title }: { at: number; color: string; r?: number; title?: string }) => (
  <span title={title} style={abs(at, { top: '50%', width: r, height: r, transform: 'translate(-50%, -50%)', borderRadius: '50%', background: color, border: '2px solid var(--surface)' })} />
);
/** Axis line with month ticks above it. */
function Axis({ range, ticks = [], children }: { range: [number, number]; ticks?: [D, string][]; children: ReactNode }) {
  return (
    <div style={{ position: 'relative', height: 22 }}>
      <span style={{ position: 'absolute', left: 0, right: 0, top: 10, height: 2, background: 'var(--hair)' }} />
      {ticks.map(([d, txt]) => (
        <span key={txt} style={abs(pct(d, range), { ...label, top: -18, paddingLeft: 6, borderLeft: '1.5px solid var(--accent)', lineHeight: '24px', fontSize: 'clamp(11px, 1vw, 13px)', color: 'var(--accent)' })}>{txt}</span>
      ))}
      {children}
    </div>
  );
}
/** Labels in even slots over [0, width]%, joined to their real-date dot by a leader line. */
function Labels({ events, range, width, color, below }: { events: Ev[]; range: [number, number]; width: number; color: string; below?: boolean }) {
  const slot = (i: number) => (width * (i + 0.5)) / events.length;
  const leaders = (
    <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'clamp(18px, 4vh, 32px)' }} aria-hidden>
      {events.map((e, i) => (
        <line key={e.full} x1={slot(i)} y1={below ? 10 : 0} x2={pct(e.d, range)} y2={below ? 0 : 10} stroke={color} strokeOpacity={0.5} strokeWidth={1.2} vectorEffect="non-scaling-stroke" />
      ))}
    </svg>
  );
  const row = (
    <div style={{ display: 'grid', gridTemplateColumns: `repeat(${events.length}, 1fr)`, width: `${width}%`, alignItems: below ? 'start' : 'end' }}>
      {events.map((e) => (
        <div key={e.full} title={e.full} style={{ textAlign: 'center', padding: '0 4px', cursor: 'help', display: 'grid', gap: 2 }}>
          <span style={{ fontWeight: 600, fontSize: 'clamp(13px, 1.25vw, 17px)', lineHeight: 1.15 }}>{e.model}</span>
          <span style={{ ...label, color, fontSize: 'clamp(11px, 1vw, 13px)', letterSpacing: '0.02em', textTransform: 'none' }}>{e.when}</span>
        </div>
      ))}
    </div>
  );
  return below ? <>{leaders}{row}</> : <>{row}{leaders}</>;
}

const Timelines = () => (
  <div style={{ maxWidth: 1120, width: '100%', marginInline: 'auto', marginTop: 'clamp(14px, 3vh, 30px)', position: 'relative' }}>
    <div style={{ position: 'relative' }}>
      <Labels events={OLD} range={TOP} width={P_JUNE - 2} color="var(--gold)" />
      <Build at={1} style={{ position: 'absolute', left: `${P_JUNE}%`, right: 0, bottom: 'clamp(18px, 4vh, 32px)', textAlign: 'center' }}>
        <span style={{ color: 'var(--accent)', fontWeight: 600, fontSize: 'clamp(14px, 1.35vw, 18px)', whiteSpace: 'nowrap' }}>les quatre derniers mois</span>
      </Build>
    </div>
    <Axis range={TOP}>
      {OLD.map((e) => <Dot key={e.full} at={pct(e.d, TOP)} color="var(--gold)" title={e.full} />)}
      <Build at={1} style={{ position: 'absolute', inset: 0 }}>
        <span style={abs(P_JUNE, { right: 0, top: 4, height: 14, borderRadius: 7, background: 'var(--accent-soft)', border: '1.5px solid var(--accent)' })} />
        {NEW.map((e) => <Dot key={e.full} at={pct(e.d, TOP)} color="var(--accent)" r={9} />)}
      </Build>
    </Axis>
    <Build at={1}>
      <svg viewBox="0 0 100 10" preserveAspectRatio="none" style={{ display: 'block', width: '100%', height: 'clamp(36px, 8vh, 64px)', marginTop: 4, marginBottom: 24 }} aria-hidden>
        <polygon points={`${P_JUNE},0 100,0 100,10 0,10`} fill="var(--accent-soft)" />
        <line x1={P_JUNE} y1={0} x2={0} y2={10} stroke="var(--accent)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
        <line x1={100} y1={0} x2={100} y2={10} stroke="var(--accent)" strokeWidth={1.5} vectorEffect="non-scaling-stroke" />
      </svg>
      <Axis range={ZOOM} ticks={[[[2026, 6, 1], 'juin'], [[2026, 7, 1], 'juil.'], [[2026, 8, 1], 'août'], [[2026, 9, 1], 'sept.']]}>
        {NEW.map((e) => <Dot key={e.full} at={pct(e.d, ZOOM)} color="var(--accent)" title={e.full} />)}
      </Axis>
      <div style={{ height: 'clamp(14px, 2.5vh, 22px)' }} />
      <Labels events={NEW} range={ZOOM} width={100} color="var(--accent)" below />
    </Build>
  </div>
);

/* ---------- s1-e15: the compilation, served from public/media/ (kept out of git) ---------- */

function Compilation() {
  const [ok, setOk] = useState(true);
  const box: CSSProperties = { width: 'min(100%, calc(50vh * 16 / 9))', aspectRatio: '16 / 9', marginInline: 'auto', borderRadius: 'var(--radius)', overflow: 'hidden' };
  return ok ? (
    <video src="/media/will-smith-spaghetti.mp4" controls preload="metadata" onError={() => setOk(false)} style={{ ...box, display: 'block', background: 'var(--fg)' }} />
  ) : (
    <div style={{ ...box, border: '2px dashed var(--hair)', background: 'var(--surface-2)', display: 'grid', placeItems: 'center' }}>
      <span style={label}>vidéo : compilation Will Smith 2023–2026</span>
    </div>
  );
}


/* ---------- slides ---------- */

export default [
  /* s1-e11 */
  <Slide key="s1-e11" nav="Déjà partout" notes={n(
    'Fraude, GPS, recommandations, pourriels : la même IA traditionnelle, entraînée pour une seule tâche.',
    'Question : « Qui a déjà été bloqué par sa banque pour une transaction normale ? » — elle se trompe aussi.',
  )}>
    <div style={{ display: 'grid', justifyItems: 'center' }}>
      <Kicker step={3} />
    </div>
    <h2 className="headline" style={h2}>Vous l'utilisez depuis des années sans y penser.</h2>
    <div style={{ ...grid(180, 14), marginTop: 'clamp(20px, 4vh, 40px)' }}>
      {[
        ['Détection de fraude sur votre carte', 'M3 6h18v12H3zM3 10h18M7 15h4'],
        ['Itinéraire de votre GPS', 'M12 21s-6-6.2-6-11a6 6 0 0112 0c0 4.8-6 11-6 11zM12 12.5a2.5 2.5 0 100-5 2.5 2.5 0 000 5z'],
        ['Recommandations de vos plateformes', 'M12 3l2.7 5.6 6.1.9-4.4 4.3 1 6.1L12 17l-5.4 2.9 1-6.1-4.4-4.3 6.1-.9z'],
        ['Tri de vos pourriels', 'M3 6h18v12H3zM3 6l9 7 9-7'],
      ].map(([t, d]) => (
        <div key={t} style={{ ...card, display: 'grid', justifyItems: 'center', gap: 10, textAlign: 'center' }}>
          <Icon d={d} />
          <span style={{ fontSize: 'clamp(14px, 1.4vw, 19px)' }}>{t}</span>
        </div>
      ))}
    </div>
    <Build at={1}>
      <div style={{ ...center, textAlign: 'center', marginTop: 14, fontSize: 28, color: 'var(--fg-faint)' }} aria-hidden>↓ ↓ ↓ ↓</div>
      <div style={{ ...card, ...center, maxWidth: 760, textAlign: 'center', background: 'var(--accent-soft)', borderColor: 'var(--accent)' }}>
        <div style={{ fontSize: 'clamp(22px, 2.6vw, 34px)', fontWeight: 600 }}>
          IA <span style={{ color: 'var(--accent)' }}>traditionnelle</span>
        </div>
        <p style={{ ...body, marginTop: 8 }}>Entraînée pour UNE tâche, elle classe et prédit. Mêmes données, même réponse, toujours.</p>
        <p style={{ ...muted, marginTop: 6 }}>Fiable, spécialisée, invisible. Là depuis les années 1990.</p>
      </div>
    </Build>
  </Slide>,

  /* s1-e12 */
  <Slide key="s1-e12" nav="Ce qui a changé" notes={n(
    "Choisir une étiquette dans une liste connue, ou composer mot après mot la suite la plus probable.",
    'Ce même mécanisme produit la magie comme le raté vus dans la démo.',
    "Le modèle n'a pas « menti » : son travail n'est pas de savoir, mais de produire.",
  )}>
    <h2 className="headline" style={h2}>Elle ne récite pas : elle compose.</h2>
    <div style={{ marginTop: 22 }}>
      <Redemander />
    </div>
    <MagieRate from={1} />
  </Slide>,

  /* s1-e13 */
  <Slide key="s1-e13" nav="Plus fort que nous ?" notes={n(
    'Graphique redessiné d’après la fig. 2.1.1 du Stanford AI Index 2026 (p. 76).',
    '100 % = « au niveau humain », pas « réussit tout » : sur l’usage d’un ordinateur, le meilleur agent réussit 66 % des tâches.',
    'Question : « Sur quoi voudriez-vous qu’il soit meilleur que vous ? »',
  )}>
    <h2 className="headline" style={h2}>Plus fort que nous, sur quoi ?</h2>
    <p style={{ ...muted, ...center, marginTop: 6 }}>Année après année, une compétence de plus passe la ligne.</p>
    <div style={{ maxWidth: 1060, width: '100%', marginInline: 'auto', marginTop: 'clamp(10px, 2vh, 20px)' }}>
      <SkillsChart />
    </div>
    <Build at={1}>
      <p style={{ ...body, ...center, marginTop: 12, maxWidth: '56ch', fontWeight: 600 }}>{PUNCH12}</p>
    </Build>
    <p style={{ ...source, ...center }}>{SRC12}</p>
  </Slide>,

  /* s1-e14 */
  <Slide key="s1-e14" nav="Seize dates" notes={n(
    'Les frises se montrent, elles ne se lisent pas : nommer deux ou trois dates, laisser le reste se voir (survol = la ligne complète).',
    'Questions : « Laquelle avez-vous vue passer ? » puis « Et dans quatre mois ? »',
    '« Lequel est le meilleur ? » → celui que vous avez sous la main, bien dirigé.',
  )}>
    <h2 className="headline" style={{ ...h2, fontSize: 'clamp(24px, 2.9vw, 38px)', maxWidth: 'none' }}>{TITLE13}</h2>
    <Timelines />
    <p style={{ ...muted, ...center, marginTop: 'clamp(12px, 2.5vh, 24px)' }}>{FOOT13}</p>
  </Slide>,

  /* s1-e15 */
  <Slide key="s1-e15" nav="Et en vidéo" notes={n(
    'Jouer la compilation depuis le navigateur en partage d’écran ; couper au générique.',
    'Les premiers plans étiquetés « 2024 » sont de mars 2023 (filigrane Shutterstock) : le dire.',
    'Question : « Et dans dix-huit mois ? »',
  )}>
    <div style={{ ...label, ...center }}>Le même prompt · mars 2023, 2025, 2026</div>
    <h2 className="headline" style={{ ...h2, marginTop: 8 }}>« Will Smith mange des spaghettis »</h2>
    <div style={{ marginTop: 'clamp(14px, 3vh, 28px)', width: '100%' }}>
      <Compilation />
    </div>
    <p style={{ ...body, ...center, marginTop: 14 }}>Regardez.</p>
  </Slide>,

  /* s1-e16 */
  <Slide key="s1-e16" nav="Les nouveaux outils" notes={n(
    'Trois puces, pas plus : assistants, flux de travail, agents.',
    'Ils seront nommés (carte des espèces) et situés (échelle) juste après.',
    'Vidéo DeepSearch seulement si on est dans le temps.',
  )}>
    <h2 className="headline" style={h2}>Trois nouveaux outils dans la trousse.</h2>
    <div style={{ display: 'flex', gap: 10, justifyContent: 'center', flexWrap: 'wrap', marginTop: 20 }}>
      <span style={label}>Déjà là :</span>
      {['Les automatisations', 'Les outils qui connectent deux applications', "L'IA prédictive"].map((t) => (
        <span key={t} style={{ padding: '6px 14px', borderRadius: 999, background: 'var(--surface-2)', color: 'var(--fg-muted)', fontSize: 'clamp(13px, 1.25vw, 17px)' }}>{t}</span>
      ))}
    </div>
    <div style={{ ...grid(240), marginTop: 'clamp(22px, 4vh, 40px)' }}>
      {[
        ['Des assistants génératifs', 'qui rédigent, résument, proposent'],
        ['Des flux de travail', "où l'IA s'insère dans une chaîne existante, pour structurer ou nettoyer ce qui passe"],
        ['Des agents', 'qui enchaînent des actions et se contrôlent eux-mêmes'],
      ].map(([t, d], i) => (
        <div key={t} style={{ position: 'relative', minHeight: 'clamp(150px, 24vh, 210px)' }}>
          <div style={{ position: 'absolute', inset: 0, borderRadius: 'var(--radius)', border: '2px dashed var(--hair)' }} />
          <Build at={i + 1} style={{ position: 'absolute', inset: 0 }}>
            <div style={{ ...card, height: '100%', background: 'var(--accent-soft)', borderColor: 'var(--accent)', boxShadow: 'var(--glow)' }}>
              <div style={{ fontSize: 'clamp(20px, 2.2vw, 28px)', fontWeight: 600, color: 'var(--accent)' }}>{t}</div>
              <p style={{ ...body, marginTop: 8 }}>{d}</p>
            </div>
          </Build>
        </div>
      ))}
    </div>
    <p style={{ ...muted, ...center, marginTop: 18, fontSize: 'clamp(14px, 1.3vw, 18px)' }}>Leur nom précis : avec la carte des espèces. Leur place : avec l'échelle.</p>
  </Slide>,

  /* s1-e17 */
  <Slide key="s1-e17" nav="AI-first" notes={n(
    'Duolingo : +38 % de chiffre d’affaires au T1 2025, +40 % d’abonnés payants (communiqué T1 2025).',
    '88 % des organisations utilisent l’IA ; sous 100 M$ US de revenus, 5 % l’ont déployée partout (AI Index 2026).',
    'Question : « Chez vous, qui devrait justifier de NE PAS utiliser l’IA ? »',
  )}>
    <h2 className="headline" style={h2}>Ce que font les entreprises AI-first</h2>
    <div style={{ ...grid(340, 22), marginTop: 'clamp(18px, 3vh, 32px)', alignItems: 'stretch' }}>
      <div style={{ ...card, display: 'grid', gap: 12 }}>
        <div style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 600 }}>Duolingo</div>
        {[
          { v: 148, t: 'nouveaux cours, en moins d’un an', c: 'var(--accent)' },
          { v: 100, t: 'premiers cours, en une douzaine d’années', c: 'var(--fg-faint)' },
        ].map((b) => (
          <div key={b.v}>
            <div style={{ height: 30, width: `${(b.v / 148) * 100}%`, background: b.c, borderRadius: 6 }} />
            <div style={{ ...body, marginTop: 4 }}><strong>{b.v}</strong> {b.t}</div>
          </div>
        ))}
        <p style={{ ...muted, fontSize: 'clamp(13px, 1.2vw, 16px)', fontStyle: 'italic' }}>
          Son fondateur : « Apporter des modifications mineures à des systèmes conçus pour les humains ne nous y mènera pas. Dans de nombreux cas, nous devrons repartir de zéro. »
        </p>
      </div>
      <div style={{ ...card, display: 'grid', gap: 12, alignContent: 'start' }}>
        <div style={{ fontSize: 'clamp(22px, 2.4vw, 30px)', fontWeight: 600 }}>Shopify</div>
        <p style={body}>L'IA, une <strong>attente de base</strong> : avant de demander des embauches ou des ressources, une équipe démontre qu'elle ne peut pas faire le travail avec l'IA.</p>
        <p style={{ fontSize: 'clamp(22px, 2.5vw, 32px)', fontWeight: 600, lineHeight: 1.2, color: 'var(--accent)' }}>Il faut justifier de NE PAS l'utiliser.</p>
      </div>
    </div>
    <Build at={1}>
      <p style={{ ...body, ...center, marginTop: 20, maxWidth: '56ch' }}>
        Pas des entreprises de technologie qui vendent de l'IA : des organisations qui <strong>produisent</strong>, comme les vôtres.
      </p>
    </Build>
  </Slide>,

  /* s1-e18 */
  <Slide key="s1-e18" center nav="Une force" notes={n(
    'Le non-déterminisme n’est pas un défaut à corriger : c’est le prix de la souplesse.',
  )}>
    <div className="quote-mark" aria-hidden>“</div>
    <p style={{ fontSize: 'clamp(24px, 3.3vw, 44px)', lineHeight: 1.25, maxWidth: '30ch', marginInline: 'auto', fontFamily: 'var(--font-head)' }}>
      C'est parce qu'elle compose au lieu de réciter qu'elle peut écrire{' '}
      <span style={{ color: 'var(--accent)' }}>VOTRE courriel, dans VOTRE contexte</span>, d'une façon qui n'a jamais existé avant.
    </p>
    <p style={{ ...muted, marginTop: 'clamp(16px, 3vh, 28px)', maxWidth: '46ch', marginInline: 'auto' }}>
      Ce non-déterminisme est le prix de sa souplesse. On ne corrige pas cette nature : on apprend à travailler avec.
    </p>
  </Slide>,

  /* s1-e19 */
  <Slide key="s1-e19" nav="À retenir" notes={n(
    'Le point 3, le rythme, n’a pas de carte dans le visuel : le dire.',
    'Enchaîner sur la carte des espèces.',
  )}>
    <h2 className="headline" style={h2}>À retenir</h2>
    <div style={{ maxWidth: 900, marginInline: 'auto', marginTop: 'clamp(18px, 3vh, 32px)', display: 'grid', gap: 14 }}>
      {[
        'Traditionnelle = classe et prédit, toujours pareil. Générative = compose, jamais exactement pareil.',
        'La magie et le raté sont le même mécanisme : « le plus probable » n’est pas toujours « le vrai ».',
        'Le rythme des dix-huit derniers mois est le rythme normal : ce qu’on décide aujourd’hui vaut pour des outils qui auront changé dans six mois.',
        'C’est pour ça que votre consigne pèse autant. C’est tout l’objet de la séance 2.',
      ].map((t, i) => {
        const item = (
          <div style={{ ...card, display: 'grid', gridTemplateColumns: 'auto 1fr', gap: 16, alignItems: 'baseline' }}>
            <span style={{ fontSize: 'clamp(24px, 2.6vw, 34px)', fontWeight: 600, color: 'var(--accent)' }}>{i + 1}</span>
            <span style={body}>{t}</span>
          </div>
        );
        return <Build key={t} at={Math.min(i + 1, 3)}>{item}</Build>;
      })}
    </div>
  </Slide>,
];
