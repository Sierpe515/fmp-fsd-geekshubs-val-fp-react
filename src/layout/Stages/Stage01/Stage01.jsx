import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addGame, gameDetailData } from '../../gameSlice'
import { userData } from '../../userSlice'
import { bringLoadGamesById, createSavedGame, updateGameStage, updateGuide } from '../../../services/apiCalls'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { characterDetailData } from '../../characterSlice'
import { addGameStage } from '../../gameStageSlice'
import { addState } from '../../inGameSlice'

export const Stage01 = () => {

  const gameRedux = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");

  let token = dataCredentialsRdx.credentials.token

  dispatch(addState({ choosenState: true}))

  
  console.log(gameRedux);

  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  }

  const array = gameRedux.choosenGame.games_stages
  console.log(gameRedux.choosenGame.games_stages[array.length - 1].id);
  console.log(characterRdx.choosenCharacter);
  let dataAnswer = {
    id : gameRedux.choosenGame.games_stages[array.length - 1].id,
    answer_id : answer
  }
  console.log(dataAnswer);

  const saveAnswer = () => {

    if (answer == 1){
      let dataGuide = {
        id : gameRedux.choosenGame.id,
        guide: "legal"
      }
      console.log(dataGuide);

      updateGuide(dataGuide, token)
      .then(result => console.log(result))
      .catch((error) => console.log(error))
    }

    if (answer == 2){
      let dataGuide = {
        id : gameRedux.choosenGame.id,
        guide: "chaotic"
      }
      console.log(dataGuide);

      updateGuide(dataGuide, token)
      .then(result => console.log(result))
      .catch((error) => console.log(error))
    }

    updateGameStage(dataAnswer, token)
    .then(
        result => {
          console.log(result);
          
          let dataSavedGame = {
            game_id : result.data.data.game_id,
            stage_id : 2
          }

          createSavedGame(dataSavedGame, token)
            .then(
              result => {
                console.log(result.data.data)
                const saveGameStage = result.data.data
                dispatch(addGameStage({choosenGameStage: saveGameStage}))
                let params = result.data.data.game_id
                bringLoadGamesById(params, token)
                .then(
                  result => {
                    console.log(result.data.data[0])
                    const selectGame = result.data.data[0]
                    dispatch(addGame({choosenGame: selectGame}))
                    console.log(selectGame);
                  })
                .catch((error) => console.log(error))
              }
            )
            .catch((error) => console.log(error))
          setTimeout(() => {
            navigate("/stage02");
          }, 500);
        }
    )
    .catch((error) => console.log(error))
  }

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Confirm chooice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure?
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=> {saveAnswer()}}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container fluid className="homeContainerMin d-flex flex-column justify-content-center">Stage01
      <Row>
        <div className='d-flex'>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
          <div onClick={()=> {chooseAnswer("1"), setModalShow(true)}}>RESPUESTA A</div>
          <div onClick={()=> {chooseAnswer("2"), setModalShow(true)}}>RESPUESTA B</div>
        </div>
      </Row>
    </Container>
  )
}
