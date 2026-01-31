import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"

import { ArrowLeft, ChevronRight, Loadericon, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"
import { useDeletedTask } from "../hooks/data/use-deleted-task"
import { useGetTask } from "../hooks/data/use-get-task"
import { useUpdatedTasks } from "../hooks/data/use-updated-tasks"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  // Buscar tarefa
  const { data: task, isLoading } = useGetTask({
    taskId,
    onSuccess: (data) => {
      reset({
        title: data.title,
        time: data.time,
        description: data.description,
      })
    },
  })

  // Atualizar tarefa
  const { mutate: updateTask, isPending: isUpdating } = useUpdatedTasks(taskId)

  // Deletar tarefa
  const { mutate: deleteTask, isPending: isDeleting } = useDeletedTask(taskId)

  const handleBackClick = () => navigate(-1)

  const handleSaveClick = (data) => {
    updateTask(data)
  }

  const handleDeleteClick = (data) => {
    deleteTask(data)
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
            type="button"
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
