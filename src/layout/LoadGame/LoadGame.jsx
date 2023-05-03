import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { characterDetailData } from '../characterSlice'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { bringLoadGames, deletePjByUser, getBadgesByGameId } from '../../services/apiCalls'
import './LoadGame.css'
import { addGame, gameDetailData } from '../gameSlice'
import { addState } from '../inGameSlice'
import { addBadge } from '../badgeSlice'
import { TurnPhone } from '../../components/TurnPhone/TurnPhone'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import dayjs from 'dayjs'
// import lgImg1 from '../../image/lgImg1.png'
// import lgImg2 from '../../image/lgImg2.png'


export const LoadGame = () => {

    const [loadGames, setLoadGames] = useState([]);
    const [selectedLoadGame, setSelectedLoadGame] = useState([]);
    const characterRedux = useSelector(characterDetailData);
    const dataCredentialsRdx = useSelector(userData);
    const gameRdx = useSelector(gameDetailData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = characterRedux.choosenCharacter.id;
    const token = dataCredentialsRdx.credentials.token

    dispatch(addState({ choosenState: false}))

    useEffect(() => {
        if (!dataCredentialsRdx.credentials.token) {
          navigate("/");
        }
      }, []);

    useEffect(() => {
        if (dataCredentialsRdx?.credentials?.token && loadGames.length === 0) {
          bringLoadGames(params, dataCredentialsRdx?.credentials.token)
            .then((result) => {
                setLoadGames(result?.data?.data);
                console.log(result?.data?.data);
                console.log(loadGames);
            })
            .catch((error) => console.log(error));
        }}, []);

    const goSelectGame = () => {
        setTimeout(()=>{
          navigate("/selectGame");
        },500)
    }

    const selectedSavedGame = (selectedGame) => {

        dispatch(addGame({choosenGame: selectedGame}))

        const array = selectedGame.games_stages
        console.log(selectedGame);
        console.log(selectedGame.games_stages[array.length - 1].stage_id);
        const stageId = selectedGame.games_stages[array.length - 1].stage_id

        let params = selectedGame.id

        getBadgesByGameId(params)
            .then((result) => {
              console.log("traer badges",result);
              const selectBadge = result?.data?.data
              dispatch(addBadge({ choosenBadge: selectBadge}))
            //   console.log(selectBadge);
              // setBadge(result?.data?.data);
              // console.log(result.data);
            })
            .catch((error) => console.log(error));
        
        const stageNavigate = {
            '1': "/stage01",
            '2': "/stage02",
            '3': "/stage0301",
            '4': "/stage0302",
            '5': "/stage0303",
            '6': "/stage0401",
            '7': "/stage0402",
            '8': "/stage0403",
            '9': "/stage0501",
            '10': "/stage0502",
            '11': "/stage0503",
        }
        
        setTimeout(()=>{
            navigate(stageNavigate[stageId]);
            console.log(stageNavigate[stageId]);
        },500)
    }

    const deleteLoadGame = () => {
        console.log(selectedLoadGame);
        let params = selectedLoadGame.id
        deletePjByUser(params, token)
        .then(
            bringLoadGames(params, dataCredentialsRdx?.credentials.token)
            .then((result) => {
                setLoadGames(result?.data?.data);
                console.log(result?.data?.data);
                console.log(loadGames);
            })
            .catch((error) => console.log(error)))
        .catch((error) => console.log(error));
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
                Deletion Saved Game
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <p>
                Are you sure to delete saved game? 
              </p>
            </Modal.Body>
            <Modal.Footer>
              <Button className='confirmBtn' onClick={()=> {deleteLoadGame(), setModalShow(false)}}>Confirm</Button>
            </Modal.Footer>
          </Modal>
        );
      }
    
      const [modalShow, setModalShow] = React.useState(false);

    return (
        <Container fluid className="homeContainerMin homeBg d-flex flex-column justify-content-center align-items-center p-0">
            <TurnPhone/>
            <MyVerticallyCenteredModal
                show={modalShow}
                onHide={() => setModalShow(false)}
            />
            <Row>
                <Col className='d-flex'>
                    <div className='newPjContainer loadGamesContainer'>
                        {loadGames.length > 0 ? (
                            <>
                            <div className='loadGamesBox'>
                                <div className='text-center actionTitle'>Load Game</div>
                                <div className='selectPjText'>No se mostrarán los juegos finalizados</div>
                                {loadGames.map((load) => {
                                return (
                                    <div className='loadDiv'>
                                        <div className="loadBox text-center" key={load.id}
                                        onClick={() => selectedSavedGame(load)} 
                                        >
                                            <div>Game:<strong> {load.select_games.name} </strong></div> 
                                            <div>Saved at:<strong> {dayjs(load.updated_at).format("DD MMMM YYYY HH:mm")} </strong></div> 
                                        </div>
                                        <div className='deleteIcon' onClick={() => {setSelectedLoadGame(load), setModalShow(true)}}><svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                                                <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                                            </svg>
                                        </div>
                                    </div>
                                );
                                })}
                            </div>
                            <div className='d-flex justify-content-center'><div className='logButton' onClick={() => goSelectGame()}>New Game</div></div>
                            </>
                        ) : (
                            <div className='d-flex justify-content-center'><div className='logButton' onClick={() => goSelectGame()}>New Game</div></div>
                        )}
                    </div>
                    <div className='lgImgBox'>
                        <div className='lgBgImg'>
                            <div className='lgImg'></div>
                        </div>
                    </div>
                </Col>
            </Row>
        </Container>
    )
}
