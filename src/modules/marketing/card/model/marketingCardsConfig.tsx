import { Layers, Palette } from 'lucide-react';

interface MarketingCard {
  description: string;
  icon: React.ReactNode;
  id: string;
  title: string;
}

export const marketingCardsConfig: MarketingCard[] = [
  {
    id: 'boards',
    icon: <Layers />,
    title: 'Powerful Boards',
    description:
      'Organize tasks with intuitive boards and columns. Drag, drop, and collaborate in real-time with your team.'
  },
  {
    id: 'canvas',
    icon: <Palette />,
    title: 'Creative Canvas',
    description:
      'Express ideas visually with our flexible canvas. Draw, annotate, and bring concepts to life.'
  }
];
