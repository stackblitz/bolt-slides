import BuildersDeck from './builders/BuildersDeck';
import { buildersDeckMeta } from './builders/buildersDeckMeta';
import SampleDeck from './sample/SampleDeck';
import { sampleDeckMeta } from './sample/sampleDeckMeta';
import type { DeckId, RegisteredDeck } from './types';

export const DEFAULT_DECK_ID: DeckId = 'sample';

export const deckRegistry: Record<DeckId, RegisteredDeck> = {
  sample: {
    ...sampleDeckMeta,
    component: SampleDeck,
  },
  builders: {
    ...buildersDeckMeta,
    component: BuildersDeck,
  },
};

export function getRegisteredDeck(deckId: string | null | undefined) {
  if (!deckId) return deckRegistry[DEFAULT_DECK_ID];
  return deckRegistry[deckId as DeckId] ?? deckRegistry[DEFAULT_DECK_ID];
}
