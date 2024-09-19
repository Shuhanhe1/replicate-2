'use client';
import { api } from '@/common/api';
import { paperApi } from '@/common/api/paper.api';
import { usePaginated } from '@/common/hooks';
import { Paper } from '@/common/types';
import { Button } from '@/components/ui/Button';
import { CustomLink } from '@/components/ui/CustomLink';
import { Field } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal/Modal';
import { Table, TableProps } from '@/components/ui/Table';
import Link from 'next/link';
import { FC, useEffect, useState } from 'react';

export const Papers: FC = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [pubmedId, setPubmedId] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importedSlug, setImportedSlug] = useState(null);
  const [page, setPage] = useState(1);
  const paginated = usePaginated<Paper>(paperApi.getAll, { page });

  const handleImportFromPubmed = async () => {
    try {
      setIsImporting(true);
      const { data } = await api.post('paper/parse/single/pubmed', {
        pubmedId,
      });
      await paginated.refetch();

      setImportedSlug(data.slug);
    } finally {
      setIsImporting(false);
    }
  };

  const renderContent = () => {
    if (importedSlug) {
      return (
        <Link href={`/paper/${importedSlug}`}>
          <Button>Go to paper</Button>
        </Link>
      );
    }

    return (
      <>
        <Field
          label='Pubmed id'
          placeholder='26423140'
          value={pubmedId}
          onChange={(e) => {
            const target = e.target as HTMLInputElement;
            setPubmedId(target.value);
          }}
        />

        <Button
          className='mt-2'
          onClick={handleImportFromPubmed}
          loading={isImporting}
        >
          Import
        </Button>
      </>
    );
  };

  const dataSource = paginated.data.map((paper) => ({
    title: <CustomLink href={`/paper/${paper.slug}`}>{paper.title}</CustomLink>,
    authors: paper.authors.join(', '),
    actions: (
      <Button
        onClick={async () => {
          await paperApi.delete(paper.slug);
          paginated.refetch();
        }}
      >
        Remove
      </Button>
    ),
  }));

  return (
    <div>
      <Button onClick={() => setIsImportModalOpen(true)} className='ml-auto'>
        Import from Pubmed
      </Button>
      <Table
        columns={[
          { title: 'Title', key: 'title', className: 'w-5/12' },
          { title: 'Authors', key: 'authors' },
          { title: '', key: 'actions' },
        ]}
        dataSource={dataSource}
        pagination={
          paginated
            ? {
                page,
                total: paginated?.pagination.total,
                onChange: (page) => {
                  setPage(page);
                },
                className: 'justify-end',
              }
            : undefined
        }
      />
      <Modal
        title='Import from Pubmed'
        width='2xl'
        open={isImportModalOpen}
        onOpenChange={setIsImportModalOpen}
      >
        {renderContent()}
      </Modal>
    </div>
  );
};
