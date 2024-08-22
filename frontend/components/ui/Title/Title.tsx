import { VariantProps, cva, cx } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

const title = cva('title', {
  variants: {
    color: {
      primary: 'text-primary-800',
    },
    size: {
      xxs: 'text-md',
      xs: 'text-xl',
      sm: 'text-2xl',
      md: 'text-3xl',
      lg: 'text-4xl',
      xl: 'text-5xl',
    },
    uppercase: {
      true: 'uppercase',
    },
  },
  defaultVariants: {
    color: 'primary',
    size: 'sm',
    uppercase: false,
  },
});

export interface TitleProps extends VariantProps<typeof title> {
  children?: ReactNode;
  className?: string;
  level?: 1 | 2 | 3 | 4 | 5 | 6;
}

export const Title: FC<TitleProps> = ({
  children,
  size,
  color,
  uppercase,
  className,
  level = 1,
}) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements;

  return (
    <Tag
      className={cx(
        title({ size, color, uppercase }),
        'font-semibold',
        className
      )}
    >
      {children}
    </Tag>
  );
};
