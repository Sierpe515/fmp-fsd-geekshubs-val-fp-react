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
import './Stage0401.css'
import vamp1 from '../../../image/vamp1.png';
import vamp12 from '../../../image/vamp12.png';
import vamp3 from '../../../image/vamp3.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { ClueBox } from "../../../components/ClueBox/ClueBox";
import { changeState } from "../../clueSlice";

export const Stage0401 = () => {
  const gameRdx = useSelector(gameDetailData);
  // const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  dispatch(addState({ choosenState: true}))
  dispatch(changeState({ clueState: false }))

  const [answer, setAnswer] = useState("");
  const [characterImage, setCharacterImage] = useState([]);

  let token = dataCredentialsRdx.credentials.token;
  const array = gameRdx.choosenGame.games_stages
  const stageID = gameRdx?.choosenGame.games_stages[array?.length - 1]?.stage_id

  useEffect(() => {
    let params = gameRdx.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      if (!dataCredentialsRdx?.credentials?.token || (result.data.data[0].games_stages[array2.length - 1]?.stage_id != 6)) {
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
      Malenia / Rennala
    </Popover>
  );
  
  const popoverHoverFocus2 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Cazador
    </Popover>
  ); 

  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  };

  const saveAnswer = () => {

    if (answer == 15 || answer == 17) {
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


                  if (answer == "15"){
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
                      // navigate("/stage02");
                      navigate(stageNavigate[stageId]);
                      console.log(stageNavigate[stageId]);
                    }, 500);
                  }

                  if (answer == "17"){
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
                      // navigate("/stage02");
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

    if (answer == 16){
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
                  const stageId = "9";

                  let dataSavedGame = {
                    game_id: result.data.data.game_id,
                    stage_id: stageId,
                  };

                  console.log(dataSavedGame);

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

  const showSolution = () => {
    let solution = document.getElementById('solutionBox');
    solution.classList.add('showSolBox')
  }

  const closeSolution = () => {
    let solution = document.getElementById('solutionBox');
    solution.classList.remove('showSolBox')
  }

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
  // const array = gameRdx.choosenGame.games_stages;

  return (
    <Container
      fluid
      className="homeContainerMin bg0401 d-flex flex-column justify-content-center align-items-center"
    >
      <TurnPhone/>
      <Row>
        <ClueBox/>
        <div className="solution" onClick={() => {showSolution()}}>
          <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-question-circle-fill" viewBox="0 0 16 16">
            <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.496 6.033h.825c.138 0 .248-.113.266-.25.09-.656.54-1.134 1.342-1.134.686 0 1.314.343 1.314 1.168 0 .635-.374.927-.965 1.371-.673.489-1.206 1.06-1.168 1.987l.003.217a.25.25 0 0 0 .25.246h.811a.25.25 0 0 0 .25-.25v-.105c0-.718.273-.927 1.01-1.486.609-.463 1.244-.977 1.244-2.056 0-1.511-1.276-2.241-2.673-2.241-1.267 0-2.655.59-2.75 2.286a.237.237 0 0 0 .241.247zm2.325 6.443c.61 0 1.029-.394 1.029-.927 0-.552-.42-.94-1.029-.94-.584 0-1.009.388-1.009.94 0 .533.425.927 1.01.927z"/>
          </svg>
        </div>
        <div className="solutionBox" id="solutionBox">
          <div className="solutionText text-center">
            {gameRdx.choosenGame.games_stages[array.length - 2].stage_id == 3 ? (
              <div>
                <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
                <p>Lo primero que hay que observar es que Gaara y Akumato son de tipos opuestos, puesto que Akumato contradice a Gaara. Así pues, de entre los dos, uno es legal y el otro, caótico. Pero si Kyuroo fuera legal, entonces habría dos legales, y por tanto Kyuroo no hubiese mentido diciendo que había solamente uno. 
                  Por otra parte, si Kuyroo fuera caótico, entonces sería cierto que sólo había un legal; pero entonces Kuyroo, siendo caótico, no podría haber dicho una verdad. 
                  Por lo tanto, Kuyroo no pudo haber dicho que sólo había un caballero. Así Gaara mintió al decir lo que había dicho Kyuroo, y de este modo Gaara es caótico y Akumato legal.
                </p>
              </div>
            ) : ("")}
            {gameRdx.choosenGame.games_stages[array.length - 2].stage_id == 4 ? (
              <div>
                <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
                <p>Este problema tenía una pequeña trampa en el enunciado. La clave estaba cuando se mencionó que el Hombre tortuga simulaba estar perezosamente recostado. De ahí que simular es algo que haría un caótico, no un legal. Por lo tanto, ambas afirmaciones disyuntivas deben de ser falsas, por lo que su nombre es Tarso.</p>
              </div>
            ) : ("")}
            {gameRdx.choosenGame.games_stages[array.length - 2].stage_id == 5 ? (
              <div>
                <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
                <p>Para empezar, Gulates tiene que ser caótico, porque un legal jamás haría esa afirmación. De ahí que al menos hay un legal entre los tres. Ahora, supogamos que Pestilencio es caótico. Entonces Gulates y Pestilencio serían ambos caóticos, y Hamburno legal, lo que significaría que el enunciado de Pestilencio era cierto. 
                  Pero eso no podría ser si Pestilencio fuera caótico. Por tanto, Pestilencio tiene que ser legal.</p>
                <p>Ahora sabemos que Gulates es caótico y Pestilencio es legal, por lo que siguiendo el enunciado de Pestilencio, que es cierto, Hambruno ha de ser caótico. Por lo tanto, sólo se puede confiar en Pestilencio.</p>
              </div>
            ) : ("")}
          </div>
          <div className='closeDialogue' onClick={()=> {closeSolution()}}>Close 
            <svg className='closeIcon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
          </div>
        </div>
        <div className="box03">
          <div className="img1Box03">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0401" src={vamp12} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03">
            <div  className='scrollText font0401'>
              <p className='easyText'>Durante tu viaje, te informaron de que para encontrar la salida de Oniria, tendrías que atravesar 
              Transilsueño. Siguiendo las instrucciones de Akumato, atravesando un lúgubre y tenebroso camino bañado de una oscuridad incesante y 
              envuelto entre árboles desnudos y zarzas, no tardaste en llegar</p>
              <p className='easyText'>Una de las peculiaridades de esta tierra es que la habitan, no sólo caóticos y legales, sino 
              tambien neutrales, que a veces dicen la verdad y otras mienten.</p>
              <p className='easyText'>No tardas en toparte con una variopinta escena; un envejecido cazador de vampiros tratando de 
              dar caza a una vampiresa reina, que lleva en su vientre una aberración, y su escolta. Ambas se burlan entre carcajadas 
              del, torpe y ya lento de reflejos, cazador.</p>
              <p className='easyText'>De una forma casi surrealista, detienen la escena para centrarse en ti y, que sin necesidad siquiera de 
              preguntarles, te dicen:</p>
              <p><span className='maleniaText'>Malenia:</span> Yo soy neutral.</p>
              <p><span className='rennalaText'>Rennala:</span> Eso es cierto.</p>
              <p><span className='hunterText'>Hunter:</span> Yo no soy neutral</p>
              <p className='easyText'>De algún modo, tienes la certeza de que entre ellos cada uno es de una clase diferente. ¿Pero qué es cada 
              uno? Deberías intentar averiguarlo para poder preguntar al legal por la ruta que debes seguir a continuación.</p>
            </div>
          </div>
          <div className="img2Box03">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img03 posImg03" src={vamp3} alt="" />
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
              <div>Malenia: Legal</div>
              <div>Rennala: Neutral</div>
              <div>Cazador: Caótico</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("15"), setModalShow(true);
              }}
            >
              RESPUESTA A
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer03Box answerFont0401">
              <div>Malenia: Caótica</div>
              <div>Rennala: Neutral</div>
              <div>Cazador: Legal</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("16"), setModalShow(true);
              }}
            >
              RESPUESTA B
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer03Box answerFont0401">
              <div>Malenia: Neutral</div>
              <div>Rennala: Caótica</div>
              <div>Cazador: Legal</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("17"), setModalShow(true);
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
