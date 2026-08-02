import { cn } from '@src/common/lib/utils';

import styles from './introLoader.module.css';

type CardSize = 'large' | 'medium' | 'small';
type Variant = 1 | 2 | 3 | 4 | 5 | 6;

interface ColumnConfig {
  cards: {
    size: CardSize;
    variant: Variant;
    animationClass: string;
  }[];
}

const columns: ColumnConfig[] = [
  {
    cards: [
      { size: 'small', variant: 2, animationClass: styles['col-1-card-1'] },
      { size: 'large', variant: 5, animationClass: styles['col-1-card-2'] },
      { size: 'medium', variant: 6, animationClass: styles['col-1-card-3'] }
    ]
  },
  {
    cards: [
      { size: 'large', variant: 3, animationClass: styles['col-2-card-1'] },
      { size: 'large', variant: 1, animationClass: styles['col-2-card-2'] }
    ]
  },
  {
    cards: [
      { size: 'medium', variant: 4, animationClass: styles['col-3-card-1'] },
      { size: 'small', variant: 2, animationClass: styles['col-3-card-2'] },
      { size: 'small', variant: 3, animationClass: styles['col-3-card-3'] }
    ]
  }
];

function IntroLoader() {
  return (
    <div className='fixed flex items-center justify-center w-full min-h-screen bg-background'>
      <div className='relative w-47 h-30'>
        <div className='absolute inset-0 flex justify-between'>
          {columns.map((column, index) => (
            <LoaderColumn key={index} column={column} />
          ))}
        </div>

        <div className={cn('absolute bottom-1.5 left-1 w-12.5', styles['loader-card-animate'])}>
          <MovingCard />
        </div>
      </div>
    </div>
  );
}

function LoaderColumn({ column }: { column: ColumnConfig }) {
  return (
    <div className={styles['loader-column']}>
      {column.cards.map((card, index) => (
        <SkeletonCard
          key={index}
          className={card.animationClass}
          size={card.size}
          variant={card.variant}
        />
      ))}
    </div>
  );
}

function SkeletonCard({
  size,
  variant,
  className
}: {
  size: CardSize;
  variant: Variant;
  className?: string;
}) {
  return (
    <div
      className={cn(
        size === 'small' && 'h-6',
        size === 'medium' && 'h-8',
        size === 'large' && 'h-11',
        'overflow-hidden',
        styles['loader-card'],
        styles[`loader-card-${variant}`],
        className
      )}
    >
      <div className={cn('h-1.5 rounded w-3/4 animate-pulse', styles['loader-card-line-1'])} />
      {size !== 'small' && (
        <div className={cn('h-1.5 rounded w-1/2 animate-pulse', styles['loader-card-line-2'])} />
      )}
    </div>
  );
}

function MovingCard() {
  return (
    <div className='w-full h-8 bg-card shadow-md rounded-sm p-1 space-y-1'>
      <div className='h-1.5 bg-muted rounded w-3/4' />
      <div className='h-1.5 bg-muted rounded w-1/2' />
    </div>
  );
}

export { IntroLoader };
