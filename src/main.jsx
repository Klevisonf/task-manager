import "./index.css"

import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import App from "./App.jsx"
import TaskDetailsPages from "./pages/TaskDetails.jsx"

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailsPages />,
  },
])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <Toaster
      toastOptions={{
        style: {
          color: "#35383E",
        },
      }}
    />
    <RouterProvider router={router} />
  </StrictMode>
)
