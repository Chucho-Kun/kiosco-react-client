import useSWR from "swr"
import type { useKioscoType } from "../context/KioscoProvider"
import { useKiosco } from "../hooks/useKiosco";
import { clienteAxios } from "../config/axios";
import Loader from "../layouts/Loader";
import Producto from "../components/Producto";
import type { ProductoType } from "../data/productos";
import { useState } from "react";

export default function inicio() {

  const { categoriaActual } = useKiosco() as useKioscoType
  const [ action , setAction] = useState('');

  // Consulta SWR
  const token = localStorage.getItem('AUTH_TOKEN');
  const fetcher = () => clienteAxios('/api/productos', {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }).then( data => data.data)
  const { data , isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 10000
  })

  if(isLoading) return <Loader />

  const productos = data.data.filter( (producto: ProductoType) => producto.categoria_id === categoriaActual.id )

  return (
    <>
      <h1 className="text-4xl font-black">{ categoriaActual.nombre }</h1>
      <p className="text-2xl my-5">Elige tu pedido</p>

      <div className="ml-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3" title={action}>
        { productos.map( (producto: ProductoType) => (
          <Producto 
            key={producto.imagen}
            producto={producto}
            botonAdmin='normal'
            setAction={setAction}
          />
        ) ) }
      </div>

    </>
  )
}
