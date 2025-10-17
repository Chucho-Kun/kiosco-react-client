import { Outlet } from "react-router-dom";
import SideBar from "../components/SideBar";
import Resumen from "../components/Resumen";


export default function Layout() {
  return (
    <div className="md:flex">
      <SideBar />
        <main className="flex-1 h-screen overflow-y-scroll bg-white p-3">
          <Outlet />
        </main>
      <Resumen />
    </div>
  )
}
