import Sidebar from "./components/sidebar"
import Tasks from "./components/Tasks"

function App() {
  return (
    <div className="flex gap-9">
      <Sidebar />
      <Tasks />
    </div>
  )
}

export default App
