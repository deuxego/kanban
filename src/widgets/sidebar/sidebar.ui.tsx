import { usePathIncludes } from 'shared/hooks';
import { SidebarItems } from './ui';
import { ContentType } from './sidebar.types';
import { useUserStore } from 'entities/user/user.model';
import { useEffect, useState } from 'react';

export const Sidebar = () => {
  const [id, setId] = useState<string | null>(null);
  const { id: userId } = useUserStore();

  useEffect(() => {
    setId(userId)
  }, [userId])

  const isBoardContent = usePathIncludes(ContentType.BOARD);

  const content = isBoardContent ? (
    <SidebarItems contentType={ContentType.BOARD}  userId={id as string}/>
  ) : (
    <SidebarItems contentType={ContentType.WORKSPACE} userId={id as string} />
  );

  return <div className="sidebar">{id && content}</div>;
};
