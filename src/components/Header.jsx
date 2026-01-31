import { useState } from "react"

import { AddIcon, TrashIcon } from "../assets/icons"
import AddTaskDialog from "./AddTaskDialog"
import Button from "./Button"

const Header = ({ subtitle, title }) => {
  const [addTaskDialogOpen, setAddTaskDialogOpen] = useState(false)
  return (
    <div className="flex w-full justify-between">
      <div>
        <span className="text-primary text-xs font-semibold">{subtitle}</span>
        <h2 className="text-xl font-semibold">{title}</h2>
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
          handleClose={() => setAddTaskDialogOpen(false)}
        />
      </div>
    </div>
  )
}

export default Header
