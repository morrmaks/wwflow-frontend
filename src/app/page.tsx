import { MotionReveal } from '@/common/ui/motion';
import { HeroAction, MarketingSection } from '@/modules/marketing';

export default function Main() {
  return (
    <div className='container min-h-screen mx-auto'>
      <MotionReveal direction='down'>
        <div className='max-w-5xl py-24 md:py-32 text-center space-y-8 mx-auto'>
          <h1 className='md:text-7xl text-5xl mb-8 mt-8 md:mt-12 font-bold text-center text-balance tracking-tight'>
            The complete platform to organize your work
          </h1>
          <p className='md:text-2xl max-w-3xl mb-8 mx-auto text-xl text-center text-muted-foreground'>
            Manage projects with powerful boards and unleash creativity with our canvas tools. Built
            for teams that value clarity and speed.
          </p>
          <HeroAction />
        </div>
      </MotionReveal>
      <MotionReveal direction='up'>
        <MarketingSection />
      </MotionReveal>
    </div>
  );
}
