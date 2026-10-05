import type { CSSProperties, ReactNode } from 'react';
import Slide from '../../deck/Slide';
import Build from '../../deck/Build';
import Reveal from '../../deck/Reveal';
import { Kicker, card, source, n } from './ui';

/* Capsule « L'inventaire des irritants » — s1-e32 to s1-e36.
   Instruction screens stay on while the group works: big type, no motion past the builds. */

const head: CSSProperties = { fontSize: 'clamp(28px, 3.8vw, 52px)', maxWidth: '26ch' };
const body: CSSProperties = { fontSize: 'clamp(17px, 1.7vw, 24px)', lineHeight: 1.45 };
const center: CSSProperties = { textAlign: 'center', marginInline: 'auto' };
const FAMILLES = ['Générer', 'Analyser', 'Chercher'] as const;

/* « l'inventaire du groupe, dessiné comme un document » */
function Doc({ children, style }: { children: ReactNode; style?: CSSProperties }) {
  return (
    <div
      style={{
        ...card,
        position: 'relative',
        borderTop: '6px solid var(--accent)',
        boxShadow: 'var(--shadow)',
        ...style,
      }}
    >
      {children}
    </div>
  );
}

const Arrow = () => (
  <span aria-hidden style={{ fontSize: 'clamp(26px, 3vw, 40px)', color: 'var(--accent)', alignSelf: 'center' }}>
    →
  </span>
);

const COLS = [
  ['Tâche', 'en une ligne, avec un verbe : « rédiger… », « comparer… », « retrouver… »'],
  ['Famille', 'Générer · Analyser · Chercher'],
  ['Gain espéré', 'du temps, moins d’oublis, un premier jet, une charge mentale en moins'],
  ['Risque', 'ce qui fait mal si l’IA se trompe'],
  ['Niveau estimé', '0 à 4, à l’instinct, d’après l’échelle'],
] as const;

const EXEMPLES = [
  ['Rédiger la réponse à une demande de prix reçue par courriel', 'Générer', 'Un premier jet immédiat au lieu de la page blanche, plusieurs fois par semaine', 'Un prix ou un délai inventé ; un ton générique qui ne ressemble pas à la boîte', '1'],
  ['Transformer les commentaires d’épreuve d’un client en liste de corrections claire pour la production', 'Analyser', 'Moins d’allers-retours et moins d’oublis entre le bon à tirer et la presse', 'Une nuance du client aplatie ou perdue', '1'],
  ['Retrouver quel substrat convient pour une enseigne extérieure exposée au sel', 'Chercher', 'Moins d’appels au fournisseur pour une question de base', 'Spécification plausible mais fausse, à valider sur la fiche technique', '1'],
] as const;

const grid: CSSProperties = {
  display: 'grid',
  gridTemplateColumns: '1.4fr 0.8fr 1.2fr 1.2fr 0.7fr',
  gap: 8,
  textAlign: 'left',
  fontSize: 'clamp(12px, 1.15vw, 16px)',
  lineHeight: 1.35,
};
const cell: CSSProperties = { padding: '8px 10px', borderRadius: 8, background: 'var(--surface)', border: '1px solid var(--hair)' };

const DESTINS = [
  ['Séance 2 — le Promptuaire', 'Classé par tâche métier : les vôtres. L’avant/après se fait sur une ligne écrite ici.'],
  ['Séance 3 — l’assistant spécialisé', 'Construit sur la tâche la plus citée du groupe.'],
  ['Séance 5 — le cas d’affaires', 'L’inventaire ressort tel quel : le gain et le risque d’aujourd’hui deviennent deux des huit questions de la fiche.'],
] as const;

