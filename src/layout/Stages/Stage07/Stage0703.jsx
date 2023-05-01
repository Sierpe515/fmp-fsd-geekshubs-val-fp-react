import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addState } from '../../inGameSlice';
import { gameDetailData } from '../../gameSlice';
import { userData } from '../../userSlice';
import { characterDetailData } from '../../characterSlice';
import { useNavigate } from 'react-router-dom';

export const Stage0703 = () => {

  const gameRdx = useSelector(gameDetailData);
  // const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(addState({ choosenState: false}))

  const goHome = () => {
    setTimeout(()=>{
      navigate("/");
    },500)
  }

  return (
    <Container fluid className="homeContainerMin bg0703 d-flex flex-column justify-content-center align-items-center">
      <div className='winnerText text-center'>
        <p>¡Enhorabuena, {characterRdx.choosenCharacter.name}!</p>
        <p>Tras señalar al culpable, elegiste sabiamente y has demostrado unas dotes para la lógica nada desdeñables. 
          Puedes sentir orgullo de tu tenacidad, tesón e inteligencia. El consejo de carneros quedó altamente impresionado.</p>
        <p>Casi nadie había logrado escapar antes de Oniria y ahora tú estás entre los seleccionados. La muerte quedó altamente 
          satisfecha y agradecida.
        </p>
        {gameRdx.choosenGame.madness == 0 ? (
          <p>Tu huída ha sido excepcional. Se recordará por siempre mientras Oniria siga en pie. No sólo no te han quedado 
            secuelas, sino que has ganado la facultad de volver y salir de Oniria a voluntad. Ahora eres una leyenda para el 
            reino y se te ha otorgado el título de "lógico real".
          </p>
        ) : ("")}
        {gameRdx.choosenGame.madness == 1 ? (
          <p>Lamentablemente, una de tus elecciones demoró tu salida y eso te ha dejado algunas secuelas, pero nada grave. 
            De ahora en adelante, cada vez que te duermas, existe la posibilidad de que seas llamado por Oniria si necesitan 
            tu ayuda, ya que te has convertido en una leyenda en el reino.
          </p>
        ) : ("")}
        {gameRdx.choosenGame.madness == 2 ? (
          <p>Lamentablemente, alguna de tus elecciones demoraron tu salida y eso te ha dejado algunas secuelas. De ahora 
            en adelante, un parte de tu cabeza vivirá siempre en Oniria y cada noche, cuando cierres los ojos, siempre existirá 
            la posibilidad de volver a Oniria.
          </p>
        ) : ("")}
      </div>
      <div className='homeBtn btnMargin07' onClick={()=> goHome()}>Home</div>
    </Container>
  )
}