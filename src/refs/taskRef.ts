import { ClickUpClientContext } from '../client.js';
import { Comment, Task } from '../types/index.js';
import { EntityRef } from './types.js';

export interface TaskRef extends EntityRef<Task> {
  addTag(tagName: string): Promise<any>;
  removeTag(tagName: string): Promise<any>;
  getComments(): Promise<Comment[]>;
}

const taskRef = (context: ClickUpClientContext, taskId: string): TaskRef => {
  return {
    get: () => context.fetch(`/v2/task/${taskId}`),
    addTag: (tagName: string) =>
      context.fetch(`/v2/task/${taskId}/tag/${tagName}/`, { method: 'post' }),
    removeTag: (tagName: string) =>
      context.fetch(`/v2/task/${taskId}/tag/${tagName}`, { method: 'delete' }),
    getComments: () => context.fetch(`/v2/task/${taskId}/comment`),
  };
};

export default taskRef;
