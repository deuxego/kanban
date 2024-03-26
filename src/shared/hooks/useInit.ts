import { useNavigate } from 'react-router-dom';
import { useLocalStorage } from '.';
import { useEffect } from 'react';
import { jwtDecode } from 'jwt-decode';
import { getWorkspaces } from 'entities/workspace/workspace.api';
import { useUserStore } from 'entities/user';

export const useInit = () => {
  const navigate = useNavigate();
  const { setUser } = useUserStore();
  const token = useLocalStorage('supabase_token');

  useEffect(() => {
    let userId = null;

    const fetchData = async () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.sub;

        setUser(userId as string);

        const data = await getWorkspaces(userId as string);

        if (data) {
          navigate(`/workspace/${data[0]?.id ?? ''}`);
        }
      }
    };

    fetchData();
  }, [token, navigate, setUser]);

  return !!token;
};
