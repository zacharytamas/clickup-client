import type { Task } from './Task.js';

interface User {
  id: string;
  username: string;
  email: string;
  color: string;
  initials: string;
  profilePicture: string;
}

interface Tag {
  name: string;
  creator: number;
  tag_bg: string;
  tag_fg: string;
}

export interface TimeEntryFilterParams {
  start_date?: number;
  end_date?: number;
  list_id?: number;
}

export interface TimeEntry {
  id: string;
  user: User;
  tags: Tag[];
  task_tags: Tag[];
  description: string;

  /** Unix time when the TimeEntry began. */
  start: string;
  /** Unix time when the TimeEntry ended, `null` if the TimeEntry is still running. */
  end: string | null;
  /**
   * How long, in seconds, the TimeEntry lasted. If the TimeEntry is currently running
   * this value will be negative.
   */
  duration: string;

  task?: Task;
}
