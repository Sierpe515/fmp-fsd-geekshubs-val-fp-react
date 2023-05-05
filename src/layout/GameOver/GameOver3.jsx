import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addState } from '../inGameSlice';
import './GameOver3.css'
import { useNavigate } from 'react-router-dom';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
import { bringLoadGamesById } from '../../services/apiCalls';
import { gameDetailData } from '../gameSlice';
import { userData } from '../userSlice';

export const GameOver3 = () => {

  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = dataCredentialsRdx.credentials.token

  // SAVE AT REDUX INGAME STATE
  dispatch(addState({ choosenState: false}))

  // USEEFFECT TO CONTROL PLAYER PERMISSIONS AND REDIRECT
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

  // RETURN TO HOME FUNCTION
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