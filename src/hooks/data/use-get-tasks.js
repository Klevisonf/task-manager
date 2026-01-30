import { useQuery } from "@tanstack/react-query"
import axios from "axios"
import { api } from "../../lib/axios"

export const useGetTaks = () => {
  return useQuery({
    queryKey: "tasks",
    queryFn: async () => {
      const { data: tasks } = await api.get("/tasks")
      return tasks
    },
  })
}
