export interface Task {
  id: string;
  description?: string;
}

interface CustomFieldValue {
  id: string;
  value: any;
}

export interface TaskFilterParameters {
  include_closed?: boolean;
  tags?: string[];
}

/**
 * Possible parameters for when creating a new Task.
 */
export interface TaskCreateParams {
  name?: string;
  description?: string;
  custom_fields?: CustomFieldValue[];
}
