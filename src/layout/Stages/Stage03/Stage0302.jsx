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
import './Stage0302.css'
import turtle1 from '../../../image/turtle1.png';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
// import diablo2 from '../../../image/diablo2.png';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';

export const Stage0302 = () => {
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
  
  // const popoverHoverFocus1 = (
  //   <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
  //     Gaara
  //   </Popover>
  // );
  
  // const popoverHoverFocus2 = (
  //   <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
  //     Akumato
  //   </Popover>
  // ); 

  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  };

  const saveAnswer = () => {

    if (answer == 9 || answer == 11) {
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

              //Cambiar, ya no son equivalentes
              // const stageId = answer;

              updateGameStage(dataAnswer, token)
                .then((result) => {
                  console.log(result);

                  let params = gameRdx.choosenGame.id

                  // getBadgesByGameId(params)
                  //   .then((result) => {
                  //     console.log("traer badges",result);
                  //     const selectBadge = result?.data?.data
                  //     dispatch(addBadge({ choosenBadge: selectBadge}))
                  //     console.log(selectBadge);
                  //     // setBadge(result?.data?.data);
                  //     // console.log(result.data);
                  //   })
                  //   .catch((error) => console.log(error));

                  
                  if (answer == "9"){
                    const stageId = "7"

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
                    6: "/stage0401",
                    7: "/stage0402",
                    8: "/stage0403",
                  };

                  setTimeout(() => {
                    // navigate("/stage02");
                    navigate(stageNavigate[stageId]);
                    console.log(stageNavigate[stageId]);
                  }, 500);                    
                  }
    
                  if (answer == "11"){
                    const stageId = "8"

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
                    6: "/stage0401",
                    7: "/stage0402",
                    8: "/stage0403",
                  };

                  setTimeout(() => {
                    // navigate("/stage02");
                    navigate(stageNavigate[stageId]);
                    console.log(stageNavigate[stageId]);
                  }, 500);
                  }
                  // let dataSavedGame = {
                  //   game_id: result.data.data.game_id,
                  //   // Meter aquí el stage al que se va a ir con respuesta
                  //   stage_id: stageId,
                  // };

                  // createSavedGame(dataSavedGame, token)
                  //   .then((result) => {
                  //     console.log(result);
                  //     let params = result.data.data.game_id;
                  //     bringLoadGamesById(params, token).then((result) => {
                  //       console.log(result.data.data[0]);
                  //       const selectGame = result.data.data[0];
                  //       dispatch(
                  //         addGameStage({ choosenGameStage: selectGame })
                  //       );
                  //       console.log(selectGame);
                  //     });
                  //   })
                  //   .catch((error) => console.log(error));

                  // const stageNavigate = {
                  //   6: "/stage0401",
                  //   7: "/stage0402",
                  //   8: "/stage0403",
                  // };

                  // setTimeout(() => {
                  //   // navigate("/stage02");
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

    if (answer == "10"){
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
                  
                  let params = gameRdx.choosenGame.id
                  
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
                  const stageId = "6";

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
                    6: "/stage0401",
                    7: "/stage0402",
                    8: "/stage0403",
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
        className="my-modal"
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
          <Button className='confirmBtn'
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
      className="homeContainerMin bg0302 d-flex flex-column justify-content-center align-items-center"
    >
      <TurnPhone/>
      <Row>
        <div className="box03">
          <div className="img1Box0302">
            {/* <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              >  */}
              <img className="img03" src={turtle1} alt="" />
            {/* </OverlayTrigger> */}
          </div>
          <div className="textBox03">
            <div  className='scrollText font03'>
              <p className='easyText'>Tras tomar la decisión de que no podías fiarte ni de Shasha ni de Sherboroug, decidiste que debías dejarte llevar por
              tu instinto y dejaste que tus botas hicieran camino.</p>
              <p className='easyText'>Después de lo que te ha parecido una eternidad, por fin llegas a una tierra de islas flotantes, a una altitud 
              tal que ni las nubes las alcanzan. Y, aunque se trate de un sueño, te impresiona ver como ríos manan de las islas y caen en cascada a cientos 
              de metros de altura hacia el vacío.</p>
              <p className='easyText'>En todo este tiempo desde que dejaras la ciudad turquesa no te habías cruzado con ningun habitante, ni humano ni humanoide.
              Hasta que distingues una figura en la lejanía. Te acercas y compruebas que es una especie de hombre tortuga que simula estar perezosamente recostado
              a la sombra de un árbol.</p>
              <p className='easyText'>Por la naturaleza de los sueños, el personaje te resulta familiar y recuerdas vagamente su nombre, pero no aciertas a distinguir 
              si era Tarco, Tarso o Parso. Pero sin tiempo que perder, le confiesas tu confusión, a lo que responde:
              </p>
              <p>???: Mi nombre es o Tarco o Parso</p>
              <p className='easyText'>¿Cuál es el nombre del hombre tortuga?</p>
            </div>
          </div>
          {/* <div className="img2Box03">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img03 posImg03" src={diablo2} alt="" />
            </OverlayTrigger>
          </div> */}
        </div>
      </Row>
      <Row>
        <div className="btnBox0302 d-flex">
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="homeBtn03 btnMargin02 fontBtn03"
              onClick={() => {
                chooseAnswer("9"), setModalShow(true);
              }}
            >
              Tarco
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="homeBtn03 btnMargin02 fontBtn03"
              onClick={() => {
                chooseAnswer("10"), setModalShow(true);
              }}
            >
              Tarso
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="homeBtn03 btnMargin02 fontBtn03"
              onClick={() => {
                chooseAnswer("11"), setModalShow(true);
              }}
            >
              Parso
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};