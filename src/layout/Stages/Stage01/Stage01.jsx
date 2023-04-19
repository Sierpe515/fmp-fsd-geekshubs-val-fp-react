import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addGame, gameDetailData } from '../../gameSlice'
import { userData } from '../../userSlice'
import { bringCharactersImages, bringLoadGamesById, createSavedGame, updateCharacterImage, updateGameStage } from '../../../services/apiCalls'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { characterDetailData } from '../../characterSlice'
export const Stage01 = () => {

  const gameRedux = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");
  const [characterImage, setCharacterImage] = useState([]);
  const [imageId, setImageId] = useState("");

  let token = dataCredentialsRdx.credentials.token

  useEffect(() => {
    if (characterImage.length === 0) {
      bringCharactersImages()
        .then((result) => {
          setCharacterImage(result?.data);
          console.log(result.data);
        })
        .catch((error) => console.log(error));
    }}, []);

  const chooseAnswer = (resp) => {
    console.log(gameRedux);
    console.log(resp);
    setAnswer(resp);
  }

  const chooseImage = (resp) => {
    console.log(resp);
    setImageId(resp);
  }

  const array = gameRedux.choosenGame.games_stages
  console.log(gameRedux.choosenGame.games_stages[array.length - 1].id);
  console.log(characterRdx.choosenCharacter);
  let dataAnswer = {
    id : gameRedux.choosenGame.games_stages[array.length - 1].id,
    answer_id : answer
  }
  console.log(dataAnswer);

  let dataImge = {
    id : characterRdx.choosenCharacter.id,
    image_id : imageId
  }

  const saveAnswer = () => {
    updateCharacterImage(dataImge, token)
    .then(console.log("image updated successfully"))
    .catch((error) => console.log(error))

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
      <Row>
          <Col xxl={12} xl={12} md={12} sm={12} className="welcomeBox">
            <h2>Select you skin</h2>
              {characterImage.length > 0 ? (
                  <>
                  <div className='scrollBox'>
                    {characterImage.map((cImages) => {
                      return (
                        <div className="pjBox" onClick={() => chooseImage(cImages.id)} key={cImages.id}>
                          <img className='pjImage' src={cImages.image} alt={cImages.id} />
                        </div>
                      );
                    })}
                  </div>
                  </>
                ) : (
                  <div><h4>Something went wrong</h4></div>
                )}
          </Col>
      </Row>
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
