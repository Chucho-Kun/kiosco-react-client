import { createRef, useState } from "react";
import { Link } from "react-router-dom";
import Errores from "../components/Errores";
import { useAuth } from "../hooks/useAuth";

export default function Registro() {

type FormDataType = {
  name: string;
  email: string;
  password: string;
  password_confirmation: string;
};

  const nameRef = createRef<HTMLInputElement>();
  const emailRef = createRef<HTMLInputElement>();
  const passwordRef = createRef<HTMLInputElement>();
  const passwordConfirmationRef = createRef<HTMLInputElement>();
  
  const [ errores , setErrores ] = useState<string[]>([])
  const { registro } = useAuth({middleware: 'guest', url: '/'})

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const datos: FormDataType = {
      name: (nameRef.current as HTMLInputElement).value,
      email: (emailRef.current as HTMLInputElement).value,
      password: (passwordRef.current as HTMLInputElement).value,
      password_confirmation: (passwordConfirmationRef.current as HTMLInputElement).value
    }   

    registro(datos , setErrores)

  }

  return (
    <>
      <h1 className="text-4xl font-black">Creat tu Cuenta</h1>
      <p>Llena el formulario</p>

      <div className="bg-white shadow-md rounded-md mt-10 px-5 py-10">
        <form
          onSubmit={handleSubmit}
          noValidate
          method="POST"
        >

        { Object.entries(errores).map(([ campo , mensajes ]) => <Errores key={campo}>{ mensajes }</Errores> ) }

          <div className="mb-4">
            <label className="text-slate-800" htmlFor="name">Nombre</label>
            <input
                className="mt-2 w-full bg-gray-50 p-3"
                id="name" 
                type="text" 
                name="name"
                placeholder="Tu Nombre"
                ref={nameRef}
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
                ref={emailRef}
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
                ref={passwordRef}
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
                ref={passwordConfirmationRef}
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
