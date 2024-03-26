import { supabase } from 'shared/lib';
import { User } from '.';

export const createUser = async (props: User): Promise<User> => {
  return (await supabase.from('users').insert(props).select('*')).data![0] as User;
};

export const getUser = async (id: string): Promise<User> => {
  return (await supabase.from('users').select('*').eq('id', id)).data![0] as User;
};
