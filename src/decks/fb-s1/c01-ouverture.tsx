import type { CSSProperties } from 'react';
import Slide from '../../deck/Slide';
import Reveal from '../../deck/Reveal';
import { JOUR, Kicker, card, n } from './ui';
import logoEts from './assets/logo-ets-formation.png';
import logoMhosaic from './assets/logo.png';
import logoFormabois from './assets/logo-formabois.png';

/* Capsule « Ouverture » — s1-e01 to s1-e04. */

/* s1-e03 « Le parcours » — the five séance titles of the mandat (brief, from the sommaires). */
const PARCOURS: { n: number; what: string; where?: string }[] = [
  { n: 1, what: "Comprendre l'IA, ses possibilités et ses limites", where: 'Aujourd’hui' },
  { n: 2, what: 'Utiliser efficacement les modèles de langage' },
  { n: 3, what: 'Travailler avec des fichiers, des données et des assistants spécialisés' },
  { n: 4, what: 'Utiliser plusieurs outils' },
  { n: 5, what: 'Identifier la valeur, bâtir des cas d’affaires et préparer une feuille de route' },
];

/* s1-e03 — five chevrons, a road read left to right (not the staircase of « L'échelle »). */
const NOTCH = 'clamp(14px, 1.6vw, 24px)';
const chevron = (first: boolean) =>
  first
    ? `polygon(0 0, calc(100% - ${NOTCH}) 0, 100% 50%, calc(100% - ${NOTCH}) 100%, 0 100%)`
    : `polygon(0 0, calc(100% - ${NOTCH}) 0, 100% 50%, calc(100% - ${NOTCH}) 100%, 0 100%, ${NOTCH} 50%)`;

const logo: CSSProperties = { height: 'clamp(36px, 6vh, 64px)', width: 'auto', objectFit: 'contain' };

const INSTALL = [
  'Sur la plateforme : « Je suis présent ».',
  'LibreChat ouvert dans un onglet.',
  'Au micro : votre prénom, votre métier, en une phrase.',
];

