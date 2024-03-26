import { useMutation, useQuery, useQueryClient } from 'react-query';
import { useOptimisticCreateMutation, useOptimisticEditMutation, useOptimisticRemoveMutation } from 'shared/hooks';
import { queryClient } from 'shared/consts';
import { CreateTaskParams, DeleteTaskParams, EditTaskParams, MoveTask, Task } from './task.types';
import { createTask, deleteTask, editTask, getTasks } from './task.api';

export const useTasks = (columnId: number) => {
  return useQuery<Task[]>(['tasks', columnId], () => getTasks(columnId), {
    initialData: () => {
      return queryClient.getQueryData(['tasks', columnId]);
    }
  });
};

export const useTaskCreate = (columnId: number) => {
  return useOptimisticCreateMutation<Task, CreateTaskParams>(createTask, ['tasks', columnId]);
};

export const useTaskDelete = (columnId: number) => {
  return useOptimisticRemoveMutation<DeleteTaskParams, DeleteTaskParams>(deleteTask, [
    'tasks',
    columnId
  ]);
};

export const useTaskEdit = (columnId: number) => {
  return useOptimisticEditMutation<Task, EditTaskParams>(editTask, [
    'tasks',
    columnId
  ]);
};

export const useMoveTask = () => {
  const queryClient = useQueryClient();

  return useMutation(
    async ({ taskId, value, targetColumnId }: MoveTask) => {
      deleteTask({ id: taskId });
      return createTask({ name: value, column_id: targetColumnId });
    },
    {
      onMutate: ({ taskId, value, sourceColumnId, targetColumnId }) => {
        const timeId = Date.now();

        queryClient.setQueryData(['tasks', sourceColumnId], (old) => {
          if (Array.isArray(old)) {
            return old.filter((v) => v.id !== taskId);
          }
        });

        queryClient.setQueryData(['tasks', targetColumnId], (old) => {
          if (Array.isArray(old)) {
            return [...old, { id: timeId, name: value, column_id: targetColumnId }];
          }
        });

        return timeId;
      },

      onSuccess: (data, context, variable) => {
        queryClient.setQueryData(['tasks', context.targetColumnId], (old) => {
          if (Array.isArray(old)) {
            const task = old.find((t) => t.id === variable);
            if (task) {
              task.id = data.id;
            }
            return [...old];
          }
        });
      }
    }
  );
};
