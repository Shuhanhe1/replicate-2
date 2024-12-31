import { FC, useState } from 'react';
import { fieldChangeHandler } from '@/common/utils';
import { Field } from '@/components/ui/Field';
import {
  ExperimentItemData,
  UpdateExperimentItem,
} from '@/common/types/experiment.types';

export interface ExperimentItemProps {
  values: UpdateExperimentItem;
  onChange: (values: UpdateExperimentItem) => void;
}

export const ExperimentItem: FC<ExperimentItemProps> = ({
  values,
  onChange,
}) => {
  console.log(values);
  return (
    <div className='grid grid-cols-4 gap-3'>
      <Field
        label='Material'
        type='text'
        value={values.data.material}
        onChange={fieldChangeHandler((material) =>
          onChange({ ...values, data: { ...values.data, material } })
        )}
      />
      <Field
        label='Supplier'
        type='text'
        value={values.data.supplier}
        onChange={fieldChangeHandler((supplier) =>
          onChange({ ...values, data: { ...values.data, supplier } })
        )}
      />
      <Field
        label='Usage'
        type='text'
        value={values.data.usage}
        onChange={fieldChangeHandler((usage) =>
          onChange({ ...values, data: { ...values.data, usage } })
        )}
      />
      <Field
        label='Url'
        type='text'
        value={values.data.url}
        onChange={fieldChangeHandler((url) =>
          onChange({ ...values, data: { ...values.data, url } })
        )}
      />
    </div>
  );
};
