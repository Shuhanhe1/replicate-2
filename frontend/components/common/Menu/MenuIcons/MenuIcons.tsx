import { FC } from 'react';
import { getConductScienceUrl } from '../../../../common/utils';
import { FiGrid } from 'react-icons/fi';
import { FaRegUser } from 'react-icons/fa';
import { FaRegRectangleList } from 'react-icons/fa6';
import { MdOutlineShoppingCart } from 'react-icons/md';
import { cx } from 'class-variance-authority';
import { Flex, FlexProps } from '@/components/ui/Flex';

export interface MenuIconsProps extends Omit<FlexProps, 'children'> {
  hideShopIcon?: boolean;
}

export const MenuIcons: FC<MenuIconsProps> = ({
  className,
  hideShopIcon,
  ...rest
}) => {
  return (
    <Flex
      gap='sm'
      className={cx(
        'text-primary-800 items-center justify-between text-2xl',
        className
      )}
      {...rest}
    >
      {!hideShopIcon && (
        <a href={getConductScienceUrl('shop/')}>
          <FiGrid />
        </a>
      )}
      <a href={getConductScienceUrl('my-account/')}>
        <FaRegUser />
      </a>
      <a href={getConductScienceUrl('request-quote/')}>
        <FaRegRectangleList />
      </a>
      <a href={getConductScienceUrl('cart/')}>
        <MdOutlineShoppingCart />
      </a>
    </Flex>
  );
};
