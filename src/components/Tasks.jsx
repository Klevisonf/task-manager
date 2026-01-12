import { useEffect, useState } from "react"
import { toast } from "sonner"

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false)
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    const fetchTasks = async () => {
      // pega os dados da API
      const response = await fetch("http://localhost:3000/tasks", {
        method: "GET",
      })
      const tasks = await response.json()
      setTasks(tasks)

      // Apos pegar os dados, converte para JSON
    }
    fetchTasks()
  }, [])

  const morningTasks = tasks.filter((task) => task.time === "morning")
  const afternoonTasks = tasks.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks.filter((task) => task.time === "evening")

  const onDeleteTaskSuccess = async (taskId) => {
    const newTasks = tasks.filter((task) => task.id !== taskId)
    setTasks(newTasks)
    toast.success("Tarefa deletada com sucesso!")
  }

  const handleDialogClose = () => {
    setAddTaskDialogOpen(false)
  }

  const handleTaskCheckboxClick = (taskId) => {
    const newTasks = tasks.map((task) => {
      if (task.id !== taskId) {
        return task
      }
      if (task.status === "not_started") {
        toast.success("Tarefa iniciada!")
        return { ...task, status: "in_progress" }
      }
      if (task.status === "in_progress") {
        toast.success("Tarefa concluida!")
        return { ...task, status: "done" }
      }
      if (task.status === "done") {
        toast.success("Tarefa reiniciada!")
        return { ...task, status: "not_started" }
      }
      return task
    })
    setTasks(newTasks)
  }
  const handleAddTaskSubmit = async (task) => {
    //chamar a api para adicionar a tarefa
    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      return toast.error(
        "Erro ao adicionar tarefa. Por favor, tente novamente."
      )
    }
    setTasks([...tasks, task])
    toast.success("Tarefa adicionada com sucesso!")
  }
  return (
    <div className="w-full space-y-6 px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-primary text-xs font-semibold">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button color="ghost">
            Limpar Tarefas
            <TrashIcon />
          </Button>

          <Button onClick={() => setAddTaskDialogOpen(true)}>
            NovaTarefas
            <AddIcon />
          </Button>

          <AddTaskDialog
            isOpen={addTaskDialogOpen}
            handleClose={handleDialogClose}
            onSubmitSuccess={handleAddTaskSubmit}
          />
        </div>
      </div>

      <div className="rounded-lg bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manha" icon={<SunIcon />} />
          {morningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              handleCheckboxClick={handleTaskCheckboxClick}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Tasks
