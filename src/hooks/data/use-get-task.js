import { useQuery } from "@tanstack/react-query"

export const useGetTask = ({ taskId, onSuccess }) => {
  return useQuery({
    queryKey: ["task", taskId],
    enabled: !!taskId,
    queryFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })

      if (!response.ok) {
        throw new Error("Erro ao buscar tarefa")
      }

      const data = await response.json()
      onSuccess(data)
      return data // <- IMPORTANTÍSSIMO (senão task fica undefined)
    },
  })
}
