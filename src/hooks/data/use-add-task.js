import { useMutation, useQueryClient } from "@tanstack/react-query"
import axios from "axios"

export const useAddTask = () => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: "addTask",
    mutationFn: async (Task) => {
      const { data: createdTask } = await axios.post(
        "http://localhost:3000/tasks",
        Task
      )

      return createdTask
    },
    onSuccess: (task) => {
      queryClient.setQueryData("tasks", (oldTasks) => {
        return [...oldTasks, task]
      })
    },
  })
}
