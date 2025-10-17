import type { useKioscoType } from "../context/KioscoProvider";
import { useKiosco } from "../hooks/useKiosco";

type CategoriaProps = {
  categoria: {
    icono: string;
    nombre: string;
    id: number;
  };
};

export default function Categoria({ categoria }: CategoriaProps) {
  const { handleClickCategoria , categoriaActual } = useKiosco() as useKioscoType;
  const { nombre, icono , id } = categoria;

  const resaltarCategoria = () => categoriaActual.id === id ? 'bg-amber-400' : 'bg-white'

  return (
    <button 
      type="button"
      onClick={ () => handleClickCategoria( id ) }  
      className={` ${ resaltarCategoria() } flex items-center gap-4 border border-gray-200 w-full p-3 hover:bg-amber-400 cursor-pointer`}
    >
      <img src={`/img/icono_${icono}.svg`} alt="Imagen logo" className="w-12" />
      <div className="text-lg font-bold cursor-pointer truncate">{nombre}</div>
    </button>
  );
}
