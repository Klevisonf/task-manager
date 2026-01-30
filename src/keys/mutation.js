export const TaskMutationKeys = {
  add: () => ["add-Task"],
  update: (taskId) => ["updated-Task", taskId],
  delete: (taskId) => ["deleted-Task", taskId],
}
