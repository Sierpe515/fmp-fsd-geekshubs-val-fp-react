import React, { useEffect, useState } from 'react'
import './GameBar.css'
import { getBadgesByGameId } from '../../services/apiCalls';
import { useSelector } from 'react-redux';
import { gameDetailData } from '../../layout/gameSlice';
import { gameStageData } from '../../layout/gameStageSlice';
import { userData } from '../../layout/userSlice';
import { characterDetailData } from '../../layout/characterSlice';

export const GameBar = () => {

  const gameRdx = useSelector(gameDetailData)
  const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);

  const [badge, setBadge] = useState([]);

  let params = gameRdx.choosenGame.id
  useEffect(() => {
    if (badge.length === 0) {
      console.log(gameRdx.choosenGame.id);
      getBadgesByGameId(params)
        .then((result) => {
          console.log(badge)
          console.log("traer badges",result);
          setBadge(result?.data?.data);
          // console.log(result.data);
        })
        .catch((error) => console.log(error));
  }
}, [badge]);

  return (
    <div className='gameBar'>
      <div>
        <h5>Badges</h5>
        {badge.length > 0 ? (
            <>
            <div className='scrollBox'>
              {badge.map((medal) => {
                return (
                  <div className="pjBox" onClick={() => useBadge(medal.id)} key={medal.id}>
                    <img className='badgeImage' src={medal.image} alt={medal.id} />
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
    </div>
  )
}
