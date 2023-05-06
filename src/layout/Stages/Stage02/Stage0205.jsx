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
import { gameStageData } from "../../gameStageSlice";
import { addBadge } from "../../badgeSlice";
import { addState } from "../../inGameSlice";
import "./Stage0205.css";
import sierpe1 from "../../../image/sierpe1.png";
import sierpe2 from "../../../image/sierpe2.png";
import OverlayTrigger from "react-bootstrap/OverlayTrigger";
import Popover from "react-bootstrap/Popover";
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { changeState } from "../../clueSlice";

export const Stage0205 = () => {

  const gameRdx = useSelector(gameDetailData);
  const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = dataCredentialsRdx.credentials.token;

  
  // USEEFFECT TO CHECK IF USER IS LOGGED IN AND THE CORRECT STAGE
  useEffect(() => {
    // SAVE AT REDUX INGAME STATE
    dispatch(addState({ choosenState: false }));
  
    // SAVE AT REDUX SHOWING CLUE STATE
    dispatch(changeState({ clueState: false }))
    
    let params = gameRdx.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      const selectGame = result.data.data[0];
      dispatch(addGame({ choosenGame: selectGame }));
      const stageID = selectGame.games_stages[array2.length - 1]?.stage_id
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.games_stages[array2.length - 1]?.stage_id != 2)) {
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

  //POPOVERS
  const popoverHoverFocus1 = (
    <Popover
      className="popoverName"
      id="popover-trigger-hover-focus"
      title="Popover bottom"
    >
      Shasha
    </Popover>
  );

  const popoverHoverFocus2 = (
    <Popover
      className="popoverName"
      id="popover-trigger-hover-focus"
      title="Popover bottom"
    >
      Sherboroug
    </Popover>
  );

  // SAVE ANSWER FUNCTION
  const saveAnswer = () => {
    if (answer == 4 || answer == 5) {
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
                    .catch((error) => console.log(error));
                })
                .catch((error) => console.log(error));

              const array = gameRdx.choosenGame.games_stages;
              let dataAnswer = {
                id: gameRdx.choosenGame.games_stages[array.length - 1].id,
                answer_id: answer,
              };
              const stageId = answer;

              updateGameStage(dataAnswer, token)
                .then((result) => {
                  let params = gameRdx.choosenGame.id;
                  getBadgesByGameId(params)
                    .then((result) => {
                      const selectBadge = result?.data?.data;
                      dispatch(addBadge({ choosenBadge: selectBadge }));
                    })
                    .catch((error) => console.log(error));

                  let dataSavedGame = {
                    game_id: result.data.data.game_id,
                    stage_id: stageId,
                  };
                  createSavedGame(dataSavedGame, token)
                    .then((result) => {
                    })
                    .catch((error) => console.log(error));

                  const stageNavigate = {
                    3: "/stage0301",
                    4: "/stage0302",
                    5: "/stage0303",
                  };

                  setTimeout(() => {
                    navigate(stageNavigate[stageId]);
                  }, 500);
                })
                .catch((error) => console.log(error));
            })
            .catch((error) => console.log(error));
        })
        .catch((error) => console.log(error));
    }

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
        const stageId = answer;

        updateGameStage(dataAnswer, token)
          .then((result) => {
            let dataSavedGame = {
              game_id: result.data.data.game_id,
              stage_id: stageId,
            };
            createSavedGame(dataSavedGame, token)
              .then((result) => {
              })
              .catch((error) => console.log(error));

            const stageNavigate = {
              3: "/stage0301",
              4: "/stage0302",
              5: "/stage0303",
            };

            setTimeout(() => {
              navigate(stageNavigate[stageId]);
            }, 500);
          })
          .catch((error) => console.log(error));
      })
      .catch((error) => console.log(error));
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
      className="homeContainerMin bg02 d-flex flex-column justify-content-center align-items-center"
    >
      <TurnPhone/>
      <Row>
        <div className="box02">
          <div className="imgBox02">
            <OverlayTrigger
              trigger={["hover", "focus"]}
              placement="bottom"
              overlay={popoverHoverFocus1}
            >
              <img className="img02" src={sierpe1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox02">
            <div className="scrollText font02">
              <p className="easyText">
                Llegas al primer enclave, un poblado de tonalidad aguamarina
                horadado en la montaña, el cual se intuye que antaño debió de
                ser magestuoso, pero que ahora apenas se mantiene en pie.
              </p>
              <p className="easyText">
                No tardas en dar con dos de sus habitantes a los que tienes
                intención de preguntar sobre tu destino, pero antes debes saber
                si puedes fiarte o no de ellos.
              </p>
              <p className="easyText">
                Sin andarte por las ramas, les preguntas si son legales o
                caóticos, a lo que optienes la siguiente respuesta:
              </p>
              <p><span className='shashaText'>Shasha:</span> O yo soy caótica o Sherboroug es legal.</p>
              <p className="easyText">
                Debes averiguar qué es cada uno para saber si fiarte de sus
                indicaciones.
              </p>
            </div>
          </div>
          <div className="imgBox02">
            <OverlayTrigger
              trigger={["hover", "focus"]}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img02 posImg02" src={sierpe2} alt="" />
            </OverlayTrigger>
          </div>
        </div>
      </Row>
      <Row>
        <div className="btnBox02 d-flex">
          <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <div className="d-flex flex-column justify-content-around align-items-center">
            <div className="answer02Box">Ambos son legales</div>
            <div
              className="homeBtn btnMargin02"
              onClick={() => {
                chooseAnswer("3"), setModalShow(true);
              }}
            >
              RESPUESTA A
            </div>
          </div>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <div className="answer02Box">Ambos son caóticos</div>
            <div
              className="homeBtn btnMargin02"
              onClick={() => {
                chooseAnswer("4"), setModalShow(true);
              }}
            >
              RESPUESTA B
            </div>
          </div>
          <div className="d-flex flex-column justify-content-around align-items-center">
            <div className="answer02Box">
              <div>Shasha es caótica</div>
              <div>Sherboroug, legal</div>
            </div>
            <div
              className="homeBtn btnMargin02"
              onClick={() => {
                chooseAnswer("5"), setModalShow(true);
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
