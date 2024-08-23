import { api } from '@/common/api';
import { Paper, PaperDetailed } from '@/common/types/paper.types';
import { Metadata } from 'next';
import { FC, cache } from 'react';
import { Title } from '@/components/ui/Title';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { cx } from 'class-variance-authority';
import { Table } from '@/components/ui/Table';

export interface PaperPageProps {
  params: {
    id: string;
  };
}

const getPaper = cache(async (id: number | string): Promise<PaperDetailed> => {
  const response = await api.get(`/paper/${id}`);
  return response.data;
});

export const generateMetadata = async ({
  params,
}: PaperPageProps): Promise<Metadata> => {
  const paper = await getPaper(params.id);
  return {
    title: `${paper.title} - Conduct Science`,
    // description: `${paper.instructions ? paper.instructions.join('\n') : paper.title} page`,
  };
};

const PaperPage: FC<PaperPageProps> = async ({ params }) => {
  const paper = await getPaper(params.id);

  return (
    <Container className='mt-8' tag='article'>
      <div className='flex justify-between gap-4'>
        <div className='w-full md:w-7/12'>
          <Title size='md' uppercase>
            {paper.title}
          </Title>
          {/* <Flex gap='sm' className='mt-10'>
          <Rate defaultValue={4} allowHalf />
          <span>4 from 19 votes</span>
        </Flex> */}
          <div className='mt-4 flex flex-col gap-4'>
            <div className='mt-3 flex flex-wrap gap-2'>
              {paper.tags?.map((tag) => (
                <span
                  key={tag}
                  className='rounded-md bg-primary-100 px-2 py-1 text-primary-900'
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className='text-lg'>
              <span className='font-semibold uppercase'>Authors:</span>
              <span>
                {' '}
                {paper.authors?.length
                  ? paper.authors?.map((author, index) => (
                      <span key={author} className='text-gray-600'>
                        {author}
                        {index !== (paper.authors?.length || 0) - 1 && ','}
                      </span>
                    ))
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
        <Image src='/images/lab.jpg' alt='lab' width={500} height={500} />
      </div>
      <div className='mt-8'>
        <Title size='md' uppercase level={2}>
          Experiments
        </Title>
        <div className='mt-6'>
          <ul className='flex flex-col gap-8'>
            {paper.experiments.map((experiment, index) => (
              <Card key={index}>
                <Title size='sm' level={3}>
                  {experiment.title}
                </Title>
                <div className='mt-4'>
                  <span className='text-lg font-semibold'>Items</span>
                  <Table
                    columns={[
                      {
                        title: 'Material',
                        key: 'material',
                        className: 'w-2/12',
                      },
                      {
                        title: 'Material Usage',
                        key: 'material_usage',
                        className: 'w-6/12',
                      },
                      {
                        title: 'Supplier',
                        key: 'supplier',
                        className: 'w-4/12',
                      },
                    ]}
                    dataSource={experiment.items}
                  />
                </div>
                <div className='mt-4'>
                  <span className='text-lg font-semibold'>Instructions</span>
                  <ul className='ml-2 mt-2 flex flex-col gap-2'>
                    {experiment.instructions?.length
                      ? experiment.instructions.map((instruction, index) => (
                          <li key={index} className='flex items-center gap-2'>
                            <div>
                              <div className='flex h-7 w-7 items-center justify-center bg-primary-600 text-white'>
                                {index + 1}
                              </div>
                            </div>
                            <span>{instruction.text}</span>
                          </li>
                        ))
                      : 'N/A'}
                  </ul>
                </div>
                <div className='mt-6'>
                  <span className='text-lg font-semibold'>Methodologies</span>
                  <ul
                    className={cx(
                      'mt-2 flex list-disc flex-col gap-2',
                      experiment.methodologies.length ? 'ml-8' : 'ml-2'
                    )}
                  >
                    {experiment.methodologies.length
                      ? experiment.methodologies.map((methodology, index) => (
                          <li key={index} className='list-item'>
                            <span>{methodology.text}</span>
                          </li>
                        ))
                      : 'N/A'}
                  </ul>
                </div>
              </Card>
            ))}
          </ul>
        </div>
      </div>
    </Container>
  );
};

export default PaperPage;
