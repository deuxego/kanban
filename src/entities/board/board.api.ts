import { supabase } from 'shared/lib';
import { Board, CreateBoardParams, DeleteBoardParams, EditBoardParams } from './board.types';

export const getBoards = async (workspaceId: number) => {
  if (workspaceId) {
    return (
      await supabase
        .from('boards')
        .select('*')
        .eq('workspace_id', workspaceId)
        .order('id', { ascending: true })
    ).data as Board[];
  }
};

export const getBoard = async (boardId: number) => {
  return (await supabase.from('boards').select('*').eq('id', boardId).single()).data as Board;
};

export const createBoard = async (params: CreateBoardParams): Promise<Board> => {
  return (
    await supabase
      .from('boards')
      .insert({ name: params.name, workspace_id: params.workspace_id })
      .select('*')
  ).data![0];
};

export const deleteBoard = async (params: DeleteBoardParams): Promise<Board> => {
  return (await supabase.from('boards').delete().eq('id', params.id).select('*')).data![0];
};

export const editBoard = async (params: EditBoardParams): Promise<Board> => {
  return (
    await supabase.from('boards').update({ name: params.name }).eq('id', params.id).select('*')
  ).data![0];
};
