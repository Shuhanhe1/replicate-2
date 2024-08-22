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
    <Tag className={cx('bg-slate-100', className)} {...rest}>
      {children}
    </Tag>
  );
};
