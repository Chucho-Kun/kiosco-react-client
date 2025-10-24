import { Outlet } from "react-router-dom";
import Modal from "react-modal"
import SideBar from "../components/SideBar";
import Resumen from "../components/Resumen";
import { useKiosco } from "../hooks/useKiosco";
import type { useKioscoType } from "../context/KioscoProvider";
import ModalProducto from "../components/ModalProducto";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const customStyles = {
  content: {
    top: "50%",
    left: "50%",
    right: "auto",
    bottom: "auto",
    marginRight: "-50%",
    transform: "translate(-50%, -50%)",
  },
};

Modal.setAppElement('#root');

export default function Layout() {

  //useAuth({ middleware: 'auth', url: '/auth/login' })
  const { modal } = useKiosco() as useKioscoType;
  
  return (
    <>
      <div className="md:flex">
        <SideBar />
        <main className="flex-1 h-screen overflow-y-scroll bg-white p-3">
          <Outlet />
        </main>
        <Resumen />
      </div>

      <Modal isOpen={ modal } style={ customStyles } >
        <ModalProducto />
      </Modal>

      <ToastContainer />

    </>
  );
}
