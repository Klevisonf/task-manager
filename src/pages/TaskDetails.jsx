import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { ArrowLeft, ChevronRight, Loadericon, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const queryClient = useQueryClient()
  const { taskId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  // Buscar tarefa
  const { data: task, isLoading } = useQuery({
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
      reset(data) // preenche o form
      return data // <- IMPORTANTÍSSIMO (senão task fica undefined)
    },
  })

  // Atualizar tarefa
  const { mutate: updateTask, isPending: isUpdating } = useMutation({
    mutationKey: ["updateTask", taskId],
    mutationFn: async (formData) => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(formData),
      })

      if (!response.ok) {
        throw new Error("Erro ao atualizar tarefa")
      }

      const updated = await response.json()
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

  // Deletar tarefa
  const { mutate: deleteTask, isPending: isDeleting } = useMutation({
    mutationKey: ["deleteTask", taskId],
    mutationFn: async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "DELETE",
      })

      if (!response.ok) {
        throw new Error("Erro ao deletar tarefa")
      }

      // Não faz response.json() aqui (muitos backends retornam 204 sem body)
      return true
    },
    onSuccess: () => {
      // Remove do cache da lista
      queryClient.setQueryData(["tasks"], (oldTasks = []) =>
        oldTasks.filter((t) => String(t.id) !== String(taskId))
      )

      // Remove cache do detalhe
      queryClient.removeQueries({ queryKey: ["task", taskId] })

      toast.success("Tarefa deletada com sucesso!")
      navigate(-1)
    },
    onError: () => {
      toast.error("Erro ao deletar tarefa. Por favor, tente novamente.")
    },
  })

  const handleBackClick = () => navigate(-1)

  const handleSaveClick = (data) => {
    updateTask(data)
  }

  const handleDeleteClick = () => {
    deleteTask()
  }

  return (
    <div className="flex">
      <Sidebar />

      <div className="w-full space-y-6 px-8 py-16">
        <button
          onClick={handleBackClick}
          className="bg-primary mb-2 flex h-8 w-8 items-center rounded-full"
          type="button"
        >
          <ArrowLeft />
        </button>

        <div className="flex w-full justify-between">
          <div>
            <div className="flex items-center gap-2 text-sm">
              <Link
                onClick={handleBackClick}
                className="text-text-gray cursor-pointer"
              >
                Minhas tarefas
              </Link>
              <ChevronRight />
              <span className="text-primary font-semibold">
                {isLoading ? "Carregando..." : task?.title}
              </span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">
              {isLoading ? "Carregando..." : task?.title}
            </h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
            disabled={isDeleting || !taskId}
          >
            <TrashIcon />
            {isDeleting ? "Deletando..." : "Deletar Tarefa"}
          </Button>
        </div>

        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-white p-6">
            <Input
              id="title"
              label="Título"
              {...register("title", {
                required: "O título é obrigatório",
                validate: (value) =>
                  value?.trim() ? true : "O título não pode estar vazio",
              })}
              errorMessage={errors?.title?.message}
            />

            <TimeSelect
              {...register("time", { required: "O horário é obrigatório" })}
              errorMessage={errors?.time?.message}
            />

            <Input
              id="description"
              label="Descrição"
              {...register("description", {
                required: "A descrição é obrigatória",
                validate: (value) =>
                  value?.trim() ? true : "A descrição não pode estar vazia",
              })}
              errorMessage={errors?.description?.message}
            />
          </div>

          <div className="mt-6 flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              disabled={isSubmitting || isUpdating || !taskId}
              type="submit"
            >
              {(isSubmitting || isUpdating) && (
                <Loadericon className="animate-spin gap-2" />
              )}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
