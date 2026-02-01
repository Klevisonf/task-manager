import { ListCheck, LoadIcon, Tasks2 } from "../assets/icons"
import { useGetTaks } from "../hooks/data/use-get-tasks"
import DashboardCard from "./DashboardCard"

const DashboardCards = () => {
  const { data: Tasks } = useGetTaks()
  const notStatedTasks = Tasks?.filter(
    (task) => task.status === "not_started"
  ).length
  const inProgressTasks = Tasks?.filter(
    (task) => task.status === "in_progress"
  ).length
  const completedTasks = Tasks?.filter((task) => task.status === "done").length

  return (
    <div className="grid grid-cols-4 gap-9">
      <DashboardCard
        icon={<Tasks2 />}
        mainText={Tasks?.length}
        secondaryText="Tarefas totais"
      />

      <DashboardCard
        icon={<LoadIcon />}
        mainText={notStatedTasks}
        secondaryText="Tarefas nao iniciadas"
      />

      <DashboardCard
        icon={<LoadIcon />}
        mainText={inProgressTasks}
        secondaryText="Tarefas em andamento"
      />

      <DashboardCard
        icon={<ListCheck />}
        mainText={completedTasks}
        secondaryText="Tarefas concluídas"
      />
    </div>
  )
}

export default DashboardCards
