import type { useKioscoType } from "../context/KioscoProvider"
import { useKiosco } from "../hooks/useKiosco"

export default function Resumen() {

  const { pedido } = useKiosco() as useKioscoType

  return (
    <aside className="w-72 h-screen overflow-y-scroll p-5">
      <h1 className="text-4xl font-black">
        Mi Pedido
      </h1>
      <p className="text-lg my-5">
        Resumen de tu pedido
      </p>

      <div>
        { pedido.length === 0 ? (
          <p className="text-center text-lg">No hay elementos en el pedido</p>
        ) : (
          <p>si hay pedidos</p>
        ) }
      </div>

      <p className="text-xl mt-10">
        Total: { `` }
      </p>

      <form className="w-full" >
        <div className="mt-5">
          <input 
            type="submit" 
            className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
            value="Confirmar Pedido"
          />
        </div>
      </form>

    </aside>
  )
}
