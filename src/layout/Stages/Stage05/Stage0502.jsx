import React, { useEffect, useState } from "react";
import { Container, Row } from "react-bootstrap";
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
import mouse1 from '../../../image/mouse1.png';
import chest1 from '../../../image/chest1.png';
import chest2 from '../../../image/chest2.png';
import chest3 from '../../../image/chest3.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { changeState } from "../../clueSlice";
import { ClueBox } from "../../../components/ClueBox/ClueBox";

export const Stage0502 = () => {
  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = dataCredentialsRdx.credentials.token;

  
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
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.games_stages[array2.length - 1]?.stage_id != 10)) {
        const stageNavigate = {null: "/",1: "/stage01",2: "/stage02",3: "/stage0301",4: "/stage0302",5: "/stage0303",6: "/stage0401",7: "/stage0402",8: "/stage0403",9: "/stage0501",10: "/stage0502",11: "/stage0503",12: "/stage0601",13: "/stage0602",14: "/stage0603",};
        navigate(stageNavigate[stageID]);
      }})
    .catch((error) => console.log(error))
  }, []);
  
  //POPOVERS
  const popoverHoverFocus1 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Mussie
    </Popover>
  );  

  // ANSWER HOOK
  const [answer, setAnswer] = useState("");

  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  };

  // SEND ANSWER FUNCTIONS
  const saveAnswer = () => {
    if (answer == 27 || answer == 28) {
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
                  if (answer == "27"){
                    const stageId = "13";
                    let dataSavedGame = {
                      game_id: result.data.data.game_id,
                      stage_id: stageId,
                    };  
                    createSavedGame(dataSavedGame, token)
                      .then((result) => {
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
                      stage_id: stageId,
                    };  
                    createSavedGame(dataSavedGame, token)
                      .then((result) => {
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
                  const stageId = "12";
                  let dataSavedGame = {
                    game_id: result.data.data.game_id,
                    stage_id: stageId,
                  };
                  createSavedGame(dataSavedGame, token)
                    .then((result) => {
                      let params = result.data.data.game_id;
                      bringLoadGamesById(params, token).then((result) => {
                        const selectGame = result.data.data[0];
                        dispatch(addGame({ choosenGame: selectGame }));
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
                  }, 500);
                })
                .catch((error) => console.log(error));
    }
              
  };

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
              <div>El oro no está en el primer cofre</div>
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
