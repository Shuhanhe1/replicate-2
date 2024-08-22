import { cx } from 'class-variance-authority';
import { FC, HTMLAttributes } from 'react';

export interface AnchorProps extends HTMLAttributes<HTMLAnchorElement> {
  href?: string;
}

export const Anchor: FC<AnchorProps> = ({ className, href, ...rest }) => {
  return (
    <a
      href={href}
      className={cx('text-primary-700 hover:text-primary-800 hover:underline', className)}
      {...rest}
    />
  );
};
