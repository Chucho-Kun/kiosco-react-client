import type { PedidoType, useKioscoType } from "../context/KioscoProvider";
import { formato } from "../helpers";
import { useKiosco } from "../hooks/useKiosco";

type ResumenProps = {
    pedido : PedidoType
}

export default function ResumenProducto( { pedido } : ResumenProps ) {
  
    const { id , nombre , precio , cantidad } = pedido
    const { handleEditarCantidad , handleEliminarProductoPedido } = useKiosco() as useKioscoType

    return (
    <div className="shadow space-y-1 p-4 bg-white">
      <div className="space-y-1">
        <p className="text-lg font-bold">{nombre}</p>

        <p className="text-sm text-amber-800">Cantidad: {cantidad}</p>
        <p className="text-sm text-amber-800">
          Precio: { formato( precio ) }
        </p>
        <p className="text-sm text-amber-800">
          Subtotal: { formato( precio * cantidad ) }
        </p>
      </div>

      <div className="flex justify-between gap-2 pb-4">
        <button
          type="button"
          className="bg-sky-300 hover:bg-sky-700 p-2 text-white rounded-full font-bold uppercase text-center cursor-pointer"
          onClick={ () => handleEditarCantidad(id) }
        >
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" className="size-5">
            <path d="m2.695 14.762-1.262 3.155a.5.5 0 0 0 .65.65l3.155-1.262a4 4 0 0 0 1.343-.886L17.5 5.501a2.121 2.121 0 0 0-3-3L3.58 13.419a4 4 0 0 0-.885 1.343Z" />
          </svg>


        </button>
        <button
          type="button"
          className="bg-red-300 hover:bg-red-700 p-2 text-white rounded-full font-bold uppercase text-center cursor-pointer"
          onClick={ () => handleEliminarProductoPedido(id) }
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-5 w-5"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16"
            />
          </svg>
        </button>
      </div>
    </div>
  );
}
