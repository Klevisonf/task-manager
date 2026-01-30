import Sidebar from "../components/Sidebar"
import Tasks from "../components/Tasks"

const HomePage = () => {
  return (
    <div className="flex">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default HomePage
