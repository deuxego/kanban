import { BoardsList } from 'widgets/boards-list';
import { ShareWorkspace } from './ui/share-workspace';

export const WorkspacePage = () => {
  return (
    <div className="page relative">
      <div className="absolute top-6 right-10">
        <ShareWorkspace />
      </div>

      <BoardsList />
    </div>
  );
};
