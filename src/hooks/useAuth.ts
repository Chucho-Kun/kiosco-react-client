
import useSWR from "swr";
import { clienteAxios } from "../config/axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import type { LoginType } from "../views/Login";

type useAuthType = {
    middleware: string
    url: string
}

type setErroresType = React.Dispatch<React.SetStateAction<string[]>>


export const useAuth = ({ middleware, url }: useAuthType) => {

    const token = localStorage.getItem('AUTH_TOKEN')
    const navigate = useNavigate()

    const { data: user, error, mutate } = useSWR('/api/user', () => 
        clienteAxios('/api/user', {
            headers:{
                Authorization: `Bearer ${token}`
            }
        })
        .then( res => res.data )
        .catch( error => {
            throw Error( error?.response?.data?.errors)
        })
    )

    const login = async ( datos : LoginType ,  setErrores: setErroresType ) => {
        
        try {
          const { data } = await clienteAxios.post("/api/login", datos);
          localStorage.setItem("AUTH_TOKEN", data.token);
          setErrores([]);
          await mutate();
        } catch (error: unknown) {
          if (
            typeof error === "object" &&
            error !== null &&
            "response" in error &&
            typeof (error as any).response?.data?.errors === "object"
          ) {
            setErrores((error as any).response.data.errors);
          }
        }

    }

    const registro = async ( datos : LoginType ,  setErrores: setErroresType )  => {

        try {
            const { data } = await clienteAxios.post('/api/registro' , datos);
            localStorage.setItem("AUTH_TOKEN", data.token);
            setErrores([]);
            await mutate();
            } catch (error: unknown) {
            if(typeof error === 'object' && error !== null && 'response' in error && typeof (error as any).response?.data?.errors === 'object'){
                setErrores( (error as any).response.data.errors )
            }
            
            }
    }

    const logout = async () => {
        try {
            await clienteAxios.post('/api/logout', {}, {
                headers:{
                    Authorization: `Bearer ${token}`
                }
            })
            localStorage.removeItem('AUTH_TOKEN')
            await mutate(undefined);
        } catch (error: any) {
           throw Error( error?.response?.data?.errors)
        }
    }
    
    useEffect(() => {
        if(middleware === 'guest' && url && user){
            navigate(url)
        }
        if(middleware === 'auth' && error){
            navigate(url)
        }
    },[user, error])

    return {
        login, registro , logout, user, error
    }

}