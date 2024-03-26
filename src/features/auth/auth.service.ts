import { Session } from '@supabase/supabase-js';
import { createUser } from 'entities/user';
import { supabase } from 'shared/lib';

export const signIn = async (email: string, password: string, setError: (v: boolean) => void) => {
  try {
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });

    if (data.session?.access_token) {
      localStorage.setItem('supabase_token', data.session?.access_token);

      const {
        data: { session }
      } = await supabase.auth.getSession();
      setSessionTime(session as Session);
      
      window.location.href = '/';
    }

    if (error) {
      setError(true);
    }
  } catch (error) {
    //
  }
};

export const signUp = async (
  username: string,
  email: string,
  password: string,
  setError: (v: boolean) => void
) => {
  try {
    const { data, error } = await supabase.auth.signUp({ email, password });

    if (data.session?.access_token && data.user?.id) {
      localStorage.setItem('supabase_token', data.session?.access_token);

      const {
        data: { session }
      } = await supabase.auth.getSession();
      setSessionTime(session as Session);

      createUser({ username, email, id: data.user?.id });

      window.location.href = '/';
    }

    if (error) {
      setError(true);
    }
  } catch (error) {
    //
  }
};

export const setSessionTime = (session: Session) => {
  if (session?.expires_at) {
    const refreshInterval = session.expires_at - Date.now() - 1000 * 60 * 5;

    setInterval(() => {
      supabase.auth.refreshSession().then(() => {
        const expiresAt = Math.floor(Date.now() / 1000) + 1000 * 60 * 60 * 24 * 30;
        session.expires_at = expiresAt;
      });
    }, refreshInterval);
  }
};
