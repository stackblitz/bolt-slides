import Deck from '../../deck/Deck';
import './theme.css';
import c01 from './c01-ouverture';
import c02 from './c02-pourquoi';
import c03 from './c03-magie';
import c04 from './c04-generative';
import c05 from './c05-a-quoi-ca-sert';
import c06 from './c06-especes-echelle';
import c07 from './c07-limites';
import c08 from './c08-inventaire';
import c09 from './c09-cloture';

/* Séance 1 — Formabois (L'Établi de l'IA). Built from
   app-formation-ai conception/generes/mandats/formabois/seances/seance-1/brief.md
   (storyboard D122). One file per capsule, each exporting its slides in order. */
document.title = 'Séance 1 — Formabois';

export default function FbS1() {
  return <Deck>{[...c01, ...c02, ...c03, ...c04, ...c05, ...c06, ...c07, ...c08, ...c09]}</Deck>;
}
