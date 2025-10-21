import type { ReactNode } from "react";

type ErroresProps = {
    children: ReactNode
}

export default function Errores({children}: ErroresProps) {
  return (
    <div className="text-center text-sm my-2 bg-red-600 text-white font-bold p-3 uppercase">
      {children}
    </div>
  )
}
