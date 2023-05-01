import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { addGame, gameDetailData } from "../../gameSlice";
import { userData } from "../../userSlice";
import {
  bringAnswerById,
  bringLoadGamesById,
  createBagdeGame,
  createSavedGame,
  getBadgesByGameId,
  updateFinished,
  updateGameStage,
  updateMadness,
} from "../../../services/apiCalls";
import { useNavigate } from "react-router-dom";
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { characterDetailData } from "../../characterSlice";
import { addGameStage, gameStageData } from "../../gameStageSlice";
import { addBadge } from "../../badgeSlice";
import { addState } from "../../inGameSlice";
import './Stage0601.css'
// import vamp1 from '../../../image/vamp1.png';
import cat1 from '../../../image/cat1.png';
import cat2 from '../../../image/cat2.png';
// import vamp12 from '../../../image/vamp12.png';
// import vamp3 from '../../../image/vamp3.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const Stage0601 = () => {
  const gameRdx = useSelector(gameDetailData);
  // const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(addState({ choosenState: true}))

  const [answer, setAnswer] = useState("");
  // const [characterImage, setCharacterImage] = useState([]);

  let token = dataCredentialsRdx.credentials.token;

  // console.log(gameStageRedux);
  console.log(gameRdx);
  console.log(answer);
  
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


  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  };

  const saveAnswer = () => {

    if (answer == 34) {
      let body = {
        id: gameRdx.choosenGame.id,
        madness: 1,
      };
      updateMadness(body, token)
        .then((result) => {
          console.log("madness update successfully");
          console.log(result);
          // dispatch(addGame({choosenGame: result.data.data}))
          let params = gameRdx.choosenGame.id;

          bringLoadGamesById(params, token)
            .then((result) => {
              console.log(result.data.data[0]);
              const selectGame = result.data.data[0];
              dispatch(addGame({ choosenGame: selectGame }));
              console.log(selectGame);

              let params = answer;

              bringAnswerById(params)
                .then((result) => {
                  console.log("badge", result.data[0].badge_id);

                  let dataBadge = {
                    game_id: gameRdx.choosenGame.id,
                    badge_id: result.data[0].badge_id,
                  };

                  createBagdeGame(dataBadge)
                  .then((result) => {
                    console.log("BadgeGame", result)
                    
                  let params = gameRdx.choosenGame.id;
    
                  getBadgesByGameId(params)
                    .then((result) => {
                      console.log("traer badges", result);
                      const selectBadge = result?.data?.data;
                      dispatch(addBadge({ choosenBadge: selectBadge }));
                      console.log(selectBadge);
                      // setBadge(result?.data?.data);
                      // console.log(result.data);
                    })
                    .catch((error) => console.log(error));
                  })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));

              console.log(gameRdx);
              const array = gameRdx.choosenGame.games_stages;
              console.log(
                gameRdx.choosenGame.games_stages[array.length - 1].id
              );
              console.log(characterRdx.choosenCharacter);

              let dataAnswer = {
                id: gameRdx.choosenGame.games_stages[array.length - 1].id,
                answer_id: answer,
              };
              console.log(dataAnswer);              

              updateGameStage(dataAnswer, token)
                .then((result) => {
                  console.log(result);

                  console.log("Game Over");
                  let dataFinished = { 
                    id: gameRdx.choosenGame.id,
                    finished: true }
                  updateFinished(dataFinished, token)
                  .then(console.log("Game Finished"))
                  .catch((error) => console.log(error));
                  navigate("/gameOver")

                  // let params = gameRdx.choosenGame.id

                  // getBadgesByGameId(params)
                  //   .then((result) => {
                  //     console.log("traer badges",result);
                  //     const selectBadge = result?.data?.data
                  //     dispatch(addBadge({ choosenBadge: selectBadge}))
                  //     console.log(selectBadge);
                  //   })
                  //   .catch((error) => console.log(error));

                  //   const stageId = "10";

                  //   let dataSavedGame = {
                  //     game_id: result.data.data.game_id,
                  //     // Meter aquí el stage al que se va a ir con respuesta
                  //     stage_id: stageId,
                  //   };
  
                  //   createSavedGame(dataSavedGame, token)
                  //     .then((result) => {
                  //       console.log(result);
                  //       let params = result.data.data.game_id;
                  //       bringLoadGamesById(params, token).then((result) => {
                  //         console.log(result.data.data[0]);
                  //         const selectGame = result.data.data[0];
                  //         dispatch(
                  //           addGameStage({ choosenGameStage: selectGame })
                  //         );
                  //         console.log(selectGame);
                  //       });
                  //     })
                  //     .catch((error) => console.log(error));
  
                    // const stageNavigate = {
                    //   9: "/stage0501",
                    //   10: "/stage0502",
                    //   11: "/stage0503",
                    // };
  
                    // setTimeout(() => {
                    //   navigate(stageNavigate[stageId]);
                    //   console.log(stageNavigate[stageId]);
                    // }, 500);
                  
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
                  console.log(result.data[0])
                  console.log("badge", result.data[0].badge_id);
                  let dataBadge = {
                    game_id: gameRdx.choosenGame.id,
                    badge_id: result.data[0].badge_id,
                  };

                  createBagdeGame(dataBadge)
                  .then((result) => {
                    console.log("BadgeGame", result)
                    
                  let params = gameRdx.choosenGame.id;
    
                  getBadgesByGameId(params)
                    .then((result) => {
                      console.log("traer badges", result);
                      const selectBadge = result?.data?.data;
                      dispatch(addBadge({ choosenBadge: selectBadge }));
                      console.log(selectBadge);
                      // setBadge(result?.data?.data);
                      // console.log(result.data);
                    })
                    .catch((error) => console.log(error));
                  })
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));

              console.log(gameRdx);
              const array = gameRdx.choosenGame.games_stages;
              console.log(
                gameRdx.choosenGame.games_stages[array.length - 1].id
              );
              console.log(characterRdx.choosenCharacter);

              let dataAnswer = {
                id: gameRdx.choosenGame.games_stages[array.length - 1].id,
                answer_id: answer,
              };
              console.log(dataAnswer);

              
              updateGameStage(dataAnswer, token)
              .then((result) => {
                  console.log(result);
                  
                  // let params = gameRdx.choosenGame.id
                  
                  // getBadgesByGameId(params)
                  // .then((result) => {
                  //   console.log("traer badges",result);
                  //   const selectBadge = result?.data?.data
                  //   dispatch(addBadge({ choosenBadge: selectBadge}))
                  //   console.log(selectBadge);
                  //   // setBadge(result?.data?.data);
                  //   // console.log(result.data);
                  // })
                  // .catch((error) => console.log(error));

                  //Cambiar cada vez, ya no coinciden
                  // const stageId = "15";

                  // let dataSavedGame = {
                  //   game_id: result.data.data.game_id,
                  //   // Meter aquí el stage al que se va a ir con respuesta
                  //   stage_id: stageId,
                  // };

                  // console.log(dataSavedGame);

                  // createSavedGame(dataSavedGame, token)
                  //   .then((result) => {
                  //     console.log(result);
                  //     let params = result.data.data.game_id;
                  //     bringLoadGamesById(params, token).then((result) => {
                  //       console.log(result.data.data[0]);
                  //       const selectGame = result.data.data[0];
                  //       dispatch(addGame({ choosenGame: selectGame }));
                  //       console.log(selectGame);
                  //     });
                  //   })
                  //   .catch((error) => console.log(error));

                  // const stageNavigate = {
                  //   9: "/stage0501",
                  //   10: "/stage0502",
                  //   11: "/stage0503",
                  // };

                  let dataFinished = { 
                    id: gameRdx.choosenGame.id,
                    finished: true }
                  
                  updateFinished(dataFinished, token)
                  .then(console.log("Game Finished"))
                  .catch((error) => console.log(error));

                  setTimeout(() => {
                    // navigate("/stage02");
                    // navigate(stageNavigate[stageId]);
                    // console.log(stageNavigate[stageId]);
                    navigate('/stage0701')
                  }, 500);
                })
                .catch((error) => console.log(error));
    }
              
  };

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
          <p>Are you sure?</p>
        </Modal.Body>
        <Modal.Footer>
          <Button
            onClick={() => {
              saveAnswer();
            }}
          >
            Confirm
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
      <Row>
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
              <p className='easyText'> MENSAJE DEL JUEGO: Este es un nivel de muerte súbita, errar aquí finaliza el juego, independientemente de la locura 
              acumulada o la falta de ella.</p>
              <p className='easyText'>Por fin se alzan ante tus ojos las Estatuas Cattegat. Enormes y majestuosas, imponentes a los sentidos. El mar del 
              fin del sueño baña sus pies y has conseguido embarcar en un drakkar que navega sus aguas.</p>
              <p className='easyText'>Según se cuenta, cada puerta tiene una salida. Pero sólo una conduce fuera del sueño. Es un punto de inflexión para 
              tu viaje, porque un acierto más y podrás volver a tu mundo, pero un error conduce irremediablemente a una muerte segura.</p>
              <p className='easyText'>Has conseguido convencer a un grupo de vikingos, que quiere hacer una incursión en el mundo despierto, de tus dotes 
              lógicas. Cada estatua tiene una inscripción. Únicamente la de la estatua de la salida decía la verdad. Después había otros dos tipos de estatua; 
              las que llevaban a un muerte rápida por trampas, cuyas inscripciones siempre mentían, y las que no tenían salida, y por tanto llevaban a la muerte 
              igualmente, ya que no se podía regresar, y cuyas inscripciones bien podían decir la verdad, o bien mentir.</p>
              <p className='easyText'>Únicamente con los datos de las inscripciones era imposible deducir cuál era la estatua que llevaba a la salida, pero tú, a lo 
              largo de tu viaje habías recogido una valiosísima información, la pieza que falta del rompecabezas, que te permitía saber con certeza en qué estatua estaba
              la salida: si la estatua VIII tenía salida o no.</p>
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
