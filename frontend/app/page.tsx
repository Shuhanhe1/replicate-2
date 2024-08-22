import { api } from '@/common/api';
import { Paper } from '@/common/types/paper.types';
import { Card } from '@/components/ui/Card';
import { Container } from '@/components/ui/Container';
import { Title } from '@/components/ui/Title';
import Link from 'next/link';

const Home = async () => {
  const { data } = await api.get<{ papers: Paper[] }>('/api/papers');

  return (
    <Container className='mt-8'>
      <Title>Papers</Title>
      <div className='mt-6 flex flex-col gap-8'>
        {data.papers.map((paper) => (
          <Link href={`paper/${paper.id}`}>
            <Card
              key={paper.id}
              className='rounded-lg border border-gray-200 p-4'
              tag='article'
            >
              <Title size='sm' level={2}>
                {paper.title}
              </Title>
              <hr className='my-3' />
              <div className='flex flex-wrap gap-x-2'>
                {paper.authors.map((author, index) => (
                  <span key={author} className='text-gray-600'>
                    {author}
                    {index !== paper.authors.length - 1 && ','}
                  </span>
                ))}
              </div>
              <div className='mt-3 flex flex-wrap justify-end gap-2'>
                {paper.tags?.map((tag) => (
                  <span
                    key={tag}
                    className='rounded-md bg-primary-200 px-2 py-1 text-primary-900'
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </Card>
          </Link>
        ))}
      </div>
    </Container>
  );
};

export default Home;
