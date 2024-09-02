import React, { FC, HTMLAttributes } from 'react';
import Link, { LinkProps } from 'next/link';
import { VariantProps, cva, cx } from 'class-variance-authority';

const customLink = cva('custom-link', {
  variants: {
    intent: {
      primary: 'text-primary-900',
    },
  },
  defaultVariants: {
    intent: 'primary',
  },
});

export interface CustomLinkProps
  extends LinkProps,
    VariantProps<typeof customLink> {
  className?: string;
  children?: React.ReactNode;
  target?: string;
}

export const CustomLink: FC<CustomLinkProps> = ({
  children,
  className,
  intent,
  target,
  ...rest
}) => {
  return (
    <Link
      target={target}
      className={cx(className, customLink({ intent }))}
      {...rest}
    >
      {children}
    </Link>
  );
};
