import './loader.css'

export default function Loader() {
  return (
    <>
      <div className="sk-folding-cube mt-20">
          <div className="sk-cube1 sk-cube"></div>
          <div className="sk-cube2 sk-cube"></div>
          <div className="sk-cube4 sk-cube"></div>
          <div className="sk-cube3 sk-cube"></div>
      </div>
      <h1 className='text-center mt-10'>CARGANDO...</h1>
    </>
  )
}
