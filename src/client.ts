import fetch from 'cross-fetch';

import listRef, { ListRef } from './refs/listRef.js';
import workspaceRef, { WorkspaceRef } from './refs/workspaceRef.js';

export interface ClickUpClientContext {
  fetch: <TData = any>(endpoint: string, init?: Omit<RequestInit, 'url'>) => Promise<TData>;
}

export interface ClickUpClient {
  list: (listId: string) => ListRef;
  workspace: (workspaceId: string) => WorkspaceRef;
}

/**
 * A client for interacting with the ClickUp API.
 */
const clickUpClient = (apiToken: string) => {
  const context: ClickUpClientContext = {
    fetch: async (endpoint, init = {}) => {
      const resp = await fetch(`https://api.clickup.com/api${endpoint}`, {
        method: 'get',
        headers: { 'Content-Type': 'application/json', Authorization: apiToken, ...init.headers },
        ...init,
      });

      return resp.json();
    },
  };

  return {
    list: (listId: string) => listRef(context, listId),
    workspace: (workspaceId: string) => workspaceRef(context, workspaceId),
  };
};

export default clickUpClient;
