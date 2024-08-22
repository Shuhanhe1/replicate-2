import { FC, HTMLAttributes, useState } from 'react';
import { MenuItem } from '../../../../../common/types';
import { GoPlus } from 'react-icons/go';
import { TbMinus } from 'react-icons/tb';
import { cx } from 'class-variance-authority';
import { redirect } from '../../../../../common/utils';
import { Flex } from '@/components/ui/Flex';

export interface MobileMenuItemProps extends HTMLAttributes<HTMLDivElement> {
  item: MenuItem;
  level?: number;
}

export const MobileMenuItem: FC<MobileMenuItemProps> = ({
  item,
  level = 0,
}) => {
  const [showChildren, setShowChildren] = useState(false);

  const getPaddingLeft = () => {
    if (item.heading) {
      return (level + 5) * 4;
    }

    return (level + 5) * 6;
  };

  const handleOpenChildren = () => {
    setShowChildren(true);
  };

  const handleCloseChildren = () => {
    setShowChildren(false);
  };

  return (
    <Flex
      justify='between'
      className={cx('cursor-pointer border-y border-zinc-800', {
        'bg-neutral-800': level,
      })}
      onMouseOver={handleOpenChildren}
      onMouseOut={handleCloseChildren}
      vertical
    >
      <Flex
        justify='between'
        className={cx('pr-4', { 'pl-4': !level })}
        style={level ? { paddingLeft: getPaddingLeft() } : {}}
        items='center'
      >
        <div
          className={cx('w-full py-2', {
            'font-semibold': item.heading,
            'text-white': showChildren,
          })}
          onClick={() => item.link && redirect(item.link)}
        >
          {item.title}
        </div>
        <div
          className='px-2 py-2'
          onClick={() => setShowChildren(!showChildren)}
        >
          {(item.children || item.nested) &&
            (showChildren ? (
              <TbMinus className='text-white' />
            ) : (
              <GoPlus className='text-white' />
            ))}
        </div>
      </Flex>
      {item.children &&
        showChildren &&
        level === 0 &&
        item.children.map((children, index) => (
          <Flex vertical key={index}>
            {children.map((child) => (
              <MobileMenuItem
                key={child.title}
                item={child}
                level={level + 1}
              />
            ))}
          </Flex>
        ))}
      <Flex vertical>
        {item.nested &&
          showChildren &&
          item.nested.map((children) => (
            <MobileMenuItem
              key={children.title}
              item={children}
              level={level + 1}
            />
          ))}
      </Flex>
    </Flex>
  );
};
