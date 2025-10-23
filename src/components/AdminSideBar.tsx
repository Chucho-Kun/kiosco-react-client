import { Link, useLocation } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

export default function AdminSideBar() {

    const { logout } = useAuth({ middleware: 'guest', url: '/admin'})
    const location = useLocation()
    const urlActual = location.pathname;   

  return (
    <aside className="md:w-72 h-screen">
        <div className="p-4">
            <img 
                src="/img/logo.svg" 
                alt="Imagen Logotipo"
                className="w-40" 
            />
        </div>

        <nav className="flex flex-col p-4">
            <Link to="/admin" className={`${urlActual === '/admin' && 'bg-amber-300'} p-2 font-bold text-lg`}>Ordenes</Link>
            <Link to="/admin/productos" className={`${urlActual.includes('productos') && 'bg-amber-300'} p-2 font-bold text-lg`}>Productos Disponibles</Link>
            <Link to="/admin/agotados" className={`${urlActual.includes('agotados') && 'bg-amber-300'} p-2 font-bold text-lg`}>Productos Agotados</Link>
        </nav>

        <div className="my-5 px-5">
            <button
                type="button"
                className="text-center bg-red-500 hover:bg-red-700 w-full p-3 font-bold text-white truncate cursor-pointer"
                onClick={ () => logout() }
            >
                Cerrar Sesión
            </button>
        </div>

    </aside>
  )
}
