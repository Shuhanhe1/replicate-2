'use client';
import { api } from '@/common/api';
import { Button } from '@/components/ui/Button';
import { Field } from '@/components/ui/Field';
import { Modal } from '@/components/ui/Modal/Modal';
import Link from 'next/link';
import { FC, useState } from 'react';

export const Papers: FC = () => {
  const [isImportModalOpen, setIsImportModalOpen] = useState(false);
  const [pubmedId, setPubmedId] = useState('');
  const [isImporting, setIsImporting] = useState(false);
  const [importedSlug, setImportedSlug] = useState(null);

  const handleImportFromPubmed = async () => {
    try {
      setIsImporting(true);
      const { data } = await api.post('paper/parse/single/pubmed', {
        pubmedId,
      });

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

  return (
    <div>
      <Button onClick={() => setIsImportModalOpen(true)}>
        Import from Pubmed
      </Button>
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
