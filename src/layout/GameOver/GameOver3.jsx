import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addState } from '../inGameSlice';
import './GameOver3.css'

export const GameOver3 = () => {

  const dispatch = useDispatch();

  dispatch(addState({ choosenState: false}))

  return (
    <Container fluid className="homeContainerMin gOverBg3 d-flex flex-column justify-content-center align-items-center">
      <div className='gOverText text-center'>
        <p>Game Over</p>
        <p>No has sido capaz de encontrar al culpable y la muerte ha quedado muy decepcionada contigo. Podría haberte dejado a tu suerte, 
            desvaneciéndote a la deriva en Oniria, pero en lugar de eso, te ha dado forma de lobo y te va a llevar con ella hasta que aprendas 
            a resolver problemas lógicos.
        </p>
        <p>No vas a poder volver al mundo despierto, pero al menos tu conciencia sigue viva, preguntándose si podrías haberte esforzado más para 
            resolver los problemas que se te plantearon. Algo que, sin duda, descubrirás muy pronto con las enseñanzas de tu nuevo mentor.</p>
      </div>
    </Container>
  )
}