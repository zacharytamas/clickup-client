export interface Task {
  id: string;
}

/**
 * Possible parameters for when creating a new Task.
 */
export interface TaskCreateParams {
  name?: string;
}
