import {
  createBrowserRouter,
  Navigate,
  RouterProvider
} from "react-router-dom";

import ProcessInfoPage from './pages/ProcessInfoPage';
import ErrorPage from "./pages/ErrorPage";
import { getProcess, getStundentById } from "./services/processServicer";
import StudentsPage from "./pages/StudentsPage";
import LoginPage from "./pages/LoginPage";
import Layout from "./layout/Layout";

function loader() {
  return getProcess();
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getStudentProcess =({ params }: any) => {
  const studentId = Number(params.id); 
  return getStundentById(studentId);
}

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
        loader: getStudentProcess,
        element: <ProcessInfoPage />,
      },
    ]
  },
  {
    path: "/login",
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
