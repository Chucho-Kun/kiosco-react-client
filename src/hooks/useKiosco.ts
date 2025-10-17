import { useContext } from "react"
import { KioscoContext } from "../context/KioscoProvider"

export const useKiosco = () => {
    return useContext(KioscoContext)
}