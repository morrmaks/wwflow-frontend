'use client';
import { ArrowRightIcon } from 'lucide-react';
import Link from 'next/link';

import { MarketingCard } from '@/shared/components/marketingCard';
import { marketingCardsConfig } from '@/shared/components/marketingCard/marketingCardsConfig';
import { Motion } from '@/shared/components/motion';
import { Button } from '@/shared/ui/button';

export default function Main() {
  return (
    <div className='flex min-h-screen items-center justify-center font-sans'>
      <main className='container min-h-screen mx-auto'>
        <Motion.Reveal direction='down'>
          <div className='max-w-5xl py-24 md:py-32 text-center space-y-8'>
            <h1 className='md:text-7xl text-5xl mb-8 mt-8 md:mt-12 font-bold text-center text-balance tracking-tight'>
              The complete platform to organize your work
            </h1>
            <p className='md:text-2xl max-w-3xl mb-8 mx-auto text-xl text-center text-muted-foreground'>
              Manage projects with powerful boards and unleash creativity with our canvas tools.
              Built for teams that value clarity and speed.
            </p>
            <Button asChild className='py-4' size='lg' variant='default'>
              <Link href='/login'>
                Get started
                <ArrowRightIcon className='ml-1 h-4 w-4' />
              </Link>
            </Button>
          </div>
        </Motion.Reveal>
        <Motion.Reveal direction='up'>
          <div className='max-w-6xl mx-auto py-24 grid grid-cols-1 md:grid-cols-2 gap-8'>
            {marketingCardsConfig.map(({ id, icon, title, description }) => (
              <MarketingCard key={id} title={title} description={description} icon={icon} />
            ))}
          </div>
        </Motion.Reveal>
      </main>
    </div>
  );
}
