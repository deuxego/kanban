import { MoveTask } from 'entities/task';

export const handleDragStart = (event: React.DragEvent<HTMLDivElement>, id: number) => {
  const target = event.target as HTMLDivElement;

  event.dataTransfer!.setData('taskId', String(id));
  event.dataTransfer!.setData('taskValue', target.dataset['value']!);
  event.dataTransfer!.setData('from', target.closest('.column')!.id);
};

export const handleDragOver = (event: React.DragEvent<HTMLDivElement>) => {
  event.preventDefault();
};

export const handleDrop = (
  event: React.DragEvent<HTMLDivElement>,
  fn: ({ taskId, sourceColumnId, targetColumnId }: MoveTask) => void
) => {
  event.preventDefault();
  const target = event.target as HTMLDivElement;

  const taskId = parseInt(event.dataTransfer!.getData('taskId'));
  const value = event.dataTransfer!.getData('taskValue');
  const from = parseInt(event.dataTransfer!.getData('from'));
  const to = parseInt(target.closest('.column')!.id);

  fn({ taskId, value, sourceColumnId: from, targetColumnId: to });
};
