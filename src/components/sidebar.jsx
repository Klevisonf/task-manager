import PropTypes from "prop-types"

import ListCheck from "../assets/icons/list-check.svg?react"
import HomeIcon from "../assets/icons/vector.svg?react"
import SidebarButton from "./SidebarButton"
const Sidebar = () => {
  return (
    <div className="mt-2 h-screen w-64 bg-white">
      <div className="space-y-4 px-8 py-6">
        <h1 className="text-primary text-xl font-semibold">Task Manager</h1>
        <p>
          Um simples{" "}
          <span className="text-primary">organizador de tarefas</span>
        </p>
      </div>
      <div className="flex flex-col gap-2 p-2">
        <SidebarButton color="unselected">
          <HomeIcon />
          Inicial
        </SidebarButton>
        <SidebarButton color="selected">
          <ListCheck />
          Minhas Tarefas
        </SidebarButton>
      </div>
    </div>
  )
}

export default Sidebar
