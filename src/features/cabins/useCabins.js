import { useQuery, useQueryClient } from '@tanstack/react-query';
import { useSearchParams } from 'react-router-dom';
import { getCabins } from '../../services/apiCabins';
import { PAGE_SIZE } from '../../utils/constans';

export function useCabins() {
  const queryClient = useQueryClient();
  const [searchParams] = useSearchParams();

  const page = !searchParams.get('page') ? 1 : Number(searchParams.get('page'));

  //QUERY
  const {
    isLoading,
    data: { data: cabins, count } = {},
    error,
  } = useQuery({
    queryKey: ['cabins', page],
    queryFn: () => getCabins({ page }),
  });

  const pageCount = Math.ceil(count, PAGE_SIZE);

  if (page > pageCount) {
    queryClient.prefetchQuery({
      queryKey: ['cabins', page + 1],
      queryFn: () => getCabins({ page: page + 1 }),
    });
  }

  return { isLoading, cabins, error, count };
}
