import Navbar from "./Navbar";
// import Footer from './Footer';

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="flex flex-col w-full min-h-screen">
      <Navbar />
      <div className="flex flex-row w-full">
        <div className="flex w-1/6">
          <Sidebar />
        </div>
        <main className="flex flex-col w-full h-full overflow-auto">
          {" "}
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
