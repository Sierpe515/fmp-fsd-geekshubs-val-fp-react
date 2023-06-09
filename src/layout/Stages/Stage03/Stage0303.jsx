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
import './Stage0303.css'
import dungeon1 from '../../../image/dungeon1.png';
import dungeon2 from '../../../image/dungeon2.png';
import dungeon3 from '../../../image/dungeon3.png';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { ClueBox } from "../../../components/ClueBox/ClueBox";
import { changeState } from "../../clueSlice";

export const Stage0303 = () => {
  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = dataCredentialsRdx.credentials.token;

  
  // USEEFFECT TO CHECK IF USER IS LOGGED IN AND THE CORRECT STAGE
  useEffect(() => {
    // SAVE AT REDUX INGAME STATE
    dispatch(addState({ choosenState: true}))
    // SAVE AT REDUX SHOWING CLUE STATE
    dispatch(changeState({ clueState: false }))
    
    let params = gameRdx.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      const selectGame = result.data.data[0];
      dispatch(addGame({ choosenGame: selectGame }));
      const stageID = selectGame.games_stages[array2.length - 1]?.stage_id
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.games_stages[array2.length - 1]?.stage_id != 5)) {
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

  // SAVE ANSWER FUNCTION
  const saveAnswer = () => {
    if (answer == 13 || answer == 14) {
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
                  if (answer == "13"){
                    const stageId = "7";                  
                    let dataSavedGame = {
                      game_id: result.data.data.game_id,
                      stage_id: stageId,
                    };  
                    createSavedGame(dataSavedGame, token)
                      .then((result) => {
                      })
                      .catch((error) => console.log(error));
  
                    const stageNavigate = {
                      6: "/stage0401",
                      7: "/stage0402",
                      8: "/stage0403",
                    };
  
                    setTimeout(() => {
                      navigate(stageNavigate[stageId]);
                    }, 500);
                  }

                  if (answer == "14"){
                    const stageId = "8";                  
                    let dataSavedGame = {
                      game_id: result.data.data.game_id,
                      stage_id: stageId,
                    };  
                    createSavedGame(dataSavedGame, token)
                      .then((result) => {
                      })
                      .catch((error) => console.log(error));
  
                    const stageNavigate = {
                      6: "/stage0401",
                      7: "/stage0402",
                      8: "/stage0403",
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

    if (answer == "12"){
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
                  const stageId = "6";
                  let dataSavedGame = {
                    game_id: result.data.data.game_id,
                    stage_id: stageId,
                  };
                  createSavedGame(dataSavedGame, token)
                    .then((result) => {
                    })
                    .catch((error) => console.log(error));

                  const stageNavigate = {
                    6: "/stage0401",
                    7: "/stage0402",
                    8: "/stage0403",
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
      className="homeContainerMin bg0303 d-flex flex-column justify-content-center align-items-center"
    >
      <TurnPhone/>
      <Row>
        <ClueBox/>
        <div className="box0303">
          <div className="textBox0303">
            <div  className='scrollText font0303'>
              <p className='easyText'>Comienzas a pensar que tal vez no tomaste la decisión correcta al desconfiar de Shasha. Hacer lo contrario de lo 
              que te recomendó, ha acabado con tus huesos dentro de una mazmorra considerablemente tenebrosa.</p>
              <p className='easyText'>Por si fuera poco, lo que identificas como tres esbirros infernales, te salen al paso. 
              Van fuertemente armados y si esto fuera uno de tus juegos de rol, ya les estarías intentando sacar las tripas 
              con tu espada o con tu hacha.</p>
              <p className='easyText'>Por suerte para ti, esto no es uno de tus juegos de rol. Y, contra toda convicción, tampoco parecen tener intención de 
              matarte. Al menos por el momento.</p>
              <p><span className='hambrunoText'>Hambruno:</span> ¿Qué haces aquí? Nos encantan las visitas.</p>
              <p className='easyText'>Les explicas tu situación y ocurre lo último que hubieras esperado; se ofrecen a ayudarte. Pero antes debes de 
              deducir si son de fiar, así que les preguntas de qué tipo son.</p>
              <p><span className='gulatesText'>Gulates:</span> ¡Por supuesto que todos somos caóticos!</p>
              <p><span className='pestiText'>Pestilencio:</span> Uno de nosotros, y sólo uno, es legal.</p>
              <p className='easyText'>¿En cuál de ellos confiarias?</p>
            </div>
          </div>         
        </div>
      </Row>
      <Row>
        <div className="btnBox0303 d-flex">
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="imgBox0303"
            onClick={() => {
              chooseAnswer("12"), setModalShow(true);
            }}>
              <img className="img0303" src={dungeon1} alt="" />
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn03"
            >
              Pestilencio
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="imgBox0303"
            onClick={() => {
              chooseAnswer("13"), setModalShow(true);
            }}>
              <img className="img0303" src={dungeon2} alt="" />
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn03"
            >
              Gulates
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="imgBox0303"
            onClick={() => {
              chooseAnswer("14"), setModalShow(true);
            }}>
              <img className="img0303" src={dungeon3} alt="" />
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn03"
            >
              Hambruno
            </div>
          </div>
        </div>
      </Row>
    </Container>
  );
};