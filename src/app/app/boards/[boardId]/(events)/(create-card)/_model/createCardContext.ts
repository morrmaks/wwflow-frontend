import type { CardContainer } from '@src/common/api/graphql/__generated__';

import { createContext } from 'react';

type CreateCardTarget = {
  container: CardContainer;
  columnId?: string;
  index?: number;
} | null;

interface CreateCardUIState {
  target: CreateCardTarget;
  close: () => void;
  open: (t: CreateCardTarget) => void;
}

const CreateCardUIContext = createContext<CreateCardUIState | null>(null);

export { type CreateCardTarget, CreateCardUIContext };
