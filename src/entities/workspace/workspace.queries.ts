import { useQuery, useQueryClient } from 'react-query';
import { createWorkspace, deleteWorkspace, getWorkspaces } from './workspace.api';
import { CreateWorkspaceParams, DeleteWorkspaceParams, Workspace } from './workspace.types';
import { useOptimisticCreateMutation, useOptimisticRemoveMutation } from 'shared/hooks';

export const useWorkspaces = (userId: string) => {
  const queryClient = useQueryClient();

  return useQuery<Workspace[], unknown, Workspace[], 'workspaces'>('workspaces', () => {
    const cachedData = queryClient.getQueryData<Workspace[]>('workspaces');
    if (cachedData) {
      return cachedData;
    } else {
      return getWorkspaces(userId);
    }
  });
};

export const useWorkspaceCreate = () => {
  return useOptimisticCreateMutation<Workspace, CreateWorkspaceParams>(
    createWorkspace,
    'workspaces'
  );
};

export const useWorkspaceDelete = () => {
  return useOptimisticRemoveMutation<Workspace, DeleteWorkspaceParams>(
    deleteWorkspace,
    'workspaces'
  );
};
