import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSunIcon from "../assets/icons/cloudsun.svg?react"
import MoonIcon from "../assets/icons/lua.svg?react"
import TaskSeparator from "./TaskSeparator"

const Tasks = () => {
  return (
    <div className="w-full px-8 py-16">
      <div className="flex w-full justify-between">
        <div>
          <span className="text-xs font-semibold text-[#00ADB5]">
            Minhas Tarefas
          </span>
          <h2 className="text-xl font-semibold">Minhas Tarefas</h2>
        </div>
        <div className="flex items-center gap-3">
          <Button variant="ghost">
            Limpar Tarefas
            <TrashIcon />
          </Button>

          <Button>
            NovaTarefas
            <AddIcon />
          </Button>
        </div>
      </div>

      <div className="rounded-lg bg-white p-6">
        <div className="space-y-3">
          <TaskSeparator title="Manha" icon={<SunIcon />} />
        </div>

        <div className="my-6 space-y-3">
          <TaskSeparator title="Tarde" icon={<CloudSunIcon />} />
        </div>

        <div className="space-y-3">
          <TaskSeparator title="Noite" icon={<MoonIcon />} />
        </div>
      </div>
    </div>
  )
}
export default Tasks
