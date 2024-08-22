import { VariantProps, cva, cx } from 'class-variance-authority';
import { HTMLAttributes, forwardRef } from 'react';

const flex = cva('div', {
  variants: {
    gap: {
      xs: 'gap-1',
      sm: 'gap-2',
      md: 'gap-6',
      lg: 'gap-10',
      xl: 'gap-14',
      '2xl': 'gap-20',
      '3xl': 'gap-28',
      '4xl': 'gap-36',
      '5xl': 'gap-40',
    },
    vertical: {
      true: 'flex-col',
    },
    wrap: {
      true: 'flex-wrap',
    },
    justify: {
      start: 'justify-start',
      end: 'justify-end',
      center: 'justify-center',
      between: 'justify-between',
      around: 'justify-around',
      evenly: 'justify-evenly',
    },
    items: {
      start: 'items-start',
      end: 'items-end',
      center: 'items-center',
      baseline: 'items-baseline',
      stretch: 'items-stretch',
    },
  },
  defaultVariants: {
    vertical: false,
    wrap: false,
  },
});

export interface FlexProps extends HTMLAttributes<HTMLDivElement>, VariantProps<typeof flex> {}

export const Flex = forwardRef<HTMLDivElement, FlexProps>(({ className, ...rest }, ref) => {
  return <div ref={ref} className={cx('flex', flex(rest), className)} {...rest} />;
});
