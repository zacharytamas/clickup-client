# clickup-client

A browser/Node.js client for interacting with ClickUp's v2 API. Authored in TypeScript and
exports ESM modules.

## Example Usage

```typescript
import clickUpClient from 'clickup-client';

(async () => {
  const client = clickUpClient('<my_token>');

  // Getting a list of Tasks in a List.
  const tasksInList = await client.list('<list_id>').listTasks();

  const newTask = await client
    .list('<list_id>')
    .createTask({ name: 'My Task', description: 'A task description' });
})();
```

## Notes

- For now, this only supports instances where you can provide a Personal Access Token. I
  am very much building this for my own needs at the moment but if this library becomes
  useful for others I may go for a more featured approach.
