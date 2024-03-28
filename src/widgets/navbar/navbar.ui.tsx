import { RiHomeLine } from 'react-icons/ri';
import { MdSettings } from 'react-icons/md';
import { BsFillKanbanFill } from 'react-icons/bs';

import { Link, useLocation, useParams } from 'react-router-dom';
import cn from 'classnames';

export const Navbar = () => {
  const { pathname } = useLocation();
  const { workspaceId } = useParams();

  const className = (...v: string[]) => {
    return cn('navbar-item', {
      ['navbar-item-active']:
        v.every((p) => pathname.includes(p)) && v.length * 2 + 1 === pathname.split('/').length
    });
  };

  return (
    <div className="navbar">
      <Link to={`workspace/${workspaceId}` ?? '/'}>
        <div className={className('workspace')}>
          <RiHomeLine color="white" />
        </div>
      </Link>

      <div className={className('workspace', 'board')}>
        <BsFillKanbanFill color="white" />
      </div>

      <div className={className('settings')}>
        <MdSettings color="white" />
      </div>
    </div>
  );
};
