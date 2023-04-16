
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { characterDetailData } from '../characterSlice'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { bringSelectableGames, createNewGame } from '../../services/apiCalls'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';


export const SelectGame = () => {

    const [selectGames, setSelectGames] = useState([]);
    const characterRedux = useSelector(characterDetailData);
    const dataCredentialsRdx = useSelector(userData);
    const navigate = useNavigate();

    const [selectedGame, setSelectedGame] = useState("");
    const [difficulty, setDifficulty] = useState("");

    let token = dataCredentialsRdx.credentials.token

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
    }}, [selectGames]);

    const chooseGame = (game) => {
        console.log(game);
        setSelectedGame(game)
    }

    const chooseDifficulty = (diff) => {
        console.log(diff);
        setDifficulty(diff)
    }

    const newGame = () => {
        let dataGame = {
            character_id : characterRedux.choosenCharacter.id,
            select_game_id : selectedGame,
            difficulty : difficulty
        }

        createNewGame(dataGame, token)
        .then(
            action => {
                setTimeout(() => {
                    // Añadir Page Stage 1
                    navigate("/stage01");
                  }, 500);
            }

        )
        .catch((error) => console.log(error));
    }

    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
              Chosse difficulty and press start button
              </Modal.Title>
            </Modal.Header>
            <Modal.Body className='d-flex justify-content-around'>
              <div onClick={()=> chooseDifficulty('easy')}>Easy</div>
              <div onClick={()=> chooseDifficulty('medium')}>Medium</div>
              <div onClick={()=> chooseDifficulty('hard')}>Hard</div>
            </Modal.Body>
            <Modal.Footer>
              <div onClick={()=> newGame()}>Start Game</div>
            </Modal.Footer>
          </Modal>
        );
      }
      

        const [modalShow, setModalShow] = React.useState(false);


    return (
        <Container fluid className="homeContainerMin d-flex flex-column justify-content-center align-items-center p-0">
            <Row>
                <Col>
                    {selectGames.length > 0 ? (
                    <>
                    <div className='loadGamesBox'>
                        {selectGames.map((sGames) => {
                        return (
                            <>
                            <div className="loadBox text-center"
                            onClick={()=> {chooseGame(sGames.id), setModalShow(true)}} key={sGames.id}
                            // onClick={() => selected(sGames)} key={sGames.id}
                            >
                            <p>{sGames.id}</p>
                            <p>Game:<strong> {sGames.name} </strong></p> 
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
                    <div className='newGameBtn'><h1>New Game</h1></div>
                    </>
                    ) : (
                    <div className='newGameBtn'><h1>New Game</h1></div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}
