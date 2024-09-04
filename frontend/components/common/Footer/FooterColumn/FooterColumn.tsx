import { FC, HTMLAttributes } from 'react';
import { cx } from 'class-variance-authority';
import { Title } from '@/components/ui/Title';
import { Anchor } from '@/components/ui/Anchor';

export interface FooterColumnProps
  extends Omit<HTMLAttributes<HTMLDivElement>, 'children'> {
  title: string;
  marker?: boolean;
  items?: {
    title: string;
    link?: string;
  }[];
}

export const FooterColumn: FC<FooterColumnProps> = ({
  title,
  items,
  marker,
  ...rest
}) => {
  return (
    <div {...rest}>
      <Title size='xxs' level={2}>
        {title}
      </Title>
      <ul className='mt-6 flex flex-col gap-3'>
        {items?.map((item, index) => (
          <li
            key={index}
            className={cx('text-primary-800', {
              'list-inside list-disc': marker,
            })}
          >
            {item.link ? (
              <Anchor href={item.link}>{item.title}</Anchor>
            ) : (
              item.title
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};
