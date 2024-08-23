import {
  TabsContent,
  TabsList,
  Tabs as ShadcnTabs,
  TabsTrigger,
} from '@/components/shadcn/ui/tabs';
import { VariantProps, cva, cx } from 'class-variance-authority';
import { FC, ReactNode } from 'react';

const tabsList = cva('tabs-list', {
  variants: {
    align: {
      start: 'justify-start',
      center: 'justify-center',
      end: 'justify-end',
    },
  },
  defaultVariants: {
    align: 'center',
  },
});

export interface TabItem {
  value: string;
  label: string | ReactNode;
  children: ReactNode;
  disabled?: boolean;
}

export interface TabsProps extends VariantProps<typeof tabsList> {
  items: TabItem[];
  defaultValue?: string;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export const Tabs: FC<TabsProps> = ({
  items,
  defaultValue,
  value,
  onChange,
  className,
  align,
}) => {
  return (
    <ShadcnTabs
      defaultValue={defaultValue}
      value={value}
      onValueChange={onChange}
      className={className}
    >
      <TabsList
        className={cx(
          'flex h-full flex-wrap bg-slate-100',
          tabsList({ align })
        )}
      >
        {items.map((item) => (
          <TabsTrigger
            key={item.value}
            value={item.value}
            disabled={item.disabled}
          >
            {item.label}
          </TabsTrigger>
        ))}
      </TabsList>
      {items.map((item) => (
        <TabsContent className='mt-8' key={item.value} value={item.value}>
          {item.children}
        </TabsContent>
      ))}
    </ShadcnTabs>
  );
};
