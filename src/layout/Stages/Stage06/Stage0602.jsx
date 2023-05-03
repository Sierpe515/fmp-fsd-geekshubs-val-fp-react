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
import './Stage0602.css'
import carnero1 from '../../../image/carnero2.png';
import carnero2 from '../../../image/carnero1.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { ClueBox } from "../../../components/ClueBox/ClueBox";
import { changeState } from "../../clueSlice";

export const Stage0602 = () => {
  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(addState({ choosenState: true }))
  dispatch(changeState({ clueState: false }))

  const [answer, setAnswer] = useState("");

  let token = dataCredentialsRdx.credentials.token;
  const array = gameRdx.choosenGame.games_stages
  const stageID = gameRdx?.choosenGame.games_stages[array?.length - 1]?.stage_id

  useEffect(() => {
    let params = gameRdx.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      if (!dataCredentialsRdx?.credentials?.token || (result.data.data[0].games_stages[array2.length - 1]?.stage_id != 13)) {
        const stageNavigate = {null: "/",1: "/stage01",2: "/stage02",3: "/stage0301",4: "/stage0302",5: "/stage0303",6: "/stage0401",7: "/stage0402",8: "/stage0403",9: "/stage0501",10: "/stage0502",11: "/stage0503",12: "/stage0601",13: "/stage0602",14: "/stage0603",};
        navigate(stageNavigate[stageID]);
      }})
    .catch((error) => console.log(error))
  }, []);

  // console.log(gameStageRedux);
  console.log(gameRdx);
  console.log(answer);
  
  const popoverHoverFocus1 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Guardián Renardo
    </Popover>
  );
  
  const popoverHoverFocus2 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Guardián Estrido
    </Popover>
  ); 

  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  };

  const saveAnswer = () => {

    if (answer == 36) {
      let body = {
        id: gameRdx.choosenGame.id,
        madness: 1,
      };
      updateMadness(body, token)
        .then((result) => {
          console.log("madness update successfully");
          console.log(result);
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
                  navigate("/gameOver2") 
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }

    if (answer == 35){
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
 
                  let dataFinished = { 
                    id: gameRdx.choosenGame.id,
                    finished: true }
                  
                  updateFinished(dataFinished, token)
                  .then(console.log("Game Finished"))
                  .catch((error) => console.log(error));

                  setTimeout(() => {
                    navigate('/stage0702')
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
      className="homeContainerMin bg0602 d-flex flex-column justify-content-center align-items-center"
    >
      <TurnPhone/>
      <Row>
        <ClueBox/>
        <div className="box0602">
          <div className="img1Box0602">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0402" src={carnero1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03 textBox0501">
            <div  className='scrollText font0602'>
              <p className='gameText'> MENSAJE DEL JUEGO: Este es un nivel de muerte súbita, errar aquí finaliza el juego, independientemente de la locura 
              acumulada o la falta de ella.</p>
              <p className='easyText'>Lo que te prometieron que sería una salida sencilla, se traduce con corazón a punto de salirse del pecho en una mazmorra 
              subterranea repleta de humanoides abominables con muchas ganas de atacar a cualquier cosa que se mueva. Por desgracia, tú cumples todos los requisitos.</p>
              <p className='easyText'>Una parte de ti, puede sentir un extraño aura de lo que crees que es la salida del mundo del sueño. Puede que este no sea el 
              mejor camino, pero es un camino. Lo recorres y exploras casi la totalidad de las dependencias de la mazmorra, que ahora ya puedes confirmar que es 
              una catacumba. Y finalmente la alcanzas; la puerta al mundo despierto. Discreta y vulgar, nada en ella resalta su importancia. De no ser porque llevas 
              tanto tiempo tratando de alcanzarla, estarías decepcionado.</p>
              <p className='easyText'>Pero no va a ser tan fácil. Nunca lo es. Tu puerta no está sola, se camufla entre otras tres puertas más, que conducen a una 
              muerte segura. Un error en esta elección acabará tus esperanzas de despertar</p>
              <p className='easyText'>También se encuentran en la estancia ocho carneros de aspecto amenazador, cada uno de ellos legal o caótico. Son los guardianes 
              de las puertas. Pero su cometido no es evitar que tú puedas entrar en alguna de ellas, sino que cualquier cosa pueda entrar desde alguna de ellas a su mundo. 
              Eso te hace ser consciente del peligro que entraña la elección que tienes que hacer. Pero has llegado tan lejos...</p>
              <p className='easyText'>Los guardianes te dicen lo siguiente para que puedas elegir con inteligencia:</p>
              <p><span className='guardText'>Guardián I:</span> La puerta correcta es la I.</p>
              <p><span className='guardText'>Guardián II:</span> Al menos una de las puertas II y III es la correcta.</p>
              <p><span className='guardText'>Guardián III:</span> A y B son legales.</p>
              <p><span className='guardText'>Guardián IV:</span> Las puertas I y II son correctas.</p>
              <p><span className='guardText'>Guardián V:</span> Las puertas I y III son correctas.</p>
              <p><span className='guardText'>Guardián VI:</span> O el guardián IV o el guardían V son legales.</p>
              <p><span className='guardText'>Guardián VII:</span> Si el guardián III es legal, entonces el guardián VI también lo es.</p>
              <p><span className='guardText'>Guardián VIII:</span> Si el guardián VII y yo somos legales, entonces el guardián I también lo es.</p>
              <p className='easyText'>¿En qué puerta está la salida?</p>
            </div>
          </div>
          <div className="img2Box0602">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img0602" src={carnero2} alt="" />
            </OverlayTrigger>
          </div>
        </div>
      </Row>
      <Row>
        <div className="btnBox0602 d-flex">
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div className="a0602Box d-flex flex-column justify-content-around align-items-center">
              <div className="homeBtn0602 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("35"), setModalShow(true);
                  }}
                >
                  Puerta I
              </div>
              <div className="homeBtn0602 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("36"), setModalShow(true);
                  }}
                >
                  Puerta III
              </div>
          </div>
          
          <div className="a0602Box d-flex flex-column justify-content-around align-items-center">
              <div className="homeBtn0602 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("36"), setModalShow(true);
                  }}
                >
                  Puerta II
              </div>
              <div className="homeBtn0602 btnMargin02 fontBtn0301"
                  onClick={() => {
                    chooseAnswer("36"), setModalShow(true);
                  }}
                >
                  Puerta IV
              </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};
