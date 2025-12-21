interface BaseMotionProps {
  children: React.ReactNode;
  className?: string;
  once?: boolean;
}

export interface MotionPrimitiveProps extends Pick<BaseMotionProps, 'once'> {
  children: (args: { ref: React.RefObject<HTMLDivElement>; isActive: boolean }) => React.ReactNode;
}

type RevealDirection = 'down' | 'left' | 'right' | 'up';
export interface RevealProps extends BaseMotionProps {
  direction?: RevealDirection;
}

export interface FadeProps extends BaseMotionProps {}
