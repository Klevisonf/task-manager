import { useMutation, useQueryClient } from "@tanstack/react-query"

import { api } from "../../lib/axios"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: "addTask",
    mutationFn: async (Task) => {
      const { data: createdTask } = await api.post("/tasks", Task)

      return createdTask
    },
    onSuccess: (task) => {
      queryClient.setQueryData("tasks", (oldTasks) => {
        return [...oldTasks, task]
      })
    },
  })
}
