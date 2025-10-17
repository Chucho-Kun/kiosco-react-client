import { createContext, useState } from "react"
import { categorias as categoriasDB, type CategoriasType } from "../data/categorias";
import type { ProductoType } from "../data/productos";

export type ProductoCantidadType = ProductoType & {
  cantidad: number
}

export type PedidoType = Omit<ProductoType , 'categoria_id' | 'imagen' > & {
  cantidad: number
}

export type useKioscoType = {
  categorias: CategoriasType[]
  categoriaActual: CategoriasType
  handleClickCategoria: ( id: number) => void
  modal: boolean
  handleClickModal: () => void
  producto: ProductoType
  handleSetProducto: ( producto: ProductoType ) => void
  pedidos: PedidoType[]
  handleAgregarPedido: ( producto : ProductoCantidadType ) => void
};

export const KioscoContext = createContext( {} as useKioscoType );

import type { ReactNode } from "react";

export const KioscoProvider = ({ children }: { children: ReactNode }) => {

    const [ categorias , setCategorias ] = useState( categoriasDB );
    const [ categoriaActual , setCategoriaActual ] = useState( categorias[0] )
    const [ modal , setModal ] = useState( false )
    const [ producto, setProducto ] = useState({} as ProductoType)
    const [ pedidos , setPedido] = useState([] as PedidoType[] )
    
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

    const handleAgregarPedido = ( { categoria_id , imagen, ...producto } : ProductoCantidadType ) => {
      setPedido([ ...pedidos , producto ]);
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
                pedidos,
                handleAgregarPedido
            }}
        >
            { children }
        </KioscoContext.Provider>
      )
}