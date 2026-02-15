import { BoardBackground } from '@/common/api/graphql/__generated__';
import { typedEntries } from '@/common/lib/utils';

interface BoardBackgroundMeta {
  class: string;
  emoji: string;
  label: string;
  type: string;
}

const boardBackgrounds: Record<BoardBackground, BoardBackgroundMeta> = {
  [BoardBackground.Blue]: {
    type: 'solid',
    label: 'Blue',
    emoji: '🔵',
    class: 'bg-board-blue'
  },
  [BoardBackground.Orange]: {
    type: 'solid',
    label: 'Orange',
    emoji: '🟠',
    class: 'bg-board-orange'
  },
  [BoardBackground.Green]: {
    type: 'solid',
    label: 'Green',
    emoji: '🟢',
    class: 'bg-board-green'
  },
  [BoardBackground.Red]: {
    type: 'solid',
    label: 'Red',
    emoji: '🔴',
    class: 'bg-board-red'
  },
  [BoardBackground.Purple]: {
    type: 'solid',
    label: 'Purple',
    emoji: '🟣',
    class: 'bg-board-purple'
  },
  [BoardBackground.Grey]: {
    type: 'solid',
    label: 'Grey',
    emoji: '⚪',
    class: 'bg-board-grey'
  },

  [BoardBackground.GradientBubble]: {
    type: 'gradient',
    label: 'Bubble',
    emoji: '🫧',
    class: 'bg-board-bubble'
  },
  [BoardBackground.GradientSnow]: {
    type: 'gradient',
    label: 'Snow',
    emoji: '❄️',
    class: 'bg-board-snow'
  },
  [BoardBackground.GradientOcean]: {
    type: 'gradient',
    label: 'Ocean',
    emoji: '🌊',
    class: 'bg-board-ocean'
  },
  [BoardBackground.GradientCrystal]: {
    type: 'gradient',
    label: 'Crystal',
    emoji: '🔮',
    class: 'bg-board-crystal'
  },
  [BoardBackground.GradientRainbow]: {
    type: 'gradient',
    label: 'Rainbow',
    emoji: '🌈',
    class: 'bg-board-rainbow'
  },
  [BoardBackground.GradientPeach]: {
    type: 'gradient',
    label: 'Peach',
    emoji: '🍑',
    class: 'bg-board-peach'
  },
  [BoardBackground.GradientFlower]: {
    type: 'gradient',
    label: 'Flower',
    emoji: '🌸',
    class: 'bg-board-flower'
  },
  [BoardBackground.GradientEarth]: {
    type: 'gradient',
    label: 'Earth',
    emoji: '🌎',
    class: 'bg-board-earth'
  },
  [BoardBackground.GradientAlien]: {
    type: 'gradient',
    label: 'Alien',
    emoji: '👽',
    class: 'bg-board-alien'
  },
  [BoardBackground.GradientVolcano]: {
    type: 'gradient',
    label: 'Volcano',
    emoji: '🌋',
    class: 'bg-board-volcano'
  }
};

const boardBackgroundSolids = typedEntries(boardBackgrounds).filter(
  ([, meta]) => meta.type === 'solid'
);

const boardBackgroundGradients = typedEntries(boardBackgrounds).filter(
  ([, meta]) => meta.type === 'gradient'
);

export { boardBackgroundGradients, boardBackgrounds, boardBackgroundSolids };
