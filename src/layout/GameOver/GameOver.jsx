import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addState } from '../inGameSlice';
import './GameOver.css'
import { useNavigate } from 'react-router-dom';

export const GameOver = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(addState({ choosenState: false}))

  const goHome = () => {
    setTimeout(()=>{
      navigate("/");
    },500)
  }

  return (
    <Container fluid className="homeContainerMin gOverBg d-flex flex-column justify-content-center align-items-center">
      <div className='gOverText text-center'>
        <p>Game Over</p>
        <p>La locura ha podido contigo y ha desviado tu rumbo de la ruta correcta. Has quedado condenado a vagar por Oniria 
          mientras tu cuerpo, ahora un caparazón vacío, siga con vida.</p>
        <p>Al menos tu conciencia sigue viva en Oniria, y mientras sea así, siempre te preguntarás si podrías haber puesto 
          más de tu parte al intentar dar solución a las pruebas que se te plantearon.
        </p>
      </div>
      <div className='homeBtn btnMarginGO' onClick={()=> goHome()}>Home</div>
    </Container>
  )
}