import type { useKioscoType } from "../context/KioscoProvider"
import { formato } from "../helpers"
import { useKiosco } from "../hooks/useKiosco"
import ResumenProducto from "./ResumenProducto"

export default function Resumen() {

  const { pedidos , total } = useKiosco() as useKioscoType

  const comprobarPedidos = () => pedidos.length === 0;

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">
        Mi Pedido
      </h1>
      <p className="text-lg my-5">
        Resumen de tu pedido
      </p>

      <div>
        { pedidos.length === 0 ? (
          <p className="text-center text-lg">No hay elementos en el pedido</p>
        ) : (
          pedidos.map( pedido => (
            <ResumenProducto key={ pedido.id } pedido={ pedido } />
          ))
        ) }
      </div>

      <p className="text-xl mt-10 font-bold">
        Total: { `` }
        { formato( total ) }
      </p>

      <form className="w-full" >
        <div className="mt-5">
          <input 
            type="submit" 
            className={`${comprobarPedidos() ? 'bg-indigo-300' : 'bg-indigo-600 hover:bg-indigo-800 cursor-pointer'} px-5 py-2 rounded uppercase font-bold text-white text-center w-full`}
            value="Confirmar Pedido"
            disabled={ comprobarPedidos() }
          />
        </div>
      </form>

    </aside>
  )
}
