import Link from 'next/link';

import type { BoardListItemFragment } from '@/common/api/graphql/__generated__';

import { ROUTES } from '@/common/constants/routes';
import { Card, CardDescription, CardHeader, CardTitle } from '@/common/ui/card';

interface BoardListItemProps {
  card: BoardListItemFragment;
}

function BoardListItem({ card }: BoardListItemProps) {
  const { id, name, cardsCount, updatedAt } = card;

  return (
    <Link href={ROUTES.appBoardsId(id)}>
      <Card className='transition-colors hover:border-primary'>
        <CardHeader>
          <CardTitle>{name}</CardTitle>
          <CardDescription className='text-muted-foreground mt-4 flex justify-between'>
            <p>{cardsCount} cards</p>
            <p>{updatedAt}</p>
          </CardDescription>
        </CardHeader>
      </Card>
    </Link>
  );
}

export { BoardListItem };
