import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addState } from '../inGameSlice';
import './GameOver2.css'
import { useNavigate } from 'react-router-dom';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
import { bringLoadGamesById } from '../../services/apiCalls';
import { gameDetailData } from '../gameSlice';
import { userData } from '../userSlice';

export const GameOver2 = () => {

  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = dataCredentialsRdx.credentials.token

  // SAVE AT REDUX INGAME STATE
  // USEEFFECT TO CONTROL PLAYER PERMISSIONS AND REDIRECT
  dispatch(addState({ choosenState: false}))
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
    <Container fluid className="homeContainerMin gOverBg2 d-flex flex-column justify-content-center align-items-center">
      <TurnPhone/>
      <div className='gOverText2 text-center'>
        <p>Game Over</p>
        <p>Cruzas una de las puertas y te das cuenta de tu error. Te encuentras de frente con el leviatán dormido, que 
        ironías de la vida, en Oniria está despierto. Por supuesto no tiene intención de plantearte un problema lógico 
        y te da muerte de inmediato sin que tengas siquiera una pequeña oportunidad.</p>
        <p>No sólo no vas a poder volver al mundo despierto, si no que tampoco sigue viva tu conciencia dentro de Oniria, que 
        si pudiera se preguntaría si podrías haberte esforzado más.</p>
      </div>
      <div className='homeBtn btnMargin07' onClick={()=> goHome()}>Home</div>
    </Container>
  )
}