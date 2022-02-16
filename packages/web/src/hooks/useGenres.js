import { useQuery, useQueryClient } from "react-query";

import queryKeys from "../queries/constants";
import genresApi from "../api/api-genres";

const queryOptions = {
  staleTime: 600000,
  cacheTime: 900000,
  keepPreviousData: true,
  refetchOnMount: false,
  refetchOnWindowFocus: false,
  refetchOnReconnect: false,
};

export function useFetchGenre(genreId) {
  const { data = {}, ...query } = useQuery(
    [queryKeys.genre, genreId],
    () => genresApi.getGenre(genreId),
    queryOptions,
  );

  return { ...query, data };
}

export function useFetchGenres() {
  const { data = [], ...query } = useQuery(
    [queryKeys.genres],
    () => genresApi.getGenres(),
    queryOptions,
  );

  return { ...query, data };
}

export async function usePrefetchGenres() {
  const queryClient = useQueryClient();

  await queryClient.prefetchQuery([queryKeys.genres], () => genresApi.getGenres());
}
