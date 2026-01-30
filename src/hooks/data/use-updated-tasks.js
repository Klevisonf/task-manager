import { useMutation, useQueryClient } from "@tanstack/react-query"
import { Navigate } from "react-router-dom"
import { toast } from "sonner"

import { api } from "../../lib/axios"

export const useUpdatedTasks = (taskId) => {
  const queryClient = useQueryClient()
  return useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (formData) => {
      const { data: updated } = await api.patch(`/tasks/${taskId}`, formData)
      return updated
    },
    onSuccess: (updated) => {
      // Atualiza detalhe
      queryClient.setQueryData(["task", taskId], updated)

      // Atualiza lista (se existir cache)
      queryClient.setQueryData(["tasks"], (oldTasks = []) =>
        oldTasks.map((t) => (String(t.id) === String(taskId) ? updated : t))
      )

      toast.success("Tarefa atualizada com sucesso!")
    },
    onError: () => {
      toast.error("Erro ao atualizar tarefa. Por favor, tente novamente.")
    },
  })
}
