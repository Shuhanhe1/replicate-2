'use client';
import { PaperDetailed } from '@/common/types';
import { FC, FormEvent, useState } from 'react';
import { Experiment } from './Experiment';
import { Button } from '@/components/ui/Button';
import { paperApi } from '@/common/api/paper.api';
import { UpdateExperimentData } from '@/common/types/experiment.types';
import { toast } from '@/components/shadcn/ui/use-toast';
import { useRouter } from 'next/navigation';

export interface ExperimentsProps {
  paperSlug: string;
  paperTitle: string;
  data: PaperDetailed['experiments'];
}

export const Experiments: FC<ExperimentsProps> = ({
  data,
  paperTitle,
  paperSlug,
}) => {
  const router = useRouter();
  const [isSaving, setIsSaving] = useState(false);

  const [experiments, setExperiments] = useState<UpdateExperimentData[]>(
    data.map((experiment) => ({
      id: experiment.id,
      data: {
        title: experiment.title,
        items: experiment.items.map((item) => ({
          id: item.id,
          data: {
            material: item.material,
            supplier: item.supplier,
            usage: item.usage,
            url: item.url,
          },
        })),
      },
    }))
  );

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setIsSaving(true);
    try {
      await paperApi.update(paperSlug, {
        experiments,
      });
      toast({
        title: 'Saved!',
      });
    } catch (error) {
      throw error;
    }
    setIsSaving(false);
  };

  return (
    <>
      <Button className='ml-auto mt-4' onClick={() => router.back()}>
        {'<'}
      </Button>
      <h1 className='mt-4 text-2xl'>{paperTitle}</h1>
      <form onSubmit={handleSubmit}>
        <div className='mt-4 flex flex-col gap-4'>
          {experiments.map((experiment, index) => (
            <div key={index}>
              <h2 className='mb-2'>{experiment.data.title}</h2>
              <Experiment
                values={experiment}
                onChange={(experiment) => {
                  const newExperiments = [...experiments];
                  newExperiments[index] = experiment;
                  setExperiments(newExperiments);
                }}
              />
            </div>
          ))}
        </div>
        <div className='mt-3'>
          <Button type='submit' loading={isSaving}>
            Save
          </Button>
        </div>
      </form>
    </>
  );
};
