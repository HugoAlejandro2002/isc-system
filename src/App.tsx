import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import ProcessInfoPage from './pages/ProcessInfoPage';
import ErrorPage from "./pages/ErrorPage";
import { getProcess, getProcessById } from "./services/processServicer";
import StudentsPage from "./pages/StudentsPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout/Layout";

function loader() {
  return getProcess();
}

const loadStudentProcess = async ({ params }) => {
  const { id } = params;
  return getProcessById(id);
};


const router = createBrowserRouter([
  {
    path: '/',
    element: <Layout />,
    children: [
      {
        index: true,
        element: <Navigate to="/login" replace />,
      },
      {
        path: '/home',
        loader: loader,
        element: <StudentsPage />,
      },
      {
        path: '/studentProfile/:id',
        loader: loadStudentProcess,
        element: <ProcessInfoPage />,
      },
    ]
  },
  {
    path: "/login",
    loader: loader,
    element: <LoginPage />,
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
