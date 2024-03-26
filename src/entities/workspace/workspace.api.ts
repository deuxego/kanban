import { supabase } from 'shared/lib';
import {
  CreateWorkspaceParams,
  DeleteWorkspaceParams,
  EditWorkspaceParams,
  Workspace
} from './workspace.types';

export const getWorkspaces = async (userId: string) => {
  return (
    await supabase
      .from('workspaces')
      .select('*')
      .eq('user_id', userId)
      .order('id', { ascending: true })
  ).data as Workspace[];
};

export const createWorkspace = async (params: CreateWorkspaceParams): Promise<Workspace> => {
  return (
    await supabase
      .from('workspaces')
      .insert({ name: params.name, user_id: params.userId })
      .select('*')
  ).data![0];
};

export const deleteWorkspace = async (params: DeleteWorkspaceParams) => {
  return (await supabase.from('workspaces').delete().eq('id', params.id)).data;
};

export const editWorkspace = async (params: EditWorkspaceParams): Promise<Workspace> => {
  return (await supabase.from('workspaces').update({ name: params.name }).eq('id', params.id)).data![0];
};
