import { paperApi } from '@/common/api/paper.api';
import { FC } from 'react';
import { Experiment, Experiments } from './Experiments';
import { Container } from '@/components/ui/Container';
import { Button } from '@/components/ui/Button';

export interface AdminPaperPageProps {
  params: {
    slug: string;
  };
}

const AdminPaperPage: FC<AdminPaperPageProps> = async ({ params }) => {
  const paper = await paperApi.get(params.slug);

  if (!paper) {
    return <div>Not found</div>;
  }

  return (
    <Container>
      {
        <Experiments
          paperSlug={params.slug}
          paperTitle={paper.title}
          data={paper.experiments}
        />
      }
    </Container>
  );
};

export default AdminPaperPage;
