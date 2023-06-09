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
import './Stage0503.css'
import robot1 from '../../../image/robot1.png';
import robot2 from '../../../image/robot2.png';
import chest1 from '../../../image/chest1.png';
import chest2 from '../../../image/chest2.png';
import chest3 from '../../../image/chest3.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { changeState } from "../../clueSlice";
import { ClueBox } from "../../../components/ClueBox/ClueBox";

export const Stage0503 = () => {
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
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.games_stages[array2.length - 1]?.stage_id != 11)) {
        const stageNavigate = {null: "/",1: "/stage01",2: "/stage02",3: "/stage0301",4: "/stage0302",5: "/stage0303",6: "/stage0401",7: "/stage0402",8: "/stage0403",9: "/stage0501",10: "/stage0502",11: "/stage0503",12: "/stage0601",13: "/stage0602",14: "/stage0603",};
        navigate(stageNavigate[stageID]);
      }})
      .catch((error) => console.log(error))
    }, []);
    
    //POPOVERS
    const popoverHoverFocus1 = (
      <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Cerbero
    </Popover>
  );
  
  const popoverHoverFocus2 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Margareth / Eloste
    </Popover>
  ); 
  
  // ANSWER HOOK
  const [answer, setAnswer] = useState("");

  const chooseAnswer = (resp) => {
    setAnswer(resp);
  };

  // SEND ANSWER FUNCTIONS
  const saveAnswer = () => {
    if (answer == 30 || answer == 31) {
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
                  if (answer == "30"){
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
                    }, 500);
                  }

                  if (answer == "31"){
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
                    }, 500);
                  }

                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }

    if (answer == 32){
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
      className="homeContainerMin bg0503 d-flex flex-column justify-content-center align-items-center"
    >
      <TurnPhone/>
      <Row>
        <ClueBox/>
        <div className="box0403">
          <div className="img1Box0403 img1Box0503">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0402" src={robot1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03 textBox0503 textBox0403">
            <div  className='scrollText font0403'>
              <p className='easyText'>Después de lo que te ha parecido una eternidad de recorrer caminos y atravesar montañas, bosques y ríos, llegas a una presa 
              abandonada. Sorprende que todavía se tenga en pie, pero algún día fue una construcción colosal. En su paramento y al costado de la presa se alza otra 
              edificación no menos imponente de tipo industrial. Debe ser el edificio del cuarto de máquinas, tan abandonado como la misma presa, hasta el punto de 
              que una curiosa vegetación se ha apoderado de él.</p>
              <p className='easyText'>Intentas acceder a él, ya que para continuar tu camino debes subir a lo alto de su coronación. No te resulta difícil encontrar 
              una apertura entre sus agrietados muros y sus inexistentes puertas.</p>
              <p className='easyText'>Mientras recorres los pasillos y habitaciones del edificio, te llama poderosamente la atención una estancia en particular. No 
              tiene mucho que ver con el resto, casi parece como si alguien la hubiera puesto ahí por error.</p>
              <p className='easyText'>En el centro de la estancia hay tres cofres, custodiados por dos robots de seguridad que a todas luces no están en funcionamiento.</p>
              <p className='easyText'>Te acercas a los cofres y una inscripción central reza que cada cofre tiene una inscripción, pero que de las inscripciones de los tres 
              cofres, sólo una dice la verdad.</p>
              <p className='easyText'>En ese momento, sabes con certeza que para continuar tu camino debes abrir el cofre correcto, ya que algo en su interior te 
              desvelará el camino a seguir. Pero has de elegir con presteza, ya que tal y como dictan las inscripciones, los cofres incorrectos contienen bombas que 
              seguramente detonarán al abrirlos.</p>
            </div>
          </div>
          <div className="img2Box03">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img03 pos0403" src={robot2} alt="" />
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
            <div className="answer0501Box answerFont0401">
              <div>El oro está en este cofre</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("30"), setModalShow(true);
              }}
            >
              <img className="chestImg" src={chest3} alt="" />
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer0501Box answerFont0401">
              <div>En el primer cofre hay una bomba</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("31"), setModalShow(true);
              }}
            >
              <img className="chestImg" src={chest2} alt="" />
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer0501Box answerFont0401">
              <div>En este cofre hay una bomba</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("32"), setModalShow(true);
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
