import SidebarButton from "./SidebarButton"
import HomeIcon from "../assets/icons/vector.svg?react"
import ListCheck from "../assets/icons/list-check.svg?react"
const Sidebar = () => {
  return (
    <div className="mt-2 h-screen w-64 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-xl font-semibold text-[#00ADB5]">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-[#00ADB5]">organizador de tarefas</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton variant="unselected">
          <HomeIcon />
          Inicial
        </SidebarButton>
        <SidebarButton variant="selected">
          <ListCheck />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
