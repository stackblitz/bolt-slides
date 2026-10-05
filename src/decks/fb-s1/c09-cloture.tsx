import type { CSSProperties } from 'react';
import Slide from '../../deck/Slide';
import Build from '../../deck/Build';
import Reveal from '../../deck/Reveal';
import { card, n } from './ui';
import logoEts from './assets/logo-ets-formation.png';
import logoMhosaic from './assets/logo.png';
import logoFormabois from './assets/logo-formabois.png';

/* Capsule « Clôture » — s1-e37, s1-e38. */

const head: CSSProperties = { fontSize: 'clamp(28px, 3.8vw, 52px)', maxWidth: '26ch' };
const body: CSSProperties = { fontSize: 'clamp(17px, 1.7vw, 24px)', lineHeight: 1.45 };
const center: CSSProperties = { textAlign: 'center', marginInline: 'auto' };

const GARDE = [
  ['📄', <strong key="c">Cheat sheet de séance (gabarit une page)</strong>],
  ['🗂️', 'Je consolide votre inventaire des irritants, avec ses niveaux estimés, et je le dépose dans vos Documents.'],
  ['📖', 'Les mots de la carte des espèces et les cinq niveaux de l’échelle entrent au glossaire (« Vocabulaire »).'],
  ['💡', 'Vos formulations qui ont marché et les pièges qu’on a vécus deviennent des fiches dans le Promptuaire de la cohorte.'],
  ['✍️', 'Avant de quitter : trois questions sur la plateforme, votre retour sur la séance.'],
  ['➡️', 'La séance 2 s’ouvre sur un cas de votre plancher : une demande de soumission à décortiquer, et la consigne qui fait la différence.'],
] as const;

/* Echo of s1-e09 / s1-e10: the two frames, filled with their word. */
const Frame = ({ caption, word }: { caption: string; word: string }) => (
  <div style={{ display: 'grid', gap: 8, justifyItems: 'center' }}>
    <div
      style={{
        width: 'clamp(150px, 20vw, 260px)',
        aspectRatio: '4 / 3',
        display: 'grid',
        placeItems: 'center',
        borderRadius: 'var(--radius)',
        border: '2px dashed var(--hair)',
        background: 'var(--surface)',
        fontFamily: 'var(--font-head)',
        fontWeight: 700,
        fontSize: 'clamp(28px, 3.4vw, 46px)',
      }}
    >
      {word}
    </div>
    <span style={{ fontSize: 'clamp(13px, 1.2vw, 16px)', color: 'var(--fg-muted)' }}>{caption}</span>
  </div>
);

export default [
  /* s1-e37 */
  <Slide
    key="s1-e37"
    center
    nav="Ce qu'on garde"
    notes={n(
      'Écran sans clic : il reste affiché pendant le retour sur la plateforme.',
      'Rappeler les trois questions de retour avant de quitter.'
    )}
  >
    <Reveal>
      <h2 className="headline" style={{ ...head, ...center }}>Ce qu'on garde</h2>
    </Reveal>
    <div style={{ display: 'grid', gap: 10, maxWidth: 980, marginInline: 'auto', marginTop: 'clamp(16px, 3vh, 30px)', textAlign: 'left' }}>
      {GARDE.map(([icon, t], i) => (
        <div key={i} style={{ ...card, display: 'flex', gap: 16, alignItems: 'center', padding: '12px 20px' }}>
          <span aria-hidden style={{ fontSize: 'clamp(20px, 2vw, 28px)' }}>{icon}</span>
          <span style={body}>{t}</span>
        </div>
      ))}
    </div>
  </Slide>,

  /* s1-e38 */
  <Slide
    key="s1-e38"
    center
    nav="Entre les deux séances"
    notes={n(
      'Écho de la démo : même machine, briller puis se tromper ; ce n’est pas la chance, c’est ce qu’on lui écrit.',
      'Teaser S2 : on démonte la consigne. Puis remercier.'
    )}
  >
    <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(14px, 3vw, 36px)', justifyContent: 'center', alignItems: 'center' }}>
      <Frame caption="sur un document réel" word="magie" />
      <Build at={1}>
        <div
          className="display accent-text"
          style={{ fontSize: 'clamp(30px, 4vw, 58px)', padding: '0 clamp(4px, 1vw, 12px)' }}
        >
          le prompt
        </div>
      </Build>
      <Frame caption="hors du document" word="raté" />
    </div>
    <Build at={1} style={{ marginTop: 'clamp(14px, 3vh, 28px)' }}>
      <h2 className="headline" style={{ ...head, ...center }}>
        La différence entre la magie et le raté ? <span className="accent-text">Le prompt.</span>
      </h2>
      <p style={{ ...body, color: 'var(--fg-muted)', maxWidth: '52ch', marginTop: 8, ...center }}>
        Ce n'est pas la chance qui décide : c'est ce qu'on lui écrit. Et ça s'apprend.
      </p>
    </Build>
    <Build at={2} style={{ marginTop: 'clamp(12px, 2.5vh, 24px)' }}>
      <p style={{ ...body, maxWidth: '58ch', ...center }}>
        <strong>À la séance 2</strong>, on démonte la consigne : pourquoi deux demandes qui « veulent dire la même chose »
        ne donnent pas le même résultat, et comment écrire celle qui marche à tous les coups.
      </p>
    </Build>
    <Build at={3} style={{ marginTop: 'clamp(16px, 3.5vh, 34px)' }}>
      <div className="display" style={{ fontSize: 'clamp(38px, 5vw, 72px)', ...center }}>Merci.</div>
      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 'clamp(20px, 4vw, 48px)', justifyContent: 'center', alignItems: 'center', marginTop: 'clamp(12px, 2.5vh, 24px)' }}>
        <img src={logoEts} alt="ÉTS Formation" style={{ height: 'clamp(40px, 6vh, 64px)', width: 'auto' }} />
        <img src={logoFormabois} alt="Formabois" style={{ height: 'clamp(22px, 3.4vh, 36px)', width: 'auto' }} />
        <img src={logoMhosaic} alt="Mhosaic" style={{ height: 'clamp(30px, 4.6vh, 48px)', width: 'auto' }} />
      </div>
    </Build>
  </Slide>,
];
