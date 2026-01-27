import { useEffect, useState } from "react"
import { useForm } from "react-hook-form"
import { Link, useNavigate, useParams } from "react-router-dom"
import { toast } from "sonner"

import { ArrowLeft, ChevronRight, Loadericon, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()

  const {
    register,
    formState: { errors, isSubmitting },
    handleSubmit,
    reset,
  } = useForm()

  const handleBackClick = () => navigate(-1)
  useEffect(() => {
    const fetchTasks = async () => {
      // pega os dados da API
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const tasks = await response.json()
      setTask(tasks)
      reset(tasks)
      // Apos pegar os dados, converte para JSON
    }
    fetchTasks()
  }, [taskId, reset])

  useEffect(() => {
    const fetchTask = async () => {
      try {
        const response = await fetch(`http://localhost:3000/tasks/${taskId}`)
        if (!response.ok) {
          toast.error("Erro ao buscar tarefa")
          return
        }
        const data = await response.json()
        setTask(data)

        // ✅ Preenche o form com os dados carregados
        reset({
          title: data.title ?? "",
          time: data.time ?? "",
          description: data.description ?? "",
        })
      } catch {
        toast.error("Erro ao buscar tarefa")
      }
    }

    fetchTask()
  }, [taskId, reset])

  const handleSaveClick = async (data) => {
    try {
      const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      })

      if (!response.ok) {
        return toast.error("Ocorreu um erro ao salvar a tarefa")
      }

      const newTask = await response.json()
      setTask(newTask)
      toast.success("Tarefa salva com sucesso")
    } catch {
      toast.error("Ocorreu um erro ao salvar a tarefa")
    }
  }

  const handleDeleteClick = async () => {
    if (!task?.id) return

    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })

    if (!response.ok) return toast.error("Ocorreu um erro ao deletar tarefa")

    toast.success("Tarefa deletada com sucesso")
    navigate(-1)
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
              <span className="text-primary font-semibold">{task?.title}</span>
            </div>

            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>

          <Button
            className="h-fit self-end"
            color="danger"
            onClick={handleDeleteClick}
          >
            <TrashIcon />
            Deletar Tarefa
          </Button>
        </div>

        {/* ✅ botão submit dentro do form */}
        <form onSubmit={handleSubmit(handleSaveClick)}>
          <div className="space-y-6 rounded-xl bg-white p-6">
            <Input
              id="title"
              label="Título"
              {...register("title", {
                required: "O título é obrigatório",
                validate: (value) => {
                  if (!value.trim()) {
                    return "O título não pode estar vazio"
                  }
                  return true
                },
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
                validate: (value) => {
                  if (!value.trim()) {
                    return "A descrição não pode estar vazia"
                  }
                  return true
                },
              })}
              errorMessage={errors?.description?.message}
            />
          </div>

          <div className="mt-6 flex w-full justify-end gap-3">
            <Button
              size="large"
              color="primary"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting && <Loadericon className="animate-spin gap-2" />}
              Salvar
            </Button>
          </div>
        </form>
      </div>
    </div>
  )
}

export default TaskDetailsPage
