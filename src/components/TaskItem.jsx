import CheckIcon from "../assets/icons/check.svg?react"
import Loadericon from "../assets/icons/loading.svg?react"
import DetailsIcon from "../assets/icons/details.svg?react"

const TaskItem = ({ task, handleTaskCheckboxClick }) => {
  const getStatusClasses = () => {
    if (task.status === "done") {
      return "bg-[#00ADB5]/10 text-[#00ADB5] "
    }
    if (task.status === "in_progress") {
      return "bg-[#FFAA84]/10 text-[#FFAA84]"
    }
    if (task.status === "not_started") {
      return "bg-[#35383E]/10 text-[#35383E]"
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
            onChange={() => handleTaskCheckboxClick(task.id)}
            className="absolute h-full w-full cursor-pointer opacity-0"
          />

          {task.status === "done" && (
            <CheckIcon className="h-4 w-4 text-[#00ADB5]" />
          )}
          {task.status === "in_progress" && (
            <Loadericon className="h-4 w-4 animate-spin text-[#FFAA84]" />
          )}
        </label>
        {task.title}
      </div>

      <a href="#" className="hover:opacity-75">
        <DetailsIcon />
      </a>
    </div>
  )
}

export default TaskItem
