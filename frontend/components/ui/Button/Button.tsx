import { VariantProps, cva, cx } from 'class-variance-authority';
import { AriaAttributes, ButtonHTMLAttributes, FC } from 'react';

const button = cva('button', {
  variants: {
    intent: {
      primary: 'bg-primary-800 hover:bg-primary-900 text-white tracking-wide',
    },
    size: {
      md: ['text-md', 'py-2'],
    },
    round: {
      md: 'rounded-md px-4',
      full: 'rounded-full px-6',
    },
  },
  defaultVariants: {
    intent: 'primary',
    size: 'md',
    round: 'md',
  },
});

export interface ButtonProps
  extends React.DetailedHTMLProps<ButtonHTMLAttributes<HTMLButtonElement>, HTMLButtonElement>,
    AriaAttributes,
    VariantProps<typeof button> {}

export const Button: FC<ButtonProps> = ({
  className,
  children,
  disabled,
  intent,
  size,
  round,
  ...rest
}) => {
  return (
    <button
      className={cx(
        className,
        `flex items-center justify-center rounded-lg uppercase duration-150 ease-in-out`,
        button({ intent, size, round }),
      )}
      disabled={disabled}
      {...rest}
    >
      {children}
    </button>
  );
};
