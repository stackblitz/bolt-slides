import type { CSSProperties } from 'react';
import Slide from '../../deck/Slide';
import Build from '../../deck/Build';
import Reveal from '../../deck/Reveal';
import CountUp from '../../components/CountUp';
import { Kicker, card, source, n } from './ui';

/* Capsule « Pourquoi vous êtes ici » — s1-e05 to s1-e08. */

const body: CSSProperties = { fontSize: 'clamp(15px, 1.55vw, 20px)', color: 'var(--fg-muted)', lineHeight: 1.45 };
const h3: CSSProperties = { fontSize: 'clamp(17px, 1.7vw, 22px)', marginBottom: 4 };

/* ── s1-e07 content ── */
const QUESTIONS: { title: string; text: string }[] = [
  { title: 'La sécurité', text: "Ce que vous écrivez dans un outil d'IA public sort de chez vous. Tout à l'heure : ce qu'on lui donne, et ce qu'on ne lui donne jamais." },
  { title: 'Où vont les données', text: "LibreChat, l'outil de votre formation, est hébergé par Mhosaic, au Canada. Les modèles qu'il interroge restent américains." },
  { title: 'Ce que ça coûte', text: "L'outil tel quel : de zéro à environ trente dollars par mois et par personne. Pendant la formation, rien. Plus cher ? En séance 5, si ça en vaut la peine." },
  { title: 'Les solutions d’ici', text: 'Il existe des hébergeurs et des intégrateurs québécois, et votre outil d’aujourd’hui est hébergé au Canada. Les grands modèles, eux, ne sont pas d’ici.' },
];
const SOURCE = 'Source : Stanford AI Index 2026, p. 365.';

const Tile = ({ q, style }: { q: { title: string; text: string }; style?: CSSProperties }) => (
  <div style={{ ...card, ...style }}>
    <h3 style={h3}>{q.title}</h3>
    <p style={{ ...body, fontSize: 'clamp(14px, 1.35vw, 17px)', lineHeight: 1.35 }}>{q.text}</p>
  </div>
);

/* ── s1-e08 content ── */
const HAS = ['brillant et rapide', 'disponible jour et nuit', 'ne se vexe jamais'];
const LACKS = ['aucune idée de votre entreprise', 'il improvise quand la consigne est floue', "rien de ce qu'il écrit n'est vérifié"];
const SEANCES = ['le comprendre', 'lui parler', 'lui donner votre matière', 'le retrouver dans vos outils', 'décider où il vaut son salaire'];

const Icon = ({ ok }: { ok: boolean }) => (
  <svg viewBox="0 0 24 24" width={22} height={22} fill="none" stroke="currentColor" strokeWidth={2.6} strokeLinecap="round" strokeLinejoin="round" style={{ flexShrink: 0, marginTop: 3, color: ok ? 'var(--accent)' : 'var(--gold)' }}>
    <path d={ok ? 'M5 12.5l4.5 4.5L19 6.5' : 'M7 7l10 10M17 7L7 17'} />
  </svg>
);
const Seances = () => (
  <div style={{ marginTop: 'clamp(18px, 3.5vh, 34px)', display: 'grid', gap: 10, justifyItems: 'center' }}>
    <p style={{ ...body, textAlign: 'center' }}>Tout le parcours : apprendre à bien diriger ce stagiaire.</p>
    <ol style={{ listStyle: 'none', padding: 0, margin: 0, display: 'flex', flexWrap: 'wrap', gap: 8, justifyContent: 'center' }}>
      {SEANCES.map((s, i) => (
        <li key={s} className="chip" style={{ fontSize: 'clamp(11px, 1.05vw, 14px)', textTransform: 'none', letterSpacing: 0 }}>
          {i + 1} · {s}
        </li>
      ))}
    </ol>
  </div>
);
const Title = () => (
  <h2 className="headline" style={{ marginInline: 'auto', maxWidth: '22ch', fontSize: 'clamp(30px, 4.4vw, 56px)' }}>
    Un <span className="accent-text">stagiaire surdoué</span> et inépuisable
  </h2>
);

