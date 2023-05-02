import React, { useState } from 'react';
import './ClueBox.css'
import { useDispatch, useSelector } from 'react-redux';
import { changeState, clueData } from '../../layout/clueSlice';
import { addBadge, badgeData } from '../../layout/badgeSlice';
import { consumeBadgesByGameBadgeId, getBadgesByGameId } from '../../services/apiCalls';
import { gameDetailData } from '../../layout/gameSlice';

export const ClueBox = () => {

    // const [showClue, setShowClue] = useState(false)
    const gameRdx = useSelector(gameDetailData);
    const clueRdx = useSelector(clueData);
    const badgeRdx = useSelector(badgeData);
    const dispatch = useDispatch();
    console.log(clueRdx);
    console.log(badgeRdx.selectedBadge);
    console.log(gameRdx);

    const array = gameRdx.choosenGame.games_stages;

    const closeClue = () => {
        // let guideDialogue = document.getElementById('clueBox');
        // guideDialogue.classList.add('closeBox')
        dispatch(changeState({ clueState: false}))
        let body = {id: badgeRdx.selectedBadge}
        consumeBadgesByGameBadgeId(body)
        .then((result) => {
            let params = gameRdx.choosenGame.id;
    
                  getBadgesByGameId(params)
                    .then((result) => {
                      console.log("traer badges", result);
                      const selectBadge = result?.data?.data;
                      dispatch(addBadge({ choosenBadge: selectBadge }));
                      console.log(selectBadge);
                    })
                    .catch((error) => console.log(error))
                })
        .catch((error) => console.log(error));
    }

    return (
        <div className='clue'>
            {clueRdx.clueState == true ? (
                <div className='clueBox'>
                    <div className='clueText text-center'>
                        {gameRdx.choosenGame.games_stages[array.length -1].stage_id == 3 ? ("hola") : ("")}
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
