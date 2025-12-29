import { Card, CardContent, CardHeader, CardTitle } from '@/common/ui/card';

interface MarketingCardProps {
  description: string;
  icon: React.ReactNode;
  title: string;
}

export function MarketingCard({ icon, title, description }: MarketingCardProps) {
  return (
    <Card>
      <CardHeader>
        <span className='w-12 h-12 mb-3 rounded-lg bg-primary/10 flex items-center justify-center'>
          {icon}
        </span>
        <CardTitle className=''>{title}</CardTitle>
      </CardHeader>
      <CardContent>
        <p>{description}</p>
      </CardContent>
    </Card>
  );
}
