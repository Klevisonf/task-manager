import { GlassWater, ListCheck, LoadIcon, Tasks2 } from "../assets/icons"
import DashboardCard from "../components/DashboardCard"
import Header from "../components/Header"
import Sidebar from "../components/Sidebar"
import { useGetTaks } from "../hooks/data/use-get-tasks"

const HomePage = () => {
  const { data: Tasks } = useGetTaks()

  const inProgressTasks = Tasks?.filter(
    (task) => task.status === "in_progress"
  ).length
  const completedTasks = Tasks?.filter((task) => task.status === "done").length

  return (
    <div className="flex">
      <Sidebar />
      <div className="w-full space-y-6 px-8 py-16">
        <Header subtitle="Dashboard" title="Dashboard" />
        <div className="grid grid-cols-4 gap-9">
          <DashboardCard
            icon={<Tasks2 />}
            mainText={Tasks?.length}
            secondaryText="Tarefas em disponiveis"
          />

          <DashboardCard
            icon={<ListCheck />}
            mainText={completedTasks}
            secondaryText="Tarefas concluidas"
          />

          <DashboardCard
            icon={<LoadIcon />}
            mainText={inProgressTasks}
            secondaryText="Tarefas em andamento"
          />

          <DashboardCard
            icon={<GlassWater />}
            mainText={5}
            secondaryText="Água"
          />
        </div>
      </div>
    </div>
  )
}

export default HomePage
