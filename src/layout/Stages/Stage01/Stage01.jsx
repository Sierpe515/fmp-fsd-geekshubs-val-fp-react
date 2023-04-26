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
import './Stage01.css'
import garg01 from '../../../image/gargola1.png'
import garg02 from '../../../image/gargola2.png'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const Stage01 = () => {

  const gameRedux = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [answer, setAnswer] = useState("");

  let token = dataCredentialsRdx.credentials.token

  dispatch(addState({ choosenState: false}))

  
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

  const popoverHoverFocus1 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Shawx
    </Popover>
  );

  const popoverHoverFocus2 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Skryx
    </Popover>
  );

  const type = answer

  const classGuide = {
    "1" : "Skryx",
    "2" : "Shawx"
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
            Selection guide
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure to choose {classGuide[type]} as a guide? 
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
    <Container fluid className="homeContainerMin bg01 d-flex flex-column justify-content-center align-items-center">
      <Row >
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
        <Col className='d-flex justify-content-center'>
        <div className='gar1'>
          <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus1}
            >  
          <img className='garg1Img' onClick={()=> {chooseAnswer("2"), setModalShow(true)}} src={garg01} alt="" />
          </OverlayTrigger>
          </div>
        <div className='text01'>
          <div className='scrollText font01'>
            <p>Shawx: ¡Bienhallado!</p>
            <p>Skryx: ¡Bienvenido, soñador! Has llegado a las puertas de Oniria.</p>
            <p>Shawx: El más famoso de los reino del sueño. Es un gran lugar en el 
              que adentrarse.</p>
            <p>Skryx: Pero es importante no quedarse demasiado tiempo, o correrás el riesgo 
              de quedar atrapado en él para siempre.</p>
            <p>Tú: Eso no suena muy bien. ¿Qué me impide dar media vuelta e irme?</p>
            <p>Shawx: ¡Nada!</p>
            <p>Skryx: Pero has caído muy hondo en el sueño, no encontrarás una salida 
              salvo que atravieses las tierras de Oniria.</p>
            <p>Shawx: Toda suerte de habitantes pueblan nuestro reino.</p>
            <p>Skryx: De entre los que deberás distinguir legales, que siempre te dirán la verdad, 
              y caóticos, que siempre mienten. Te recomiendo que elijas a una de nosotras como guía.</p>
            <p>Shawx: Conmigo todo te resultará más fácil.</p>
            <p>Skryx: Antes de que realices tu elección, una advertencia: <br/>
            Al menos una de las dos es caótica.</p>
          </div>
        </div>
        <div className='gar2'>
          <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="bottom"
                        overlay={popoverHoverFocus2}
                    >
          <img className='garg2Img' onClick={()=> {chooseAnswer("1"), setModalShow(true)}} src={garg02} alt="" />
          </OverlayTrigger>
        </div>
        </Col>
      </Row>
      {/* <Row>
        <div className='d-flex'>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
          <div className='homeBtn margin01' onClick={()=> {chooseAnswer("1"), setModalShow(true)}}>RESPUESTA A</div>
          <div className='homeBtn margin01' onClick={()=> {chooseAnswer("2"), setModalShow(true)}}>RESPUESTA B</div>
        </div>
      </Row> */}
    </Container>
  )
}
