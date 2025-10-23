import type { useKioscoType } from "../context/KioscoProvider";
import type { ProductoType } from "../data/productos";
import { formato } from "../helpers";
import { useKiosco } from "../hooks/useKiosco";
 
type ProductoProps = {
  producto: ProductoType
  botonAdmin: string //normal | agotado | disponible
  setAction: ( a: string ) => void
};

export default function Producto({ producto , botonAdmin , setAction } : ProductoProps) {

  const { handleClickModal , handleSetProducto , handleClickProductoAgotado } = useKiosco() as useKioscoType
  const { nombre , precio , imagen } = producto;

  const handleClick = async ( id: number) => {
    await handleClickProductoAgotado( id );
    const stamp = new Date().toLocaleTimeString();
    setAction( stamp );
  }

  return (
    <div className="bg-gray-100 p-3 shadow">
      <img
        className="w-full rounded-xl"
        src={`/img/${imagen}.jpg`}
        alt={`Imagen de ${nombre}`}
      />

      <div className="p-5">
        <h3 className="text-xl font-bold text-orange-800">{nombre}</h3>
        <p className="mt-5 font-black text-4xl text-orange-500">
          {formato(precio)}
        </p>
      </div>

      { botonAdmin === 'normal' && (
        <button
          type="button"
          className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          onClick={() => {
            handleClickModal();
            handleSetProducto(producto);
          }}
        >
          Agregar
        </button>
      )}
      
      { botonAdmin === 'agotado' && (
        <button
          type="button"
          className="bg-red-600 hover:bg-red-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          onClick={() =>  handleClick( producto.id ) }
        >
          Marcar como Agotado
        </button>
      )}
      
      { botonAdmin === 'disponible' && (
        <button
          type="button"
          className="bg-amber-500 hover:bg-amber-600 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
          onClick={() =>  handleClick( producto.id ) } 
        >
          Marcar como Disponible
        </button>
      )}
    </div>
  );
}