/** B — a gold stamp over the employee card. */
const Stamp = ({ at, text, rot }: { at: number; text: string; rot: number }) => (
  <Build at={at} y={0}>
    <div
      style={{
        display: 'inline-block',
        transform: `rotate(${rot}deg)`,
        border: '3px solid var(--gold)',
        color: 'var(--gold)',
        background: 'var(--gold-soft)',
        borderRadius: 8,
        padding: '6px 14px',
        fontFamily: 'var(--font-mono)',
        fontWeight: 600,
        textTransform: 'uppercase',
        letterSpacing: '0.06em',
        fontSize: 'clamp(13px, 1.4vw, 18px)',
      }}
    >
      {text}
    </div>
  </Build>
);

export default [
  /* s1-e05 */
  <Slide
    key="s1-e05"
    center
    nav="Pourquoi vous êtes ici"
    notes={n(
      "La question n'est plus « si » : où l'appliquer en premier. On part de ce que le groupe a dit avant qu'on se voie.",
      "À l'oral : Canada 35 % utilisent l'IA (É.-U. 28 %) ; 58 % des salariés dans le monde au travail (AI Index 2026)."
    )}
  >
    <Kicker step={1} />
    <p className="lead" style={{ marginBottom: 'clamp(14px, 3vh, 28px)' }}>La question n'est plus…</p>
    <h2 className="headline" style={{ marginInline: 'auto', maxWidth: 'none', color: 'var(--fg-muted)', fontSize: 'clamp(24px, 3.6vw, 50px)' }}>
      {/* the strike sits on the text box itself: one line, so 55 % is the x-height centre at any size */}
      <span style={{ position: 'relative', display: 'inline-block', whiteSpace: 'nowrap' }}>
        « Est-ce que l'IA nous concerne ? »
        <Build at={1} y={0} style={{ position: 'absolute', left: '-2%', right: '-2%', top: '55%', height: 'max(4px, 0.1em)', marginTop: 'min(-2px, -0.05em)', borderRadius: 3, background: 'var(--gold)' }}>
          <span />
        </Build>
      </span>
    </h2>
    <Build at={1} style={{ marginTop: 'clamp(24px, 5vh, 48px)' }}>
      <p className="lead" style={{ marginBottom: 10 }}>mais</p>
      <h2 className="display" style={{ fontSize: 'clamp(40px, 7vw, 100px)', maxWidth: '16ch', marginInline: 'auto' }}>
        « Où, chez nous, <span className="accent-text">en premier</span> ? »
      </h2>
    </Build>
  </Slide>,

  /* s1-e06 */
  <Slide
    key="s1-e06"
    center
    nav="Ce que vous m'avez dit"
    notes={n(
      "Votre profil, rempli à l'inscription : des exemples adaptés à votre contexte pour toute la cohorte.",
      'Les exercices aussi guident chaque séance et la cohorte : plus concret pour vous.',
      "Chiffres de positionnement à l'oral seulement, sans nom (D78) ; jamais la vue staff à l'écran."
    )}
  >
    <div className="kicker" style={{ marginBottom: 10 }}>Avant qu'on se voie</div>
    <h2 className="headline" style={{ marginInline: 'auto' }}>Ce que vous m'avez dit</h2>
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
        gap: 'clamp(16px, 2.4vw, 32px)',
        width: '100%',
        maxWidth: 1040,
        margin: 'clamp(24px, 5vh, 48px) auto 0',
      }}
    >
      {[
        { t: 'Votre profil', d: "Rempli lors de l'inscription à la plateforme : il me permet de guider toute la cohorte avec de bons exemples, adaptés à votre contexte." },
        { t: 'Vos exercices', d: 'Ils guident chacune des séances, et la cohorte : pour que ce soit vraiment plus concret pour vous.' },
      ].map((p, i) => (
        <Reveal key={p.t} delay={0.1 + 0.12 * i}>
          <div style={{ ...card, height: '100%', borderTop: '4px solid var(--accent)' }}>
            <h3 style={{ ...h3, fontSize: 'clamp(20px, 2.2vw, 28px)', marginBottom: 10 }}>{p.t}</h3>
            <p style={{ ...body, fontSize: 'clamp(16px, 1.7vw, 22px)' }}>{p.d}</p>
          </div>
        </Reveal>
      ))}
    </div>
  </Slide>,

  /* s1-e07 */
  <Slide
    key="s1-e07"
    nav="Vos quatre questions"
    notes={n(
      'Une phrase par inquiétude, pas de débat ; coûts : promettre la séance 5, noter au clavardage.',
      'Données : 30 % des Canadiens font confiance aux entreprises pour protéger leurs données (48 % monde). Modèles 2025 : 59 É.-U., 35 Chine, 1 Canada.'
    )}
  >
    <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))', gap: 'clamp(20px, 3vw, 44px)', alignItems: 'center' }}>
      <div style={{ textAlign: 'center' }}>
        <div className="figure" style={{ fontSize: 'clamp(88px, 13vw, 190px)' }}>
          <CountUp to={64} duration={2200} suffix=" %" />
        </div>
        <p className="lead" style={{ marginTop: 12, marginInline: 'auto', maxWidth: '20ch' }}>des Canadiens disent que l'IA les rend nerveux.</p>
        <p style={{ ...source, textAlign: 'center' }}>{SOURCE}</p>
      </div>
      <div>
        <h2 className="headline" style={{ fontSize: 'clamp(26px, 3.4vw, 42px)', marginBottom: 14 }}>Vos quatre questions</h2>
        <div style={{ display: 'grid', gap: 10 }}>
          {QUESTIONS.map((q, i) => (
            <Build key={q.title} at={i < 2 ? 1 : 2}>
              <Tile q={q} style={{ padding: 'clamp(12px, 1.4vw, 18px)' }} />
            </Build>
          ))}
        </div>
      </div>
    </div>
  </Slide>,

  /* s1-e08 */
  <Slide
    key="s1-e08"
    center
    nav="L'image à garder"
    notes={n(
      'Image fil rouge des cinq séances : très rapide, toujours disponible, mais ignorant du contexte et jamais vérifié.',
      'Donc relecture humaine obligatoire, et une consigne à préciser en boucle.'
    )}
  >
    <div className="kicker" style={{ marginBottom: 10 }}>L'image à garder pour tout le parcours</div>
    <Title />
    <div style={{ ...card, position: 'relative', marginTop: 'clamp(18px, 3.5vh, 34px)', marginInline: 'auto', width: 'min(720px, 100%)', boxShadow: 'var(--shadow)' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', borderBottom: '1px solid var(--hair)', paddingBottom: 10, marginBottom: 14 }}>
        <span className="kicker">Fiche d'employé</span>
        <span className="kicker" style={{ color: 'var(--accent)' }}>Poste : stagiaire</span>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(min(260px, 100%), 1fr))', gap: 18, alignItems: 'start' }}>
        <div style={{ display: 'grid', gap: 12 }}>
          {HAS.map((t, i) => (
            <Reveal key={t} delay={0.4 + i * 0.5} y={8}>
              <div style={{ display: 'flex', gap: 12, fontSize: 'clamp(17px, 1.9vw, 24px)' }}>
                <Icon ok />
                {t}
              </div>
            </Reveal>
          ))}
        </div>
        <div style={{ display: 'grid', gap: 14, justifyItems: 'start' }}>
          {LACKS.map((t, i) => (
            <Stamp key={t} at={i + 1} text={t} rot={[-4, 3, -2][i]} />
          ))}
        </div>
      </div>
    </div>
    <Seances />
  </Slide>,
];
