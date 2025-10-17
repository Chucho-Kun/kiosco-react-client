import type { useKioscoType } from "../context/KioscoProvider";
import { useKiosco } from "../hooks/useKiosco";
import Categoria from "./Categoria";



export default function SideBar() {

  const { categorias } = useKiosco() as useKioscoType

  return (
    <aside className="md:w-72">
      <div className="p-4">
        <img src="img/logo.svg" alt="imagen logotipo" className="w-40" />
      </div>

      <div className="mt-10">
        {categorias.map((categoria) => (
          <Categoria key={categoria.id} categoria={categoria} />
        ))}
      </div>

      <div className="my-5 px-5">
        <button
          type="button"
          className="text-center bg-red-500 w-full p-3 font-bold text-white truncate"
        >
          Cancelar Orden
        </button>
      </div>
      
    </aside>
  );
}
