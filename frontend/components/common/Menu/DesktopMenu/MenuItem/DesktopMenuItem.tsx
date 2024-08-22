import { cx } from 'class-variance-authority';
import { FC, HTMLAttributes, useState } from 'react';
import { TiArrowSortedDown } from 'react-icons/ti';
import { MdOutlineKeyboardArrowRight } from 'react-icons/md';
import { MenuItem } from '../../../../../common/types';
import { Flex } from '@/components/ui/Flex';

export interface DesktopMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  item: MenuItem;
  level?: number;
}

export const DesktopMenuItem: FC<DesktopMenuItemProps> = ({
  className,
  item,
  level = 0,
  ...rest
}) => {
  const [showChildren, setShowChildren] = useState(false);

  const handleOpenChildren = () => {
    setShowChildren(true);
  };

  const handleCloseChildren = () => {
    setShowChildren(false);
  };

  const Wrapper = item.link ? 'a' : 'div';

  return (
    <Wrapper
      href={item.link}
      className={cx({ relative: !item.fullSize })}
      onMouseOver={handleOpenChildren}
      onMouseLeave={handleCloseChildren}
    >
      <Flex
        className={cx(
          'cursor-pointer px-4 text-sm  hover:text-primary-700',
          level === 0 ? 'py-6' : 'w-64 py-2',
          {
            'mt-8': item.break,
            'text-primary-700': showChildren,
            'text-primary-950': !showChildren,
          },
          className,
        )}
        gap='xs'
        items='center'
        {...rest}
      >
        <span className={cx({ 'text-md font-semibold uppercase': item.heading })}>
          {item.title}
        </span>
        {item.children && level === 0 && <TiArrowSortedDown className='text-gray-300' />}
        {item.nested && level !== 0 && <MdOutlineKeyboardArrowRight className='ml-auto' />}
      </Flex>
      {item.nested && showChildren && level !== 0 && (
        <div className='absolute left-full top-0 z-10 bg-[#F2F2F2]'>
          {item.nested.map((nestedItem) => (
            <DesktopMenuItem
              key={nestedItem.title}
              className={cx('border-y border-r border-gray-200 hover:bg-gray-200')}
              item={nestedItem}
              level={level + 1}
            />
          ))}
        </div>
      )}
      {item.children && showChildren && level === 0 && (
        <Flex
          className={cx('absolute top-full z-10 bg-[#F2F2F2]', {
            'left-0': item.fullSize,
          })}
        >
          {item.children.map((children, index) => (
            <div key={index}>
              {children.map((child) => (
                <DesktopMenuItem
                  key={child.title}
                  className={cx('border-y border-r border-gray-200 hover:bg-gray-200')}
                  item={child}
                  level={level + 1}
                />
              ))}
            </div>
          ))}
        </Flex>
      )}
    </Wrapper>
  );
};
