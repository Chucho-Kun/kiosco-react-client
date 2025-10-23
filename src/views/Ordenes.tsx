import useSWR from "swr"
import { clienteAxios } from "../config/axios"
import Loader from "../layouts/Loader"
import { formato } from "../helpers"
import { useKiosco } from "../hooks/useKiosco"
import type { useKioscoType } from "../context/KioscoProvider"

type ListaPedidosType = {
    "id": number
    "user_id": number
    "total": number
    "estado": boolean
    "created_at": string
    "updated_at": string
    "user": {
        "id": number
        "name": string
        "email": string
        "email_verified_at": null
        "created_at": string
        "updated_at": string
        "admin": 0
    }
    "productos": {
            "id": number
            "nombre": string
            "precio": number
            "imagen": string
            "disponible": boolean
            "categoria_id": number
            "created_at": string
            "updated_at": string
            "pivot": {
                "cantidad": number
                "pedido_id": number
                "producto_id": number
            }
        }[]
}

export default function Ordenes() {

    const token = localStorage.getItem('AUTH_TOKEN')
    const fetcher = () => clienteAxios('/api/pedidos', {
        headers: {
            Authorization: `Bearer ${token}`
        }
    })

    const { data , isLoading , mutate } = useSWR('/api/pedidos', fetcher, {
        refreshInterval: 5000
    })

    const { handleClickCompletarPedido } = useKiosco() as useKioscoType

    const handleClick = async ( id : number ) => {
        await handleClickCompletarPedido( id )
        mutate();
    }
    
    if(isLoading) return <Loader />

    const listaPedidos: ListaPedidosType[] = data?.data.data;

  return (
    <div>
        <h1 className="text-4xl font-black">Ordenes</h1>
        <p className="text-2xl my-10">
            Administra las ordenes desde aqui
        </p>
        <p className="mb-5">Ordenes Pendientes: { listaPedidos.length }</p>

        <div className="grid grid-cols-3 gap-5">
            { listaPedidos.map( pedido => (
                <div key={pedido.id} className="p-5 bg-white shadow space-y-2 border-b">

                    <p className="text-lg font-bold text-slate-600">
                        Cliente: {''}
                        <span className="font-normal">{pedido.user.name}</span>
                    </p>
                    <p className="text-lg font-bold text-amber-600">
                        Total a Pagar: {''}
                        <span className="font-normal text-slate-600">{ formato(pedido.total) }</span>
                    </p>

                    <button
                        type="button"
                        className="bg-indigo-600 hover:bg-indigo-800 px-5 py-2 rounded uppercase font-bold text-white text-center w-full cursor-pointer"
                        onClick={ () => handleClick(pedido.id) }
                    >
                        Completar
                    </button>

                    { pedido.productos.map( producto => (
                        <div
                            key={producto.id}
                            className="flex justify-between items-center border-b border-b-slate-200 last-of-type:border-none py-5"
                        >
                            <div>
                                <p className="text-sm">ID: {producto.id}</p>
                                <p>{producto.nombre}</p>
                                <p>
                                    Cantidad: {''}
                                    <span>{ producto.pivot.cantidad }</span>
                                </p>
                            </div>
                            <div className="w-20">
                                <img className="rounded" src={`img/${producto.imagen}.jpg`} alt="Imagen cafe" />
                            </div>
                        </div>
                    ))}

                </div>
            ) ) }
        </div>

    </div>
  )
}
