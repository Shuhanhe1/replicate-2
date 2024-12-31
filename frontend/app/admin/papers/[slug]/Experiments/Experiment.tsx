'use client';
import { FC } from 'react';
import { UpdateExperimentData } from '@/common/types/experiment.types';
import { ExperimentItem } from './ExperimentItem';

export interface ExperimentItemProps {
  values: UpdateExperimentData;
  onChange: (values: UpdateExperimentData) => void;
}

export const Experiment: FC<ExperimentItemProps> = ({ values, onChange }) => {
  return (
    <div className='flex flex-col gap-3'>
      {values.data.items.map((item, index) => (
        <ExperimentItem
          key={index}
          values={item}
          onChange={({ id, data }) => {
            const newItems = [...values.data.items];
            newItems[index] = {
              id,
              data,
            };
            onChange({
              ...values,
              data: {
                ...values.data,
                items: newItems,
              },
            });
          }}
        />
      ))}
    </div>
  );
};
