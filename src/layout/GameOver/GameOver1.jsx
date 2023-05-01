import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addState } from '../inGameSlice';
import './GameOver1.css'

export const GameOver1 = () => {

  const dispatch = useDispatch();

  dispatch(addState({ choosenState: false}))

  return (
    <Container fluid className="homeContainerMin gOverBg1 d-flex flex-column justify-content-center align-items-center">
      <div className='gOverText1 text-center'>
        <p>Game Over</p>
        <p>No es la locura lo que ha acabado contigo, sino el no haber sido capaz de escoger la estatua correcta. Llevaste 
            a toda tu tripulación a una muerte segura, lo que no representa una gran perdida para nadie, salvo para ti.</p>
        <p>No sólo no vas a poder volver al mundo despierto, si no que tampoco sigue viva tu conciencia dentro de Oniria, que 
            si pudiera se preguntarías si podrías haberte esforzado más.</p>
      </div>
    </Container>
  )
}