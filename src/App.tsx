import type { CSSProperties, ReactNode } from 'react';
import Deck from './deck/Deck';
import Slide from './deck/Slide';
import Build from './deck/Build';
import Reveal from './deck/Reveal';
import Cover from './components/Cover';
import Steps from './components/Steps';
import Table from './components/Table';
import Timeline from './components/Timeline';
import Prompt from './components/Prompt';

/* Séance 2 — GrafiCompétences (L'Établi de l'IA). PREVIEW v1.
   Sources: content/ bricks of séance 2, order and cuts per D116–D118.
   Facilitator notes live in `notes` (presenter mode, P). */

const n = (...bullets: string[]) => bullets.map((b) => '• ' + b).join('\n');

const card: CSSProperties = {
  padding: 'clamp(14px, 1.8vw, 22px)',
  borderRadius: 'var(--radius)',
  textAlign: 'left',
};
const small: CSSProperties = {
  fontSize: 'clamp(13px, 1.25vw, 17px)',
  color: 'var(--fg-muted)',
  lineHeight: 1.45,
};
const h3: CSSProperties = {
  fontSize: 'clamp(17px, 1.7vw, 23px)',
  marginBottom: 8,
};
const gap = (g = 20): CSSProperties => ({ marginTop: g });
const stack: CSSProperties = { display: 'grid', gap: 10, alignContent: 'start' };

function Head({
  k,
  title,
  sub,
  center,
}: {
  k?: string;
  title: ReactNode;
  sub?: ReactNode;
  center?: boolean;
}) {
  const c: CSSProperties = center
    ? { textAlign: 'center', marginInline: 'auto' }
    : {};
  return (
    <Reveal>
      {k && (
        <div className="kicker" style={{ marginBottom: 10, ...c }}>
          {k}
        </div>
      )}
      <h2
        className="headline"
        style={{
          fontSize: 'clamp(26px, 3.6vw, 46px)',
          maxWidth: '28ch',
          ...c,
        }}
      >
        {title}
      </h2>
      {sub && (
        <p className="lead" style={{ marginTop: 12, maxWidth: '60ch', ...c }}>
          {sub}
        </p>
      )}
    </Reveal>
  );
}

function Card({
  title,
  children,
  style,
}: {
  title?: ReactNode;
  children?: ReactNode;
  style?: CSSProperties;
}) {
  return (
    <div className="mat" style={{ ...card, ...style }}>
      {title && <h3 style={h3}>{title}</h3>}
      {children && <div style={small}>{children}</div>}
    </div>
  );
}

const SIX = [
  ['Objectif', "Qu'est-ce que je veux obtenir, concrètement ?"],
  ['Contexte', 'Que doit-il savoir (mon rôle, la situation, le destinataire) ?'],
  ['Sources', "Sur quoi doit-il s'appuyer (document, données, exemple) ?"],
  ['Contraintes', 'Que doit-il respecter — et éviter ?'],
  ['Format', 'Quelle forme pour la sortie (liste, tableau, courriel, longueur) ?'],
  ['Critères de qualité', 'À quoi reconnaîtrai-je que c’est bon ?'],
];

function Situation({
  n: num,
  title,
  setup,
  before,
  missing,
  after,
  takeaway,
}: {
  n: number;
  title: string;
  setup: string;
  before: string;
  missing: string[];
  after: string;
  takeaway: string;
  nav?: string;
  notes?: string;
}) {
  return (
    <Slide>
      <Head k={`Situation ${num} · communications graphiques`} title={title} />
      <div
        style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(min(320px, 100%), 1fr))',
          gap: 22,
          marginTop: 18,
          alignItems: 'start',
        }}
      >
        <div style={{ display: 'grid', gap: 12 }}>
          <p style={small}>{setup}</p>
          <Prompt label="Avant" muted size="sm">
            {before}
          </Prompt>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6, alignItems: 'center' }}>
            <span style={{ ...small, marginRight: 4 }}>Il manquait :</span>
            {missing.map((m) => (
              <span key={m} className="chip">
                {m}
              </span>
            ))}
          </div>
          <Build at={1}>
            <p style={{ ...small, color: 'var(--fg)' }}>{takeaway}</p>
          </Build>
        </div>
        <Prompt label="Après" size="sm">
          {after}
        </Prompt>
      </div>
    </Slide>
  );
}

