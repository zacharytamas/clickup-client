import { List, Task, TaskCreateParams } from '../types/index.js';

import type { ClickUpClientContext } from '../client.js';
import type { EntityRef } from './types.js';

export interface ListRef extends EntityRef<List> {
  listTasks: () => Promise<Task[]>;
  createTask: (createParams: TaskCreateParams) => Promise<Task>;
}

const listRef = (context: ClickUpClientContext, listId: string): ListRef => {
  return {
    get: () => {
      // Returns the List's body itself.
      return context.fetch(`/v2/list/${listId}`);
    },
    listTasks: async () => {
      // TODO Add filtering capabilities
      const { tasks } = await context.fetch<{ tasks: Task[] }>(`/v2/list/${listId}/task`);
      return tasks;
    },
    createTask: (createParams) => {
      return context.fetch(`/v2/list/${listId}/task`, {
        method: 'post',
        body: JSON.stringify(createParams),
      });
    },
  };
};

export default listRef;
