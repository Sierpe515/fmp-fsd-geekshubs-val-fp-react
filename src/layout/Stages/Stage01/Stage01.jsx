import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addGame, gameDetailData } from '../../gameSlice'
import { userData } from '../../userSlice'
import { bringLoadGamesById, createSavedGame, updateGameStage } from '../../../services/apiCalls'
import { useNavigate } from 'react-router-dom'

export const Stage01 = () => {

  const gameRedux = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");

  let token = dataCredentialsRdx.credentials.token

  const chooseAnswer = (resp) => {
    console.log(gameRedux);
    console.log(resp);
    setAnswer(resp);
  }

  const array = gameRedux.choosenGame.games_stages
  console.log(gameRedux.choosenGame.games_stages[array.length - 1].id);
  let dataAnswer = {
    id : gameRedux.choosenGame.games_stages[array.length - 1].id,
    answer_id : answer
  }
  console.log(dataAnswer);

  const saveAnswer = () => {

    updateGameStage(dataAnswer, token)
    .then(
        result => {
          // SOLO HACE CASO DANDOLE DOS VECES
          console.log(result);
          
          // let dataSavedGame = {
          //   game_id : result.data.data.game_id,
          //   stage_id : 2
          // }

          // createSavedGame(dataSavedGame, token)
          //   .then(
          //     result => {
          //       console.log(result)
          //       let params = result.data.data.game_id
          //       bringLoadGamesById(params, token)
          //       .then(
          //         result => {
          //           console.log(result.data.data[0])
          //           const selectGame = result.data.data[0]
          //           dispatch(addGame({choosenGame: selectGame}))
          //           console.log(selectGame);
          //         })
          //     }
          //   )
          //   .catch((error) => console.log(error))
          // setTimeout(() => {
          //   navigate("/stage02");
          // }, 500);
        }
    )
    .catch((error) => console.log(error))
  }

  return (
    <Container fluid className="homeContainerMin d-flex flex-column justify-content-center">Stage01
      <div className='d-flex'>
        <div onClick={()=> {chooseAnswer("1"), saveAnswer()}}>RESPUESTA A</div>
        <div onClick={()=> {chooseAnswer("2"), saveAnswer()}}>RESPUESTA B</div>
      </div>
    </Container>
  )
}
