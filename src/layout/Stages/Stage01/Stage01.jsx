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
import { addState } from '../../inGameSlice'
import './Stage01.css'
import garg01 from '../../../image/gargola1.png'
import garg02 from '../../../image/gargola2.png'
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TurnPhone } from '../../../components/TurnPhone/TurnPhone'

export const Stage01 = () => {

  const gameRedux = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = dataCredentialsRdx.credentials.token
  const array = gameRedux.choosenGame.games_stages

  // SAVE AT REDUX INGAME STATE 
  // USEEFFECT TO CHECK IF USER IS LOGGED IN AND THE CORRECT STAGE
  useEffect(() => {
    dispatch(addState({ choosenState: false}))
    let params = gameRedux.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      const selectGame = result.data.data[0];
      dispatch(addGame({ choosenGame: selectGame }));
      const stageID = selectGame.games_stages[array2.length - 1]?.stage_id
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.games_stages[array2.length - 1]?.stage_id != 1)) {
        const stageNavigate = {null: "/",1: "/stage01",2: "/stage02",3: "/stage0301",4: "/stage0302",5: "/stage0303",6: "/stage0401",7: "/stage0402",8: "/stage0403",9: "/stage0501",10: "/stage0502",11: "/stage0503",12: "/stage0601",13: "/stage0602",14: "/stage0603",};
        navigate(stageNavigate[stageID]);
      }})
    .catch((error) => console.log(error))
  }, []);

  // ANSWER HOOK
  const [answer, setAnswer] = useState("");  

  // CHOOSE ANSWER AND SAVE IN HOOK
  const chooseAnswer = (resp) => {
    setAnswer(resp);
  }

  let dataAnswer = {
    id : gameRedux.choosenGame.games_stages[array.length - 1].id,
    answer_id : answer
  }

  // SEND ANSWER FUNCTION
  const saveAnswer = () => {

    if (answer == 1){
      let dataGuide = {
        id : gameRedux.choosenGame.id,
        guide: "legal"
      }
      updateGuide(dataGuide, token)
      .then()
      .catch((error) => console.log(error))
    }

    if (answer == 2){
      let dataGuide = {
        id : gameRedux.choosenGame.id,
        guide: "chaotic"
      }
      updateGuide(dataGuide, token)
      .then()
      .catch((error) => console.log(error))
    }

    updateGameStage(dataAnswer, token)
    .then(
        result => {          
          let dataSavedGame = {
            game_id : result.data.data.game_id,
            stage_id : 2
          }

          createSavedGame(dataSavedGame, token)
            .then(
              result => {
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

  // POPOVERS
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

  // DICTIONARY
  const type = answer
  const classGuide = {
    "1" : "Skryx",
    "2" : "Shawx"
  }

  // SELECTION GUIDE CONFIRMATION MODAL
  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Selección de guía
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            ¿Estás seguro de que quieres elegir a {classGuide[type]} como guía? 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='confirmBtn' onClick={()=> {saveAnswer()}}>Confirmar</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container fluid className="homeContainerMin bg01 d-flex flex-column justify-content-center align-items-center">
      <TurnPhone/>
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
            <p><span className='shawxText'>Shawx:</span> ¡Bienhallado!</p>
            <p><span className='skryxText'>Skryx:</span> ¡Bienvenido, soñador! Has llegado a las puertas de Oniria.</p>
            <p><span className='shawxText'>Shawx:</span> El más famoso de los reino del sueño. Es un gran lugar en el 
              que adentrarse.</p>
            <p><span className='skryxText'>Skryx:</span> Pero es importante no quedarse demasiado tiempo, o correrás el riesgo 
              de quedar atrapado en él para siempre.</p>
            <p><span className='youText'>Tú:</span> Eso no suena muy bien. ¿Qué me impide dar media vuelta e irme?</p>
            <p><span className='shawxText'>Shawx:</span> ¡Nada!</p>
            <p><span className='skryxText'>Skryx:</span> Pero has caído muy hondo en el sueño, no encontrarás una salida 
              salvo que atravieses las tierras de Oniria.</p>
            <p><span className='shawxText'>Shawx:</span> Toda suerte de habitantes pueblan nuestro reino, de incontables clases.</p>
            <p><span className='skryxText'>Skryx:</span> De entre los que deberás distinguir legales, que siempre te dirán la verdad, 
              y caóticos, que siempre mienten. Te recomiendo que elijas a una de nosotras como guía.</p>
            <p><span className='shawxText'>Shawx:</span> Conmigo todo te resultará más fácil.</p>
            <p><span className='skryxText'>Skryx:</span> Antes de que realices tu elección, una advertencia: <br/>
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
    </Container>
  )
}
