import { useMemo } from 'react';
import { getRegisteredDeck } from './decks/deckRegistry';

export default function App() {
  const deck = useMemo(() => {
    const params = new URLSearchParams(window.location.search);
    return getRegisteredDeck(params.get('deck'));
  }, []);

  const DeckComponent = deck.component;

  return <DeckComponent />;
}
