import type { ClickUpClientContext } from '../client.js';
import type {
  Task,
  TaskFilterParameters,
  TimeEntry,
  TimeEntryFilterParams,
} from '../types/index.js';
import type { EntityRef } from './types.js';

interface Workspace {
  id: string;
  name: string;
  // TODO Complete
}

export interface WorkspaceRef extends EntityRef<Workspace> {
  listTasks: (taskFilters?: TaskFilterParameters) => Promise<Task[]>;
  listTimeEntries: (filters?: TimeEntryFilterParams) => Promise<TimeEntry[]>;
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
          value.forEach((v) => queryParams.append(`${key}[]`, v));
        } else {
          queryParams.set(key, value);
        }
      });

      const url = `/v2/team/${workspaceId}/task?${queryParams.toString()}`;
      const { tasks } = await context.fetch<{ tasks: Task[] }>(url);

      return tasks;
    },

    listTimeEntries: async (filters = {}) => {
      const queryParams = new URLSearchParams();

      Object.entries(filters).forEach(([key, value]) => {
        if (Array.isArray(value)) {
          value.forEach((v) => queryParams.append(`${key}`, v));
        } else {
          queryParams.set(key, value);
        }
      });

      const { data } = await context.fetch<{ data: TimeEntry[] }>(
        `/v2/team/${workspaceId}/time_entries?${queryParams.toString()}`
      );
      return data;
    },
  };
};

export default workspaceRef;
