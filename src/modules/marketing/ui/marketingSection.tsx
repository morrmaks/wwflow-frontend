import { marketingCardsConfig } from '../model/marketingCardsConfig';
import { MarketingCard } from './marketingCard';

export function MarketingSection() {
  return (
    <div className='max-w-6xl mx-auto py-24 grid grid-cols-1 md:grid-cols-2 gap-8'>
      {marketingCardsConfig.map(({ id, icon, title, description }) => (
        <MarketingCard key={id} title={title} description={description} icon={icon} />
      ))}
    </div>
  );
}
