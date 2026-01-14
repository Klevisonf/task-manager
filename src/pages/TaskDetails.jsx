import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"

import { ArrowLeft, ChevronRight, TrashIcon } from "../assets/icons"
import Button from "../components/Button"
import Input from "../components/Input"
import InputLabel from "../components/InputLabel"
import Sidebar from "../components/Sidebar"
import TimeSelect from "../components/TimeSelect"

const TaskDetailsPage = () => {
  const { taskId } = useParams()
  const [task, setTask] = useState()
  const navigate = useNavigate()
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
              <span
                onClick={handleBackClick}
                className="text-text-gray cursor-pointer"
              >
                Minhas tarefas
              </span>
              <ChevronRight />
              <span className="text-primary font-semibold">{task?.title}</span>
            </div>
            <h1 className="mt-2 text-xl font-semibold">{task?.title}</h1>
          </div>
          <Button className="h-fit self-end" color="danger">
            <TrashIcon />
            Deletar Tarefa
          </Button>
        </div>
        {/**Dados da tarefa */}
        <div className="space-y-6 rounded-xl bg-white p-6">
          <div>
            <Input id="title" label="Titulo" value={task?.title} />
          </div>
          <div>
            <TimeSelect value={task?.time} />
          </div>
          <div>
            <Input
              id="description"
              label="Descrição"
              value={task?.description}
            />
          </div>
        </div>
        <div className="flex w-full justify-end gap-3">
          <Button size="large" color="secundary">
            Cancelar
          </Button>
          <Button size="large" color="primary">
            Salvar
          </Button>
        </div>
      </div>
    </div>
  )
}

export default TaskDetailsPage
