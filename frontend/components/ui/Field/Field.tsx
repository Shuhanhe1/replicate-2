import { HTMLProps, forwardRef } from 'react';
import { cx } from 'class-variance-authority';
import { FieldBase, FieldBaseProps } from '../FieldBase';

export interface FieldProps
  extends HTMLProps<HTMLInputElement>,
    FieldBaseProps {
  label?: string;
  error?: string;
  containerClassName?: string;
  disabled?: boolean;
}

export const Field = forwardRef<HTMLInputElement, FieldProps>(
  (
    {
      label,
      error,
      className,
      type = 'text',
      containerClassName,
      fieldSize,
      disabled,
      outlined,
      ...rest
    },
    ref
  ) => {
    return (
      <FieldBase
        label={label}
        error={error}
        className={containerClassName}
        fieldSize={fieldSize}
        disabled={disabled}
        outlined={outlined}
        renderField={({ className: renderClassName }) => (
          <input
            ref={ref}
            type={type}
            className={cx(className, renderClassName)}
            disabled={disabled}
            {...rest}
          />
        )}
      />
    );
  }
);
