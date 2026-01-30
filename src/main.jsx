import "./index.css"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import { createBrowserRouter, RouterProvider } from "react-router-dom"
import { Toaster } from "sonner"

import HomePage from "./pages/Home.jsx"
import TaskDetailsPages from "./pages/TaskDetails.jsx"
import TaskPage from "./pages/Tasks.jsx"
const queryClient = new QueryClient()
const router = createBrowserRouter([
  {
    path: "/",
    element: <HomePage />,
  },
  {
    path: "/tasks",
    element: <TaskPage />,
  },
  {
    path: "/task/:taskId",
    element: <TaskDetailsPages />,
  },
])
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <Toaster
        toastOptions={{
          style: {
            color: "#35383E",
          },
        }}
      />
      <RouterProvider router={router} />
    </QueryClientProvider>
  </StrictMode>
)
