import DashboardCards from "../components/DashboardCards"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import TaskItem from "../components/TaskItem"
import { useGetTaks } from "../hooks/data/use-get-tasks"

const HomePage = () => {
  const { data: tasks } = useGetTaks()
  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Dashboard" title="Dashboard" />
        <DashboardCards />
        <div className="grid grid-cols-[2fr_1fr] gap-6">
          <div className="rounded-[10px] bg-white p-6">
            <h3 className="mb-4 text-lg font-semibold">Tarefas</h3>
            <span className="text-dark-gray text-sm">
              Resumos das Tarefas Disponiveis
            </span>

            <div className="space-y-6">
              {tasks?.map((task) => (
                <TaskItem key={task.id} task={task} />
              ))}
            </div>
          </div>
          <div className="flex items-center justify-center rounded-[10px] bg-white p-6">
            <p>
              Cada pequena ação de hoje te aproxima das grandes conquistas de
              amanhã. Faça o que precisa ser feito!
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default HomePage
