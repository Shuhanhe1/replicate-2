import { forwardRef } from 'react';
import { IoSearch } from 'react-icons/io5';
import { cx } from 'class-variance-authority';
import classNames from 'classnames';
import { Field, FieldProps } from '../Field';

export interface SearchFieldProps extends Omit<FieldProps, 'ref'> {
  iconPosition?: 'left' | 'right';
}

export const SearchField = forwardRef<HTMLInputElement, SearchFieldProps>(
  ({ className, containerClassName, iconPosition = 'left', ...rest }, ref) => {
    return (
      <div className={cx('relative', containerClassName)}>
        <IoSearch
          className={classNames(
            'absolute top-2.5 z-10 text-xl',
            iconPosition === 'left' ? 'left-3' : 'right-3'
          )}
        />
        <Field
          ref={ref}
          className={cx(iconPosition === 'left' ? 'pl-10' : 'pr-10', className)}
          {...rest}
        />
      </div>
    );
  }
);
