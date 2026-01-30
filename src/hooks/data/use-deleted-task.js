import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import { toast } from "sonner"

import { api } from "../../lib/axios"

export const useDeletedTask = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const { data: deletedTask } = await api.delete(`/tasks/${taskId}`)
      return deletedTask
    },
    onSuccess: () => {
      // Remove do cache da lista
      queryClient.setQueryData(["tasks"], (oldTasks = []) =>
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
