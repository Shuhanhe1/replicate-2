import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from '@/components/shadcn/ui/dialog';
import { DialogProps } from '@radix-ui/react-dialog';
import { VariantProps, cva, cx } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

const modal = cva('modal', {
  variants: {
    width: {
      default: 'sm:max-w-sm',
      lg: 'sm:max-w-lg',
      xl: 'sm:max-w-xl',
      '2xl': 'sm:max-w-2xl',
      '3xl': 'sm:max-w-3xl',
      '4xl': 'sm:max-w-4xl',
      '5xl': 'sm:max-w-[70%]',
      '6xl': 'sm:max-w-[80%]',
      full: 'sm:max-w-[98%]',
    },
  },
  defaultVariants: {
    width: 'default',
  },
});

export interface ModalProps extends DialogProps, VariantProps<typeof modal> {
  title?: string;
  description?: string;
  children?: ReactNode;
  footer?: ReactNode;
  contentClassName?: string;
}

export const Modal: FC<ModalProps> = ({
  title,
  description,
  footer,
  children,
  contentClassName,
  width,
  ...rest
}) => {
  return (
    <Dialog {...rest}>
      <DialogContent className={cx(modal({ width }), contentClassName)}>
        <DialogHeader>
          {title && <DialogTitle>{title}</DialogTitle>}
          {description && <DialogDescription>{description}</DialogDescription>}
        </DialogHeader>
        {children && (
          <div
            style={{ maxHeight: 'calc(100svh - 150px)' }}
            className='overflow-y-auto px-1 pb-2 pt-1'
          >
            {children}
          </div>
        )}
        {footer && <DialogFooter>{footer}</DialogFooter>}
      </DialogContent>
    </Dialog>
  );
};
