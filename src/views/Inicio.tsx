import useSWR from "swr"
import type { useKioscoType } from "../context/KioscoProvider"
import { useKiosco } from "../hooks/useKiosco";
import { clienteAxios } from "../config/axios";
import Loader from "../layouts/Loader";
import Producto from "../components/Producto";

export default function inicio() {

  const { categoriaActual } = useKiosco() as useKioscoType

  // Consulta SWR
  const fetcher = () => clienteAxios('/api/productos').then( data => data.data)
  const { data , isLoading } = useSWR('/api/productos', fetcher, {
    refreshInterval: 1000
  })

  if(isLoading) return <Loader />

  const productos = data.data.filter( producto => producto.categoria_id === categoriaActual.id )

  return (
    <>
      <h1 className="text-4xl font-black">{ categoriaActual.nombre }</h1>
      <p className="text-2xl my-5">Elige tu pedido</p>

      <div className="ml-4 grid gap-4 grid-cols-1 md:grid-cols-2 xl:grid-cols-3">
        { productos.map( producto => (
          <Producto 
            producto={ producto }  
            key={producto.imagen} 
          />
        ) ) }
      </div>

    </>
  )
}
