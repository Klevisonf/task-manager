import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import { toast } from "sonner"

import { TaskMutationKeys } from "../../keys/mutation"
import { TaskQueryKeys } from "../../keys/queries"
import { api } from "../../lib/axios"

export const useDeletedTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: TaskMutationKeys.delete(taskId),
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`)
      return deletedTask
    },
    onSuccess: () => {
      // Remove do cache da lista
      queryClient.setQueryData([TaskQueryKeys.getAll()], (oldTasks = []) =>
        oldTasks.filter((t) => String(t.id) !== String(taskId))
      )

      // Remove cache do detalhe
      queryClient.removeQueries({ queryKey: ["task", taskId] })

      toast.success("Tarefa deletada com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao deletar tarefa. Por favor, tente novamente.")
    },
  })
}
