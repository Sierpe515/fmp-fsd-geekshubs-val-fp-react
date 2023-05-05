import React from 'react'
import GirarMovil from '../../image/gira el movil.png'

export const TurnPhone = () => {
  // COMPONENT TO NOT SHOW GAME IN VERTICAL
  return (
    <div className='portrait text-center'>
        <img src={GirarMovil} alt="GirarMovil" />
        <h1>Por favor, gira el móvil</h1>
        <h2>Este juego está pensado para verse en horizontal</h2>
    </div>
  )
}
