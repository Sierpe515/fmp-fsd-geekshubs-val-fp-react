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
import './Stage0502.css'
// import vamp1 from '../../../image/vamp1.png';
import ghost1 from '../../../image/ghost1.png';
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

export const Stage0501 = () => {
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
  const array = gameRdx.choosenGame.games_stages
  const stageID = gameRdx?.choosenGame.games_stages[array?.length - 1]?.stage_id

  useEffect(() => {
    let params = gameRdx.choosenGame.id
    bringLoadGamesById(params, token)
    .then(result => {
      const array2 = result.data.data[0].games_stages
      if (!dataCredentialsRdx?.credentials?.token || (result.data.data[0].games_stages[array2.length - 1]?.stage_id != 9)) {
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
      Cerbero
    </Popover>
  ); 

  const chooseAnswer = (resp) => {
    console.log(resp);
    setAnswer(resp);
  };

  const saveAnswer = () => {

    if (answer == 24 || answer == 25) {
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

                  if (answer == "24"){
                    const stageId = "13";

                    let dataSavedGame = {
                      game_id: result.data.data.game_id,
                      // Meter aquí el stage al que se va a ir con respuesta
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

                  if (answer == "25"){
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

    if (answer == 26){
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
                  const stageId = "12";

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
                      12: "/stage0601",
                      13: "/stage0602",
                      14: "/stage0603",
                  };

                  setTimeout(() => {
                    navigate(stageNavigate[stageId]);
                    console.log(stageNavigate[stageId]);
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
      className="homeContainerMin bg0501 d-flex flex-column justify-content-center align-items-center"
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
            {gameRdx.choosenGame.games_stages[array.length - 2].stage_id == 6 ? (
              <div>
                <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
                <p>Para empezar, Malenia no pude ser legal, porque un legal jamás diría que es otra cosa. Así, Malenia es caótica o neutral. Supongamos que es neutral. Entonces el enunciado de Rennala sería cierto, por lo que Rennala sería legal o neutral, pero Rennala no puede ser neutral porque ya lo es Malenia, de modo que debería ser legal.</p>
                <p>Queda pues que Hunter sea caótico, pero un caótico no puede decir que no es neutral, porque estaría en lo cierto. Por esto mismo Malenia no puede ser neutral.</p>
                <p>Así que Malenia debe ser caótica. Entonces el enunciado de Rennala sería falso, de modo que Rennala tiene que ser neutral. Así que Malenia es caótica, Rennala es neutral y Hunter legal.</p>
              </div>
            ) : ("")}
            {gameRdx.choosenGame.games_stages[array.length - 2].stage_id == 7 ? (
              <div>
                <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
                <p>Belfegor no puede ser caótico, porque entonces su mujer sería legal y, por lo tanto, no neutral. Con Astartea pasa lo mismo. Así ninguno de los dos puede ser tampoco legal. De modo que ambos son neutrales y ambos mienten.</p>
              </div>
            ) : ("")}
            {gameRdx.choosenGame.games_stages[array.length - 2].stage_id == 8 ? (
              <div>
                <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
                <p>Resulta que los cuantro son normales y que los tres enunciados son mentira.</p>
                <p>Ante todo, Margareth tiene que ser neutral, porque si fuera legal su marido sería caótico y ella no habría mentido diciendo que él es legal. Teniendo esto en cuenta, Magnus y Kadala están mintiendo ambos, por lo que ninguno es legal ni son 
                  los dos caóticos. De modo que son también normales.</p>
              </div>
            ) : ("")}
          </div>
          <div className='closeDialogue' onClick={()=> {closeSolution()}}>Close 
            <svg className='closeIcon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
          </div>
        </div>
        <div className="box0403">
          <div className="img1Box0403">
            <OverlayTrigger
                trigger={['hover', 'focus']}
                placement="bottom"
                overlay={popoverHoverFocus1}
              > 
              <img className="img0402" src={ghost1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03 textBox0501">
            <div  className='scrollText font0403'>
              <p className='easyText'>Casi por arte de magia, apareces en una bahía en la que tiempo ha encalló un barco mercante. Se dice entre las 
              gentes de la zona, que la culpa fue de un barco pirata que los arrastró hasta aquí para después masacrarlos y robarles todas sus riquezas.</p>
              <p className='easyText'>Pero los mercaderes no vendieron barata su vida ni sus riquezas. Llevaban una buena cantidad de mercenarios a bordo 
              y se libró una cruenta batalla.</p>
              <p className='easyText'>Finalmente, los corsarios, superiores en número, aniquilaron a toda la tripulación del mercante y robaron todo lo que 
              no estaba pegado al suelo. Excepto tres cofres.</p>
              <p className='easyText'>Te internas en el barco y exploras sus derruidas estancias hasta localizar los famosos cofres, que pese a lo que cabría 
              esperar no son sólo una leyenda. Pero en cuanto te acercas a ellos, un fantasma se materializa entre tú y los cofres:</p>
              <p><span className='cerberoText'>Cerbero:</span> ¡Alto ahí forastero! Antes de que te dispongas a robar estos cofres, sepas que perdí mi vida defendiéndolos. De poco sirvió, advertí 
              a los piratas de que una maldición pesa sobre dos de ellos. No se atrevieron a abrirlos, pero aún así diéronme muerte.</p>
              <p>Si confías lo sufiente en tu ingenio como para arriesgarte a entregar tu vida por codicia, te diré que cada uno tiene una inscripción y, por lo menos 
              una de ellas, es cierta y, por lo menos, otra es falsa. Elige el cofre de acuerdo al dictado de los cofres y hayarás el oro.</p>
              <p>El osado aventurero que abra el cofre correcto, podrá bañarse en oro. Pero tú no estás aquí por eso, no es el oro lo que deseas. Dentro del cofre 
              también encontrarás el mapa con la salida de Oniria. Elige con inteligencia y podrás volver a tu mundo.
              </p>
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
              <div>El oro no está en este cofre</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("24"), setModalShow(true);
              }}
            >
              <img className="chestImg" src={chest3} alt="" />
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer0501Box answerFont0401">
              <div>El oro está en este cofre</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("25"), setModalShow(true);
              }}
            >
              <img className="chestImg" src={chest2} alt="" />
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer0501Box answerFont0401">
              <div>El oro no está en el primer cofre</div>
            </div>
            <div className="homeBtn0501 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("26"), setModalShow(true);
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
