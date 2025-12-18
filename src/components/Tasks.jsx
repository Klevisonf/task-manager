import Button from "./Button"
import AddIcon from "../assets/icons/add.svg?react"
import TrashIcon from "../assets/icons/trash.svg?react"
import SunIcon from "../assets/icons/sun.svg?react"
import CloudSunIcon from "../assets/icons/cloudsun.svg?react"
import MoonIcon from "../assets/icons/lua.svg?react"

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
      {/*LISTAS DE TAREFAS */}
      <div className="rounded-lg bg-white p-6">
        {/**MANHA   */}
        <div className="space-y-3">
          <div className="flex items-center gap-3 border-b border-solid border-[#F4F4F5] pb-2">
            <SunIcon />
            <p className="text-sm text-[#9A9C9F]">Manha</p>
          </div>
        </div>
        {/**TARDE   */}
        <div className="my-6 space-y-3">
          <div className="flex items-center gap-3 border-b border-solid border-[#F4F4F5] pb-2">
            <CloudSunIcon />
            <p className="text-sm text-[#9A9C9F]">Tarde</p>
          </div>
        </div>

        {/**Noite  */}
        <div className="space-y-3">
          <div className="flex items-center gap-4 border-b border-solid border-[#F4F4F5] pb-2">
            <MoonIcon />
            <p className="text-sm text-[#9A9C9F]">Noite</p>
          </div>
        </div>
      </div>
    </div>
  )
}
export default Tasks
