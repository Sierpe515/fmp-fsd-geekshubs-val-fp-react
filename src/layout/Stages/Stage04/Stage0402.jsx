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
import './Stage0402.css'
// import vamp1 from '../../../image/vamp1.png';
import mage1 from '../../../image/mage1.png';
import mage2 from '../../../image/mage2.png';
// import vamp12 from '../../../image/vamp12.png';
// import vamp3 from '../../../image/vamp3.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const Stage0402 = () => {
  const gameRdx = useSelector(gameDetailData);
  // const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(addState({ choosenState: true}))

  const [answer, setAnswer] = useState("");
  const [characterImage, setCharacterImage] = useState([]);

  let token = dataCredentialsRdx.credentials.token;

  // console.log(gameStageRedux);
  console.log(gameRdx);
  console.log(answer);
  
  const popoverHoverFocus1 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Magnus
    </Popover>
  );
  
  const popoverHoverFocus2 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Kadala
    </Popover>
  ); 

  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  };

  const saveAnswer = () => {

    if (answer == 18 || answer == 20) {
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
                    .then((result) => console.log("BadgeGame", result))
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

                  let params = gameRdx.choosenGame.id

                  getBadgesByGameId(params)
                    .then((result) => {
                      console.log("traer badges",result);
                      const selectBadge = result?.data?.data
                      dispatch(addBadge({ choosenBadge: selectBadge}))
                      console.log(selectBadge);
                    })
                    .catch((error) => console.log(error));

                  if (answer == "18"){
                    const stageId = "10";

                    let dataSavedGame = {
                      game_id: result.data.data.game_id,
                      // Meter aquí el stage al que se va a ir con respuesta
                      stage_id: stageId,
                    };
  
                    createSavedGame(dataSavedGame, token)
                      .then((result) => {
                        console.log(result);
                        let params = result.data.data.game_id;
                        bringLoadGamesById(params, token).then((result) => {
                          console.log(result.data.data[0]);
                          const selectGame = result.data.data[0];
                          dispatch(
                            addGameStage({ choosenGameStage: selectGame })
                          );
                          console.log(selectGame);
                        });
                      })
                      .catch((error) => console.log(error));
  
                    const stageNavigate = {
                      9: "/stage0501",
                      10: "/stage0502",
                      11: "/stage0503",
                    };
  
                    setTimeout(() => {
                      navigate(stageNavigate[stageId]);
                      console.log(stageNavigate[stageId]);
                    }, 500);
                  }

                  if (answer == "20"){
                    const stageId = "11";

                    let dataSavedGame = {
                      game_id: result.data.data.game_id,
                      // Meter aquí el stage al que se va a ir con respuesta
                      stage_id: stageId,
                    };
  
                    createSavedGame(dataSavedGame, token)
                      .then((result) => {
                        console.log(result);
                        let params = result.data.data.game_id;
                        bringLoadGamesById(params, token).then((result) => {
                          console.log(result.data.data[0]);
                          const selectGame = result.data.data[0];
                          dispatch(
                            addGameStage({ choosenGameStage: selectGame })
                          );
                          console.log(selectGame);
                        });
                      })
                      .catch((error) => console.log(error));
  
                    const stageNavigate = {
                      9: "/stage0501",
                      10: "/stage0502",
                      11: "/stage0503",
                    };
  
                    setTimeout(() => {
                      navigate(stageNavigate[stageId]);
                      console.log(stageNavigate[stageId]);
                    }, 500);
                  }

                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }

    if (answer == 19){
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
                    .then((result) => console.log("BadgeGame", result))
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
                  
                  let params = gameRdx.choosenGame.id
                  
                  getBadgesByGameId(params)
                  .then((result) => {
                    console.log("traer badges",result);
                    const selectBadge = result?.data?.data
                    dispatch(addBadge({ choosenBadge: selectBadge}))
                    console.log(selectBadge);
                    // setBadge(result?.data?.data);
                    // console.log(result.data);
                  })
                  .catch((error) => console.log(error));

                  //Cambiar cada vez, ya no coinciden
                  const stageId = "9";

                  let dataSavedGame = {
                    game_id: result.data.data.game_id,
                    // Meter aquí el stage al que se va a ir con respuesta
                    stage_id: stageId,
                  };

                  console.log(dataSavedGame);

                  createSavedGame(dataSavedGame, token)
                    .then((result) => {
                      console.log(result);
                      let params = result.data.data.game_id;
                      bringLoadGamesById(params, token).then((result) => {
                        console.log(result.data.data[0]);
                        const selectGame = result.data.data[0];
                        dispatch(addGame({ choosenGame: selectGame }));
                        console.log(selectGame);
                      });
                    })
                    .catch((error) => console.log(error));

                  const stageNavigate = {
                    9: "/stage0501",
                    10: "/stage0502",
                    11: "/stage0503",
                  };

                  setTimeout(() => {
                    // navigate("/stage02");
                    navigate(stageNavigate[stageId]);
                    console.log(stageNavigate[stageId]);
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
      className="homeContainerMin bg0402 d-flex flex-column justify-content-center align-items-center"
    >
      <Row>
        <div className="box03">
          <div className="img1Box03">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0402" src={mage1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03">
            <div  className='scrollText font0401'>
              <p className='easyText'>La ciudad de Bahava era un lugar singular. Un enorme oasis en una tierra desertica, donde la mayoría 
              de sus habitantes disponían de grandes dotes para la magia. Pero lo que más la caracterizaba eran dos peculiaridades bastante 
              éxtravagantes: </p>
              <p className='easyText'>Una era que esta tierra la habitan, no sólo caóticos y legales, sino 
              tambien neutrales, que a veces dicen la verdad y otras mienten.</p>
              <p className='easyText'> La otra era un antiguo decreto, dictado por la emperatriz Vania, por el cual sus habitantes sólo podían 
              casarse entre sí si uno era caótico y el otro legal, o bien si ambos eran neutrales.</p>
              <p className='easyText'>Tus pasos te llevan al majestuoso palacio de la Zahiria, donde te reciben Magnus y Kadala, dos cortesanos 
              de la actual emperatriz regente.</p>
              <p className='easyText'>Sabes que son un influyente matrimonio y te invidan a ser un huésped en la corte el tiempo que desees. En 
              cualquier caso, te interesa conocer la dirección de tu próximo destino, pero todavía necesitas saber si puedes fiarte de alguno de 
              ellos. Les preguntas sobre su condición y te responden lo siguiente:</p>
              <p>Magnus: Mi mujer no es neutral.</p>
              <p>Kadala: Mi marido no es neutral.</p>
              <p className='easyText'>¿De qué clase son Magnus y Kadala?</p>
            </div>
          </div>
          <div className="img2Box03">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img03 posImg03" src={mage2} alt="" />
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
            <div className="answer03Box answerFont0401">
              <div>Magnus: Legal</div>
              <div>Kadala: Caótica</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("18"), setModalShow(true);
              }}
            >
              RESPUESTA A
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer03Box answerFont0401">
              <div>Ambos neutrales</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("19"), setModalShow(true);
              }}
            >
              RESPUESTA B
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer03Box answerFont0401">
              <div>Magnus: Caótico</div>
              <div>Kadala: Legal</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("20"), setModalShow(true);
              }}
            >
              RESPUESTA C
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};
