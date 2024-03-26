import { useQuery } from 'react-query';
import { useOptimisticCreateMutation, useOptimisticRemoveMutation } from 'shared/hooks';
import { queryClient } from 'shared/consts';
import { Column, CreateColumnParams, DeleteColumnParams } from './column.types';
import { createColumn, deleteColumn, getColumns } from './column.api';

export const useColumns = (boardId: number) => {
  return useQuery<Column[]>(['columns', boardId], () => getColumns(boardId), {
    initialData: () => {
      return queryClient.getQueryData(['columns', boardId]);
    }
  });
};

export const useColumnCreate = (boardId: number) => {
  return useOptimisticCreateMutation<Column, CreateColumnParams>(createColumn, [
    'columns',
    boardId
  ]);
};

export const useColumnDelete = (boardId: number) => {
  return useOptimisticRemoveMutation<DeleteColumnParams, DeleteColumnParams>(deleteColumn, [
    'columns',
    boardId
  ]);
};
