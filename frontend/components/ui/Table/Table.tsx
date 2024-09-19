import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table';
import { FC } from 'react';
import { Pagination, PaginationProps } from '../Pagination';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  columns?: {
    title: string;
    key: string;
    className?: string;
    defaultValue?: string;
  }[];
  dataSource?: Record<string, any>[];
  pagination?: PaginationProps;
}

export const Table: FC<TableProps> = ({
  columns,
  dataSource,
  pagination,
  ...rest
}) => {
  return (
    <div>
      <TableBase {...rest}>
        <TableHeader>
          <TableRow>
            {columns?.map((column) => (
              <TableCell key={column.title} className={column.className}>
                {column.title}
              </TableCell>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {dataSource?.map((data) => (
            <TableRow key={data.id}>
              {columns?.map((column) => (
                <TableCell key={column.key} className={column.className}>
                  {data[column.key] || column.defaultValue}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </TableBase>
      {pagination && <Pagination className='mt-2' {...pagination} />}
    </div>
  );
};
