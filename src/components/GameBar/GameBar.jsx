import React from 'react'
import './GameBar.css'
import { useDispatch, useSelector } from 'react-redux';
import { gameDetailData } from '../../layout/gameSlice';
import { userData } from '../../layout/userSlice';
import { addBadge, badgeData, selectBadge } from '../../layout/badgeSlice';
import { inGameData } from '../../layout/inGameSlice';
import { useNavigate } from 'react-router-dom';
import { consumeBadgesByGameBadgeId, getBadgesByGameId, updateFinished } from '../../services/apiCalls';
import { changeState } from '../../layout/clueSlice';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const GameBar = () => {

  const gameRdx = useSelector(gameDetailData)
  const dataCredentialsRdx = useSelector(userData);
  const badgeRdx = useSelector(badgeData);
  const inGameRdx = useSelector(inGameData)
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  let token = dataCredentialsRdx.credentials.token;  
  let badge = badgeRdx.choosenBadge
  
  const inGameState = inGameRdx.choosenState

  const [modalShow, setModalShow] = React.useState(false);

  // FUNCTION TO RECOGNIZE GAME IS OVER
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

  // FUNTION TO SELECT BADGE AND SAVE IN REDUX
  const selectionBadge = (sBadge) => {
    dispatch(selectBadge({ selectedBadge: sBadge}))
    console.log(sBadge);
  }

  // FUNTION TO USE BADGE
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

  // MODAL CONTENT TO USE BADGE
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
          <Button className='confirmBtn' onClick={()=> {useBadge(), setModalShow(false)}}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  return (
    <div className='gameBar'>
      {inGameState == true ? (
        <>
        <div className="badgeBox">
        {/* TERNARIA TO READ BADGES TO REDUX */}
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
          {gameRdx.choosenGame.madness == 1 ? <div className='madnessDiv'></div> : "" }
          {gameRdx.choosenGame.madness == 2 ? <><div className='madnessDiv'></div><div className='madnessDiv'></div></> : ""}
          {gameRdx.choosenGame.difficulty == "hard" && gameRdx.choosenGame.madness >= 2 ? gameOver() : ""}
          {gameRdx.choosenGame.madness >= 3 ? gameOver() : ""}
        </div>
        </>
      ) : ("")}
      </div>
      
  )
}
