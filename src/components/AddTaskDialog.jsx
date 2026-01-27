import "./AddTaskDialog.css"

import { useRef } from "react"
import { createPortal } from "react-dom"
import { useForm } from "react-hook-form"
import { CSSTransition } from "react-transition-group"
import { toast } from "sonner"
import { v4 } from "uuid"

import { Loadericon } from "../assets/icons"
import Button from "./Button"
import Input from "./Input"
import TimeSelect from "./TimeSelect"

const AddTaskDialog = ({ isOpen, handleClose, onSubmitSuccess }) => {
  const {
    register,
    handleSubmit,
    reset,
    formState: { errors, isSubmitting },
  } = useForm({
    defaultValues: {
      title: "",
      time: "",
      description: "",
    },
  })
  const nodeRef = useRef()

  // função interna que limpa e fecha

  const onDialogClose = () => {
    handleClose()
  }

  const handleSaveClick = async (data) => {
    const task = {
      id: v4(),
      title: data.title.trim(),
      time: data.time,
      description: data.description.trim(),
      status: "not_started",
    }

    const response = await fetch("http://localhost:3000/tasks", {
      method: "POST",
      body: JSON.stringify(task),
    })
    if (!response.ok) {
      return toast.error(
        "Erro ao adicionar tarefa. Por favor, tente novamente."
      )
    }
    onSubmitSuccess(task)

    // limpa e fecha
    onDialogClose()
    reset({
      title: "",
      time: "",
      description: "",
    })
  }

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

              <form
                onSubmit={handleSubmit(handleSaveClick)}
                className="flex w-[336px] flex-col space-y-4"
              >
                <Input
                  id="title"
                  label="Título"
                  placeholder="Título da tarefa"
                  errorMessage={errors?.title?.message}
                  {...register("title", {
                    required: "O título é obrigatório.",
                  })}
                />

                <TimeSelect
                  errorMessage={errors?.time?.message}
                  {...register("time", {
                    required: "O horário é obrigatório.",
                  })}
                />

                <Input
                  id="description"
                  label="Descrição"
                  placeholder="Descrever as tarefas"
                  {...register("description", {
                    required: "A descrição é obrigatória.",
                  })}
                  errorMessage={errors?.description?.message}
                />

                <div className="flex gap-3">
                  <Button
                    size="large"
                    className="w-full text-center"
                    color="secundary"
                    onClick={onDialogClose}
                    type="button"
                  >
                    Cancelar
                  </Button>

                  <Button
                    size="large"
                    className="w-full text-center"
                    disabled={isSubmitting}
                    type="submit"
                  >
                    {isSubmitting && (
                      <Loadericon className="animate-spin gap-2" />
                    )}
                    Salvar
                  </Button>
                </div>
              </form>
            </div>
          </div>,
          document.body
        )}
      </div>
    </CSSTransition>
  )
}

export default AddTaskDialog
