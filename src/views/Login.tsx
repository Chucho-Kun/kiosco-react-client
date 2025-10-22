import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Errores from "../components/Errores";
import { useAuth } from "../hooks/useAuth";

export type LoginType = {
    email: string;
    password: string;
  };

export default function Login() {

  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  
  const [ errores , setErrores ] = useState<string[]>([])
  const { login } = useAuth( {
    middleware: 'guest',
    url: '/'
  })

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datos: LoginType = {
      email: (emailRef.current as HTMLInputElement).value,
      password: (passwordRef.current as HTMLInputElement).value
    }   

    login( datos, setErrores )

  }

  return (
    <>
      <h1 className="text-4xl font-black">Iniciar Sesión</h1>
      <p>Para crear un pedido</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
        >

          { Object.entries(errores).map(([ campo , mensajes ]) => <Errores key={campo}>{ mensajes }</Errores> ) }
          
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">
              Email
            </label>
            <input
              className="mt-2 w-full bg-gray-50 p-3"
              id="email"
              type="text"
              name="name"
              placeholder="Tu email"
              ref={emailRef}
            />
          </div>
          <div className="mb-4">
            <label className="text-slate-800" htmlFor="email">
              Password
            </label>
            <input
              className="mt-2 w-full bg-gray-50 p-3"
              id="password"
              type="password"
              name="password"
              placeholder="Tu Password"
              ref={passwordRef}
            />
          </div>
          

          <input
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            type="submit"
            value="Iniciar Sesión"
          />
        </form>
      </div>

      <nav className="mt-5">
        <Link to="/auth/registro">
            ¿No tienes cuenta? Crea una
        </Link>
      </nav>
    </>
  );
}
