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
import './Stage0302.css'
import turtle1 from '../../../image/turtle1.png';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { changeState } from "../../clueSlice";
import { ClueBox } from "../../../components/ClueBox/ClueBox";

export const Stage0302 = () => {
  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = dataCredentialsRdx.credentials.token;

  // SAVE AT REDUX INGAME STATE
  dispatch(addState({ choosenState: true }))

  // SAVE AT REDUX SHOWING CLUE STATE
  dispatch(changeState({ clueState: false }))

  // USEEFFECT TO CHECK IF USER IS LOGGED IN AND THE CORRECT STAGE
  useEffect(() => {
    let params = gameRdx.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      const selectGame = result.data.data[0];
      dispatch(addGame({ choosenGame: selectGame }));
      const stageID = selectGame.games_stages[array2.length - 1]?.stage_id
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.games_stages[array2.length - 1]?.stage_id != 4)) {
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
    if (answer == 9 || answer == 11) {
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
                  
                  if (answer == "9"){
                    const stageId = "7"
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
    
                  if (answer == "11"){
                    const stageId = "8"
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

    if (answer == "10"){
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
      className="homeContainerMin bg0302 d-flex flex-column justify-content-center align-items-center"
    >
      <TurnPhone/>
      <Row>
        <ClueBox/>
        <div className="box03">
          <div className="img1Box0302">
              <img className="img03" src={turtle1} alt="" />
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
              <p><span className='tarcoText'>???:</span> Mi nombre es o Tarco o Parso</p>
              <p className='easyText'>¿Cuál es el nombre del hombre tortuga?</p>
            </div>
          </div>
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