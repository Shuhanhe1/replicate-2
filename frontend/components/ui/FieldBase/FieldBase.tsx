import { css } from '@emotion/css';
import { useEffect, useRef, useState } from 'react';
import { FC } from 'react';
import { Label } from '../Label';
import { VariantProps, cva, cx } from 'class-variance-authority';

const fieldBase = cva('fieldBase', {
  variants: {
    fieldSize: {
      xs: 'px-2 py-1.5 text-xs',
      sm: 'px-2 py-1.5 text-sm',
      md: 'px-3 py-2.5 text-sm',
      lg: 'px-4 py-3 text-base',
    },
    disabled: {
      true: 'opacity-40',
    },
    outlined: {
      true: 'border-y border-zinc-800 bg-transparent',
      false: 'bg-gray-100 border-b border-primary-700 focus:border-primary-500',
    },
  },
  defaultVariants: {
    fieldSize: 'md',
    disabled: false,
    outlined: false,
  },
});

export interface FieldBaseProps extends VariantProps<typeof fieldBase> {
  label?: string;
  error?: string;
  className?: string;
}

export const FieldBase: FC<
  FieldBaseProps & {
    renderField: (props: { className: string }) => JSX.Element;
  }
> = ({
  label,
  error,
  className,
  renderField,
  fieldSize,
  disabled,
  outlined,
}) => {
  const containerRef = useRef<HTMLDivElement>(null);
  const errorLabelRef = useRef<HTMLLabelElement>(null);

  const [positionErrorLabel, setPositionErrorLabel] = useState<
    'left' | 'right'
  >('right');

  useEffect(() => {
    if (errorLabelRef.current && containerRef.current) {
      if (
        errorLabelRef.current.clientWidth > containerRef.current.clientWidth
      ) {
        setPositionErrorLabel('left');
      } else {
        setPositionErrorLabel('right');
      }
    }
  }, [errorLabelRef.current, containerRef.current, error]);

  return (
    <div
      ref={containerRef}
      className={cx('relative', className, { 'opacity-40': disabled })}
    >
      {label && (
        <Label className={cx({ 'text-red-400': error })}>{label}</Label>
      )}
      {renderField({
        className: cx(
          'w-full border-b focus:outline-none appearance-none cursor-pointer',
          { 'border-red-500 text-red-400': error },
          { 'mt-1': label },
          css`
            &[type='file']::file-selector-button {
              background-color: #1e42a8;
              color: #ffffff;
              padding: 5px 10px;
              border: 0;
              &:hover {
                background-color: #1f3d89;
              }
            }
          `,
          fieldBase({ fieldSize, disabled, outlined })
        ),
      })}
      {error && (
        <label
          ref={errorLabelRef}
          className={cx(
            'text-xs font-medium text-red-400',
            css`
              display: block;
              position: absolute;
              ${positionErrorLabel}: 0;
              bottom: -20px;
              white-space: nowrap;
            `
          )}
        >
          {error}
        </label>
      )}
    </div>
  );
};
