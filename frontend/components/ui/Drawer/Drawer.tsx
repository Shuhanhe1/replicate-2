import { FC, HTMLAttributes, useEffect, useRef, useState } from 'react';
import { useClickOutside } from '../../../common/hooks';
import { useSpring, animated } from '@react-spring/web';
import { IoCloseOutline } from 'react-icons/io5';
import { cx } from 'class-variance-authority';
import { Flex } from '../Flex';

export interface DrawerProps extends HTMLAttributes<HTMLDivElement> {
  isOpen: boolean;
  onClose: () => void;
}

export const Drawer: FC<DrawerProps> = ({
  isOpen,
  onClose,
  className,
  children,
  ...rest
}) => {
  const ref = useRef<HTMLDivElement>(null);
  const [debouncedIsOpen, setDebouncedIsOpen] = useState(isOpen);

  useClickOutside(ref, () => {
    onClose();
  });

  const bodySpring = useSpring({
    right: isOpen ? '0%' : '-100%',
  });

  const containerSpring = useSpring({
    opacity: isOpen ? 1 : 0,
  });

  useEffect(() => {
    let timeout: any;

    if (isOpen) {
      setDebouncedIsOpen(true);
    } else {
      timeout = setTimeout(() => {
        setDebouncedIsOpen(false);
      }, 1000);
    }

    return () => {
      clearTimeout(timeout);
    };
  }, [isOpen]);

  if (!debouncedIsOpen) {
    return null;
  }

  return (
    <>
      <animated.div
        ref={ref}
        className='fixed top-0 z-40 h-full w-64 bg-neutral-900'
        style={bodySpring}
      >
        <Flex justify='end' className='p-5'>
          <IoCloseOutline
            className={cx(
              'cursor-pointer text-3xl text-neutral-500',
              className
            )}
            onClick={onClose}
          />
        </Flex>
        {children}
      </animated.div>
      <animated.div
        className={cx(
          'fixed left-0 top-0 z-30 h-full w-full bg-black bg-opacity-60'
        )}
        style={containerSpring}
        {...rest}
      ></animated.div>
    </>
  );
};
