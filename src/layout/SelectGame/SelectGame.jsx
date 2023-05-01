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
import Button from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";
import { addGame } from "../gameSlice";
import { addState } from "../inGameSlice";
import { addBadge } from "../badgeSlice";
import './SelectGame.css'
import { TurnPhone } from "../../components/TurnPhone/TurnPhone";

export const SelectGame = () => {
  const [selectGames, setSelectGames] = useState([]);
  const characterRedux = useSelector(characterDetailData);
  const dataCredentialsRdx = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [selectedGame, setSelectedGame] = useState("");
  const [difficulty, setDifficulty] = useState("");
  const [errorDiff, setErrorDiff] = useState("");

  dispatch(addState({ choosenState: false }));

  let token = dataCredentialsRdx.credentials.token;

  // useEffect(() => {
  //     if (dataCredentialsRdx.credentials.token) {
  //       navigate("/");
  //     }
  //   }, []);

  useEffect(() => {
    if (dataCredentialsRdx?.credentials?.token && selectGames?.length === 0) {
      bringSelectableGames()
        .then((result) => {
          setSelectGames(result?.data);
          console.log(result);
          console.log(selectGames);
          console.log(characterRedux.choosenCharacter.id);
        })
        .catch((error) => console.log(error));
    }
  }, [selectGames]);

  const chooseGame = (game) => {
    console.log(game);
    setSelectedGame(game);
  };

  const chooseDifficulty = (diff) => {
    console.log(diff);
    setDifficulty(diff);
  };

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
        console.log(action);
        let dataSavedGame = {
          game_id: action.data.data.id,
          stage_id: 1,
        };
        console.log(dataSavedGame);
        createSavedGame(dataSavedGame, token)
          .then((result) => {
            console.log(result);
            let params = result.data.data.game_id;
            bringLoadGamesById(params, token).then((result) => {
              console.log(result.data.data[0]);
              const selectGame = result.data.data[0];
              dispatch(addGame({ choosenGame: selectGame }));

              let params = selectGame.id;

              getBadgesByGameId(params)
                .then((result) => {
                  console.log("traer badges", result);
                  const selectBadge = result?.data?.data;
                  dispatch(addBadge({ choosenBadge: selectBadge }));
                  //   console.log(selectBadge);
                  // setBadge(result?.data?.data);
                  // console.log(result.data);
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

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        // dialogClassName="modalOniria"
        className="my-modal"
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Chosse difficulty and press start button
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
        {/* <div className="modalOniria">
        
        </div> */}
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
                  <div className='text-center actionTitle'>Select Game</div>
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
                          // onClick={() => {
                          //   chooseGame(sGames.id), setModalShow(true);
                          // }}
                          key={sGames.id}
                          // onClick={() => selected(sGames)} key={sGames.id}
                        >
                          {/* <div>{sGames.id}</div> */}
                          <div>
                            <strong> {sGames.name} </strong>
                          </div>
                          {/* <p>Saved at:<strong> {load.updated_at} </strong></p>  */}
                        </div>
                        <MyVerticallyCenteredModal
                          show={modalShow}
                          onHide={() => setModalShow(false)}
                        />
                      </>
                    );
                  })}
                </div>
                {/* <div className="logButton">New Game</div> */}
              </>
            ) : (
              <div className="actionTitle">No games available</div>
            )}
          </div>
        </Col>
      </Row>
    </Container>
  );
};
