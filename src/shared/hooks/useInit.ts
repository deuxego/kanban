import { useUserStore } from "entities/user/user.model";
import { useNavigate } from "react-router-dom";
import { useLocalStorage } from ".";
import { useEffect } from "react";
import { jwtDecode } from "jwt-decode";
import { getWorkspaces } from "entities/workspace/workspace.api";



export const useInit = () => {
  const navigate = useNavigate();
  const { setId } = useUserStore();
  const token = useLocalStorage('supabase_token');

  useEffect(() => {
    let userId = null;

    const fetchData = async () => {
      if (token) {
        const decodedToken = jwtDecode(token);
        userId = decodedToken.sub;
        setId(userId as string);

        const data = await getWorkspaces(userId as string);
        if (data && data.length > 0) {
          navigate(`/workspace/${data[0].id}`);
        }
      }
    };

    fetchData();
  }, [token, navigate, setId]);

  return !!token;
};