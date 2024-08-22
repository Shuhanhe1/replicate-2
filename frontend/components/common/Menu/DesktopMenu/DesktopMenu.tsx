import { FC } from 'react';
import { cx } from 'class-variance-authority';
import { MenuItem } from '../../../../common/types';
import { DesktopMenuItem } from './MenuItem';
import { Flex, FlexProps } from '@/components/ui/Flex';

export interface DesktopMenuProps extends FlexProps {
  menu: MenuItem[];
}

export const DesktopMenu: FC<DesktopMenuProps> = ({
  menu,
  className,
  ...rest
}) => {
  return (
    <Flex className={cx('relative', className)} {...rest}>
      {menu.map((item) => (
        <DesktopMenuItem key={item.title} item={item} />
      ))}
    </Flex>
  );
};
