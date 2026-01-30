import { useMutation, useQueryClient } from "@tanstack/react-query"

import { TaskMutationKeys } from "../../keys/mutation"
import { TaskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: TaskMutationKeys.add(),
    mutationFn: async (Task) => {
      const { data: createdTask } = await api.post("/tasks", Task)

      return createdTask
    },
    onSuccess: (task) => {
      queryClient.setQueryData(TaskQueryKeys.getAll(), (oldTasks) => {
        return [...oldTasks, task]
      })
    },
  })
}
