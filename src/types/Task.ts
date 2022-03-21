export interface Tag {
  name: string;
  tag_bg: string;
  tag_fg: string;
  creator: number; // I guess the ID of the User who created this tag?
}

export interface Dependency {
  task_id: string;
  depends_on: string;
  type: 1; // Likely others but I don't know at the moment what they are.
  date_created: string;
  userid: string;
}

export interface Task {
  id: string;
  description?: string;
  start_date: string | null;
  date_closed: string | null;
  name: string | null;
  parent: string | null;
  tags: Tag[];
  dependencies: Dependency[] | null;
  url: string;
}

interface CustomFieldValue {
  id: string;
  value: any;
}

export interface TaskFilterParameters {
  include_closed?: boolean;
  tags?: string[];
  subtasks?: boolean;
  order_by?: 'id' | 'created' | 'updated' | 'due_date';
  reverse?: boolean;
  // ID of parent task. I haven't seen this documented anywhere but it seems to work.
  parent?: string;
  page?: number;
}

/**
 * Possible parameters for when creating a new Task.
 */
export interface TaskCreateParams {
  name?: string;
  description?: string;
  custom_fields?: CustomFieldValue[];
}
