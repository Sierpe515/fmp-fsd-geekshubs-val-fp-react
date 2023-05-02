import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addState } from '../inGameSlice';
import './GameOver3.css'
import { useNavigate } from 'react-router-dom';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';

export const GameOver3 = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(addState({ choosenState: false}))

  const goHome = () => {
    setTimeout(()=>{
      navigate("/");
    },500)
  }

  return (
    <Container fluid className="homeContainerMin gOverBg3 d-flex flex-column justify-content-center align-items-center">
      <TurnPhone/>
      <div className='gOverText3 text-center'>
        <p>Game Over</p>
        <p>No has sido capaz de encontrar al culpable y la muerte ha quedado muy decepcionada contigo. Podría haberte dejado a tu suerte, 
            desvaneciéndote a la deriva en Oniria, pero en lugar de eso, te ha dado forma de lobo y te va a llevar con ella hasta que aprendas 
            a resolver problemas lógicos.
        </p>
        <p>No vas a poder volver al mundo despierto, pero al menos tu conciencia sigue viva, preguntándose si podrías haberte esforzado más para 
            resolver los problemas que se te plantearon. Algo que, sin duda, descubrirás muy pronto con las enseñanzas de tu nuevo mentor.</p>
      </div>
      <div className='homeBtn btnMargin07' onClick={()=> goHome()}>Home</div>
    </Container>
  )
}