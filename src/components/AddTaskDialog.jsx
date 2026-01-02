import "./AddTaskDialog.css"

import { useRef } from "react"
import { useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import v4 from "uuid"
import Button from "./Button"
import Input from "./Input"
import InputLabel from "./InputLabel"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [title, setTitle] = useState()
  const [time, setTime] = useState()
  const [description, setDescription] = useState()
  const nodeRef = useRef()

  const handleSaveClick = () => {
    handleSubmit({
      id: v4(),
      title,
      time,
      description,
      status: "not_started",
    })
    handleClose
  }

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={500}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div>
        {createPortal(
          <div className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
            {/* Dialog content */}
            <div className="rounded-xl bg-white p-5 text-center">
              <h2 className="text-xl font-semibold text-[#35383E]">
                {" "}
                Nova Tarefa
              </h2>
              <p className="my-1 text-sm text-[#9A9C9F]">
                insira as informações abaixo{" "}
              </p>
              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                />

                <TimeSelect
                  value={time}
                  onChange={(e) => setTime(e.target.value)}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrever as tarefas"
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full text-center"
                    variant="secundary"
                    onClick={handleClose}
                  >
                    Cancelar
                  </Button>
                  <Button
                    size="large"
                    className="w-full text-center"
                    onClick={handleSaveClick}
                  >
                    Salvar
                  </Button>
                </div>
              </div>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
