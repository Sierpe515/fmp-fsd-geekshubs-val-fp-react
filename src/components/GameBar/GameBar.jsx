import React, { useEffect, useState } from 'react'
import './GameBar.css'
// import { getBadgesByGameId } from '../../services/apiCalls';
import { useDispatch, useSelector } from 'react-redux';
import { gameDetailData } from '../../layout/gameSlice';
import { gameStageData } from '../../layout/gameStageSlice';
import { userData } from '../../layout/userSlice';
import { characterDetailData } from '../../layout/characterSlice';
// import madness1 from '../../image/madness1.png'
import { addBadge, badgeData, selectBadge } from '../../layout/badgeSlice';
import { inGameData } from '../../layout/inGameSlice';
// import framework from '../../image/giphy.gif'
import { useNavigate } from 'react-router-dom';
import { consumeBadgesByGameBadgeId, getBadgesByGameId, updateFinished } from '../../services/apiCalls';
import { changeState } from '../../layout/clueSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const GameBar = () => {

  const gameRdx = useSelector(gameDetailData)
  const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const badgeRdx = useSelector(badgeData);
  const inGameRdx = useSelector(inGameData)
  const navigate = useNavigate();
  const dispatch = useDispatch();

  let token = dataCredentialsRdx.credentials.token;

  // const [badge, setBadge] = useState([]);

  console.log(inGameRdx);
  console.log(gameRdx.choosenGame);
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


  const gameOver = () => {
    console.log("Game Over");
    let dataFinished = { 
      id: gameRdx.choosenGame.id,
      finished: true }
    updateFinished(dataFinished, token)
    .then(console.log("Game Finished"))
    .catch((error) => console.log(error));
    navigate("/gameOver")
  }

  const selectionBadge = (sBadge) => {
    dispatch(selectBadge({ selectedBadge: sBadge}))
    console.log(sBadge);
  }

  const useBadge = () => {
    dispatch(changeState({ clueState: true}))
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
            Consume badge
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to use this badge? This will cause the badge to be consumed.</p>
        </Modal.Body>
        <Modal.Footer>
          {/* CONTINUAR SIN IMAGEN */}
          <Button className='confirmBtn' onClick={()=> {useBadge(), setModalShow(false)}}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <div className='gameBar'>
      {/* <img className='framework' src={framework} alt="" /> */}
      {inGameState == true ? (
        <>
        <div className="badgeBox">
        {badge.length > 0 ? (
          <>
            <div className='selectPjText gameBarMargin'>Badges</div>
            <div className='scrollBox scrollBadge'>
              {badge.map((medal) => {
                return (
                  <>
                  <MyVerticallyCenteredModal
                    show={modalShow}
                    onHide={() => setModalShow(false)}
                  />
                  <div className="badgeBox gameBadge" onClick={() => {selectionBadge(medal.id), setModalShow(true)}} key={medal.id}>
                    <img className='badgeImage' src={medal.badge.image} alt={medal.id} />
                    <div className='badgeName'>{medal.badge.name}</div>
                  </div>
                  </>
                );
              })}
            </div>
            </>
          ) : (
            <div className='badgeBox'>
              <div className='selectPjText gameBarMargin'>Badges</div>
              <div className='noMadness text-center'>No Badges</div>
            </div>
        )}
      </div>
      <div className='madnessBox'>
        <div className='selectPjText gameBarMargin'>Madness</div>
        {gameRdx.choosenGame.madness <= 0 ? <div className='noMadness'>No madness</div> : ""}
        {gameRdx.choosenGame.madness == 1 ? <div className='madnessDiv'>
          {/* <img className='madnessImg' src={madness1} alt="" /> */}
          </div> : "" }
        {gameRdx.choosenGame.madness == 2 ? <><div className='madnessDiv'></div><div className='madnessDiv'></div></> : ""}
        {gameRdx.choosenGame.difficulty == "hard" && gameRdx.choosenGame.madness >= 2 ? gameOver() : ""}
        {gameRdx.choosenGame.madness >= 3 ? gameOver() : ""}
      </div>
      </>
      ) : ("")}
      </div>
      
  )
}
