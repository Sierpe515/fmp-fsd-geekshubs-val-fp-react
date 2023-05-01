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
import './Stage0603.css'
// import vamp1 from '../../../image/vamp1.png';
// import death1 from '../../../image/death1.png';
import death2 from '../../../image/death2.png';
import death3 from '../../../image/death3.png';
// import carnero2 from '../../../image/carnero1.png';
// import vamp12 from '../../../image/vamp12.png';
// import vamp3 from '../../../image/vamp3.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const Stage0603 = () => {
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
    <Popover className="popoverBtn popFont" id="popover-trigger-hover-focus" title="Popover bottom">
      <div>Halconera: Legal/inocente</div>
      <div>Halcón: Neutral/culpable</div>
      <div>Verdugo: Caótico/inocente</div>
    </Popover>
  ); 
  
  const popoverHoverFocus2e = (
    <Popover className="popoverBtn popFont" id="popover-trigger-hover-focus" title="Popover bottom">
      <div>Halconera: Legal/inocente</div>
      <div>Halcón: Caótico/inocente</div>
      <div>Verdugo: Neutral/Culpable</div>
    </Popover>
  ); 
  const popoverHoverFocus3e = (
    <Popover className="popoverBtn popFont" id="popover-trigger-hover-focus" title="Popover bottom">
      <div>Halconera: Legal/inocente</div>
      <div>Halcón: Neutral/culpable</div>
      <div>Verdugo: Caótico/inocente</div>
    </Popover>
  ); 
  const popoverHoverFocus4e = (
    <Popover className="popoverBtn popFont" id="popover-trigger-hover-focus" title="Popover bottom">
      <div>Halconera: Caótico/inocente</div>
      <div>Halcón: Legal/culpable</div>
      <div>Verdugo: Neutral/inocente</div>
    </Popover>
  ); 
  const popoverHoverFocus5e = (
    <Popover className="popoverBtn popFont" id="popover-trigger-hover-focus" title="Popover bottom">
      <div>Halconera: Caótico/inocente</div>
      <div>Halcón: Neutral/culpable</div>
      <div>Verdugo: Legal/inocente</div>
    </Popover>
  ); 
  const popoverHoverFocus6e = (
    <Popover className="popoverBtn popFont" id="popover-trigger-hover-focus" title="Popover bottom">
      <div>Halconera: Caótico/inocente</div>
      <div>Halcón: Neutral/inocente</div>
      <div>Verdugo: Legal/culpable</div>
    </Popover>
  ); 
  const popoverHoverFocus7e = (
    <Popover className="popoverBtn popFont" id="popover-trigger-hover-focus" title="Popover bottom">
      <div>Halconera: Neutral/culpable</div>
      <div>Halcón: Legal/inocente</div>
      <div>Verdugo: Caótico/inocente</div>
    </Popover>
  ); 
  const popoverHoverFocus8e = (
    <Popover className="popoverBtn popFont" id="popover-trigger-hover-focus" title="Popover bottom">
      <div>Halconera: Neutral/inocente</div>
      <div>Halcón: Legal/culpable</div>
      <div>Verdugo: Caótico/inocente</div>
    </Popover>
  ); 
  const popoverHoverFocus9e = (
    <Popover className="popoverBtn popFont" id="popover-trigger-hover-focus" title="Popover bottom">
      <div>Halconera: Neutral/culpable</div>
      <div>Halcón: Caótico/inocente</div>
      <div>Verdugo: Legal/inocente</div>
    </Popover>
  ); 


  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  };

  const saveAnswer = () => {

    if (answer == 38) {
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

    if (answer == 37){
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
                  // const stageId = "16";

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
                    navigate('/stage0703')
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
      className="homeContainerMin bg0603 d-flex flex-column justify-content-center align-items-center"
    >
      <Row>
        <div className="box0603">
          {/* <div className="img1Box0603">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0603" src={death1} alt="" />
            </OverlayTrigger>
          </div> */}
          <div className="img1Box0603">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0603" src={death2} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03 textBox0603">
            <div  className='scrollText font0603'>
              <p className='easyText'> MENSAJE DEL JUEGO: Este es un nivel de muerte súbita, errar aquí finaliza el juego, independientemente de la locura 
              acumulada o la falta de ella.</p>
              <p className='easyText'>Abres los ojos dentro del sueño, no recuerdas nada desde que abriste ese cofre. Pero ahora estás en un juicio y eres el asistente 
              del juez. Para más inri, el juez es la mismísima muerte, y al tratarse de tu sueño es tal y como la imaginabas; un ser cadaverico envuelto en 
              una arapienta túnica que antaño debió de ser negra, pero que ahora apenas conserva algo de color.</p>
              <p className='easyText'>La muerte conoce tu situación y está dispuesta a enviarte de vuelta a tu mundo si le ayudas a esclarecer el caso. Pero se toma la 
              justicia muy en serio y si fallas te dejará vagando por estos mundos a tu suerte. Y sientes que ya no te queda tiempo.</p>
              <p className='easyText'>Hay tres acusados, el verdugo, la halconera y, por extraño que parezca, el halcón, que ha resultado ser un ser con consciencia y habla.
              Se sabe que uno de ellos ha cometido el delito, pero no cuál. También se conoce que entre los acusados, uno es legal, otro caótico y otro neutral.</p>
              <p className='easyText'>Del mismo modo, también se conoce que si la haconera no es la culpable, entonces lo es el verdugo o el halcón</p>
              <p className='easyText'>Por último, también se sabía que el culpable no era caótico.</p>
              <p className='easyText'>Y los tres dijeron lo siguiente:</p>
              <p>Halconera: Yo soy inocente.</p>
              <p>Halcón: Es cierto, mi señora es inocente.</p>
              <p>Verdugo: No es verdad, la halconera es culpable.</p>
              <p className='easyText'>Las pronunciaciones de los acusados, resultaban bastante naturales, pero insuficientes para que pudieras sacar una conclusión válida. 
              De modo que te acercaste a los acusados con intención de hacer las preguntas necesarias para cumplir tu proposito.</p>
              <p className='easyText'>En primer lugar te acercaste al verdugo y le preguntaste:</p>
              <p>Tú: ¿Por casualidad, no será usted el culpable?</p>
              <p className='easyText'>El verdugo te respondió y te viste con la necesidad de realizar otra pregunta. Te acercaste, esta vez, a la halconera y le preguntaste:</p>
              <p>Tú: ¿Es culpable el verdugo?</p>
              <p className='easyText'>Cuando te respondió, pudiste esclarecer el caso. ¿Quién era el culpable y quién era legal, caótico o neutral?</p>
            </div>
          </div>
          <div className="img2Box0603">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img0603b" src={death3} alt="" />
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
                    chooseAnswer("38"), setModalShow(true);
                  }}
                >
                  Answer I
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus4e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("38"), setModalShow(true);
                  }}
                >
                  Answer IV
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus7e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("38"), setModalShow(true);
                  }}
                >
                  Answer VII
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
                    chooseAnswer("38"), setModalShow(true);
                  }}
                >
                  Answer II
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus5e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("38"), setModalShow(true);
                  }}
                >
                  Answer V
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus8e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("37"), setModalShow(true);
                  }}
                >
                  Answer VIII
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
                    chooseAnswer("38"), setModalShow(true);
                  }}
                >
                  Answer III
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus6e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("38"), setModalShow(true);
                  }}
                >
                  Answer VI
              </div>
            </OverlayTrigger>
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="top"
                overlay={popoverHoverFocus9e}
              >
              <div className="homeBtn03 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("38"), setModalShow(true);
                  }}
                >
                  Answer IX
              </div>
            </OverlayTrigger>
          </div>
        </div>
      </Row>
    </Container>
  );
};
