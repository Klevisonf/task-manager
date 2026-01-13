import { useState } from "react"
import { toast } from "sonner"

import { CheckIcon, DetailsIcon, Loadericon, TrashIcon } from "../assets/icons"
import Button from "./Button"
import { Link } from "react-router-dom"
const TaskItem = ({ task, handleCheckboxClick, onDeleteSuccess }) => {
  const [deleteIsLoading, setDeleteIsLoading] = useState(false)

  const handleDeleteClick = async () => {
    setDeleteIsLoading(true)
    const response = await fetch(`http://localhost:3000/tasks/${task.id}`, {
      method: "DELETE",
    })
    if (!response.ok) {
      setDeleteIsLoading(false)
      return toast.error("erro ao deletar a tarefa. Por favor tentar novamente")
    }
    onDeleteSuccess(task.id)
    setDeleteIsLoading(false)
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
        <Button
          color="ghost"
          onClick={handleDeleteClick}
          disabled={deleteIsLoading}
        >
          {deleteIsLoading ? (
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
