export interface Tag {
  name: string;
  tag_bg: string;
  tag_fg: string;
  creator: number; // I guess the ID of the User who created this tag?
}
export interface Task {
  id: string;
  description?: string;
  start_date: string | null;
  name: string | null;
  parent: string | null;
  tags: Tag[];
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