export default [
  /* s1-e32 */
  <Slide
    key="s1-e32"
    center
    nav="Consigne — inventaire"
    notes={n(
      'Ouvrir le gabarit de collecte à l’écran ; il est déposé dans les Documents de la cohorte.',
      'Un seul livrable : l’inventaire du groupe, tâches réelles par famille, gain et risque.'
    )}
  >
    <Kicker step={7} />
    <Reveal>
      <h2 className="headline" style={{ ...head, ...center }}>
        Un seul livrable : <span className="accent-text">l'inventaire du groupe</span>
      </h2>
    </Reveal>
    <div
      style={{
        display: 'flex',
        flexWrap: 'wrap',
        justifyContent: 'center',
        gap: 'clamp(12px, 2vw, 24px)',
        marginTop: 'clamp(20px, 4vh, 40px)',
        maxWidth: 1150,
        marginInline: 'auto',
      }}
    >
      {[
        ['1', 'Chacun pour soi', 'Après le cadrage, votre propre liste.'],
        ['2', 'En plénière', 'La mise en commun.'],
      ].map(([k, t, d]) => (
        <div key={k} style={{ display: 'flex', gap: 'clamp(12px, 2vw, 24px)' }}>
          <div style={{ ...card, minWidth: 220, maxWidth: 280 }}>
            <div className="figure" style={{ fontSize: 'clamp(28px, 3vw, 42px)', color: 'var(--accent)' }}>{k}</div>
            <div style={{ ...body, fontWeight: 600 }}>{t}</div>
            <div style={{ ...body, color: 'var(--fg-muted)', fontSize: 'clamp(15px, 1.4vw, 19px)' }}>{d}</div>
          </div>
          <Arrow />
        </div>
      ))}
      <Doc style={{ minWidth: 280, maxWidth: 380 }}>
        <div style={{ ...body, fontWeight: 700 }}>L'inventaire du groupe</div>
        <ul style={{ ...body, fontSize: 'clamp(15px, 1.4vw, 19px)', margin: '10px 0 0', paddingLeft: '1.1em', display: 'grid', gap: 4 }}>
          <li>Des tâches réelles</li>
          <li>Classées par famille</li>
          <li>Avec le gain espéré et le risque</li>
        </ul>
        <div style={{ ...source, marginTop: 12, color: 'var(--fg-muted)' }}>Versé dans les Documents de la cohorte, le jour même</div>
      </Doc>
    </div>
  </Slide>,

  /* s1-e33 */
  <Slide
    key="s1-e33"
    center
    nav="Le cadrage"
    notes={n(
      'On part de l’irritant, pas de l’outil.',
      'Si le groupe doute : sur 844 tâches étudiées, les travailleurs voulaient en confier 46 % à l’IA, d’abord pour libérer du temps (AI Index 2026, p. 225).'
    )}
  >
    <Reveal>
      <p className="kicker" style={center}>Une seule question pour tout l'exercice</p>
      <h2 className="display" style={{ fontSize: 'clamp(36px, 5.6vw, 80px)', maxWidth: '20ch', marginTop: 12, ...center }}>
        Qu'est-ce qui vous prend du temps chaque semaine, <span className="accent-text">sans rien vous apporter ?</span>
      </h2>
    </Reveal>
    <p style={{ ...body, fontSize: 'clamp(20px, 2.2vw, 30px)', marginTop: 'clamp(18px, 4vh, 36px)', ...center }}>
      Pas « où pourrait-on mettre de l'IA » : on part de l'irritant, pas de l'outil.
    </p>
    <p style={{ ...body, color: 'var(--fg-muted)', maxWidth: '56ch', marginTop: 'clamp(12px, 2.5vh, 24px)', ...center }}>
      Les gains les plus nets : des tâches bien définies, qui reviennent souvent, et dont on voit vite si le résultat est bon. C'est ce qu'on cherche.
    </p>
    <p style={{ ...source, ...center }}>Source : Stanford AI Index 2026, p. 219.</p>
  </Slide>,

  /* s1-e34 — example rows are from the graphic-communications sector, as in the brief (content fix pending upstream). */
  <Slide
    key="s1-e34"
    center
    nav="Individuellement"
    notes={n(
      'Chacun seul, depuis son agenda et ses courriels : 5 à 8 lignes, niveau 0 à 4 à l’instinct.',
      'Les trois exemples sont au niveau 1 : normal, c’est là que se joue l’essentiel.',
      'Tâche hors des trois familles : la garder.'
    )}
  >
    <p style={{ ...body, maxWidth: '62ch', ...center }}>
      Ouvrez votre agenda ou vos courriels des deux dernières semaines : <strong>la mémoire ment, l'agenda non.</strong>{' '}
      Une ligne par tâche, <strong className="accent-text">visez 5 à 8 lignes</strong>, notez tout, même le banal.
    </p>
    <div style={{ maxWidth: 1240, marginInline: 'auto', marginTop: 'clamp(12px, 2.5vh, 24px)', display: 'grid', gap: 8 }}>
      <div style={grid}>
        {COLS.map(([t, d]) => (
          <div key={t} style={{ ...cell, background: 'var(--accent-soft)', border: 'none' }}>
            <div style={{ fontWeight: 700, fontSize: 'clamp(14px, 1.4vw, 19px)', color: 'var(--accent)' }}>{t}</div>
            <div style={{ color: 'var(--fg-muted)' }}>{d}</div>
          </div>
        ))}
      </div>
      <Build at={1} style={{ display: 'grid', gap: 8 }}>
        <div style={{ ...source, marginTop: 0, textAlign: 'left' }}>Exemple, trois lignes fictives (secteur des communications graphiques)</div>
        {EXEMPLES.map((r) => (
          <div key={r[0]} style={grid}>
            {r.map((c, i) => (
              <div key={i} style={{ ...cell, fontWeight: i === 4 ? 700 : undefined, textAlign: i === 4 ? 'center' : 'left' }}>{c}</div>
            ))}
          </div>
        ))}
      </Build>
    </div>
    <Build at={2} style={{ marginTop: 'clamp(10px, 2vh, 18px)' }}>
      <p style={{ ...body, fontSize: 'clamp(15px, 1.5vw, 20px)', maxWidth: '70ch', ...center }}>
        Trois lignes au niveau 1 : c'est normal. Le niveau monte quand la tâche exige <strong>vos</strong> documents (2) ou plusieurs outils enchaînés (3).
        Une tâche hors des trois familles ? Gardez-la quand même.
      </p>
    </Build>
  </Slide>,

  /* s1-e35 */
  <Slide
    key="s1-e35"
    center
    nav="En plénière"
    notes={n(
      'Regrouper les lignes par famille à l’écran : les mêmes irritants reviennent d’une entreprise à l’autre.',
      'Finir par la colonne risque : repérer ce que hallucinations et confidentialité couvrent déjà.'
    )}
  >
    <Reveal>
      <h2 className="headline" style={{ ...head, ...center }}>En plénière</h2>
      <p style={{ ...body, maxWidth: '56ch', marginTop: 10, ...center }}>
        Chacun donne une ligne : celle qui l'irrite le plus, ou celle dont il n'est pas sûr.
      </p>
    </Reveal>
    <div className="cols" style={{ gap: 16, maxWidth: 1150, marginInline: 'auto', marginTop: 'clamp(16px, 3vh, 30px)' }}>
      {FAMILLES.map((f) => (
        <div key={f} style={{ ...card, minHeight: 'clamp(160px, 28vh, 300px)' }}>
          <div style={{ fontFamily: 'var(--font-head)', fontWeight: 700, fontSize: 'clamp(22px, 2.4vw, 32px)', color: 'var(--accent)', textAlign: 'center' }}>
            {f}
          </div>
          <div style={{ display: 'grid', gap: 12, marginTop: 16 }} aria-hidden>
            {[0, 1, 2].map((i) => (
              <div key={i} style={{ height: 26, borderRadius: 6, border: '2px dashed var(--hair)' }} />
            ))}
          </div>
        </div>
      ))}
    </div>
    <p style={{ ...body, fontWeight: 600, marginTop: 'clamp(16px, 3vh, 28px)', ...center }}>
      Les mêmes tâches reviennent d'une entreprise à l'autre.
    </p>
    <p style={{ ...body, fontSize: 'clamp(15px, 1.4vw, 19px)', color: 'var(--fg-muted)', maxWidth: '64ch', marginTop: 6, ...center }}>
      On termine par la colonne risque : quels dangers reviennent, lesquels sont déjà couverts par ce qu'on a vu sur les hallucinations et la confidentialité.
    </p>
  </Slide>,

  /* s1-e36 */
  <Slide
    key="s1-e36"
    nav="Résultat cible — inventaire"
    notes={n(
      'Inventaire consolidé déposé le jour même dans les Documents ; chacun repart avec sa liste.',
      'Il ressert au Promptuaire (S2), à l’assistant (S3) et au cas d’affaires (S5).'
    )}
  >
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: 'repeat(auto-fit, minmax(min(380px, 100%), 1fr))',
        gap: 'clamp(20px, 4vw, 56px)',
        alignItems: 'center',
        maxWidth: 1200,
        marginInline: 'auto',
      }}
    >
      <Doc>
        <div className="kicker">Résultat cible</div>
        <h2 className="headline" style={{ fontSize: 'clamp(26px, 3vw, 40px)', marginTop: 6 }}>L'inventaire du groupe</h2>
        <p style={{ ...body, fontSize: 'clamp(15px, 1.4vw, 19px)', color: 'var(--fg-muted)', marginTop: 8 }}>
          Des tâches réelles, classées par famille, avec le gain espéré et le risque. Déposé dans les Documents de la cohorte le jour même.
        </p>
        <ol style={{ ...body, fontSize: 'clamp(15px, 1.4vw, 19px)', margin: '12px 0 0', paddingLeft: '1.3em', display: 'grid', gap: 6 }}>
          <li>Vous repartez avec <strong>votre</strong> courte liste : un point de départ pour lundi matin.</li>
          <li>Vos irritants communs, et ce que la suite du parcours vient régler.</li>
          <li>Une banque de tâches réelles où les séances 2 à 5 puisent.</li>
        </ol>
      </Doc>
      <div style={{ display: 'grid', gap: 14 }}>
        {DESTINS.map(([t, d], i) => (
          <Build key={t} at={i + 1}>
            <div style={{ display: 'flex', gap: 14, alignItems: 'center' }}>
              <Arrow />
              <div style={{ ...card, flex: 1 }}>
                <div style={{ ...body, fontWeight: 700 }}>{t}</div>
                <div style={{ ...body, fontSize: 'clamp(14px, 1.3vw, 18px)', color: 'var(--fg-muted)' }}>{d}</div>
              </div>
            </div>
          </Build>
        ))}
        <Build at={3}>
          <p style={{ ...body, fontWeight: 600, color: 'var(--accent)', textAlign: 'center' }}>
            Ce que vous écrivez aujourd'hui, vous le retrouverez en séance 5.
          </p>
        </Build>
      </div>
    </div>
  </Slide>,
];
