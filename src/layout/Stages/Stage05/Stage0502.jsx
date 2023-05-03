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
import './Stage0501.css'
// import vamp1 from '../../../image/vamp1.png';
import mouse1 from '../../../image/mouse1.png';
import chest1 from '../../../image/chest1.png';
import chest2 from '../../../image/chest2.png';
import chest3 from '../../../image/chest3.png';
// import vamp12 from '../../../image/vamp12.png';
// import vamp3 from '../../../image/vamp3.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { changeState } from "../../clueSlice";
import { ClueBox } from "../../../components/ClueBox/ClueBox";

export const Stage0502 = () => {
  const gameRdx = useSelector(gameDetailData);
  // const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(addState({ choosenState: true }))
  dispatch(changeState({ clueState: false }))

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

    if (answer == 27 || answer == 28) {
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

                  if (answer == "27"){
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

                  if (answer == "28"){
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

    if (answer == 29){
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
      className="homeContainerMin bg0502 d-flex flex-column justify-content-center align-items-center"
    >
      <TurnPhone/>
      <Row>
        <ClueBox/>
        <div className="box0403">
          <div className="img1Box0403">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0502" src={mouse1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03 textBox0501">
            <div  className='scrollText font0403'>
              <p className='easyText'>Después de lo que te ha parecido una eternidad de recorrer caminos y atravesar montañas, bosques y ríos, vislumbras una 
              edificación a lo lejos. Parecía un castillo, pero conforme te vas acercando, descubres que dista mucho de ser un castillo. Son una serie de 
              construcciones destartaladas, levantadas unas sobre otras en una colosal e informe masa de edificios.</p>
              <p className='easyText'>Observas que sale humo de una suerte de chimeneas y decides acercarte para ver si encuentras a alquien que te oriente.</p>
              <p className='easyText'>De repente, algo impacta a escasos centimetros de tus botas. Ha sido un disparo. Te detienes en seco. El ruido hace que una 
              bandada de pájaros se alce al vuelo desde los árboles cercanos. Miras al rededor en busca del pistolero, pero no ves a nadie. Sigues buscando con más 
              atención, hasta que ves a un ser bastante pequeño.</p>
              <p><span className='mussieText'>Mussie:</span> No des ni un paso más o a partir de ahora tendrás que caminar con nueve dedos.</p>
              <p className='easyText'>Sopesas si con ese rifle diminuto podría hacerte realmente daño, pero por el disparo de antes das un voto de credibilidad a la 
              potencia del arma.</p>
              <p><span className='mussieText'>Mussie:</span> Yo he visto antes esos cofres y por mi madre que me los voy a quedar yo.</p>
              <p className='easyText'>No mentía, no tenías ni idea de qué cofres hablaba, hasta que ves en un pequeño islote en medio del lago tres cofres puestos en 
              línea.</p>
              <p><span className='mussieText'>Mussie:</span> Pareces más perdido que avispado, pero estoy desesperado. Dos de los cofres contienen explosivos que detonarán si se abren y los tres tienen una 
                inscripción cada uno, de las cuales sólo una es cierta.</p>
              <p>Ayúdame a averiguar qué cofre contiene el oro y lo compartiré contigo.</p>
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
              <div>El oro está aquí</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("27"), setModalShow(true);
              }}
            >
              <img className="chestImg" src={chest3} alt="" />
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer0501Box answerFont0401">
              <div>El oro está en el primer cofre</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("28"), setModalShow(true);
              }}
            >
              <img className="chestImg" src={chest2} alt="" />
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer0501Box answerFont0401">
              <div>El oro no está aquí</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("29"), setModalShow(true);
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
