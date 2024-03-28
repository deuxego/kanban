import { supabase } from 'shared/lib';
import {
  CreateWorkspaceParams,
  DeleteWorkspaceParams,
  EditWorkspaceParams,
  SharedWorkspace,
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

export const getSharedWorkspaces = async (userId: string) => {
  const { data: allWorkspaces } = await supabase
    .from('workspaces')
    .select('*')
    .order('id', { ascending: true });

  let sharedWorkspaces: Workspace[] | undefined = allWorkspaces?.filter((workspace) => {
    const sharedWith = workspace.shared_with || [];
    return sharedWith.includes(userId);
  });

  sharedWorkspaces = sharedWorkspaces?.map((shared) => ({ ...shared, shared: true }));

  return sharedWorkspaces as SharedWorkspace[];
};

export const setWorkspaceShared = async (workspaceId: number, userId: string) => {
  const shared_with =
    ((await supabase.from('workspaces').select('shared_with').eq('id', workspaceId).single()).data
      ?.shared_with as string[]) ?? [];

  const isInclude = shared_with.includes(userId);
  const updatedSharedWith = isInclude ? shared_with : [...shared_with, userId];

  return (
    await supabase
      .from('workspaces')
      .update({ shared_with: updatedSharedWith })
      .eq('id', workspaceId)
  ).status;
};

export const createWorkspace = async (params: CreateWorkspaceParams): Promise<Workspace> => {
  return (
    await supabase
      .from('workspaces')
      .insert({ name: params.name, user_id: params.userId })
      .select('*')
  ).data![0];
};

export const deleteWorkspace = async (params: DeleteWorkspaceParams): Promise<Workspace> => {
  return (await supabase.from('workspaces').delete().eq('id', params.id)).data![0];
};

export const editWorkspace = async (params: EditWorkspaceParams): Promise<Workspace> => {
  return (await supabase.from('workspaces').update({ name: params.name }).eq('id', params.id))
    .data![0];
};
