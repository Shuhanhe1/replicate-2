import { cx } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

export interface ContainerProps {
  children?: ReactNode;
  tag?: keyof JSX.IntrinsicElements;
  className?: string;
}

export const Container: FC<ContainerProps> = ({
  children,
  className,
  tag = 'div',
  ...rest
}) => {
  const Tag = tag;

  return (
    <Tag
      className={cx('container max-w-6xl px-4 xl:px-0', className)}
      {...rest}
    >
      {children}
    </Tag>
  );
};