export default [
  /* s1-e01 */
  <Slide key="s1-e01" center nav="Couverture" notes={n('Accueil : logos du mandat, la séance se donne en direct sur Zoom.')}>
    <Reveal>
      <div style={{ display: 'flex', gap: 'clamp(24px, 4vw, 56px)', alignItems: 'center', justifyContent: 'center', flexWrap: 'wrap' }}>
        <img src={logoEts} alt="ÉTS Formation" style={logo} />
        <img src={logoMhosaic} alt="Mhosaic" style={logo} />
        <img src={logoFormabois} alt="Formabois" style={logo} />
      </div>
    </Reveal>
    <Reveal delay={0.08}>
      <div className="kicker" style={{ marginTop: 'clamp(28px, 6vh, 64px)', marginBottom: 14 }}>
        Séance 1 · en direct sur Zoom
      </div>
    </Reveal>
    <Reveal delay={0.16}>
      <h1 className="display" style={{ fontSize: 'clamp(40px, 6.4vw, 92px)', maxWidth: '16ch', marginInline: 'auto' }}>
        Comprendre l'IA, <span className="accent-text">ses possibilités et ses limites</span>
      </h1>
    </Reveal>
    <Reveal delay={0.3}>
      <p className="foot" style={{ marginTop: 'clamp(28px, 6vh, 56px)', maxWidth: '70ch', marginInline: 'auto' }}>
        L'Établi de l'IA est un parcours Mhosaic, offert avec ÉTS Formation pour Formabois, le comité sectoriel de
        main-d'œuvre des industries de la transformation du bois.
      </p>
    </Reveal>
  </Slide>,

  /* s1-e02 */
  <Slide
    key="s1-e02"
    center
    nav="On s'installe"
    notes={n(
      'Trois gestes : présence, LibreChat, prénom et métier au micro.',
      "Avant la séance : accès LibreChat, une vraie tâche choisie, onboarding fait. Pas fait ? Clavardage, on règle ça avant le premier exercice."
    )}
  >
    <Kicker step={0} />
    <h2 className="headline" style={{ marginInline: 'auto' }}>On s'installe</h2>
    <ol style={{ listStyle: 'none', padding: 0, margin: 'clamp(24px, 5vh, 48px) auto 0', display: 'grid', gap: 14, maxWidth: 820, width: '100%' }}>
      {INSTALL.map((t, i) => (
        <li key={t} style={{ ...card, display: 'flex', alignItems: 'center', gap: 18, fontSize: 'clamp(18px, 2.1vw, 26px)' }}>
          <span
            style={{
              flexShrink: 0,
              width: 44,
              height: 44,
              borderRadius: '50%',
              display: 'grid',
              placeItems: 'center',
              fontFamily: 'var(--font-mono)',
              fontWeight: 600,
              color: 'var(--accent)',
              background: 'var(--accent-soft)',
            }}
          >
            {i + 1}
          </span>
          <span>{t}</span>
        </li>
      ))}
    </ol>
    <p className="lead" style={{ marginTop: 'clamp(20px, 4vh, 36px)', fontSize: 'clamp(15px, 1.6vw, 20px)', maxWidth: '56ch' }}>
      Accès, tâche ou onboarding pas encore faits ? Dites-le dans le clavardage : on regarde ça ensemble avant le premier exercice.
    </p>
  </Slide>,

  /* s1-e03 */
  <Slide
    key="s1-e03"
    center
    nav="Le parcours"
    notes={n(
      'Ce que la cohorte va apprendre, en cinq étapes ; moins de cinq minutes.',
      'Demandé par les partenaires : que le parcours soit clair dès la séance 1.',
    )}
  >
    <span className="kicker">Le parcours</span>
    <h2 className="headline" style={{ marginInline: 'auto' }}>Cinq séances, une étape à la fois</h2>
    <div
      style={{
        margin: 'clamp(28px, 6vh, 56px) auto 0',
        width: '100%',
        maxWidth: 1180,
        display: 'grid',
        gridTemplateColumns: `repeat(${PARCOURS.length}, minmax(0, 1fr))`,
        gap: 'clamp(2px, 0.4vw, 6px)',
      }}
    >
      {PARCOURS.map((s, i) => {
        const lit = i === 0;
        return (
          <Reveal key={s.n} delay={0.08 * i} style={{ display: 'grid', gridTemplateRows: 'auto 1fr', gap: 10 }}>
            <span className="kicker" style={{ textAlign: 'center', color: 'var(--accent)', visibility: s.where ? 'visible' : 'hidden' }}>
              {s.where ?? '·'}
            </span>
            <div
              style={{
                clipPath: chevron(i === 0),
                background: lit ? 'var(--accent)' : 'var(--surface-2)',
                color: lit ? 'var(--accent-ink)' : 'var(--fg)',
                padding: `clamp(16px, 2.4vh, 26px) calc(${NOTCH} + 10px) clamp(16px, 2.4vh, 26px) calc(${i === 0 ? '0px' : NOTCH} + 14px)`,
                minHeight: 'clamp(180px, 32vh, 280px)',
                display: 'grid',
                alignContent: 'start',
                gap: 8,
                textAlign: 'left',
              }}
            >
              <span className="kicker" style={{ color: 'inherit', opacity: 0.8 }}>Séance</span>
              <span style={{ fontFamily: 'var(--font-mono)', fontWeight: 600, fontSize: 'clamp(28px, 3.6vw, 48px)', lineHeight: 1, opacity: lit ? 1 : 0.55 }}>
                {s.n}
              </span>
              <span style={{ fontSize: 'clamp(13px, 1.35vw, 18px)', fontWeight: 600, lineHeight: 1.25 }}>{s.what}</span>
            </div>
          </Reveal>
        );
      })}
    </div>
  </Slide>,
  /* s1-e04 */
  <Slide key="s1-e04" center nav="Le chemin d'aujourd'hui" notes={n("Le parcours du jour, d'un coup d'œil ; la même ligne revient en surtitre de chaque capsule.")}>
    <div className="kicker" style={{ marginBottom: 10 }}>Aujourd'hui</div>
    <h2 className="headline" style={{ marginInline: 'auto' }}>Le chemin d'aujourd'hui</h2>
    <ol
      style={{
        listStyle: 'none',
        padding: 0,
        margin: 'clamp(36px, 8vh, 72px) auto 0',
        width: '100%',
        maxWidth: 1180,
        display: 'grid',
        gridTemplateColumns: `repeat(${JOUR.length}, minmax(0, 1fr))`,
        position: 'relative',
      }}
    >
      <span aria-hidden style={{ position: 'absolute', top: 10, left: `${50 / JOUR.length}%`, right: `${50 / JOUR.length}%`, height: 2, background: 'var(--hair)' }} />
      {JOUR.map((step, i) => (
        <Reveal key={step} delay={0.06 * i} style={{ display: 'grid', justifyItems: 'center', gap: 14, padding: '0 6px' }}>
          <span
            style={{
              position: 'relative',
              width: 22,
              height: 22,
              borderRadius: '50%',
              background: i === 0 ? 'var(--accent)' : 'var(--surface)',
              border: `2px solid ${i === 0 ? 'var(--accent)' : 'var(--fg-faint)'}`,
            }}
          />
          <span style={{ fontSize: 'clamp(13px, 1.45vw, 19px)', fontWeight: 600, lineHeight: 1.25, color: i === 0 ? 'var(--accent)' : 'var(--fg)' }}>
            {step}
          </span>
        </Reveal>
      ))}
    </ol>
  </Slide>,
];
