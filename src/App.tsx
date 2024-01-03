import {
  createBrowserRouter,
  RouterProvider
} from "react-router-dom";

import ProcessInfoPage from './pages/ProcessInfoPage';
import ErrorPage from "./pages/ErrorPage";
import { getProcess } from "./services/processServicer";
import StudentsPage from "./pages/StudentsPage";

function loader() {
  return getProcess();
}

const router = createBrowserRouter([
  {
    path: "/home",
    loader: loader,
    element: <StudentsPage />,
  },
  {
    path: "/studentProfile",
    loader: loader,
    element: <ProcessInfoPage />,
  },
  {
    path: "*",
    element: <ErrorPage />,
  },
]);

function App() {
  return (
    <RouterProvider router={router} />
  );
}

export default App
