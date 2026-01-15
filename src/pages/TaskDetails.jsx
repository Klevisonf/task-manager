import { useEffect, useRef, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { ArrowLeft, ChevronRight, Loadericon, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import InputLabel from "../components/InputLabel"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()
  const [saveIsLoading, setSaveIsLoading] = useState(false)
  const [errors, setErrors] = useState([])

  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()

  const handleBackClick = () => {
    navigate(-1)
  }
  useEffect(() => {
    const fetchTask = async () => {
      const response = await fetch(`http://localhost:3000/tasks/${taskId}`, {
        method: "GET",
      })
      const data = await response.json()
      setTask(data)
    }

    fetchTask()
  }, [])

  const handleSaveClick = async () => {
    const newErrors = []

    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      })
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O título é obrigatório.",
      })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "a descrição é obrigatório.",
      })
    }
    setErrors(newErrors)
    if (newErrors.length > 0) {
      return setSaveIsLoading(false)
    }

    setSaveIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "PATCH",
      body: JSON.stringify({
        title,
        time,
        description,
      }),
    })
    if (!response.ok) {
      toast.error("Ocorreu um erro ao salvar a tarefa")
      return setSaveIsLoading(false)
    }
    const newTask = await response.json()
    setTask(newTask)
    setSaveIsLoading(false)
    toast.success("tarefa salva com sucesso")
  }
  const handleDeleteClick = async () => {
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      return toast.error("Ocorreu um erro ao deletar tarefa")
    }
    toast.success("Tarefa Deletada Comm Sucesso")
    navigate(-1)
  }
  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        {/**barra topo */}
        <button
          onClick={handleBackClick}
          className="bg-primary mb-2 flex h-8 w-8 items-center rounded-full"
        >
          <ArrowLeft />
        </button>
        <div className="flex w-full justify-between">
          {/**Parte da esquerda */}

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
        {/**Dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-white p-6">
          <div>
            <Input
              id="title"
              label="Titulo"
              ref={titleRef}
              errorMessage={titleError?.message}
              defaultValue={task?.title}
            />
          </div>
          <div>
            <TimeSelect
              errorMessage={timeError?.message}
              ref={timeRef}
              defaultValue={task?.time}
            />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              ref={descriptionRef}
              errorMessage={descriptionError?.message}
              defaultValue={task?.description}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button
            size="large"
            color="primary"
            disabled={saveIsLoading}
            onClick={handleSaveClick}
          >
            {saveIsLoading && <Loadericon className="animate-spin gap-2" />}
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
