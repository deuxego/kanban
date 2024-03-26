import { usePathIncludes } from 'shared/hooks';
import { SidebarItems } from './ui';
import { ContentType } from './sidebar.types';
import { useUserStore } from 'entities/user/user.model';
import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { logout } from 'features/auth';

export const Sidebar = () => {
  const [id, setId] = useState<string | null>(null);
  const { user } = useUserStore();

  useEffect(() => {
    if (user?.id) {
      setId(user?.id);
    }
  }, [user]);

  const isBoardContent = usePathIncludes(ContentType.BOARD);

  const content = isBoardContent ? (
    <SidebarItems contentType={ContentType.BOARD} userId={id as string} />
  ) : (
    <SidebarItems contentType={ContentType.WORKSPACE} userId={id as string} />
  );

  
  return (
    <div className="sidebar">
      {id && content}

      <div className="flex-y-center w-full flex-col gap-2 mb-5">
        <div className="user-badge">@{user?.username}</div>

        <div className="logout" onClick={logout}>
          <Link to={'/'}>Logout</Link>
        </div>
      </div>
    </div>
  );
};
