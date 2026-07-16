import type { ComponentType } from 'react';

export type DeckId = 'sample' | 'builders';

export type DeckMeta = {
  id: DeckId;
  title: string;
  description: string;
  tags?: string[];
  slideCount?: number;
};

export type RegisteredDeck = DeckMeta & {
  component: ComponentType;
};
