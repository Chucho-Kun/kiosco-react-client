# FullStack Platform LARAVEL / REACT + SWR 
Kiosk-style order management platform with user and administrator account access and user and administrator views. Real-time product availability updates. Laravel + MySQL + Axios + Docker + Tailwindcss + Typescript - SWC - (Full-Stack Food App)
## 🚀 Tech Stack

![Laravel](https://img.shields.io/badge/Laravel-FF2D20?style=for-the-badge&logo=laravel&logoColor=white)
![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)
![Axios](https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white)
![Docker](https://img.shields.io/badge/Docker-2496ED?style=for-the-badge&logo=docker&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-06B6D4?style=for-the-badge&logo=tailwindcss&logoColor=white)
![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?style=for-the-badge&logo=typescript&logoColor=white)
![SWC](https://img.shields.io/badge/SWC-F7DF1E?style=for-the-badge&logo=swc&logoColor=black)
<img width="1523" height="803" alt="Captura de Pantalla 2025-10-23 a la(s) 16 00 56" src="https://github.com/user-attachments/assets/cc9a8074-b192-4fff-bc2b-97f76cae7e92" />
<img width="1524" height="833" alt="Captura de Pantalla 2025-10-23 a la(s) 17 25 18" src="https://github.com/user-attachments/assets/80f37afb-09ba-4352-83de-dff1f9aadb70" />
<img width="926" height="700" alt="Captura de Pantalla 2025-10-23 a la(s) 17 27 09" src="https://github.com/user-attachments/assets/2402efde-0f93-4f60-851a-74aca2b61eb7" />

## useKiosco() [Custom Hook]
### src/context/KioscoProvider.tsx
```
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
  handleClickCompletarPedido: ( id: number) => void
  handleClickProductoAgotado: ( id: number) => void
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
      const token = localStorage.getItem('AUTH_TOKEN')
      try {
        const respuesta = await clienteAxios('/api/categorias', { //await axios(`${import.meta.env.VITE_API_URL}/api/categorias`);
          headers: {
            Authorization: `Bearer ${token}`
          }
        }); 
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

    const handleClickCompletarPedido = async ( id : number): Promise< string | null > => {
      const token = localStorage.getItem('AUTH_TOKEN')
       try {
          await clienteAxios.put(`/api/pedidos/${id}`, null, {
            headers: {
              Authorization: `Bearer ${token}`
            }
          })

          toast.success('Pedido cerrado correctamente');
          return 'ok';
        
        } catch (error) {
          console.log(error);
          return null
        }
    }

    const handleClickProductoAgotado  = async ( id: number ): Promise< { nombreProducto: string } | null > => {
      const token = localStorage.getItem('AUTH_TOKEN')
      try {
        const respuesta = await clienteAxios.put(`/api/productos/${id}`, null, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        const status = respuesta.data.producto.disponible
        const nombreProducto = respuesta.data.producto.nombre
        const texto = ( status ) ? `${nombreProducto} agregado nuevamente` : `${nombreProducto} retirado del menú`;

        toast.success( texto );
        return nombreProducto;
        
      } catch (error) {
        console.log(error);
        return null;
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
                handleSubmitNuevaOrden,
                handleClickCompletarPedido,
                handleClickProductoAgotado
            }}
        >
            { children }
        </KioscoContext.Provider>
      )
}
```
## CORS configuration
### src/config/axios.ts
```
import axios from "axios";

export const clienteAxios = axios.create({
    baseURL: import.meta.env.VITE_API_URL,
    headers:{
        'Accept':'application/json',
        'X-Requested-With':'XMLHttpRequest'
    },
    withCredentials: true
})
```
