import React, { useEffect, useState } from "react";
import { Col, Container, Row } from "react-bootstrap";
import { useDispatch, useSelector } from "react-redux";
import { characterDetailData } from "../characterSlice";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import {
  bringLoadGamesById,
  bringSelectableGames,
  createNewGame,
  createSavedGame,
  getBadgesByGameId,
} from "../../services/apiCalls";
import Modal from "react-bootstrap/Modal";
import { addGame } from "../gameSlice";
import { addState } from "../inGameSlice";
import { addBadge } from "../badgeSlice";
import './SelectGame.css'
import { TurnPhone } from "../../components/TurnPhone/TurnPhone";

export const SelectGame = () => {
  const characterRedux = useSelector(characterDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = dataCredentialsRdx.credentials.token;
  
  // USEEFFECT TO CHECK IF USER IS LOGGED IN
  useEffect(() => {
      if (!dataCredentialsRdx.credentials.token) {
        navigate("/");
      }
  }, []);

  // SAVE AT REDUX INGAME STATE
  dispatch(addState({ choosenState: false }));
  
  // HOOKS
  const [selectGames, setSelectGames] = useState([]);
  const [selectedGame, setSelectedGame] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [errorDiff, setErrorDiff] = useState("");

  // USEEFFECT TO BRING SELECT GAMES IF USER ARE LOGGED IN
  useEffect(() => {
    if (dataCredentialsRdx?.credentials?.token && selectGames?.length === 0) {
      bringSelectableGames()
        .then((result) => {
          setSelectGames(result?.data);
        })
        .catch((error) => console.log(error));
    }
  }, [selectGames]);

  // CHOOICES FUNCTIONS
  const chooseGame = (game) => {
    setSelectedGame(game);
  };

  const chooseDifficulty = (diff) => {
    setDifficulty(diff);
  };

  // CREATE NEW GAME
  const newGame = () => {
    if (difficulty == "") {
      setErrorDiff("Please, select a difficulty level and press start")
      return
    }

    let dataGame = {
      character_id: characterRedux.choosenCharacter.id,
      select_game_id: selectedGame,
      difficulty: difficulty,
    };

    createNewGame(dataGame, token)
      .then((action) => {
        let dataSavedGame = {
          game_id: action.data.data.id,
          stage_id: 1,
        };
        createSavedGame(dataSavedGame, token)
          .then((result) => {
            let params = result.data.data.game_id;
            bringLoadGamesById(params, token).then((result) => {
              const selectGame = result.data.data[0];
              dispatch(addGame({ choosenGame: selectGame }));

              let params = selectGame.id;
              getBadgesByGameId(params)
                .then((result) => {
                  const selectBadge = result?.data?.data;
                  dispatch(addBadge({ choosenBadge: selectBadge }));
                })
                .catch((error) => console.log(error));
            });
          })
          .catch((error) => console.log(error));
        setTimeout(() => {
          navigate("/opening");
        }, 500);
      })
      .catch((error) => console.log(error));
  };

  // SELECTION DIFFICULTY LEVEL MODAL
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
            Elige el nivel de dificultad y pulsa Start
          </Modal.Title>
        </Modal.Header>
        <Modal.Body className="d-flex justify-content-around">
          <div className={difficulty == "easy" ? ("sGameBtn selectedDif text-center") : ("sGameBtn text-center")} onClick={() => chooseDifficulty("easy")}>Easy</div>
          <div className={difficulty == "medium" ? ("sGameBtn selectedDif text-center") : ("sGameBtn text-center")} onClick={() => chooseDifficulty("medium")}>Medium</div>
          <div className={difficulty == "hard" ? ("sGameBtn selectedDif text-center") : ("sGameBtn text-center")} onClick={() => chooseDifficulty("hard")}>Hard</div>
        </Modal.Body>
          <div className="text-center">{errorDiff == "" ? ("") : (errorDiff)}</div>
        <Modal.Footer className="d-flex justify-content-around">
          <div className="homeBtn" onClick={() => newGame()}>Start Game</div>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container
      fluid
      className="homeContainerMin homeBg d-flex flex-column justify-content-center align-items-center p-0"
    >
      <TurnPhone/>
      <Row>
        <Col>
          <div className='newPjContainer selectContainer d-flex flex-column align-items-center'>
            {selectGames.length > 0 ? (
              <>
                  <div className='text-center actionTitle'>Selecciona un juego</div>
                <div className="selectBox">
                  {selectGames.map((sGames) => {
                    return (
                      <>
                        <div
                          className={sGames.isActive ? "gameBox gameBox1" : "gameBox noGame"}
                          onClick={sGames.isActive ? (
                            () => {
                            chooseGame(sGames.id), setModalShow(true);
                            }
                          ) : ("")}
                          key={sGames.id}
                        >
                          <div>
                            <strong> {sGames.name} </strong>
                          </div>
                        </div>
                        <MyVerticallyCenteredModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </>
                    );
                  })}
                </div>
              </>
            ) : (
              <div className="actionTitle">No hay juegos displonibles</div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
