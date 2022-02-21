import fetch from 'cross-fetch';

import listRef, { ListRef } from './refs/listRef.js';

export interface ClickUpClientContext {
  fetch: <TData = any>(endpoint: string, init?: Omit<RequestInit, 'url'>) => Promise<TData>;
}

export interface ClickUpClient {
  list: (listId: string) => ListRef;
}

/**
 * A client for interacting with the ClickUp API.
 */
const clickUpClient = (apiToken: string, context?: ClickUpClientContext) => {
  context = context ?? {
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
    list: (listId: string) => listRef(context!, listId),
  };
};

export default clickUpClient;
