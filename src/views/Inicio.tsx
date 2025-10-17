import Producto from "../components/Producto";
import type { useKioscoType } from "../context/KioscoProvider";
import { productos as data } from "../data/productos";
import { useKiosco } from "../hooks/useKiosco";

export default function inicio() {

  const { categoriaActual } = useKiosco() as useKioscoType

  const productos = data.filter( producto => producto.categoria_id === categoriaActual.id )

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
