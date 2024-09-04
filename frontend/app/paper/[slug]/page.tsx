import { api, pubmedApi } from '@/common/api';
import { Paper, PaperDetailed } from '@/common/types/paper.types';
import { Metadata } from 'next';
import { FC, cache } from 'react';
import { Title } from '@/components/ui/Title';
import { Container } from '@/components/ui/Container';
import Image from 'next/image';
import { Card } from '@/components/ui/Card';
import { cx } from 'class-variance-authority';
import { Table } from '@/components/ui/Table';
import Link from 'next/link';
import { createPubmedUrl } from '@/common/utils/createPubmedUrl';
import { createBackendUrl } from '@/common/utils/createBackendUrl';
import { CustomLink } from '@/components/ui/CustomLink';

export interface PaperPageProps {
  params: {
    slug: string;
  };
}

const getPaper = cache(
  async (slug: number | string): Promise<PaperDetailed | null> => {
    try {
      const response = await api.get(`/paper/${slug}`);
      return response.data;
    } catch (error) {
      console.error(error);
      return null;
    }
  }
);

export const generateMetadata = async ({
  params,
}: PaperPageProps): Promise<Metadata> => {
  const paper = await getPaper(params.slug);

  let description = '';

  if (paper) {
    description = 'Experiments: ';
    for (const experiment of paper.experiments) {
      description += experiment.title;
      description += 'Methodologies: ';
      description += experiment.methodologies
        .map((methodology) => methodology.text)
        .join(' ');
    }
  }
  return {
    title: `${paper?.title || 'Paper not found'} - Conduct Science`,
    description: paper
      ? paper.experiments
          .map((experiment) => experiment.methodologies)
          .flat()
          .join(' ')
      : '',
  };
};

const PaperPage: FC<PaperPageProps> = async ({ params }) => {
  const paper = await getPaper(params.slug);
  const totalCitations = paper
    ? await pubmedApi.getCitationsNumber(paper.pubmedId)
    : null;

  if (!paper) {
    return <Container className='mt-8'>Not found</Container>;
  }

  return (
    <Container className='mt-8' tag='article'>
      <div>
        <CustomLink
          target='_blank'
          href={createPubmedUrl(
            `/?linkname=pubmed_pubmed_citedin&from_uid=${paper.pubmedId}`
          )}
        >
          Citations: {totalCitations || 0}
        </CustomLink>
      </div>
      <div className='flex flex-col justify-between gap-2 md:flex-row md:gap-4'>
        <div className='w-full md:w-7/12'>
          <Link target='_blank' href={createPubmedUrl(`/${paper.pubmedId}`)}>
            <Title className='mb-2' size='md' uppercase>
              {paper.title}
            </Title>
          </Link>
          <Link target='_blank' href={createPubmedUrl(`/${paper.pubmedId}`)}>
            <span className='rounded-md text-primary-900'>
              PMID: {paper.pubmedId}
            </span>
          </Link>
          {/* <Flex gap='sm' className='mt-10'>
          <Rate defaultValue={4} allowHalf />
          <span>4 from 19 votes</span>
        </Flex> */}
          <div className='mt-2 flex flex-col gap-4'>
            <div className='mt-3 flex flex-wrap gap-2'>
              {paper.tags?.map((tag) => (
                <Link
                  key={tag}
                  href={createPubmedUrl(`/?term=${tag.replace(/ /g, '+')}`)}
                  target='_blank'
                  className='rounded-md bg-primary-100 px-2 py-1 text-primary-900'
                >
                  {tag}
                </Link>
              ))}
            </div>
            <div className='text-lg'>
              <span className='font-semibold uppercase'>Authors:</span>
              <span>
                {' '}
                {paper.authors?.length
                  ? paper.authors?.map((author, index) => (
                      <Link
                        href={createPubmedUrl(
                          `/?term=${author.replace(/ /g, '+')}`
                        )}
                        target='_blank'
                        key={author}
                        className='text-primary-900'
                      >
                        {author}
                        {index !== (paper.authors?.length || 0) - 1 && ', '}
                      </Link>
                    ))
                  : 'N/A'}
              </span>
            </div>
          </div>
        </div>
        <div>
          <Image
            // src={paper.image ? createBackendUrl(paper.image) : '/images/lab.jpg'}
            src='/images/lab.jpg'
            alt='lab'
            width={400}
            height={300}
          />
        </div>
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
                        defaultValue: 'N/A',
                        className: 'w-2/12',
                      },
                      {
                        title: 'Material Usage',
                        key: 'usage',
                        defaultValue: 'N/A',
                        className: 'w-6/12',
                      },
                      {
                        title: 'Supplier',
                        key: 'supplier',
                        defaultValue: 'N/A',
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
