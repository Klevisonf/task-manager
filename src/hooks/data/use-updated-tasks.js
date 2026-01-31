import { Mutation, useMutation, useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import { TaskMutationKeys } from "../../keys/mutation"
import { TaskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useUpdatedTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: TaskMutationKeys.update(taskId),
    mutationFn: async (data) => {
      const { data: updatedTasks } = await api.patch(`/tasks/${taskId}`, {
        title: data.title,
        description: data.description,
        time: data.time,
        status: data.status,
      })
      queryClient.setQueryData(TaskQueryKeys.getAll(), (oldTasks = []) => {
        return oldTasks.map((task) => {
          if (task.id === taskId) {
            return updatedTasks
          }
          return task
        })
      })
      queryClient.setQueryData(TaskQueryKeys.getOne(taskId), updatedTasks)
    },
  })
}
