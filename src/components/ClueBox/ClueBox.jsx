import React from 'react';
import './ClueBox.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeState, clueData } from '../../layout/clueSlice';
import { gameDetailData } from '../../layout/gameSlice';

export const ClueBox = () => {

    const gameRdx = useSelector(gameDetailData);
    const clueRdx = useSelector(clueData);
    const dispatch = useDispatch();

    const array = gameRdx.choosenGame.games_stages;

    // FUNCTION TO CLOSE CLUE BOX
    const closeClue = () => {
        dispatch(changeState({ clueState: false}))
    }

    return (
        <div className='clue'>
            {clueRdx.clueState == true ? (
                <div className='clueBox'>
                    <div className='clueText text-center'>
                        {/* READING STAGE_ID TO SHOW CORRECT CLUE */}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 3 ? ("Akumato es legal") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 4 ? ("No se puede llegar aquí con badges") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 5 ? ("No se puede llegar aquí con badges") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 6 ? ("Malenia no puede ser legal") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 7 ? ("Belfegor no es caótico") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 8 ? ("Kadala y Magnus mienten") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 9 ? ("Si el oro estuviera en el cofre del medio, todas las inscripciones serían ciertas.") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 10 ? ("Si la incripción del primer y el segundo cofre dicen lo contrario, una debe ser cierta") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 11 ? ("Si la incripción del primer y el segundo cofre dicen lo contrario, una debe ser cierta") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 12 ? ("La información recogida en tu viaje dice que en la estatua VIII te espera la muerte") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 13 ? ("El guardián VII es legal") : ("")}
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 14 ? ("El verdugo respondió que SÍ y la halconera respondió SÍ") : ("")}
                    </div>
                    <div className='closeDialogue' onClick={()=> {closeClue()}}>Close 
                        <svg className='closeIcon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
                        <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
                        </svg>
                    </div>
                </div>
            ) : ("")}
            
        </div>
    )
}