export default function App() {
  return (
    <Deck>
      {/* ── Ouverture ─────────────────────────────────────────── */}
      <Cover
        nav="Ouverture"
        kicker="L'Établi de l'IA · GrafiCompétences · Séance 2"
        title={
          <>
            Utiliser efficacement{' '}
            <span className="accent-text">les modèles de langage</span>
          </>
        }
        subtitle="Lire un prompt, le construire, dialoguer avec le modèle — sur vos vraies tâches."
        foot="En direct sur Zoom · 3 h 30"
        notes={n(
          'Accueil 15 min : présence, LibreChat, tour de micro.',
          'Vérifier la veille que LibreChat répond (GPT-5.5 ; les modèles Claude répondaient 403 le 3 oct).'
        )}
      />

      <Steps
        nav="On s'installe"
        kicker="Accueil"
        title="On s'installe"
        items={[
          { title: 'Je suis présent', body: 'Sur la plateforme, cliquez « Je suis présent ».' },
          { title: 'LibreChat', body: 'Ouvert dans un onglet, prêt à recevoir un prompt.' },
          { title: 'Au micro', body: 'Votre prénom, votre métier, en une phrase.' },
        ]}
      />

      <Slide center nav="Aujourd'hui">
        <Head k="Aujourd'hui" title="Le chemin de la séance" center />
        <div className="cols" style={{ ...gap(28), maxWidth: 1100, marginInline: 'auto' }}>
          <Card title="1 · Vivre">Le mauvais prompt, ensemble.</Card>
          <Card title="2 · Lire">Comment il lit, les six cases, l'ordre, l'exemple.</Card>
          <Card title="3 · Dialoguer">Continuer la conversation, faire critiquer, la boucle.</Card>
          <Card title="4 · Votre métier">Trois situations, les images IA floues.</Card>
          <Card title="5 · Pratiquer">Avant/après en sous-groupes, puis le Promptuaire.</Card>
        </div>
        <p className="lead" style={gap(26)}>
          Gardez sous la main votre <strong>tâche réelle</strong> — celle de
          l'inventaire de la séance 1.
        </p>
      </Slide>

      {/* ── Vivre le mauvais prompt (brique 2) ───────────────── */}
      <Slide
        center
        nav="Le mauvais prompt"
        notes={n(
          'Tout passe par la voix : aucun partage d’écran, rien dans le clavardage.',
          'Le courriel de suivi : une tâche que tout le monde fait, assez banale pour que la réponse soit très générique — l’effet cherché.',
          'En retard ? Une seule question à main levée.'
        )}
      >
        <Head
          k="Exercice · 25 min"
          title="Tout le monde envoie le même prompt"
          sub="Conversation neuve. Rien de plus : pas de nom, pas de contexte, pas de politesse ajoutée."
          center
        />
        <div style={{ ...gap(28), maxWidth: 760, width: '100%', marginInline: 'auto' }}>
          <Prompt size="lg">Écris un courriel de suivi à un client.</Prompt>
        </div>
        <Build at={1}>
          <p className="lead" style={gap(26)}>
            À main levée : l'enverriez-vous <strong>telle quelle</strong>, aujourd'hui,
            à un vrai client ?
          </p>
        </Build>
      </Slide>

      <Slide
        nav="Réponses typiques"
        notes={n(
          'Exemples rédigés pour la formation, montrés quelles que soient les vraies réponses du groupe.',
          'Quelqu’un a ajouté du contexte de lui-même ? Qu’il dise à voix haute ce que ça a changé.',
          'Une réponse qui pose des questions est le meilleur cas : ses questions tombent dans les six cases.'
        )}
      >
        <Head
          k="Exemples de réponses — rédigés pour la formation"
          title="La même demande, trois réponses typiques"
          center
        />
        <div className="cols" style={gap(26)}>
          <Prompt label="Exemple 1 · le gabarit à trous" muted size="sm">
            {`Objet : Suivi de notre échange

Bonjour [Nom du client],

Je fais suite à notre échange concernant [projet]. N'hésitez pas à me faire part de vos questions.

Cordialement,
[Votre nom]`}
          </Prompt>
          <Prompt label="Exemple 2 · le ton passe-partout" muted size="sm">
            {`Bonjour,

J'espère que vous allez bien ! Je souhaitais prendre de vos nouvelles et m'assurer que tout se passe bien de votre côté. Au plaisir de poursuivre notre belle collaboration.`}
          </Prompt>
          <Prompt label="Exemple 3 · la question en retour" muted size="sm">
            {`Avec plaisir ! Pouvez-vous me préciser le client, l'objet du suivi et le ton souhaité ?`}
          </Prompt>
        </div>
        <Build at={1}>
          <p className="lead" style={{ ...gap(24), textAlign: 'center', marginInline: 'auto' }}>
            Aucune ne contient <strong>un seul fait vrai</strong> sur votre client.
          </p>
        </Build>
      </Slide>

      <Slide
        center
        nav="Ce qui manquait"
        notes={n(
          'Notez les mots du groupe tels quels : « pour qui », « quel dossier », « le ton », « la longueur »…',
          'On ne classe pas encore. Vous les regrouperez sous les six cases à l’écran suivant.',
          'Ne coupez jamais cette étape.'
        )}
      >
        <Head
          k="À voix haute · 8 min"
          title={
            <>
              Qu'est-ce qui <span className="accent-text">manquait</span> ?
            </>
          }
          center
        />
        <p className="subhead" style={gap(24)}>
          Chacun, au micro, nomme <strong>une</strong> information que le modèle aurait
          eu besoin de savoir.
        </p>
        <p className="lead" style={gap(18)}>
          Je note tout, en vrac, sur mon écran.
        </p>
      </Slide>

      {/* ── Comment un LLM lit votre prompt (brique 3) ───────── */}
      <Slide
        center
        nav="Comment il lit"
        notes={n(
          'La plupart des « mauvaises réponses » sont des réponses fidèles à un prompt flou.',
          'L’ordre et les contradictions viennent un peu plus loin (ordre, clarté).'
        )}
      >
        <Head
          k="Comment un LLM lit votre prompt"
          title={
            <>
              Il lit tout. <span className="accent-text">Il ne devine rien.</span>
            </>
          }
          center
        />
        <div className="cols" style={{ ...gap(30), maxWidth: 980, marginInline: 'auto', width: '100%' }}>
          <Build at={1}>
            <Card title="Il voit le texte, rien que le texte">
              Votre message, les documents fournis, l'historique. Pas votre intention,
              pas votre contexte d'entreprise, pas « ce qui va de soi ».
            </Card>
          </Build>
          <Build at={2}>
            <Card title="Ce que vous ne dites pas, il l'invente">
              À partir du plus probable. Une réponse générique est presque toujours le
              symptôme d'un prompt qui ne disait pas assez.
            </Card>
          </Build>
        </div>
        <Build at={3}>
          <p className="subhead" style={{ ...gap(28), maxWidth: '40ch' }}>
            Dire = obtenir. Avant de blâmer l'outil, relisez ce que vous lui avez
            réellement donné.
          </p>
        </Build>
      </Slide>

      {/* ── L'anatomie d'un prompt (brique 4) ─────────────────── */}
      <Slide
        center
        nav="Les six cases"
        notes={n(
          'Reprendre mot pour mot la liste notée : « vous venez de nommer six familles d’informations ; les voici. »',
          'Toutes les cases ne servent pas à chaque fois ; une réponse décevante manque presque toujours d’une case précise.'
        )}
      >
        <Head k="L'anatomie d'un prompt" title="Six cases, six questions" center />
        <div className="cols" style={{ ...gap(28), maxWidth: 1100, marginInline: 'auto', width: '100%' }}>
          {SIX.map(([c, q], i) => (
            <Card key={c} title={`${i + 1} · ${c}`}>
              {q}
            </Card>
          ))}
        </div>
      </Slide>

      <Slide nav="Cases 1 à 3">
        <Head k="Les six cases, une par une" title="Objectif, contexte, sources" />
        <div className="cols" style={gap(24)}>
          <div style={stack}>
            <Card title="Objectif — un verbe et un livrable">
              Pas un sujet, une commande.
            </Card>
            <Prompt label="✗ Avant" muted size="sm">
              Aide-moi avec le devis du client Tremblay.
            </Prompt>
            <Prompt label="✓ Après" size="sm">
              Rédige le courriel qui accompagne le devis du client Tremblay.
            </Prompt>
          </div>
          <div style={stack}>
            <Card title="Contexte — qui parle, à qui">
              La case qui transforme un texte passe-partout en votre texte.
            </Card>
            <Prompt label="Exemple" size="sm">
              Je suis chargée de projet dans un atelier d'impression d'une douzaine de
              personnes. Le client est un organisme communautaire qui commande chez nous
              pour la première fois, et le budget est serré.
            </Prompt>
          </div>
          <div style={stack}>
            <Card title="Sources — la matière sous ses yeux">
              Le contexte se <strong>décrit</strong>, la source se <strong>colle</strong>.
            </Card>
            <Prompt label="Exemple" size="sm">
              Voici le devis en question : […]. Voici aussi un courriel du même type que
              j'ai envoyé le mois dernier et qui a bien fonctionné : […].
            </Prompt>
          </div>
        </div>
      </Slide>

      <Slide
        nav="Cases 4 à 6"
        notes={n(
          'Critères de qualité : la case que presque personne ne remplit, et celle qui change le plus la réponse.'
        )}
      >
        <Head k="Les six cases, une par une" title="Contraintes, format, critères de qualité" />
        <div className="cols" style={gap(24)}>
          <div style={stack}>
            <Card title="Contraintes — respecter, et surtout éviter">
              La moitié « éviter » est presque toujours oubliée.
            </Card>
            <Prompt label="Exemple" size="sm">
              150 mots maximum. Aucun terme technique de prépresse. N'annonce aucun délai
              de livraison : ils ne sont pas confirmés.
            </Prompt>
          </div>
          <div style={stack}>
            <Card title="Format — la forme exacte">
              Un texte utilisable tel quel, pas un pavé à découper.
            </Card>
            <Prompt label="Exemple" size="sm">
              Un courriel : une ligne d'objet, deux courts paragraphes, une liste de trois
              points pour les options, une phrase de clôture.
            </Prompt>
          </div>
          <div style={stack}>
            <Card title="Critères — à quoi vous verrez que c'est bon">
              Le modèle reçoit sa propre grille de correction.
            </Card>
            <Prompt label="Exemple" size="sm">
              C'est réussi si le client comprend ce qu'il paie sans avoir besoin de me
              rappeler.
            </Prompt>
          </div>
        </div>
      </Slide>

      <Slide
        nav="Démo · versions 1-2"
        notes={n(
          'Démo en direct, ~10 min, sans réponse figée. Refaire les quatre versions la veille ; garder les captures en secours.',
          'Version 1 : la réponse est bonne — c’est la question qui ne l’était pas.',
          'Remplacer le besoin par un besoin de l’inventaire S1 s’il est plus parlant.'
        )}
      >
        <Head
          k="Démo · un seul besoin, quatre prompts"
          title="Annoncer un service d'impression grand format sur LinkedIn"
        />
        <div className="cols" style={gap(24)}>
          <div style={stack}>
            <Prompt label="Version 1 — l'objectif, vague">
              Écris une publication LinkedIn sur l'impression grand format.
            </Prompt>
            <p style={small}>
              Un texte lisse sur l'impression grand format en général. Rien qui vous
              appartienne.
            </p>
          </div>
          <Build at={1}>
            <div style={stack}>
              <Prompt label="Version 2 — l'objectif, précisé">
                Écris une publication LinkedIn pour annoncer que notre atelier lance un
                service d'impression grand format.
              </Prompt>
              <p style={small}>
                Enfin une annonce, mais interchangeable : n'importe quel atelier du Québec
                pourrait la publier.
              </p>
            </div>
          </Build>
        </div>
      </Slide>

      <Slide
        nav="Démo · versions 3-4"
        notes={n(
          'Version 3 : guetter le « ah, ça, je pourrais le publier » du groupe.',
          'Laisser tomber la dernière phrase à la toute fin.'
        )}
      >
        <Head k="Démo · suite" title="On ajoute les cases, une couche à la fois" />
        <div className="cols" style={gap(22)}>
          <div style={stack}>
            <Prompt label="Version 3 — + contexte et contraintes" size="sm">
              Même demande. Contexte : atelier d'impression d'une douzaine de personnes,
              région de Québec ; nos clients sont des chargés de marketing de PME qui
              n'ont pas de designer à l'interne. Contraintes : 120 mots maximum, aucun
              superlatif, ne promets aucun délai.
            </Prompt>
            <p style={small}>
              Le texte s'adresse enfin à quelqu'un ; les promesses vagues disparaissent.
            </p>
          </div>
          <Build at={1}>
            <div style={stack}>
              <Prompt label="Version 4 — + sources, format, critères" size="sm">
                Même demande, mêmes contraintes. Voici la fiche technique du service :
                […]. Voici une de nos publications qui a bien fonctionné, pour le ton :
                […]. Format : une accroche d'une ligne, trois puces (ce que ça permet,
                pour qui, comment nous joindre), une question de clôture. C'est réussi si
                un chargé de marketing comprend en dix secondes s'il est concerné.
              </Prompt>
              <p style={small}>
                Vos vraies capacités, votre ton, la bonne forme : il reste une relecture.
              </p>
            </div>
          </Build>
        </div>
        <Build at={2}>
          <p className="subhead" style={{ ...gap(22), maxWidth: 'none', textAlign: 'center' }}>
            Entre la version 1 et la version 4, le modèle n'a pas changé.{' '}
            <span className="accent-text">Vous, oui.</span>
          </p>
        </Build>
      </Slide>

      {/* ── Ordre, clarté, contradictions (brique 5) ─────────── */}
      <Slide nav="L'ordre">
        <Head
          k="Ordre, clarté, contradictions"
          title="L'assemblage compte autant que le contenu"
        />
        <div className="cols" style={{ ...gap(24), alignItems: 'start' }}>
          <div style={{ display: 'grid', gap: 12 }}>
            <Card title="Le piège classique">
              Coller trois pages de brief, puis écrire à la fin « peux-tu m'aider avec
              ça ? ». Le modèle reçoit surtout un document… et il le résume.
            </Card>
            <Card title="Le réflexe">
              La consigne en tête, la matière encadrée au milieu, la contrainte qui
              compte vraiment rappelée à la fin.
            </Card>
          </div>
          <Prompt>
            {`Rédige la réponse au brief ci-dessous, en 200 mots, pour un client sans culture graphique.

— DÉBUT DU BRIEF — […] — FIN DU BRIEF —

Rappel : 200 mots, aucun jargon.`}
          </Prompt>
        </div>
      </Slide>

      <Slide nav="Clarté, contradictions">
        <Head k="Ordre, clarté, contradictions" title="Ce qui est flou est tranché sans vous" />
        <div className="cols" style={{ ...gap(24), alignItems: 'start' }}>
          <div style={stack}>
            <Card title="La clarté">
              Une ambiguïté n'est jamais signalée : elle est tranchée en silence. Une
              phrase, une intention.
            </Card>
            <Prompt label="✗ Avant" muted size="sm">
              Fais un truc court pour le client.
            </Prompt>
            <Prompt label="✓ Après" size="sm">
              Réécris ce texte de 250 mots en 90 mots pour le verso d'une carte postale
              5 × 7 po, sans retirer les coordonnées ni changer les faits.
            </Prompt>
          </div>
          <div style={stack}>
            <Card title="Les contradictions">
              « Sois exhaustif mais reste bref » donne un compromis mou. Ne supprimez pas
              la tension : dites laquelle l'emporte.
            </Card>
            <Prompt size="sm">
              Priorité à la brièveté : 120 mots maximum. Si tu dois couper, coupe les
              détails techniques avant les coordonnées.
            </Prompt>
          </div>
        </div>
      </Slide>

      {/* ── Montrez-lui un exemple (brique 6) ─────────────────── */}
      <Slide nav="Montrez un exemple">
        <Head
          k="Montrez-lui un exemple"
          title="Au lieu d'empiler les adjectifs, collez un exemple"
        />
        <div className="cols" style={{ ...gap(24), alignItems: 'start' }}>
          <Prompt label="Avant — la soupe d'adjectifs" muted size="sm">
            Écris un courriel de relance à un client. Ton professionnel mais chaleureux,
            dynamique sans être insistant, concis mais complet.
          </Prompt>
          <Prompt label="Après — l'exemple collé" size="sm">
            {`Voici un courriel de relance que j'ai envoyé le mois dernier et qui a bien fonctionné :

[collez le courriel au complet]

Écris le prochain, dans le même ton et la même structure, pour le dossier suivant : […].`}
          </Prompt>
        </div>
        <div className="cols" style={gap(18)}>
          <Card title="Un pour le ton, deux ou trois pour une règle">
            Pour trier des demandes, montrez deux ou trois cas déjà classés.
          </Card>
          <Card title="L'exemple est une source">
            On le colle, on ne le décrit pas. Un contre-exemple marche aussi.
          </Card>
        </div>
      </Slide>

      {/* ── Le prompt comme conversation (brique 7) ───────────── */}
      <Slide nav="Les trois gestes">
        <Head
          k="Le prompt comme conversation"
          title={
            <>
              On ne recommence pas : <span className="accent-text">on continue.</span>
            </>
          }
          sub="La première réponse est un premier jet. La conversation contient déjà votre contexte."
          center
        />
        <div className="cols" style={gap(26)}>
          <div style={stack}>
            <Card title="Préciser">Ajouter la case qui manquait.</Card>
            <Prompt size="sm">
              Reprends ta réponse. Le destinataire est le propriétaire de l'entreprise,
              pas son équipe marketing.
            </Prompt>
          </div>
          <div style={stack}>
            <Card title="Contraindre">Resserrer ce qui a débordé.</Card>
            <Prompt size="sm">
              Trop long et trop enthousiaste. Refais-le en 120 mots, sans superlatif, en
              gardant les trois options.
            </Prompt>
          </div>
          <div style={stack}>
            <Card title="Relancer">Demander une variante.</Card>
            <Prompt size="sm">
              Donne-moi deux autres versions de l'accroche : une plus directe, une plus
              formelle.
            </Prompt>
          </div>
        </div>
      </Slide>

      <Slide center nav="Repartir à neuf ?">
        <Head k="Le prompt comme conversation" title="Quand repartir à neuf quand même" center />
        <div className="cols" style={{ ...gap(28), maxWidth: 1000, marginInline: 'auto', width: '100%' }}>
          <Card title="Vous changez de tâche">
            Une conversation qui a servi à un devis traîne son vocabulaire.
          </Card>
          <Card title="L'échange s'est enlisé">
            Il tourne en rond ou se contredit : repartez avec un prompt propre, enrichi de
            ce que vous avez appris.
          </Card>
        </div>
        <Build at={1}>
          <p className="subhead" style={{ ...gap(28), maxWidth: '40ch' }}>
            Arrivé à la bonne sortie ? Le chemin parcouru est la version réutilisable de
            votre prompt : <strong>une entrée pour votre Promptuaire</strong>.
          </p>
        </Build>
      </Slide>

      {/* ── Pause ─────────────────────────────────────────────── */}
      <Slide center nav="Pause">
        <div className="kicker">Pause</div>
        <h2 className="display" style={{ ...gap(12), marginInline: 'auto' }}>
          10 <span className="accent-text">min</span>
        </h2>
        <p className="lead" style={gap(18)}>
          On reprend avec la critique.
        </p>
      </Slide>

      {/* ── Faire critiquer sa propre sortie (brique 8) ───────── */}
      <Slide
        nav="Faire critiquer"
        notes={n(
          'La 3e formulation est la plus puissante : c’est la case « critères de qualité » qui la rend possible.'
        )}
      >
        <Head
          k="Faire critiquer sa propre sortie"
          title="Faites-lui relire son travail avant de le relire vous-même"
          center
        />
        <div className="cols" style={gap(26)}>
          <div style={stack}>
            <Card title="1 · Le trou à combler" />
            <Prompt size="sm">
              Relis ta réponse. Qu'est-ce qui lui manque pour être utilisable telle quelle
              par [le destinataire] ? Liste les manques, ne réécris rien pour l'instant.
            </Prompt>
          </div>
          <div style={stack}>
            <Card title="2 · Les faiblesses, puis la correction" />
            <Prompt size="sm">
              Donne-moi les trois faiblesses les plus sérieuses de ce texte, du point de
              vue de [le destinataire]. Puis produis une version corrigée qui les règle.
            </Prompt>
          </div>
          <div style={stack}>
            <Card title="3 · La note et la version à 10" />
            <Prompt size="sm">
              Évalue ce texte sur 10 selon ces critères : [vos critères]. Justifie la note
              critère par critère, puis écris la version qui obtiendrait 10.
            </Prompt>
          </div>
        </div>
      </Slide>

      <Slide center nav="Le piège">
        <Head
          k="Faire critiquer · le piège"
          title={
            <>
              Un deuxième avis, <span className="accent-text">pas un audit</span>
            </>
          }
          sub="La critique sort de la même machine : utile pour un oubli ou une lourdeur, incapable de dire qu'un prix est faux. Les faits, les chiffres et les engagements restent à votre œil de métier."
          center
        />
        <Build at={1}>
          <div className="cols" style={{ ...gap(28), maxWidth: 1000, marginInline: 'auto' }}>
            <Card title="Arrêtez quand la critique devient cosmétique">
              « On pourrait ajouter un mot de transition. »
            </Card>
            <Card title="… ou quand le texte empire">
              Prenez la version que vous aviez deux tours plus tôt.
            </Card>
          </div>
        </Build>
      </Slide>

      {/* ── La boucle, version courte (brique 15) ─────────────── */}
      <Steps
        nav="La boucle"
        kicker="Synthèse du dialogue · 5 min"
        title="La boucle en six étapes, à garder en tête"
        notes={n(
          'Version courte : l’ordre seulement, pas de prompt par étape.',
          'Les étapes 1 et 2 sont les plus sautées ; l’étape 6 nourrit le Promptuaire.'
        )}
        items={[
          { title: 'Définir', body: 'Quoi, exactement, et à quoi je verrai que c’est réussi ?' },
          { title: 'Explorer', body: 'Quelles façons de faire je ne connais pas ?' },
          { title: 'Comprendre', body: 'Ce que je crois savoir est-il juste ?' },
          { title: 'Appliquer', body: 'Comment ça se traduit dans mon contexte ?' },
          { title: 'Évaluer', body: 'Est-ce que le résultat tient la route ?' },
          { title: 'Ajuster', body: 'Qu’est-ce que je garde pour la prochaine fois ?' },
        ]}
      />

      {/* ── Trois situations (brique 9, GC) ──────────────────── */}
      <Slide
        center
        nav="Trois situations"
        notes={n(
          'Le but n’est pas de copier ces prompts : c’est de reconnaître vos propres réflexes dans les « avant ».',
          'Si les contenus générés reviennent : plus de la moitié des nouveaux contenus en ligne seraient générés par l’IA (Graphite, conditionnel ; AI Index 2026, p. 26).'
        )}
      >
        <Head
          k="L'IA dans les communications graphiques"
          title="Trois situations de votre quotidien"
          center
        />
        <div className="cols" style={{ ...gap(30), maxWidth: 900, marginInline: 'auto', width: '100%' }}>
          <Card title={<span className="accent-text" style={{ fontSize: 'clamp(40px,5vw,64px)' }}>+50 %</span>}>
            de publicités produites par personne, dans des équipes marketing, grâce à
            l'IA.
          </Card>
          <Card title={<span className="accent-text" style={{ fontSize: 'clamp(40px,5vw,64px)' }}>17 %</span>}>
            des tâches en arts, design et médias suscitent l'envie de les confier à l'IA
            : les créatifs sont les moins pressés.
          </Card>
        </div>
        <p className="foot" style={gap(22)}>
          Source : Stanford AI Index 2026, p. 219 et 226.
        </p>
      </Slide>

      <Situation
        nav="Le brief flou"
        n={1}
        title="Le brief client flou"
        setup="Le client veut « quelque chose de moderne et de punché ». Il faut un brief sur lequel l'équipe peut travailler."
        before="Fais-moi un brief créatif à partir de la demande du client."
        missing={['Contexte', 'Sources', 'Objectif', 'Format']}
        takeaway="Vous ne lui demandez pas d'écrire le brief : vous lui demandez ce qui manque pour l'écrire — et le brief vient par-dessus."
        after={`Voici le courriel du client, mot pour mot : — DÉBUT — […] — FIN —

Contexte : c'est un [type d'entreprise] qui s'adresse à [sa clientèle]. Nous, on est un atelier de [votre spécialité]. C'est un nouveau client.

Fais deux choses, dans cet ordre. 1) Liste les questions que je dois lui poser avant de démarrer — celles dont la réponse change vraiment le résultat, classées de la plus déterminante à la moins. 2) Rédige un brief provisoire selon ces sections : objectif de communication, public cible, message clé, ton, livrables et formats, contraintes techniques, ce qui reste à confirmer.

Marque en toutes lettres tout ce que tu as dû supposer. N'invente ni budget ni échéance.`}
      />

      <Situation
        nav="Le devis"
        n={2}
        title="Le devis d'impression à expliquer"
        setup="Le devis part chez un client qui ne connaît rien à la production graphique. Vous voulez éviter les trois courriels de questions."
        before="Explique ce devis d'impression simplement au client."
        missing={['Sources', 'Contexte', 'Contraintes', 'Critères']}
        takeaway="L'interdiction d'ajouter prix, délai ou option est la plus importante : un trou non comblé par vous sera comblé par lui, avec aplomb."
        after={`Voici mon devis, tel quel : — DÉBUT — […] — FIN —

Contexte : le client est [rôle] chez [type d'organisation], il ne connaît pas le vocabulaire de l'imprimerie et c'est sa première commande chez nous. Ce qui l'inquiète, c'est [le prix / le délai / la couleur].

Rédige le courriel qui accompagne ce devis : une ligne d'objet, un court paragraphe d'introduction, puis chaque poste du devis expliqué en une phrase — ce que c'est, et pourquoi c'est là.

Contraintes : 200 mots maximum. Aucun terme technique sans une explication de trois mots entre parenthèses. N'ajoute aucun prix, aucun délai et aucune option qui ne soit pas dans le devis ci-dessus.

C'est réussi si le client comprend ce qu'il paie sans avoir à me rappeler.`}
      />

      <Situation
        nav="Décliner un concept"
        n={3}
        title="Décliner un concept en formats"
        setup="Le concept est approuvé pour l'affiche. Le visuel, c'est vous ; les messages, les longueurs et la liste à préparer, c'est là que l'IA fait gagner une heure."
        before="Adapte ce concept pour les réseaux sociaux."
        missing={['Objectif', 'Sources', 'Contraintes', 'Format']}
        takeaway="La dernière phrase rapporte le plus : la liste de production, celle qu'on oublie à moitié quand on la fait de tête à 16 h."
        after={`Voici le texte de l'affiche approuvée : — DÉBUT — […] — FIN — L'intention du concept est : […].

Décline le message — pas le visuel — sur ces supports : publication Instagram, bannière web, infolettre, carton remis en main propre.

Rends-moi un tableau : support · accroche · texte principal · appel à l'action · mentions obligatoires · longueur visée. Une ligne par support.

Contraintes : garde exactement le même message clé partout ; adapte seulement le ton et la longueur. Ne change aucun nom propre ni aucune date. Si un support demande une information que je ne t'ai pas donnée, mets-la en évidence au lieu de l'inventer.

Ajoute ensuite, sous le tableau, la liste des éléments graphiques à préparer pour chaque support.`}
      />

      {/* ── Les images IA floues (brique 11, GC) ──────────────── */}
      <Slide
        center
        nav="Images IA floues"
        notes={n(
          'Minutage : diagnostic 3 min, premier réflexe 1, les deux temps 7 (dont démo), retour client 2, outils 2.',
          'Démo avec un logo flou fabriqué exprès, aucune donnée personnelle. Calcul à voix haute.',
          'Avant la suite : « Qu’est-ce que vous répondez aujourd’hui à ce client ? »'
        )}
      >
        <Head
          k="Les images IA floues"
          title="Le logo fait avec ChatGPT : beau à l'écran, flou à l'impression"
          sub="On ne répare pas l'image : on la refait avec un prompt, pensé pour l'imprimerie."
          center
        />
        <div
          className="mat"
          style={{ ...card, ...gap(28), maxWidth: 820, marginInline: 'auto', textAlign: 'center' }}
        >
          <div className="kicker">Le diagnostic en trente secondes</div>
          <p
            style={{
              fontFamily: 'var(--font-mono)',
              fontSize: 'clamp(18px,2.4vw,32px)',
              marginTop: 10,
            }}
          >
            taille (cm) = pixels ÷ ppp × 2,54
          </p>
          <p style={{ ...small, marginTop: 10 }}>
            1024 px à 300 ppp → <strong>8,7 cm</strong> (petite étiquette) · à 150 ppp,
            grand format vu de loin → <strong>17 cm</strong>
          </p>
        </div>
      </Slide>

      <Slide center nav="Trois fichiers reçus">
        <Head
          k="Trois fichiers reçus par des imprimeurs d'ici"
          title="Pas toujours une question de pixels"
          center
        />
        <div style={{ ...gap(24), width: '100%' }}>
          <Table
            columns={['Le fichier', 'Ce qu’il donne', 'Le vrai problème']}
            rows={[
              ['Étiquette de sauce, 1024 × 1024 px', '8,7 cm à 300 ppp', 'Le logo et le texte ne se modifient pas'],
              ['Autocollant vinyle 127 × 63 cm, 1468 px', '≈ 29 ppp, cinq fois trop peu', 'La résolution : rien ne rattrape l’écart'],
              ['Carte d’affaires, 1536 × 1024 px', 'Assez de pixels', 'Texte figé, pas de fond perdu, couleurs d’écran'],
            ]}
          />
        </div>
        <Build at={1}>
          <p className="subhead" style={{ ...gap(24), maxWidth: '36ch' }}>
            Premier réflexe : « avez-vous gardé <strong>votre prompt</strong> ? »
          </p>
        </Build>
      </Slide>

      <Slide
        nav="Temps 1 · décrire"
        notes={n(
          'Les apprenants font les temps 1 et 2 eux-mêmes dans LibreChat, conversation simple, GPT-5.5. Pas d’agent en séance 2.',
          'Ne jamais montrer la carte d’affaires telle quelle : photo et coordonnées d’une personne réelle (Loi 25).'
        )}
      >
        <Head
          k="Refaire le logo · temps 1"
          title="Faire décrire l'image pour la recréer"
          sub="Collez l'image du client dans votre outil, puis :"
        />
        <div style={gap(22)}>
          <Prompt>
            Décris ce logo pour qu'un graphiste puisse le redessiner à l'identique : les
            formes et leur disposition, chaque couleur avec son code hexadécimal, le style
            (plat, dégradé, 3D, photo), le texte exact et sa place. Ne donne pas ton avis,
            décris.
          </Prompt>
        </div>
        <Build at={1}>
          <div className="mat" style={{ ...card, ...gap(20) }}>
            <h3 style={h3}>Relisez le texte qu'elle a lu</h3>
            <p style={small}>
              Lors de nos essais, « boulangerie de quartier » est devenu « boutonnerie de
              quartier ». Le texte exact, c'est le client qui le confirme.
            </p>
          </div>
        </Build>
      </Slide>

      <Slide nav="Temps 2 · SVG">
        <Head
          k="Refaire le logo · temps 2"
          title="Demander un dessin vectoriel, pas une image"
          sub="Reprenez la description et ajoutez ce que le client ne savait pas : les six cases, côté imprimeur."
        />
        <div className="cols" style={{ ...gap(22), alignItems: 'start' }}>
          <div className="mat" style={card}>
            <ul style={{ ...small, margin: 0, paddingLeft: 18, display: 'grid', gap: 6 }}>
              <li>
                <strong>Objectif</strong> : un logo imprimable, pas une jolie image.
              </li>
              <li>
                <strong>Contexte</strong> : il servira sur [une étiquette, un autocollant
                de 1,2 m, une carte].
              </li>
              <li>
                <strong>Contraintes</strong> : style plat, 2 à 4 couleurs franches (les
                codes relevés), aucun dégradé, aucune ombre, bords nets, fond blanc uni.
              </li>
              <li>
                <strong>Format</strong> : un fichier SVG, aux dimensions finales.
              </li>
              <li>
                <strong>Critères</strong> : chaque forme se distingue nettement de sa
                voisine.
              </li>
            </ul>
          </div>
          <div style={{ display: 'grid', gap: 12 }}>
            <Card title="Il vous écrit le code du dessin">
              Demandez-le « dans un bloc de code » : un bouton Copier apparaît. Collez-le
              dans un fichier texte, enregistrez en .svg, ouvrez-le dans votre logiciel :
              net à 5 cm comme à 5 m.
            </Card>
            <Card title="Ses limites">
              Bien sur un logo simple, fait de formes et d'aplats. Une image regénérée
              reste une image : 768 px, soit 6,5 cm à 300 ppp.
            </Card>
          </div>
        </div>
      </Slide>

      <Slide
        center
        nav="Retour au client"
        notes={n(
          'En fin de démo seulement : l’agent de démo montre l’aperçu du SVG et l’image à 768 px — « cet assistant, vous apprendrez à le construire en séance 3 ».',
          'Outils vérifiés le 2026-10-03 (dépôts GitHub actifs).'
        )}
      >
        <Head k="Les images IA floues" title="Ce que vous renvoyez au client" center />
        <div className="cols" style={{ ...gap(28), maxWidth: 1060, marginInline: 'auto', width: '100%' }}>
          <Card title="Une proposition, pas son logo">
            Un courriel de cinq lignes : ce qui n'allait pas, ce que vous proposez, la
            question qui manque (« quelle police ? »).
          </Card>
          <Card title="Vectoriser une image riche">
            VTracer et Potrace transforment une image en tracés vectoriels.
          </Card>
          <Card title="Agrandir une photo">
            Upscayl et Real-ESRGAN reconstruisent les détails. Les brancher à votre outil
            d'IA : séance 4.
          </Card>
        </div>
      </Slide>

      {/* ── Avant/après en sous-groupes (brique 12, reformatée D116–D118) ── */}
      <Slide
        nav="Avant/après · déroulé"
        notes={n(
          'Tout passe par la voix : aucun partage d’écran d’apprenant, rien dans le clavardage.',
          'Circuler dans chaque salle : « lisez-moi votre prompt ». Pousser vers les critères de qualité.',
          'Noter mot pour mot les formulations gagnantes, et ce qui relève de la séance 3.'
        )}
      >
        <Head
          k="Exercice · 60 min"
          title="Avant/après : le meilleur prompt, en équipe"
          sub="Quatre cas tirés de votre inventaire de la séance 1. Un cas par sous-groupe."
          center
        />
        <div style={{ ...gap(22), maxWidth: 820, marginInline: 'auto', width: '100%' }}>
          <Timeline
            items={[
              {
                time: '10 min',
                title: 'En plénière',
                body: 'Les quatre cas, les six cases, la formation des sous-groupes.',
              },
              {
                time: '35 min',
                title: 'En sous-groupes Zoom de 3 ou 4',
                body: 'Ensemble, écrire le meilleur prompt pour votre cas, le tester, l’améliorer.',
              },
              {
                time: '15 min',
                title: 'Retour en plénière',
                body: 'Chaque groupe lit son prompt « après » et ce que la réponse est devenue.',
              },
            ]}
          />
        </div>
      </Slide>

      <Slide
        center
        nav="Les quatre cas"
        notes={n(
          'Cas à tirer, avant la séance, de la synthèse de l’exercice 1 de l’inventaire S1 de la cohorte.',
          'Retirer noms, prix et coordonnées des cas.'
        )}
      >
        <Head k="Avant/après · les cas" title="Quatre cas, tirés de votre inventaire" center />
        <div className="cols" style={{ ...gap(28), maxWidth: 1100, marginInline: 'auto', width: '100%' }}>
          {[1, 2, 3, 4].map((i) => (
            <div
              key={i}
              className="mat"
              style={{ ...card, borderStyle: 'dashed', minHeight: 'clamp(120px, 22vh, 220px)' }}
            >
              <span className="chip">Sous-groupe {i}</span>
              <h3 style={{ ...h3, marginTop: 12 }}>Cas {i}</h3>
              <p style={small}>Tiré de votre inventaire S1 — à compléter.</p>
            </div>
          ))}
        </div>
      </Slide>

      <Steps
        nav="En sous-groupe"
        kicker="Avant/après · en sous-groupe, 35 min"
        title="Ce que fait votre sous-groupe"
        notes={n(
          'Confidentialité, sans dramatiser : on retire les noms, les prix et les coordonnées.',
          'LibreChat bloqué chez quelqu’un : un coéquipier envoie le prompt et lit la réponse.'
        )}
        items={[
          { title: 'Lire le cas', body: 'Ensemble, à voix haute.' },
          { title: 'L’« avant »', body: 'Un premier prompt spontané. Gardez la sortie.' },
          { title: 'Les six cases', body: 'Remplissez-les et relancez dans la même conversation.' },
          { title: 'Itérer', body: 'Préciser, contraindre, faire critiquer.' },
          { title: 'L’« après »', body: 'Quand la sortie est utilisable. Choisissez qui la lit.' },
        ]}
      />

      <Slide nav="La grille à remplir">
        <Head
          k="Avant/après · ce que chaque groupe produit"
          title="Un prompt « après » qui remplit les six cases"
          sub="Plus la réponse obtenue, et une phrase : quelle case a tout débloqué ?"
          center
        />
        <div
          style={{
            ...gap(24),
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(min(300px, 100%), 1fr))',
            gap: 14,
          }}
        >
          {SIX.map(([c, q]) => (
            <div key={c} className="mat" style={{ ...card, padding: 16 }}>
              <div className="chip" style={{ marginBottom: 8 }}>
                {c}
              </div>
              <p style={small}>{q}</p>
              <div
                style={{
                  marginTop: 10,
                  height: 'clamp(22px, 4vh, 40px)',
                  borderBottom: '1px dashed var(--hair)',
                }}
              />
            </div>
          ))}
        </div>
      </Slide>

      {/* ── Ancrer : le Promptuaire ───────────────────────────── */}
      <Slide
        center
        nav="Promptuaire"
        notes={n(
          'Le livrable de la séance : gardez-lui ses 10 minutes, même si la pratique déborde.',
          'Versez la première entrée vous-même, en direct. Comptez les entrées à voix haute.'
        )}
      >
        <Head
          k="Ancrer · 10 min"
          title={
            <>
              Chaque prompt « après » entre au{' '}
              <span className="accent-text">Promptuaire</span>
            </>
          }
          center
        />
        <div className="cols" style={{ ...gap(28), maxWidth: 1060, marginInline: 'auto', width: '100%' }}>
          <Card title="1 · Un titre de tâche">Sous la tâche métier de l'inventaire.</Card>
          <Card title="2 · Le prompt">
            Noms de clients remplacés par des crochets, pour qu'un collègue le reprenne.
          </Card>
          <Card title="3 · Une ligne">Ce qu'il produit.</Card>
        </div>
        <p className="lead" style={gap(26)}>
          Avant de quitter : trois questions, deux minutes, sur la plateforme.
        </p>
      </Slide>

      <Slide
        center
        nav="Formulations gagnantes"
        notes={n(
          'À remplir pendant la circulation : la phrase exacte qui a débloqué une sortie, mot pour mot, avec le prénom.',
          'Les citer en plénière, puis les verser au Promptuaire.'
        )}
      >
        <Head
          k="Ancrer · ce que ce groupe a trouvé"
          title="Vos formulations gagnantes"
          sub="La phrase exacte qui a débloqué une sortie aujourd'hui."
          center
        />
        <div className="cols" style={{ ...gap(28), maxWidth: 1060, marginInline: 'auto', width: '100%' }}>
          {[1, 2, 3].map((i) => (
            <div key={i} className="mat" style={{ ...card, borderStyle: 'dashed' }}>
              <p style={{ ...small, fontFamily: 'var(--font-mono)' }}>« … »</p>
              <p className="foot" style={gap(10)}>
                — prénom, cas {i}
              </p>
            </div>
          ))}
        </div>
      </Slide>

      {/* ── Pont vers la séance 3 (briques 18, 19) ────────────── */}
      <Slide center nav="Pont vers la S3">
        <Head
          k="Et ensuite"
          title={
            <>
              Et si le modèle connaissait{' '}
              <span className="accent-text">vos documents</span> ?
            </>
          }
          sub="À chaque fois, il faut tout réexpliquer : vos gabarits, vos façons de faire. À la séance 3, on lui donne la matière."
          center
        />
        <Build at={1}>
          <p className="subhead" style={{ ...gap(28), maxWidth: '36ch' }}>
            Une seule chose à faire d'ici là :{' '}
            <strong>choisir les documents que vous nous envoyez</strong>.
          </p>
        </Build>
      </Slide>

      <Slide center nav="La grille de tri">
        <Head k="Envoyez vos documents" title="La grille de tri, à retenir pour toujours" center />
        <div style={{ ...gap(24), width: '100%' }}>
          <Table
            columns={['Niveau', 'C’est quoi', { label: 'On l’envoie ?', align: 'center' }]}
            highlightRow={1}
            rows={[
              ['Public', 'Déjà visible de l’extérieur (site web, brochure)', 'Oui'],
              ['Interne', 'Sans donnée nominative ni sensible (procédure, gabarit)', 'Oui'],
              ['Confidentiel', 'Secrets d’affaires, données clients, chiffres sensibles', 'Non'],
              ['Personnel', 'Renseignements sur des personnes (Loi 25)', 'Jamais'],
            ]}
          />
        </div>
        <p className="lead" style={gap(22)}>
          Dans le doute sur le niveau : on n'envoie pas, on pose la question.
        </p>
      </Slide>

      <Slide
        center
        nav="Envoyez vos documents"
        notes={n(
          'À vérifier avant l’envoi de fin de S2 : adresse de dépôt et objet du courriel, par cohorte.',
          'Durée de conservation et suppression après le parcours : à fixer côté Mhosaic.',
          'Si rien n’arrive, la séance 3 a lieu avec des jeux de documents du secteur.'
        )}
      >
        <Head
          k="Envoyez vos documents"
          title={
            <>
              Votre matière, pour <span className="accent-text">la séance 3</span>
            </>
          }
          center
        />
        <div className="cols" style={{ ...gap(28), maxWidth: 1100, marginInline: 'auto', width: '100%' }}>
          <Card title="Quoi">
            1 ou 2 documents que vous touchez chaque semaine : gabarit de soumission,
            procédure, guide de normes. PDF, Word, Excel — pas de PDF scanné ni de .indd.
          </Card>
          <Card title="Comment, et quand">
            Par courriel, à l'adresse du courriel de fin de séance.{' '}
            <strong>Une semaine avant la séance 3.</strong>
          </Card>
          <Card title="Ce qu'on en fait">
            On refait le tri à la réception et on réécrit les exercices sur votre
            matière. Vos documents restent dans votre cohorte.
          </Card>
        </div>
        <p className="subhead" style={{ ...gap(30), maxWidth: 'none' }}>
          Merci — à la séance 3.
        </p>
      </Slide>
    </Deck>
  );
}
