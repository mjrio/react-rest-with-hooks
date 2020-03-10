import axios from 'axios'
import useSWR from 'swr';

export function useQuery<TResult>(url: string) {
  const { data: response, error, isValidating, revalidate } = useSWR(url, () => axios.get(url));

  return {
    data: (response && response.data) as TResult,
    isLoading: isValidating,
    error,
    refetch: revalidate
  }
}