export const formatPagination = ({
  page = 1,
  take = 10,
}: Record<string, any>): {
  metadata: { page: number; pageSize: number };
  prisma: { skip: number; take: number };
} => {
  return {
    metadata: { page: Number(page), pageSize: Number(take) },
    prisma: { skip: (Number(page) - 1) * Number(take), take },
  };
};
