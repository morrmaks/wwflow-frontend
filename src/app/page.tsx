import { Suspense } from "react";
import { HeroAction, HeroActionFallback, MarketingSection } from "./(landing)";

export default function Main() {
  return (
    <div className='page-padding min-h-screen mx-auto'>
      <div className='max-w-5xl py-24 md:py-32 text-center space-y-8 mx-auto'>
        <h1 className='md:text-7xl text-5xl mb-8 mt-8 md:mt-12 font-bold text-center text-balance tracking-tight text'>
          The complete platform to organize your work
        </h1>
        <p className='md:text-2xl max-w-3xl mb-8 mx-auto text-xl text-center text-muted-foreground'>
          Manage projects with powerful boards and unleash creativity with our canvas tools. Built
          for teams that value clarity and speed.
        </p>
        <Suspense fallback={<HeroActionFallback />}>
          <HeroAction />
        </Suspense>
      </div>
      <MarketingSection />
    </div>
  );
}
