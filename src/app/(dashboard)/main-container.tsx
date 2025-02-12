import { ReactNode } from 'react';

interface ContainerProps {
  children: ReactNode;
  className?: string;
}

export default function MainContainer({
  children,
  className = '',
}: ContainerProps) {
  return (
    <div className={`flex flex-col px-5 h-full ${className}`}>{children}</div>
  );
}
