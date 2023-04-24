import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { characterDetailData } from '../characterSlice'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { bringLoadGames, getBadgesByGameId } from '../../services/apiCalls'
import './LoadGame.css'
import { addGame, gameDetailData } from '../gameSlice'
import { addState } from '../inGameSlice'
import { addBadge } from '../badgeSlice'


export const LoadGame = () => {

    const [loadGames, setLoadGames] = useState([]);
    const characterRedux = useSelector(characterDetailData);
    const dataCredentialsRdx = useSelector(userData);
    const gameRdx = useSelector(gameDetailData);
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const params = characterRedux.choosenCharacter.id

    dispatch(addState({ choosenState: false}))

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
                        <div className='text-center'><h1>Load Game</h1></div>
                        {loadGames.map((load) => {
                        return (
                            <div className="loadBox text-center" key={load.id}
                            onClick={() => selectedSavedGame(load)} 
                            >
                            <div>Game:<strong> {load.select_games.name} </strong></div> 
                            <div>Saved at:<strong> {load.updated_at} </strong></div> 
                            </div>
                        );
                        })}
                    </div>
                    <div className='newGameBtn' onClick={() => goSelectGame()}><h1>New Game</h1></div>
                    </>
                    ) : (
                    <div className='newGameBtn' onClick={() => goSelectGame()}><h1>New Game</h1></div>
                    )}
                </Col>
            </Row>
        </Container>
    )
}
