import { Link } from "react-router-dom";

export default function Registro() {
  return (
    <>
      <h1 className="text-4xl font-black">Creat tu Cuenta</h1>
      <p>Llena el formulario</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="name">Nombre</label>
            <input
                className="mt-2 w-full bg-gray-50 p-3"
                id="name" 
                type="text" 
                name="name"
                placeholder="Tu Nombre"
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">Email</label>
            <input
                className="mt-2 w-full bg-gray-50 p-3"
                id="email" 
                type="text" 
                name="name"
                placeholder="Tu email"
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">Password</label>
            <input
                className="mt-2 w-full bg-gray-50 p-3"
                id="password" 
                type="password" 
                name="password"
                placeholder="Tu Password"
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="password_confirmation">Repetir Password</label>
            <input
                className="mt-2 w-full bg-gray-50 p-3"
                id="password_confirmation" 
                type="password" 
                name="password_confirmation"
                placeholder="Repetir Password"
            />
          </div>

          <input 
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            type="submit"
            value='Crear Cuenta' 
          />

        </form>
      </div>

    <div className="mt-5">
        <Link to="/auth/login">
            ¿Ya tienes cuenta? Inicia Sesión
        </Link>
    </div>
    </>
  );
}
