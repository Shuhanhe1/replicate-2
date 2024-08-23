'use client';
import { TabItem, Tabs } from '@/components/ui/Tabs';
import { FC } from 'react';
import { Papers } from './papers/Papers';

export interface AdminLayoutProps {}

const AdminLayout: FC<AdminLayoutProps> = ({}) => {
  const tabItems: TabItem[] = [
    {
      value: 'papers',
      label: 'Papers',
      children: <Papers />,
    },
  ];

  return (
    <div className='container mt-2'>
      <Tabs items={tabItems} defaultValue={tabItems[0].value} />
    </div>
  );
};

export default AdminLayout;
