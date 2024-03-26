import { useQuery, useQueryClient } from 'react-query';
import { createWorkspace, deleteWorkspace, editWorkspace, getWorkspaces } from './workspace.api';
import { CreateWorkspaceParams, DeleteWorkspaceParams, EditWorkspaceParams, Workspace } from './workspace.types';
import { useOptimisticCreateMutation, useOptimisticEditMutation, useOptimisticRemoveMutation } from 'shared/hooks';
import { useNavigate } from 'react-router-dom';

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
  const navigate = useNavigate();

  return useOptimisticCreateMutation<Workspace, CreateWorkspaceParams>(
    createWorkspace,
    'workspaces',
    (data) => navigate(`/workspace/${data.id}`)
  );
};

export const useWorkspaceDelete = () => {
  return useOptimisticRemoveMutation<Workspace, DeleteWorkspaceParams>(
    deleteWorkspace,
    'workspaces'
  );
};

export const useWorkspaceEdit = () => {
  return useOptimisticEditMutation<Workspace, EditWorkspaceParams>(
    editWorkspace,
    'workspaces'
  );
};
