import Sidebar from "../components/Sidebar.jsx"
import Tasks from "../components/Tasks"
function TaskPage() {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default TaskPage
