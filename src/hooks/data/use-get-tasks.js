import { useQuery } from "@tanstack/react-query"

import { TaskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useGetTaks = () => {
  return useQuery({
    queryKey: TaskQueryKeys.getAll(),
    queryFn: async () => {
      const { data: tasks } = await api.get("/tasks")
      return tasks
    },
  })
}
