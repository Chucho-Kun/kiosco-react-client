import type { useKioscoType } from "../context/KioscoProvider";
import type { ProductoType } from "../data/productos";
import { formato } from "../helpers";
import { useKiosco } from "../hooks/useKiosco";
 
type ProductoProps = {
  producto: ProductoType
};

export default function Producto({ producto } : ProductoProps) {

  const { handleClickModal , handleSetProducto } = useKiosco() as useKioscoType
  const { nombre , precio , imagen } = producto;

  return (
    <div className="bg-gray-100 p-3 shadow">
        <img 
            className="w-full rounded-xl"
            src={`/img/${imagen}.jpg`} 
            alt={`Imagen de ${ nombre }`}
        />

        <div className="p-5">
            <h3 className="text-xl font-bold text-orange-800">
                { nombre }
            </h3>
            <p className="mt-5 font-black text-4xl text-orange-500">
                { formato( precio ) }
            </p>
        </div>

        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold cursor-pointer"
            onClick={ () => {
              handleClickModal();
              handleSetProducto( producto );
            } 
          }
        >Agregar</button>

    </div>
  )
}
