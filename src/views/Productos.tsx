import useSWR from "swr"
import { clienteAxios } from "../config/axios"
import Loader from "../layouts/Loader"
import Producto from "../components/Producto"
import { useEffect, useState } from "react"

type ProductosDBType = {
  categoria_id:number
  created_at:string
  disponible:number
  id:number
  imagen:string
  nombre:string
  precio:number
  updated_at:number
}

export default function Productos({ status }: {status: string}) {

  const url = ( status === 'disponibles' ) ? '/api/productos?disponible=1' : '/api/productos?disponible=0';
  const titulo = ( status === 'disponibles' ) ? 'Productos Disponibles' : 'Productos Agotados';
  const statusBoton = ( status === 'disponibles' ) ? 'agotado' : 'disponible';
  
  const token = localStorage.getItem('AUTH_TOKEN')

  const fetcher = () => clienteAxios( url , {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then(datos => datos.data)

  const { data, isLoading, mutate } = useSWR( url , fetcher,{ refreshInterval: 10000})
  
  const [action , setAction] = useState('');

  useEffect(() => {
    setTimeout(() => {
      mutate(undefined);
    },800)
  },[action]);
  
  if(isLoading) return <Loader />

  const productosDB : ProductosDBType[] = data.data

  return (
    <div>
        <h1 className="text-4xl font-black">{ titulo }</h1>
        <p className="text-2xl my-10">
            Maneja la disponibilidad desde aqui
        </p>

      <div className="grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        { productosDB.map(producto => (
          <Producto 
            key={producto.id}
            producto={producto}
            botonAdmin={statusBoton}
            setAction={setAction}
          />
        )) }
      </div>

    </div>
  )
}
