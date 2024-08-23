import {
  Table as TableBase,
  TableBody,
  TableCell,
  TableHeader,
  TableRow,
} from '@/components/shadcn/ui/table';
import { FC } from 'react';

export interface TableProps extends React.HTMLAttributes<HTMLTableElement> {
  columns?: {
    title: string;
    key: string;
    className?: string;
  }[];
  dataSource?: Record<string, any>[];
}

export const Table: FC<TableProps> = ({ columns, dataSource, ...rest }) => {
  return (
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
                {data[column.key]}
              </TableCell>
            ))}
          </TableRow>
        ))}
      </TableBody>
    </TableBase>
  );
};
