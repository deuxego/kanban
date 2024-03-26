import { supabase } from 'shared/lib';
import { User } from '.';

export const createUser = async (props: User) => {
  return (await supabase.from('users').insert(props).select('*')).data;
};
