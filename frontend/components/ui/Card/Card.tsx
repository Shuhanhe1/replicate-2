import { cx } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

export interface CardProps {
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
  children?: React.ReactNode;
}

export const Card: FC<CardProps> = ({
  children,
  className,
  tag = 'div',
  ...rest
}) => {
  const Tag = tag;

  return (
    <Tag
      className={cx(
        'rounded-lg border border-gray-200 bg-slate-100 p-4',
        className
      )}
      {...rest}
    >
      {children}
    </Tag>
  );
};
