import { useLocation } from 'react-router-dom';

export const usePathIncludes = (value: string) => {
  const location = useLocation();

  return location.pathname.includes(value);
};
