import { formato } from "../helpers";
 
type ProductoProps = {
  producto: {
    nombre: string;
    precio: number;
    imagen: string;
    categoria_id: number;
    id: number;
  }
};

export default function Producto({ producto } : ProductoProps) {
  const { nombre , precio , imagen } = producto;

  return (
    <div className="bg-gray-100 p-3 shadow">
        <img 
            className="w-full rounded-xl"
            src={`/img/${imagen}.jpg`} 
            alt={`Imagen de ${ nombre }`}
        />

        <div className="p-5">
            <h3 className="text-2xl font-bold text-orange-800">
                { nombre }
            </h3>
            <p className="mt-5 font-black text-4xl text-orange-500">
                { formato( precio ) }
            </p>
        </div>

        <button
            type="button"
            className="bg-indigo-600 hover:bg-indigo-800 text-white w-full mt-5 p-3 uppercase font-bold"
        >Agregar</button>

    </div>
  )
}
