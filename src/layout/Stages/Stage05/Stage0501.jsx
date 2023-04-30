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
import './Stage0502.css'
// import vamp1 from '../../../image/vamp1.png';
import ghost1 from '../../../image/ghost1.png';
import chest1 from '../../../image/chest1.png';
import chest2 from '../../../image/chest2.png';
import chest3 from '../../../image/chest3.png';
// import vamp12 from '../../../image/vamp12.png';
// import vamp3 from '../../../image/vamp3.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';

export const Stage0501 = () => {
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
      Cerbero
    </Popover>
  );
  
  // const popoverHoverFocus2 = (
  //   <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
  //     Margareth / Eloste
  //   </Popover>
  // ); 

  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  };

  const saveAnswer = () => {

    if (answer == 24 || answer == 25) {
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

                  // let params = gameRdx.choosenGame.id

                  // getBadgesByGameId(params)
                  //   .then((result) => {
                  //     console.log("traer badges",result);
                  //     const selectBadge = result?.data?.data
                  //     dispatch(addBadge({ choosenBadge: selectBadge}))
                  //     console.log(selectBadge);
                  //   })
                  //   .catch((error) => console.log(error));

                  if (answer == "24"){
                    const stageId = "13";

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
                      12: "/stage0601",
                      13: "/stage0602",
                      14: "/stage0603",
                    };
  
                    setTimeout(() => {
                      navigate(stageNavigate[stageId]);
                      console.log(stageNavigate[stageId]);
                    }, 500);
                  }

                  if (answer == "25"){
                    const stageId = "14";

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
                      12: "/stage0601",
                      13: "/stage0602",
                      14: "/stage0603",
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

    if (answer == 26){
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
                  const stageId = "12";

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
                      12: "/stage0601",
                      13: "/stage0602",
                      14: "/stage0603",
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
      className="homeContainerMin bg0501 d-flex flex-column justify-content-center align-items-center"
    >
      <Row>
        <div className="box0403">
          <div className="img1Box0403">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0402" src={ghost1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03 textBox0501">
            <div  className='scrollText font0403'>
              <p className='easyText'>Casi por arte de magia, apareces en una bahía en la que tiempo ha encalló un barco mercante. Se dice entre las 
              gentes de la zona, que la culpa fue de un barco pirata que los arrastró hasta aquí para después masacrarlos y robarles todas sus riquezas.</p>
              <p className='easyText'>Pero los mercaderes no vendieron barata su vida ni sus riquezas. Llevaban una buena cantidad de mercenarios a bordo 
              y se libró una cruenta batalla.</p>
              <p className='easyText'>Finalmente, los corsarios, superiores en número, aniquilaron a toda la tripulación del mercante y robaron todo lo que 
              no estaba pegado al suelo. Excepto tres cofres.</p>
              <p className='easyText'>Te internas en el barco y exploras sus derruidas estancias hasta localizar los famosos cofres, que pese a lo que cabría 
              esperar no son sólo una leyenda. Pero en cuanto te acercas a ellos, un fantasma se materializa entre tú y los cofres:</p>
              <p>Cerbero: ¡Alto ahí forastero! Antes de que te dispongas a robar estos cofres, sepas que perdí mi vida defendiéndolos. De poco sirvió, advertí 
              a los piratas de que una maldición pesa sobre dos de ellos. No se atrevieron a abrirlos, pero aún así diéronme muerte.</p>
              <p>Si confías lo sufiente en tu ingenio como para arriesgarte a entregar tu vida por codicia, te diré que cada uno tiene una inscripción y, sólo 
              una de ellas, es cierta.</p>
              <p>El osado aventurero que abra el cofre correcto, podrá bañarse en oro. Pero tú no estás aquí por eso, no es el oro lo que deseas. Dentro del cofre 
              también encontrarás el mapa con la salida de Oniria. Elige con inteligencia y podrás volver a tu mundo.
              </p>
            </div>
          </div>
          {/* <div className="img2Box03">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img03 pos0403" src={mat2} alt="" />
            </OverlayTrigger>
          </div> */}
        </div>
      </Row>
      <Row>
        <div className="btnBox03 d-flex">
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer0501Box answerFont0401">
              <div>El oro no está en el último cofre</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("24"), setModalShow(true);
              }}
            >
              <img className="chestImg" src={chest3} alt="" />
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer0501Box answerFont0401">
              <div>El oro está en este cofre</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("25"), setModalShow(true);
              }}
            >
              <img className="chestImg" src={chest2} alt="" />
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer0501Box answerFont0401">
              <div>El oro no está en este cofre</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("26"), setModalShow(true);
              }}
            >
              <img className="chestImg" src={chest1} alt="" />
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};
