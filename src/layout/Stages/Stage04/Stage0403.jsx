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
import { addBadge } from "../../badgeSlice";
import { addState } from "../../inGameSlice";
import './Stage0403.css'
import mat1 from '../../../image/mat1.png';
import mat2 from '../../../image/mat2.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { ClueBox } from "../../../components/ClueBox/ClueBox";
import { changeState } from "../../clueSlice";

export const Stage0403 = () => {
  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = dataCredentialsRdx.credentials.token;
  
  // USEEFFECT TO CHECK IF USER IS LOGGED IN AND THE CORRECT STAGE
  // SAVE AT REDUX INGAME STATE
  dispatch(addState({ choosenState: true}))
  // SAVE AT REDUX SHOWING CLUE STATE
  dispatch(changeState({ clueState: false }))

  useEffect(() => {
    let params = gameRdx.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      const selectGame = result.data.data[0];
      dispatch(addGame({ choosenGame: selectGame }));
      const stageID = selectGame.games_stages[array2.length - 1]?.stage_id
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.games_stages[array2.length - 1]?.stage_id != 8)) {
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
      Magnus / Kadala
    </Popover>
  );
  
  const popoverHoverFocus2 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Margareth / Eloste
    </Popover>
  ); 

  // SAVE ANSWER FUNCTION
  const saveAnswer = () => {
    if (answer == 21 || answer == 22) {
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
                  if (answer == "21"){
                    const stageId = "10";
                    let dataSavedGame = {
                      game_id: result.data.data.game_id,
                      stage_id: stageId,
                    };  
                    createSavedGame(dataSavedGame, token)
                      .then((result) => {
                      })
                      .catch((error) => console.log(error));
  
                    const stageNavigate = {
                      9: "/stage0501",
                      10: "/stage0502",
                      11: "/stage0503",
                    };
  
                    setTimeout(() => {
                      navigate(stageNavigate[stageId]);
                    }, 500);
                  }

                  if (answer == "22"){
                    const stageId = "11";

                    let dataSavedGame = {
                      game_id: result.data.data.game_id,
                      stage_id: stageId,
                    };
  
                    createSavedGame(dataSavedGame, token)
                      .then((result) => {
                      })
                      .catch((error) => console.log(error));
  
                    const stageNavigate = {
                      9: "/stage0501",
                      10: "/stage0502",
                      11: "/stage0503",
                    };
  
                    setTimeout(() => {
                      navigate(stageNavigate[stageId]);
                    }, 500);
                  }

                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }

    if (answer == 23){
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
                  const stageId = "9";
                  let dataSavedGame = {
                    game_id: result.data.data.game_id,
                    stage_id: stageId,
                  };
                  createSavedGame(dataSavedGame, token)
                    .then((result) => {
                    })
                    .catch((error) => console.log(error));

                  const stageNavigate = {
                    9: "/stage0501",
                    10: "/stage0502",
                    11: "/stage0503",
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
      className="homeContainerMin bg0403 d-flex flex-column justify-content-center align-items-center"
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
              <img className="img0402" src={mat1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03 textBox0403">
            <div  className='scrollText font0403'>
              <p className='easyText'>La ciudad de Bahava era un lugar singular. Un enorme oasis en una tierra desertica, donde la mayoría 
              de sus habitantes disponían de grandes dotes para la magia. Pero lo que más la caracterizaba eran dos peculiaridades bastante 
              éxtravagantes: </p>
              <p className='easyText'>Una era que esta tierra la habitan, no sólo caóticos y legales, sino 
              tambien neutrales, que a veces dicen la verdad y otras mienten.</p>
              <p className='easyText'> La otra era un antiguo decreto, dictado por la emperatriz Vania, por el cual sus habitantes sólo podían 
              casarse entre sí si uno era caótico y el otro legal, o bien si ambos eran neutrales.</p>
              <p className='easyText'>Tus pasos te llevan al majestuoso palacio de la Zahiria, donde te reciben Magnus y Kadala, dos cortesanos 
              de la actual emperatriz regente. Sabes que son un influyente matrimonio y te invidan a ser un huésped en la corte el tiempo que desees.</p>
              <p className='easyText'>Mientras recorréis los jardines del palacio, se unen a vosotros otro matrimonio de huéspedes extrajeros, Margareth 
              y Eloste, pero casados en Bahava, por lo que también está compuesto por dos neutrales o un caótico y un legal o viceversa.</p>
              <p className='easyText'>En cualquier caso, te interesa conocer la dirección de tu próximo destino, pero todavía necesitas saber si puedes fiarte de alguno de 
              ellos. Les preguntas sobre su condición y te responden lo siguiente:</p>
              <p><span className='magnusText'>Magnus:</span> Eloste es legal.</p>
              <p><span className='kadalaText'>Kadala:</span> Mi marido tiene toda la razón.</p>
              <p><span className='margaText'>Margareth:</span> Totalmente de acuerdo con ellos. Eloste es legal.</p>
              <p className='easyText'>¿De qué clase es realmente Eloste?</p>
            </div>
          </div>
          <div className="img2Box03">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img03 pos0403" src={mat2} alt="" />
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
              <div>Legal</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("21"), setModalShow(true);
              }}
            >
              RESPUESTA A
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer03Box answerFont0401">
              <div>Caótico</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("22"), setModalShow(true);
              }}
            >
              RESPUESTA B
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer03Box answerFont0401">
              <div>Neutral</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("23"), setModalShow(true);
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
