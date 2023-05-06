import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addState } from '../inGameSlice';
import './GameOver1.css'
import { useNavigate } from 'react-router-dom';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
import { bringLoadGamesById } from '../../services/apiCalls';
import { gameDetailData } from '../gameSlice';
import { userData } from '../userSlice';

export const GameOver1 = () => {

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
    <Container fluid className="homeContainerMin gOverBg1 d-flex flex-column justify-content-center align-items-center">
      <TurnPhone/>
      <div className='gOverText1 text-center'>
        <p>Game Over</p>
        <p>No es la locura lo que ha acabado contigo, sino el no haber sido capaz de escoger la estatua correcta. Llevaste 
            a toda tu tripulación a una muerte segura, lo que no representa una gran perdida para nadie, salvo para ti.</p>
        <p>No sólo no vas a poder volver al mundo despierto, si no que tampoco sigue viva tu conciencia dentro de Oniria, que 
            si pudiera se preguntaría si podrías haberte esforzado más.</p>
      </div>
      <div className='homeBtn' onClick={()=> goHome()}>Home</div>
    </Container>
  )
}