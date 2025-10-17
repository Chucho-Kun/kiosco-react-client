import { createContext, useState } from "react"
import { categorias as categoriasDB, type CategoriasType } from "../data/categorias";

export type useKioscoType = {
  categorias: CategoriasType[]
  categoriaActual: CategoriasType
  handleClickCategoria: ( id: number) => void
};

export const KioscoContext = createContext();

export const KioscoProvider = ({ children }) => {

    const [ categorias , setCategorias ] = useState( categoriasDB );
    const [ categoriaActual , setCategoriaActual ] = useState( categorias[0] )
    
    const handleClickCategoria = (id : number ) => {
      const categoria = categorias.filter( categoria => categoria.id === id )[0]
      setCategoriaActual( categoria )
      
    }  

      return(
        <KioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria
            }}
        >
            { children }
        </KioscoContext.Provider>
      )
}