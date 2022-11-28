import '../sass/Button.scss'
const Button = ({icon,handleClick}) => {
  return (
    <div className='button__box'>
    <button 
        className="button" 
        onClick={handleClick}>
        {icon}
    </button>
        <div className='button_shadow'></div>
    </div>
  )
}

/*Buenas practica es retornar el nombre de la constante con llaves para
no poder realizar cambios */
export  {Button}