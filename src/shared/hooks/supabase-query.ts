import { useMutation } from 'react-query';
import { queryClient } from '../consts';

type MutationFunctionWithParams<T, P> = P extends undefined
  ? () => Promise<T>
  : (params: P) => Promise<T>;

export const useOptimisticCreateMutation = <T extends object, P>(
  callback: MutationFunctionWithParams<T, P>,
  queryKey: [string, number] | string,
  onSuccessFn?: (data: T) => void
) => {
  return useMutation<T, Error, P>((params) => callback(params), {
    onMutate: (params) => {
      const tempId = Date.now();
      queryClient.setQueryData(queryKey, (oldData) => {
        if (Array.isArray(oldData)) {
          return [...oldData, { ...params, id: tempId }];
        }
      });
      return tempId;
    },

    onSuccess: (data: T, _, context) => {
      const serverId = 'id' in data ? data.id : -1;

      queryClient.setQueryData(queryKey, (oldData) => {
        if (Array.isArray(oldData)) {
          return oldData.map((item) => {
            if (item.id === context) {
              return { ...data, id: serverId };
            }
            return item;
          });
        }
      });

      onSuccessFn && onSuccessFn(data);
    }
  });
};

export const useOptimisticRemoveMutation = <T extends object, P extends object>(
  callback: MutationFunctionWithParams<T, P>,
  queryKey: [string, number] | string
) => {
  return useMutation<T, Error, P>((params) => callback(params), {
    onMutate: (params) => {
      queryClient.setQueryData(queryKey, (oldData) => {
        if (Array.isArray(oldData)) {
          return oldData.filter((item) => item.id !== params.id);
        }
      });
    },

    onSuccess: () => {
      queryClient.invalidateQueries(queryKey);
    }
  });
};
