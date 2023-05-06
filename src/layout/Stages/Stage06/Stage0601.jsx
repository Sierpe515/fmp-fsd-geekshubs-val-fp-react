import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGame, gameDetailData } from "../../gameSlice";
import { userData } from "../../userSlice";
import {
  bringAnswerById,
  bringLoadGamesById,
  createBagdeGame,
  getBadgesByGameId,
  updateFinished,
  updateGameStage,
  updateMadness,
} from "../../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addBadge } from "../../badgeSlice";
import { addState } from "../../inGameSlice";
import './Stage0601.css'
import cat1 from '../../../image/cat1.png';
import cat2 from '../../../image/cat2.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { ClueBox } from "../../../components/ClueBox/ClueBox";
import { changeState } from "../../clueSlice";

export const Stage0601 = () => {
  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = dataCredentialsRdx.credentials.token;
  const array = gameRdx.choosenGame.games_stages

  // USEEFFECT TO CHECK IF USER IS LOGGED IN AND THE CORRECT STAGE
  useEffect(() => {
    // SAVE AT REDUX INGAME STATE
    dispatch(addState({ choosenState: true }))
    // SAVE AT REDUX CLUE SHOW STATE
    dispatch(changeState({ clueState: false }))

    let params = gameRdx.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      const selectGame = result.data.data[0];
      dispatch(addGame({ choosenGame: selectGame }));
      const stageID = selectGame.games_stages[array2.length - 1]?.stage_id
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.games_stages[array2.length - 1]?.stage_id != 12)) {
        const stageNavigate = {null: "/",1: "/stage01",2: "/stage02",3: "/stage0301",4: "/stage0302",5: "/stage0303",6: "/stage0401",7: "/stage0402",8: "/stage0403",9: "/stage0501",10: "/stage0502",11: "/stage0503",12: "/stage0601",13: "/stage0602",14: "/stage0603",};
        navigate(stageNavigate[stageID]);
      }})
    .catch((error) => console.log(error))
  }, []);

  // ANSWER HOOK
  const [answer, setAnswer] = useState("");
  
  const chooseAnswer = (resp) => {
    setAnswer(resp);
  };

  // POPOVERS
  const popoverHoverFocus1 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Harcat Cabello Hermoso
    </Popover>
  );
  
  const popoverHoverFocus2 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Bjorn Pelaje de Hierro
    </Popover>
  ); 

  const popoverHoverFocus1e = (
    <Popover className="popoverBtn" id="popover-trigger-hover-focus" title="Popover bottom">
      La salida está en una estatua impar
    </Popover>
  ); 
  
  const popoverHoverFocus2e = (
    <Popover className="popoverBtn" id="popover-trigger-hover-focus" title="Popover bottom">
      Por aquí no hay salida
    </Popover>
  ); 
  const popoverHoverFocus3e = (
    <Popover className="popoverBtn" id="popover-trigger-hover-focus" title="Popover bottom">
      O la inscripción V es correcta, o la inscripción VII es incorrecta
    </Popover>
  ); 
  const popoverHoverFocus4e = (
    <Popover className="popoverBtn" id="popover-trigger-hover-focus" title="Popover bottom">
      La inscripción I es incorrecta
    </Popover>
  ); 
  const popoverHoverFocus5e = (
    <Popover className="popoverBtn" id="popover-trigger-hover-focus" title="Popover bottom">
      O la inscripción II o la IV es correcta
    </Popover>
  ); 
  const popoverHoverFocus6e = (
    <Popover className="popoverBtn" id="popover-trigger-hover-focus" title="Popover bottom">
      La inscripción III es incorrecta
    </Popover>
  ); 
  const popoverHoverFocus7e = (
    <Popover className="popoverBtn" id="popover-trigger-hover-focus" title="Popover bottom">
      La salida no está en la estatua I
    </Popover>
  ); 
  const popoverHoverFocus8e = (
    <Popover className="popoverBtn" id="popover-trigger-hover-focus" title="Popover bottom">
      Por aquí te espera la muerte y por la estatua IX no hay salida
    </Popover>
  ); 
  const popoverHoverFocus9e = (
    <Popover className="popoverBtn" id="popover-trigger-hover-focus" title="Popover bottom">
      Por aquí te espera la muerte y la inscripción VI es incorrecta
    </Popover>
  ); 

  // SAVE ANSWER FUNCTION
  const saveAnswer = () => {
    if (answer == 34) {
      let body = {
        id: gameRdx.choosenGame.id,
        madness: 1,
      };
      updateMadness(body, token)
        .then((result) => {
          let params = gameRdx.choosenGame.id;
          bringLoadGamesById(params, token)
            .then((result) => {
              const selectGame = result.data.data[0];
              dispatch(addGame({ choosenGame: selectGame }));
              let params = answer;
              bringAnswerById(params)
                .then((result) => {
                  let dataBadge = {
                    game_id: gameRdx.choosenGame.id,
                    badge_id: result.data[0].badge_id,
                  };
                  createBagdeGame(dataBadge)
                  .then((result) => {                   
                    let params = gameRdx.choosenGame.id;    
                    getBadgesByGameId(params)
                      .then((result) => {
                        const selectBadge = result?.data?.data;
                        dispatch(addBadge({ choosenBadge: selectBadge }));
                      })
                      .catch((error) => console.log(error));
                  })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));

              const array = gameRdx.choosenGame.games_stages;
              let dataAnswer = {
                id: gameRdx.choosenGame.games_stages[array.length - 1].id,
                answer_id: answer,
              };
              updateGameStage(dataAnswer, token)
                .then((result) => {
                  let dataFinished = { 
                    id: gameRdx.choosenGame.id,
                    finished: true }
                  updateFinished(dataFinished, token)
                  .then()
                  .catch((error) => console.log(error));
                  navigate("/gameOver1")
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }

    if (answer == 33){
      let params = answer;
              bringAnswerById(params)
                .then((result) => {
                  let dataBadge = {
                    game_id: gameRdx.choosenGame.id,
                    badge_id: result.data[0].badge_id,
                  };
                  createBagdeGame(dataBadge)
                  .then((result) => {                    
                    let params = gameRdx.choosenGame.id;    
                    getBadgesByGameId(params)
                      .then((result) => {
                        const selectBadge = result?.data?.data;
                        dispatch(addBadge({ choosenBadge: selectBadge }));
                      })
                      .catch((error) => console.log(error));
                  })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));

              const array = gameRdx.choosenGame.games_stages;
              let dataAnswer = {
                id: gameRdx.choosenGame.games_stages[array.length - 1].id,
                answer_id: answer,
              };              
              updateGameStage(dataAnswer, token)
              .then((result) => {                  
                  let dataFinished = { 
                    id: gameRdx.choosenGame.id,
                    finished: true }                 
                  updateFinished(dataFinished, token)
                  .then()
                  .catch((error) => console.log(error));

                  setTimeout(() => {
                    navigate('/stage0701')
                  }, 500);
                })
                .catch((error) => console.log(error));
    }
              
  };

  // SHOWING AND CLOSING SOLUTIONS DIV
  const showSolution = () => {
    let solution = document.getElementById('solutionBox');
    solution.classList.add('showSolBox')
  }

  const closeSolution = () => {
    let solution = document.getElementById('solutionBox');
    solution.classList.remove('showSolBox')
  }

  // CONFIRMATION ANSWER MODAL
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
            Confirmación de respuesta
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>¿Estás de seguro de continuar con tu respuesta?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='confirmBtn'
            onClick={() => {
              saveAnswer();
            }}
          >
            Confirmar
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container
      fluid
      className="homeContainerMin bg0601 d-flex flex-column justify-content-center align-items-center"
    >
      <TurnPhone/>
      <Row>
        <ClueBox/>
        <div className="solution" onClick={() => {showSolution()}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" className="bi bi-question-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
          </svg>
        </div>
        <div className="solutionBox" id="solutionBox">
          <div className="solutionText text-center">
            {gameRdx.choosenGame.games_stages[array.length - 2].stage_id == 9 ? (
              <div>
                <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
                <p>Si el oro esuviera en el cofre del medio, las tres inscripciones serían ciertas. Si el oro estuviera en el primer cofre, las tres inscripciones serían falsas. Así pues el oro está en el último cofre, de modo que las inscripciones primera y última son ciertas y el del medio es falso.</p>
              </div>
            ) : ("")}
            {gameRdx.choosenGame.games_stages[array.length - 2].stage_id == 10 ? (
              <div>
                <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
                <p>El enunciado del primer cofre y el del segundo dice lo contrario, luego uno es cierto. Si a lo sumo uno una de las tres inscripciones es verdadera, la del último cofre es falsa y por lo tanto este es el que contiene el oro.</p>
              </div>
            ) : ("")}
            {gameRdx.choosenGame.games_stages[array.length - 2].stage_id == 11 ? (
              <div>
                <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
                <p>El enunciado del primer cofre y el del segundo dice lo contrario, luego uno es cierto. Si a lo sumo uno una de las tres inscripciones es verdadera, la del último cofre es falsa y por lo tanto este es el que contiene el oro.</p>
              </div>
            ) : ("")}
          </div>
          <div className='closeDialogue' onClick={()=> {closeSolution()}}>Close 
            <svg className='closeIcon bi bi-x-circle-fill' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
          </div>
        </div>
        <div className="box0403">
          <div className="img1Box0403">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0402" src={cat1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03 textBox0403">
            <div  className='scrollText font0403'>
              <p className='gameText'> MENSAJE DEL JUEGO: Este es un nivel de muerte súbita, errar aquí finaliza el juego, independientemente de la locura 
              acumulada o la falta de ella.</p>
              <p className='easyText'>Por fin se alzan ante tus ojos las Estatuas Cattegat. Enormes y majestuosas, imponentes a los sentidos. El mar del 
              fin del sueño baña sus pies y has conseguido embarcar en un drakkar que navega sus aguas.</p>
              <p className='easyText'>Según se cuenta, cada puerta tiene una salida. Pero sólo una conduce fuera del sueño. Es un punto de inflexión para 
              tu viaje, porque un acierto más y podrás volver a tu mundo, pero un error conduce irremediablemente a una muerte segura.</p>
              <p className='easyText'>Has conseguido convencer a un grupo de vikingos, que quiere hacer una incursión en el mundo despierto, de tus dotes 
              lógicas. Cada estatua tiene una inscripción. Únicamente la de la estatua de la salida dice siempre la verdad. Después hay otros dos tipos de estatua; 
              las que llevan a un muerte rápida por trampas, cuyas inscripciones siempre mienten, y las que no tienen salida, y cuyas inscripciones bien pueden decir la verdad, o bien mentir.</p>
              <p className='easyText'>Únicamente con los datos de las inscripciones era imposible deducir cuál era la estatua que llevaba a la salida, pero tú, a lo 
              largo de tu viaje habías recogido una valiosísima información, la pieza que falta del rompecabezas, que te permite saber con certeza en qué estatua estaba
              la salida: si la estatua VIII tiene salida o no.</p>
              <p className='easyText'>Navegando por el mar del fin del sueño te acercas a cada una de las estatuas y observas todo lo que dicen las inscripciones. Estás a 
              una elección de poder despertar y volver a tu mundo. Elige con cabeza y recuerda que no hay lugar para fallos.</p>
              <p className='easyText'>¿En qué estatua está la salida?</p>
            </div>
          </div>
          <div className="img2Box03">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img03 pos0403" src={cat2} alt="" />
            </OverlayTrigger>
          </div>
        </div>
      </Row>
      <Row>
        <div className="btnBox03 d-flex">
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus1e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("34"), setModalShow(true);
                  }}
                >
                  ESTATUA I
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus4e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("34"), setModalShow(true);
                  }}
                >
                  ESTATUA IV
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus7e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("33"), setModalShow(true);
                  }}
                >
                  ESTATUA VII
              </div>
            </OverlayTrigger>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus2e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("34"), setModalShow(true);
                  }}
                >
                  ESTATUA II
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus5e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("34"), setModalShow(true);
                  }}
                >
                  ESTATUA V
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus8e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("34"), setModalShow(true);
                  }}
                >
                  ESTATUA VIII
              </div>
            </OverlayTrigger>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus3e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("34"), setModalShow(true);
                  }}
                >
                  ESTATUA III
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus6e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("34"), setModalShow(true);
                  }}
                >
                  ESTATUA VI
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus9e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("34"), setModalShow(true);
                  }}
                >
                  ESTATUA IX
              </div>
            </OverlayTrigger>
          </div>
        </div>
      </Row>
    </Container>
  );
};
