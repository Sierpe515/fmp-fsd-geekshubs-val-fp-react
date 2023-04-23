import React, { useEffect, useState } from 'react'
import './GameBar.css'
// import { getBadgesByGameId } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { gameDetailData } from '../../layout/gameSlice';
import { gameStageData } from '../../layout/gameStageSlice';
import { userData } from '../../layout/userSlice';
import { characterDetailData } from '../../layout/characterSlice';
// import madness1 from '../../image/madness1.png'
import { badgeData } from '../../layout/badgeSlice';
import { inGameData } from '../../layout/inGameSlice';

export const GameBar = () => {

  const gameRdx = useSelector(gameDetailData)
  const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const badgeRdx = useSelector(badgeData);
  const inGameRdx = useSelector(inGameData)

  // const [badge, setBadge] = useState([]);

  console.log(inGameRdx);
  console.log(gameRdx.choosenGame.madness);
  console.log(badgeRdx.choosenBadge);
  
  let badge = badgeRdx.choosenBadge
  console.log(badge)

  const inGameState = inGameRdx.choosenState

  // let params = gameRdx.choosenGame.id
  // useEffect(() => {
  //   if (badge.length === 0) {
  //     console.log(gameRdx.choosenGame.id);
  //     getBadgesByGameId(params)
  //       .then((result) => {
  //         console.log("traer badges",result);
  //         setBadge(result?.data?.data);
  //         // console.log(result.data);
  //       })
  //       .catch((error) => console.log(error));
  //   }
  // }, [badge]);

  return (
    <div className='gameBar'>
      {inGameState == true ? (
        <>
        <div className="badgeBox">
        {badge.length > 0 ? (
          <>
            <h5>Badges</h5>
            <div className='scrollBox'>
              {badge.map((medal) => {
                return (
                  <div className="badgeBox" onClick={() => useBadge(medal.id)} key={medal.id}>
                    <img className='badgeImage' src={medal.badge.image} alt={medal.id} />
                    <div>{medal.badge.name}</div>
                  </div>
                );
              })}
            </div>
            </>
          ) : (
            <div><h4>No Badges</h4></div>
        )}
      </div>
      <div className='madnessBox'>
        <h5>Madness</h5>
        {gameRdx.choosenGame.madness == 1 ? <div className='madnessDiv'>
          {/* <img className='madnessImg' src={madness1} alt="" /> */}
          </div> : ""}
        {gameRdx.choosenGame.madness == 2 ? <><div className='madnessDiv'></div><div className='madnessDiv'></div></> : ""}
      </div>
      </>
      ) : ("hola")}
      </div>
      
  )
}
