import { useQueryClient } from "@tanstack/react-query"
import { Link } from "react-router-dom"
import { toast } from "sonner"

import { CheckIcon, DetailsIcon, Loadericon, TrashIcon } from "../assets/icons"
import { useDeletedTask } from "../hooks/data/use-deleted-task"
import Button from "./Button"
const TaskItem = ({ task, handleCheckboxClick }) => {
  const queryClient = useQueryClient()
  const { mutate: deletedTasks, isPending } = useDeletedTask(task.id)

  const handleDeleteClick = async () => {
    deletedTasks(undefined, {
      onSuccess: () => {
        queryClient.setQueryData("tasks", (oldTasks) => {
          return oldTasks?.filter((t) => t.id !== task.id)
        })
        toast.success("Tarefa deletada com sucesso!")
      },
      onError: () => {
        toast.error("Erro ao deletar tarefa. Por favor, tente novamente.")
      },
    })
  }
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-primary/20 text-primary"
    }
    if (task.status === "in_progress") {
      return "bg-process/20 text-process"
    }
    if (task.status === "not_started") {
      return "bg-dark-blue/20 text-text-dark-blue"
    }
  }

  return (
    <div
      className={`flex items-center justify-between gap-2 rounded-lg px-4 py-3 text-sm ${getStatusClasses()}`}
    >
      <div className="flex items-center gap-2">
        <label
          className={`relative flex h-5 w-5 cursor-pointer items-center justify-center rounded border`}
        >
          <input
            type="checkbox"
            checked={task.status === "done"}
            onChange={() => handleCheckboxClick(task.id)}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />

          {task.status === "done" && (
            <CheckIcon className="text-primary h-4 w-4" />
          )}
          {task.status === "in_progress" && (
            <Loadericon className="text-process h-4 w-4 animate-spin" />
          )}
        </label>
        {task.title}
      </div>
      <div className="flex items-center gap-2">
        <Button color="ghost" onClick={handleDeleteClick} disabled={isPending}>
          {isPending ? (
            <Loadericon className="text-process h-4 w-4 animate-spin" />
          ) : (
            <TrashIcon />
          )}
        </Button>
        <Link to={`/task/${task.id}`}>
          <DetailsIcon />
        </Link>
      </div>
    </div>
  )
}

export default TaskItem
