import React from 'react';
import { cn } from '@/lib/utils';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  background?: 'white' | 'gray' | 'gradient-purple' | 'gradient-orange' | 'black';
  padding?: 'sm' | 'md' | 'lg' | 'xl' | 'xxl';
  id?: string;
}

const Section: React.FC<SectionProps> = ({
  children,
  className,
  background = 'white',
  padding = 'lg',
  id
}) => {
  const backgrounds = {
    white: 'bg-white',
    gray: 'bg-neutral-light-gray',
    'gradient-purple': 'bg-gradient-to-br from-primary-violet to-primary-blue',
    'gradient-orange': 'bg-gradient-to-r from-primary-violet via-purple-500 to-primary-orange',
    black: 'bg-neutral-black',
  };

  const paddings = {
    sm: 'py-12 px-4 md:px-6 lg:px-8',
    md: 'py-16 px-4 md:px-6 lg:px-8',
    lg: 'py-20 md:py-28 px-4 md:px-6 lg:px-8',
    xl: 'py-24 md:py-32 px-4 md:px-6 lg:px-8',
    xxl: 'py-32 md:py-44 px-4 md:px-6 lg:px-8',
  };

  return (
    <section
      id={id}
      className={cn(backgrounds[background], paddings[padding], className)}
    >
      <div className="max-w-7xl mx-auto">
        {children}
      </div>
    </section>
  );
};

export default Section;
