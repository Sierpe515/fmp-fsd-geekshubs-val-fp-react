import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addState } from '../../inGameSlice';
import { gameDetailData } from '../../gameSlice';
import { userData } from '../../userSlice';
import { characterDetailData } from '../../characterSlice';
import { useNavigate } from 'react-router-dom';
import { TurnPhone } from '../../../components/TurnPhone/TurnPhone';
import { bringLoadGamesById } from '../../../services/apiCalls';

export const Stage0703 = () => {

  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = dataCredentialsRdx.credentials.token

  // SAVE AT REDUX INGAME STATE
  dispatch(addState({ choosenState: false}))

  // USEEFFECT TO CHECK IF USER IS LOGGED IN AND THE CORRECT STAGE
  useEffect(() => {
    let params = gameRdx.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      const selectGame = result.data.data[0];
      const stageID = selectGame.games_stages[array2.length - 1]?.stage_id
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.finished != 1)) {
        const stageNavigate = {null: "/",1: "/stage01",2: "/stage02",3: "/stage0301",4: "/stage0302",5: "/stage0303",6: "/stage0401",7: "/stage0402",8: "/stage0403",9: "/stage0501",10: "/stage0502",11: "/stage0503",12: "/stage0601",13: "/stage0602",14: "/stage0603",};
        navigate(stageNavigate[stageID]);
      }})
    .catch((error) => console.log(error))
  }, []);

  // GO HOME BUTTON
  const goHome = () => {
    setTimeout(()=>{
      navigate("/");
    },500)
  }

  // SHOWING AND CLOSING SOLUTIONS DIV
  const showSolution = () => {
    let solution = document.getElementById('solutionBox');
    solution.classList.add('showSolBox')
  }

  const closeSolution = () => {
    let solution = document.getElementById('solutionBox');
    solution.classList.remove('showSolBox')
  }

  return (
    <Container fluid className="homeContainerMin bg0703 d-flex flex-column justify-content-center align-items-center">
      <TurnPhone/>
      <div className="solution" onClick={() => {showSolution()}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
          </svg>
        </div>
        <div className="solutionBox solFinal" id="solutionBox">
          <div className="solutionText solText text-center">
            <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
            <p>Hasta que no hiciste las preguntas, no había forma de saber de qué tipo era cada uno. La Halconera no puede ser caótica, pues sí lo fuera, su enunciado sería falso. De ahí que sea culpable, pero siendo legal o neutral. Hasta entonces tenemos estas tres posibilidades:</p>
            <p>1: La halconera es legal, su enunciado es cierto y por lo tanto es inocente. El enunciado del halcón sería verdadero y por tanto neutral. Esto deja al verdugo como caótico. Como se sabe que el caótico no es culpable, el halcón es culpable.</p>
            <p>2: La halconera es neutral e inocente. El enunciado del halcón sería cierto y él por tanto legal. El verdugo sería caótico e inocente y el halcón sería culpable.</p>
            <p>3: La halconera es neutral y culpable. El enunciado del verdugo sería cierto y él legal. El halcón sería caótico.</p>
            <p>Cuando preguntas al verdugo si es culpable, ya sabías que era inocente. Lo que querías saber es si era legal o caótico. Si hubiera respondido con la verdad, NO, sólo sería viable la opción 3 y no huberas tenido que hacer más preguntas.</p>
            <p>Pero tuviste que hacer una pregunta más. Con la posibilidad 3 descartada, ya sabemos que el halcón es culpable, por lo que, al hacerle la última pregunta, si hubiera respondido NO, no habrías podido saber si era neutral o legal, pero respondió SÍ por lo que es caótico.</p>
          </div>
          <div className='closeDialogue' onClick={()=> {closeSolution()}}>Close 
            <svg className='closeIcon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
          </div>
        </div>
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