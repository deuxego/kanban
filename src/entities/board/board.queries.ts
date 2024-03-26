import { useQuery } from 'react-query';
import { createBoard, deleteBoard, getBoard, getBoards } from './board.api';
import { useOptimisticCreateMutation, useOptimisticRemoveMutation } from 'shared/hooks';
import { Board, CreateBoardParams, DeleteBoardParams } from './board.types';
import { queryClient } from 'shared/consts';

export const useBoards = (workspaceId: number) => {
  return useQuery<Board[]>(
    ['boards', workspaceId],
    () => getBoards(workspaceId) as Promise<Board[]>,
    {
      initialData: () => {
        return queryClient.getQueryData(['boards', workspaceId]);
      },
      staleTime: 3600,
      cacheTime: 3600000
    }
  );
};

export const useBoard = (boardId: number) => {
  return useQuery<Board>(['boards', boardId], () => getBoard(boardId), {
    initialData: () => {
      return queryClient.getQueryData(['board', boardId]);
    }
  });
};

export const useBoardCreate = (workspaceId: number) => {
  return useOptimisticCreateMutation<Board, CreateBoardParams>(createBoard, [
    'boards',
    workspaceId
  ]);
};

export const useBoardDelete = (workspaceId: number) => {
  return useOptimisticRemoveMutation<Board, DeleteBoardParams>(deleteBoard, [
    'boards',
    workspaceId
  ]);
};
