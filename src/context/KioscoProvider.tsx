import { createContext, useState } from "react"
import { categorias as categoriasDB, type CategoriasType } from "../data/categorias";
import type { ProductoType } from "../data/productos";

export type useKioscoType = {
  categorias: CategoriasType[]
  categoriaActual: CategoriasType
  handleClickCategoria: ( id: number) => void
  modal: boolean
  handleClickModal: () => void
  producto: ProductoType
  handleSetProducto: ( producto: ProductoType ) => void
  pedido: ProductoType[]
};

export const KioscoContext = createContext();

export const KioscoProvider = ({ children }) => {

    const [ categorias , setCategorias ] = useState( categoriasDB );
    const [ categoriaActual , setCategoriaActual ] = useState( categorias[0] )
    const [ modal , setModal ] = useState( false )
    const [ producto, setProducto ] = useState({})
    const [ pedido , setPedido] = useState([])
    
    const handleClickCategoria = (id : number ) => {
      const categoria = categorias.filter( categoria => categoria.id === id )[0]
      setCategoriaActual( categoria )
    }

    const handleClickModal = () => {
      setModal( !modal );
    }

    const handleSetProducto = (producto : ProductoType) => {
      setProducto( producto )
    } 

      return(
        <KioscoContext.Provider
            value={{
                categorias,
                categoriaActual,
                handleClickCategoria,
                modal,
                handleClickModal,
                producto,
                handleSetProducto,
                pedido
            }}
        >
            { children }
        </KioscoContext.Provider>
      )
}