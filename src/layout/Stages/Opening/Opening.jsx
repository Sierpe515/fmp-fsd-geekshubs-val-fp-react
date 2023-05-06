import React, { useEffect, useState } from 'react'
import { Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';
import './Opening.css'
import Carousel from 'react-bootstrap/Carousel';
import op1 from '../../../image/op1.png'
import op2 from '../../../image/op2.png'
import op3 from '../../../image/op3.png'
import op4 from '../../../image/op4.png'
import { TurnPhone } from '../../../components/TurnPhone/TurnPhone';
import { useDispatch, useSelector } from 'react-redux';
import { addState } from '../../inGameSlice';
import { userData } from '../../userSlice';
import { gameDetailData } from '../../gameSlice';


export const Opening = () => {

  const dataCredentialsRdx = useSelector(userData);
  const gameRdx = useSelector(gameDetailData)
  const [index, setIndex] = useState(0);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const array = gameRdx.choosenGame.games_stages;

  // SAVE AT REDUX INGAME STATE
  // USEEFFECT TO CHECK IF USER IS LOGGED IN
  useEffect(() => {
    dispatch(addState({ choosenState: false}))
    if (!dataCredentialsRdx.credentials.token && (gameRdx.choosenGame.games_stages[array.length - 1].stage_id != 1)) {
      navigate("/");
    }
  }, []);

  // HANDLE
  const handleSelect = (selectedIndex) => {
    setIndex(selectedIndex);
  };

  // START GAME BUTTON
  const goStage01 = () => {
      setTimeout(()=>{
        navigate("/stage01");
      },500)
  }

  return (
    <Container fluid className="homeContainerMin openingBg d-flex flex-column justify-content-center align-items-center">
      <TurnPhone/>
      <Row>
        <div className='carouselBox'>
          <Carousel activeIndex={index} onSelect={handleSelect}>
            <Carousel.Item>
              <img
                className="d-block w-100 carouselImg"
                src={op1}
                alt="First slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carouselImg"
                src={op2}
                alt="Second slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carouselImg"
                src={op3}
                alt="Third slide"
              />
            </Carousel.Item>
            <Carousel.Item>
              <img
                className="d-block w-100 carouselImg"
                src={op4}
                alt="Third slide"
              />
            </Carousel.Item>
          </Carousel>
        </div>
        <div className='openingText'>
          <div className='scrollText'>
            <p className='gameText'>MENSAJE DEL JUEGO: Para pausar el texto, desliza el cursor sobre él.</p>
            <p className='easyText'>Se trataba de una noche de esas, en las que ves pasar una tras otra las horas en el reloj.
              Sentías la necesidad acuciante de conciliar el sueño pronto, ya que por la mañana tenías
              un evento importante. Pero tu cabeza no estaba por la labor.
            </p>
            <p className='easyText'>Te notabas cansado y las bolsas de los ojos parecían pesar veinte kilos. Pero tu mente 
              iba a cien. Tenía otros planes e ideas entre los que no se encontraba dormir.
            </p>
            <p className='easyText'>Finalmente desististe. Ya era absurdo intentar dormirse. Aunque lo hubieras conseguido, ya 
              no ibas a poder dormir apenas. Así que al menos te conformabas con descansar. Cerraste los ojos 
              y te premitiste relajarte por primera vez aquella noche.
            </p>
            <p className='easyText'>No fuiste tú quien encontró el sueño, más bien fue él quien te atrapó a ti y de forma despiadada.
              Por lo general, uno se duerme paulatinamente, sin apenas darse cuenta. Pero, en esta ocasión, tú 
              caíste de golpe, como tras un salto al vacío.
            </p>
            <p className='easyText'>De alguna forma, llegaste a un estado del sueño profundo que no sabías ni que existía y que, por 
              supuesto ni eras consciente. La caída no te mató, pero te hizo abrir los ojos -metafóricamente, claro-.
            </p>
          </div>
        </div>
      </Row>
      <Row className='d-flex align-items-center justify-content-center'>
        <div className='homeBtn marginBtn' onClick={()=> goStage01()}>Start Game</div>
      </Row>
    </Container>
  )
}