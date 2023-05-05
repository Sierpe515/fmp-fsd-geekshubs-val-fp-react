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
import './Stage0301.css'
import diablo1 from '../../../image/diablo1.png';
import diablo2 from '../../../image/diablo2.png';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import { TurnPhone } from "../../../components/TurnPhone/TurnPhone";
import { ClueBox } from "../../../components/ClueBox/ClueBox";
import { changeState } from "../../clueSlice";

export const Stage0301 = () => {
  const gameRdx = useSelector(gameDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = dataCredentialsRdx.credentials.token;

  // SAVE AT REDUX INGAME STATE
  dispatch(addState({ choosenState: true }))

  // SAVE AT REDUX CLUE SHOW STATE
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
      if (!dataCredentialsRdx?.credentials?.token || (selectGame.games_stages[array2.length - 1]?.stage_id != 3)) {
        const stageNavigate = {null: "/",1: "/stage01",2: "/stage02",3: "/stage0301",4: "/stage0302",5: "/stage0303",6: "/stage0401",7: "/stage0402",8: "/stage0403",9: "/stage0501",10: "/stage0502",11: "/stage0503",12: "/stage0601",13: "/stage0602",14: "/stage0603",};
        navigate(stageNavigate[stageID]);
      }})
      .catch((error) => console.log(error))
  }, []);

  //POPOVERS
  const popoverHoverFocus1 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Gaara
    </Popover>
  );  
  const popoverHoverFocus2 = (
    <Popover className="popoverName" id="popover-trigger-hover-focus" title="Popover bottom">
      Akumato
    </Popover>
  ); 
  
  // ANSWER HOOK
  const [answer, setAnswer] = useState("");
  
  const chooseAnswer = (resp) => {
    setAnswer(resp);
  };

  // SEND ANSWER FUNCTIONS
  const saveAnswer = () => {
    if (answer == 6 || answer == 7) {
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
                  let params = gameRdx.choosenGame.id
                  
                  if (answer == "6"){
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
    
                  if (answer == "7"){
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

    if (answer == "8"){
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

  // SHOWING AND CLOSING SOLUTIONS DIV

  const showSolution = () => {
    let solution = document.getElementById('solutionBox');
    solution.classList.add('showSolBox')
  }

  const closeSolution = () => {
    let solution = document.getElementById('solutionBox');
    solution.classList.remove('showSolBox')
  }

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
      className="homeContainerMin bg0301 d-flex flex-column justify-content-center align-items-center"
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
            <p>¡Lo has hecho bien! Pero vamos a revisar la respuesta.</p>
            <p>Este problema es una buena introducción a la lógica disyuntiva. Puesto que dados dos enunciados, significa que al menos un enunciado es cierto. Si el enunciado fuera falso, entonces ambos enunciados lo serían. En el caso del problema que has superado con éxito, supongase que Shasha es caótica, entonces su enunciado tiene que ser falso. Eso querría decir que ni es cierto que ella sea caótica, ni que B sea Legal. Por lo tanto se diría que Shasha no es caótica, lo que sería una contradicción. Por lo que tiene que ser legal.</p>
            <p>Habiendo establecido que Shasha es legal, su enunciado tiene que ser cierto. De las dos posibilidades del enunciado, sólo puede ser cierta la segunda. Por tanto, Sherboroug es caótico.</p>
            <p>De este modo, Shasha y Sherboroug son ambos legales.</p>
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
              <img className="img03" src={diablo1} alt="" />
            </OverlayTrigger>
          </div>
          <div className="textBox03">
            <div  className='scrollText font03'>
              <p className='easyText'>Tras las indicaciones recibidas por Sasha, y de esa forma que sólo acontece en los 
              sueños, desembarcas en Izakura. Una metrópoli super poblada con ambientación oriental.</p>
              <p className='easyText'>Deambulas por sus calles, anonadado por todo cuanto te rodea; su arquitectura, sus 
              gentes, su cultura y sus extrañas costumbres, que observas en curiosas escenas como un padre que lleva a su 
              retoño con correa.</p>
              <p className='easyText'>En un momento dado, decides dejar de caminar sin rumbo y te acercas a un grupo de 
              tres individuos -supones que debían ser onis- que discuten acaloradamente. Lo que por alguna razón te parece una idea estupenda. Y le preguntas 
              a uno de ellos:</p>
              <p><span className='youText'>Tú: </span> ¿Cuántos de vosotros tres sois legales?</p>
              <p className='easyText'>El primero de ellos, de nombre Kuyroo, responde en un idioma que te resulta desconocido e inteligible. Pero uno de ellos, Gaara, 
              te hace el favor de intervenir:</p>
              <p><span className='gaaraText'>Gaara:</span> Ha dicho que hay un legal entre nosotros.</p>
              <p className='easyText'>Con el mismo tono bronco de antes, el otro demonio replica:</p>
              <p><span className='akumatoText'>Akumato:</span> No creas nada de lo que diga Gaara, está mintiendo.</p>
              <p className='easyText'>¿Qué son Gaara y Akumato?</p>
            </div>
          </div>
          <div className="img2Box03">
            <OverlayTrigger
              trigger={['hover', 'focus']}
              placement="bottom"
              overlay={popoverHoverFocus2}
            >
              <img className="img03 posImg03" src={diablo2} alt="" />
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
            <div className="answer03Box">Ambos son legales</div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("6"), setModalShow(true);
              }}
            >
              RESPUESTA A
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer03Box">Ambos son caóticos</div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("7"), setModalShow(true);
              }}
            >
              RESPUESTA B
            </div>
          </div>
          <div className="a03Box d-flex flex-column justify-content-around align-items-center">
            <div className="answer03Box">
              <div>Gaara es caótico</div>
              <div>Akumato, legal</div>
            </div>
            <div className="homeBtn03 btnMargin02 fontBtn0301"
              onClick={() => {
                chooseAnswer("8"), setModalShow(true);
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
