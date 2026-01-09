import "./AddTaskDialog.css"

import PropTypes from "prop-types"
import { useRef, useState } from "react"
import { createPortal } from "react-dom"
import { CSSTransition } from "react-transition-group"
import { v4 as uuidv4 } from "uuid"

import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, handleSubmit }) => {
  const [errors, setErrors] = useState([])

  const nodeRef = useRef()
  const titleRef = useRef()
  const descriptionRef = useRef()
  const timeRef = useRef()
  // função interna que limpa e fecha

  const onDialogClose = () => {
    setErrors([])

    handleClose()
  }

  const handleSaveClick = () => {
    const newErrors = []

    const title = titleRef.current.value
    const description = descriptionRef.current.value
    const time = timeRef.current.value

    if (!title.trim()) {
      newErrors.push({
        inputName: "title",
        message: "O título é obrigatório.",
      })
    }

    if (!time.trim()) {
      newErrors.push({
        inputName: "time",
        message: "O título é obrigatório.",
      })
    }

    if (!description.trim()) {
      newErrors.push({
        inputName: "description",
        message: "a descrição é obrigatório.",
      })
    }
    setErrors(newErrors)
    if (newErrors.length > 0) {
      return
    }
    handleSubmit({
      id: uuidv4(),
      title,
      time,
      description,
      status: "not_started",
    })

    // limpa e fecha
    onDialogClose()
  }
  const titleError = errors.find((error) => error.inputName === "title")
  const timeError = errors.find((error) => error.inputName === "time")
  const descriptionError = errors.find(
    (error) => error.inputName === "description"
  )

  return (
    <CSSTransition
      nodeRef={nodeRef}
      in={isOpen}
      timeout={300}
      classNames="add-task-dialog"
      unmountOnExit
    >
      <div ref={nodeRef}>
        {createPortal(
          <div className="fixed top-0 bottom-0 left-0 flex h-screen w-screen items-center justify-center backdrop-blur-sm">
            <div className="rounded-xl bg-white p-5 text-center">
              <h2 className="text-text-dark-blue text-xl font-semibold">
                Nova Tarefa
              </h2>

              <p className="text-text-gray my-1 text-sm">
                Insira as informações abaixo
              </p>

              <div className="flex w-[336px] flex-col space-y-4">
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  errorMessage={titleError?.message}
                  ref={titleRef}
                />

                <TimeSelect errorMessage={timeError?.message} ref={timeRef} />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrever as tarefas"
                  ref={descriptionRef}
                  errorMessage={descriptionError?.message}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full text-center"
                    color="secundary"
                    onClick={onDialogClose}
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
