import {
  Pagination as PaginationBase,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from '@/components/shadcn/ui/pagination';
import { FC } from 'react';

export interface PaginationProps {
  page: number;
  total: number;
  onChange: (page: number) => void;
  className?: string;
}

export const Pagination: FC<PaginationProps> = ({
  page,
  total,
  onChange,
  className,
}) => {
  return (
    <PaginationBase className={className}>
      <PaginationContent>
        <PaginationItem>
          <PaginationPrevious href='#' />
        </PaginationItem>
        {Array.from({ length: total }, (_, i) => (
          <PaginationItem key={i}>
            <PaginationLink
              href='#'
              isActive={i + 1 === page}
              onClick={() => onChange(i + 1)}
            >
              {i + 1}
            </PaginationLink>
          </PaginationItem>
        ))}
        <PaginationItem>
          <PaginationEllipsis />
        </PaginationItem>
        <PaginationItem>
          <PaginationNext href='#' />
        </PaginationItem>
      </PaginationContent>
    </PaginationBase>
  );
};
