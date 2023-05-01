import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addState } from '../inGameSlice';
import './GameOver2.css'

export const GameOver2 = () => {

  const dispatch = useDispatch();

  dispatch(addState({ choosenState: false}))

  return (
    <Container fluid className="homeContainerMin gOverBg2 d-flex flex-column justify-content-center align-items-center">
      <div className='gOverText2 text-center'>
        <p>Game Over</p>
        <p>Cruzas una de las puertas y te das cuenta de tu error. Te encuentras de frente con el leviatán dormido, que 
        ironías de la vida, en Oniria está despierto. Por supuesto no tiene intención de plantearte un problema lógico 
        y te da muerte de inmediato sin que tengas siquiera una pequeña oportunidad.</p>
        <p>No sólo no vas a poder volver al mundo despierto, si no que tampoco sigue viva tu conciencia dentro de Oniria, que 
        si pudiera se preguntarías si podrías haberte esforzado más.</p>
      </div>
    </Container>
  )
}