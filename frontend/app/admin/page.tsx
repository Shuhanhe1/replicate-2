import { TabItem, Tabs } from '@/components/ui/Tabs';
import { FC } from 'react';
import { Papers } from './papers/Papers';
import { User } from '@/common/types';
import { AuthForm } from './components';
import { getUserFromHeaders } from '@/common/utils/getUserFromHeaders';

export interface AdminLayoutProps {}

const AdminLayout: FC<AdminLayoutProps> = ({}) => {
  const user = getUserFromHeaders();

  const tabItems: TabItem[] = [
    {
      value: 'papers',
      label: 'Papers',
      children: <Papers />,
    },
  ];

  return (
    <div className='container mt-2'>
      {user ? (
        <Tabs items={tabItems} defaultValue={tabItems[0].value} />
      ) : (
        <AuthForm />
      )}
    </div>
  );
};

export default AdminLayout;
