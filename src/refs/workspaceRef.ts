import type { ClickUpClientContext } from '../client.js';
import type { Task, TaskFilterParameters } from '../types/Task.js';
import type { EntityRef } from './types.js';

interface Workspace {
  id: string;
  name: string;
  // TODO Complete
}

export interface WorkspaceRef extends EntityRef<Workspace> {
  listTasks: (taskFilters?: TaskFilterParameters) => Promise<Task[]>;
}

const workspaceRef = (context: ClickUpClientContext, workspaceId: string): WorkspaceRef => {
  return {
    get: () => {
      return context.fetch(`/v2/team/${workspaceId}`);
    },

    listTasks: async (taskFilters = {}) => {
      const queryParams = new URLSearchParams();

      Object.entries(taskFilters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(`${key}`, v));
        } else {
          queryParams.set(key, value);
        }
      });

      const { tasks } = await context.fetch<{ tasks: Task[] }>(
        `/v2/team/${workspaceId}/task?${queryParams.toString()}`
      );

      return tasks;
    },
  };
};

export default workspaceRef;
