import type { ClickUpClientContext } from '../client.js';
import type { EntityRef } from './types.js';
import type { TimeEntry } from '../types/index.js';

export type TimeEntryRef = EntityRef<TimeEntry>;

/**
 * TODO
 *
 * @param context
 * @param workspaceId The ID of the Workspace the TimeEntry belongs to.
 * @param timeEntryId The ID of the TimeEntry.
 */
const timeEntryRef = (
  context: ClickUpClientContext,
  workspaceId: string,
  timeEntryId: string
): TimeEntryRef => {
  return {
    get: () => {
      return context.fetch(`/v2/team/${workspaceId}/time_entries/${timeEntryId}/`);
    },
  };
};

export default timeEntryRef;
