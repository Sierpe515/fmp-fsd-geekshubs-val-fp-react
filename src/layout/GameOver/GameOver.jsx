import React, { useEffect } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux';
import { addState } from '../inGameSlice';
import './GameOver.css'
import { useNavigate } from 'react-router-dom';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
import { bringLoadGamesById } from '../../services/apiCalls';
import { gameDetailData } from '../gameSlice';
import { userData } from '../userSlice';

export const GameOver = () => {

  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  let token = dataCredentialsRdx.credentials.token

  // SAVE AT REDUX INGAME STATE
  // USEEFFECT TO CONTROL PLAYER PERMISSIONS AND REDIRECT
  useEffect(() => {
    dispatch(addState({ choosenState: false}))
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
    <Container fluid className="homeContainerMin gOverBg d-flex flex-column justify-content-center align-items-center">
      <TurnPhone/>
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