
import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { characterDetailData } from '../characterSlice'
import { userData } from '../userSlice'
import { useNavigate } from 'react-router-dom'
import { bringSelectableGames } from '../../services/apiCalls'
// import './LoadGame.css'


export const SelectGame = () => {

    const [selectGames, setSelectGames] = useState([]);
    const characterRedux = useSelector(characterDetailData);
    const dataCredentialsRdx = useSelector(userData);
    const navigate = useNavigate();

    const [selectedGame, setSelectedGame] = useState("");
    const [difficulty, setDifficulty] = useState("");

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
                console.log(characterRedux);
            })
            .catch((error) => console.log(error));
    }}, [selectGames]);

    const chooseGame = (game) => {
        console.log(game);
        setSelectedGame(game)
    }

    const newGame = () => {
        let dataGame = {
            characterId : characterRedux.choosenCharacter.id,
            selectGameId : selectedGame,
            difficulty : difficulty
        }
    }

    return (
        <Container fluid className="homeContainerMin d-flex flex-column justify-content-center align-items-center p-0">
            <Row>
                <Col>
                    {selectGames.length > 0 ? (
                    <>
                    <div className='loadGamesBox'>
                        {selectGames.map((sGames) => {
                        return (
                            <div className="loadBox text-center"
                            onClick={()=> chooseGame(sGames.id)} key={sGames.id}
                            // onClick={() => selected(sGames)} key={sGames.id}
                            >
                            <p>{sGames.id}</p>
                            <p>Game:<strong> {sGames.name} </strong></p> 
                            {/* <p>Saved at:<strong> {load.updated_at} </strong></p>  */}
                            </div>
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
