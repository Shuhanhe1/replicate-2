import { forwardRef } from 'react';
import { cx } from 'class-variance-authority';
import { Field, FieldProps } from '../Field';

interface FileFieldProps extends Omit<Omit<FieldProps, 'type'>, 'ref'> {}

export const FileField = forwardRef<HTMLInputElement, FileFieldProps>(
  ({ className, ...rest }, ref) => {
    return (
      <div>
        <Field ref={ref} type='file' className={cx(className)} {...rest} />
      </div>
    );
  }
);
