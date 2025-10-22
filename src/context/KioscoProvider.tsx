import { createContext, useEffect, useState } from "react"
import { type CategoriasType } from "../data/categorias";
import type { ProductoType } from "../data/productos";
import type { ReactNode } from "react";
import { toast } from "react-toastify";
import { clienteAxios } from "../config/axios";

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
  producto: ProductoType | PedidoType
  handleSetProducto: ( producto: ProductoType | PedidoType ) => void
  pedidos: PedidoType[]
  handleAgregarPedido: ( producto: ProductoCantidadType ) => void
  handleEditarCantidad: ( id: number ) => void
  handleEliminarProductoPedido: ( id: number ) => void
  total: number
  handleSubmitNuevaOrden: () => void
};

export const KioscoContext = createContext( {} as useKioscoType );

export const KioscoProvider = ({ children }: { children: ReactNode }) => {

    const [ categorias , setCategorias ] = useState( [] as CategoriasType[] );
    const [ categoriaActual , setCategoriaActual ] = useState( {} as CategoriasType )
    const [ modal , setModal ] = useState( false )
    const [ producto, setProducto ] = useState<ProductoType | PedidoType>({} as ProductoType)
    const [ pedidos , setPedido] = useState([] as PedidoType[] )
    const [ total , setTotal ] = useState(0)

    useEffect(() => {
      const nuevoTotal = pedidos.reduce( ( total , producto ) => (producto.precio * producto.cantidad) + total, 0 )
      setTotal( nuevoTotal )
    },[pedidos])

    const obtenerCategorias = async () => {
      try {

        const respuesta = await clienteAxios('/api/categorias'); //await axios(`${import.meta.env.VITE_API_URL}/api/categorias`);
        const { data } = respuesta;
        setCategorias( data.data );
        setCategoriaActual( data.data[0] );
      } catch (error) {
        console.log(error);
        
      }
    }

    useEffect( () => {
      obtenerCategorias();
    },[])
    
    const handleClickCategoria = (id : number ) => {
      const categoria = categorias.filter( categoria => categoria.id === id )[0]
      setCategoriaActual( categoria )
    }

    const handleClickModal = () => {
      setModal( !modal );
    }

    const handleSetProducto = (producto : ProductoType | PedidoType) => {
      setProducto( producto )
    }

    const handleAgregarPedido = ( { categoria_id , ...producto } : ProductoCantidadType ) => {

      if( pedidos.some( pedidoState => pedidoState.id === producto.id ) ){
        const pedidoActualizado = pedidos.map( pedidoState => pedidoState.id === producto.id ? producto : pedidoState );
        setPedido( pedidoActualizado );
        toast.success('Guardado Correctamente');
      }else{
        setPedido([ ...pedidos , producto ]);
        toast.success('Pedido Agregado');
      }
    }

    const handleEditarCantidad = (id: number) => {
      const productoActualizar = pedidos.filter( producto => producto.id === id )[0]
      setProducto( productoActualizar )
      setModal(!modal)
    }

    const handleEliminarProductoPedido = ( id : number) => {
      const pedidoActualizado = pedidos.filter( producto => producto.id !== id )
      setPedido( pedidoActualizado )
      toast.success( 'Pedido Eliminado' )
    }

    const handleSubmitNuevaOrden = async () => {
      const token = localStorage.getItem('AUTH_TOKEN')
      try {
        const { data } = await clienteAxios.post('/api/pedidos', { 
          total, 
           productos: pedidos.map( producto => ({
            id: producto.id,
            cantidad: producto.cantidad
           }))
        },
        {
          headers:{
            Authorization: `Bearer ${token}`
          }
        })

        toast.success( data.message );
        
        setTimeout( () => {
          setPedido([])
        }, 1000);

      } catch (error) {
        console.log(error);
      }
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
                handleAgregarPedido,
                handleEditarCantidad,
                handleEliminarProductoPedido,
                total,
                handleSubmitNuevaOrden
            }}
        >
            { children }
        </KioscoContext.Provider>
      )
}