import { useQuery } from "@tanstack/react-query"

import { TaskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: TaskQueryKeys.getOne(taskId),
    enabled: !!taskId,
    queryFn: async () => {
      const { data: task } = await api.get(`/tasks/${taskId}`)
      onSuccess(task)
      return task // <- IMPORTANTÍSSIMO (senão task fica undefined)
    },
  })
}
