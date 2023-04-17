import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { characterDetailData } from '../characterSlice'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { bringLoadGames } from '../../services/apiCalls'
import './LoadGame.css'
import { addGame } from '../gameSlice'


export const LoadGame = () => {

    const [loadGames, setLoadGames] = useState([]);
    const characterRedux = useSelector(characterDetailData);
    const dataCredentialsRdx = useSelector(userData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = characterRedux.choosenCharacter.id

    // useEffect(() => {
    //     if (dataCredentialsRdx.credentials.token) {
    //       navigate("/");
    //     }
    //   }, []);

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

        const stageNavigate = {
            '1': "/stage01",
            '2': "/stage02"
        }

        setTimeout(()=>{
            navigate(stageNavigate[stageId]);
            console.log(stageNavigate[stageId]);
        },500)
    }

    return (
        <Container fluid className="homeContainerMin d-flex flex-column justify-content-center align-items-center p-0">
            <Row>
                <Col>
                    {loadGames.length > 0 ? (
                    <>
                    <div className='loadGamesBox'>
                        {loadGames.map((load) => {
                        return (
                            <div className="loadBox text-center" key={load.id}
                            onClick={() => selectedSavedGame(load)} 
                            >
                            <p>Game:<strong> {load.select_games.name} </strong></p> 
                            <p>Saved at:<strong> {load.updated_at} </strong></p> 
                            </div>
                        );
                        })}
                    </div>
                    <div className='newGameBtn' onClick={() => goSelectGame()}><h1>Select Game</h1></div>
                    </>
                    ) : (
                    <div className='newGameBtn' onClick={() => goSelectGame()}><h1>Select Game</h1></div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}
