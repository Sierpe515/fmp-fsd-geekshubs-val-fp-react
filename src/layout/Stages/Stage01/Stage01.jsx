import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addGame, gameDetailData } from '../../gameSlice'
import { userData } from '../../userSlice'
import { bringLoadGamesById, createSavedGame, updateGameStage } from '../../../services/apiCalls'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
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
          
          let dataSavedGame = {
            game_id : result.data.data.game_id,
            stage_id : 2
          }

          createSavedGame(dataSavedGame, token)
            .then(
              result => {
                console.log(result)
                let params = result.data.data.game_id
                bringLoadGamesById(params, token)
                .then(
                  result => {
                    console.log(result.data.data[0])
                    const selectGame = result.data.data[0]
                    dispatch(addGame({choosenGame: selectGame}))
                    console.log(selectGame);
                  })
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
      <div className='d-flex'>
      <MyVerticallyCenteredModal
        show={modalShow}
        onHide={() => setModalShow(false)}
      />
        <div onClick={()=> {chooseAnswer("1"), setModalShow(true)}}>RESPUESTA A</div>
        <div onClick={()=> {chooseAnswer("2"), setModalShow(true)}}>RESPUESTA B</div>
      </div>
    </Container>
  )
}
