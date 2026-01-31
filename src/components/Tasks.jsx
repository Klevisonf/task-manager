import { useQueryClient } from "@tanstack/react-query"
import { toast } from "sonner"

import {
  AddIcon,
  CloudSunIcon,
  MoonIcon,
  SunIcon,
  TrashIcon,
} from "../assets/icons"
import { useGetTaks } from "../hooks/data/use-get-tasks"
import { TaskQueryKeys } from "../keys/queries"
import Button from "./Button"
import Header from "./Header"
import TaskItem from "./TaskItem"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  const queryClient = useQueryClient()
  const { data: tasks } = useGetTaks()
  const morningTasks = tasks?.filter((task) => task.time === "morning")
  const afternoonTasks = tasks?.filter((task) => task.time === "afternoon")
  const eveningTasks = tasks?.filter((task) => task.time === "evening")

  const onDeleteTaskSuccess = async (taskId) => {
    queryClient.setQueryData(TaskQueryKeys.getAll(), (currentTasks) => {
      return currentTasks?.filter((task) => task.id !== taskId)
    })
    toast.success("Tarefa deletada com sucesso!")
  }

  return (
    <div className="w-full space-y-6 px-8 py-16">
      <Header subtitle="Minhas Tarefas" title="Tarefas do dia" />
      <div className="rounded-lg bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manha" icon={<SunIcon />} />
          {morningTasks?.length === 0 && (
            <p>Nenhuma tarefa cadastrada para o periodo da manha</p>
          )}
          {morningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
          {afternoonTasks?.length === 0 && (
            <p>Nenhuma tarefa cadastrada para o periodo da tarde</p>
          )}
          {afternoonTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
          {eveningTasks?.length === 0 && (
            <p>Nenhuma tarefa cadastrada para o periodo da noite</p>
          )}
          {eveningTasks?.map((task) => (
            <TaskItem
              key={task.id}
              task={task}
              onDeleteSuccess={onDeleteTaskSuccess}
            />
          ))}
        </div>
      </div>
    </div>
  )
}
export default Tasks
