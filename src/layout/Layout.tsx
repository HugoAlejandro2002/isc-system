import Navbar from "./Navbar";
// import Footer from './Footer';

import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";

const Layout = () => {
  return (
    <div className="overflow-hidden">
      <Navbar />
      <Sidebar />
      <main className="pt-6 sm:ml-64">
        {" "}
        <Outlet />
      </main>
    </div>
  );
};

export default Layout;
