import React, { useEffect, useState } from 'react'
import { Col, Container, Row } from 'react-bootstrap'
import { useDispatch, useSelector } from 'react-redux'
import { addGame, gameDetailData } from '../../gameSlice'
import { userData } from '../../userSlice'
import { bringCharactersImages, bringLoadGamesById, createSavedGame, updateCharacterImage, updateGameStage } from '../../../services/apiCalls'
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { characterDetailData } from '../../characterSlice'
import { gameStageData } from '../../gameStageSlice'
import { addState } from '../../inGameSlice'
import './Stage02.css'
import garg01 from '../../../image/gargola1.png'
import garg02 from '../../../image/gargola2.png'
import { TurnPhone } from '../../../components/TurnPhone/TurnPhone'

export const Stage02 = () => {

  const gameRdx = useSelector(gameDetailData)
  const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  // const dispatch = useDispatch();

  // const [answer, setAnswer] = useState("");
  const [characterImage, setCharacterImage] = useState([]);
  const [imageId, setImageId] = useState("");

  dispatch(addState({ choosenState: false}))

  let token = dataCredentialsRdx.credentials.token

  useEffect(() => {
    if (characterImage.length === 0) {
      bringCharactersImages()
        .then((result) => {
          setCharacterImage(result?.data);
          console.log(result.data);
        })
        .catch((error) => console.log(error));
  }}, []);

  console.log(gameStageRedux);
  console.log(gameRdx);
  console.log(characterRdx);

  // const chooseAnswer = (resp) => {
  //   console.log(resp);
  //   setAnswer(resp);
  // }

  const chooseImage = (resp) => {
    console.log(resp);
    setImageId(resp);
  }

  // const array = gameRdx.choosenGame.games_stages
  // console.log(gameRdx.choosenGame.games_stages[array.length - 1].id);
  // console.log(characterRdx.choosenCharacter);
  // let dataAnswer = {
  //   id : gameRdx.choosenGame.games_stages[array.length - 1].id,
  //   answer_id : answer
  // }
  // console.log(dataAnswer);

  let dataImage = {
    id : characterRdx.choosenCharacter.id,
    image_id : imageId
  }

  const noImage = () => {
          setTimeout(() => {
            // navigate("/stage02");
            navigate('/stage02.5')
          }, 500);
  }

  const saveImage = () => {
    updateCharacterImage(dataImage, token)
    .then((action => {
      console.log("image updated successfully");
      setTimeout(() => {
        navigate('/stage0205')
      }, 500);
    }))
    .catch((error) => console.log(error))

    // updateGameStage(dataAnswer, token)
    // .then(
    //     result => {
    //       console.log(result);
          
    //       let dataSavedGame = {
    //         game_id : result.data.data.game_id,
    //         // Meter aquí el stage al que se va a ir con respuesta
    //         // stage_id : 2
    //       }

    //       createSavedGame(dataSavedGame, token)
    //         .then(
    //           result => {
    //             console.log(result)
    //             let params = result.data.data.game_id
    //             bringLoadGamesById(params, token)
    //             .then(
    //               result => {
    //                 console.log(result.data.data[0])
    //                 const selectGame = result.data.data[0]
    //                 dispatch(addGame({choosenGameStage: selectGame}))
    //                 console.log(selectGame);
    //               })
    //           }
    //         )
    //         .catch((error) => console.log(error))
    //       setTimeout(() => {
    //         // navigate("/stage02");
    //         navigate('/home')
    //       }, 500);
    //     }
    // )
    // .catch((error) => console.log(error))
  }

  const closeGuide = () => {
    let guideDialogue = document.getElementById('s02GuideBox');
    guideDialogue.classList.add('closeBox')
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
            Confirm chooice
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Are you sure you want to continue without choosing a skin?</p>
        </Modal.Body>
        <Modal.Footer>
          {/* CONTINUAR SIN IMAGEN */}
          <Button className='confirmBtn' onClick={()=> {noImage()}}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  function MyVerticallyCenteredModal1(props) {
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
            Skin selection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {/* <h4>Centered Modal</h4> */}
          <p>
          Are you sure to choose this skin? 
          The chosen skin will be applied to your character replacing the previous one
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='confirmBtn' onClick={()=> saveImage()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);

  return (
    <Container fluid className="homeContainerMin bg02 d-flex flex-column justify-content-center">
      <TurnPhone/>
      <div className='s02GuideBox d-flex' id='s02GuideBox'>
        <div className='s02GuideImg'>{gameRdx.choosenGame.guide == "legal" ? ( <img className='s02GuideLegal' src={garg02} alt="" /> ) : (<img className='s02GuideChaos' src={garg01} alt="" />)}</div>
        <div className='s02GuideText'>
          <div className='scrollText'>
          {gameRdx.choosenGame.guide == "legal" ? (
            <>
            <p>Has hecho bien en elegirme, {characterRdx.choosenCharacter.name}. Shawx es un mentiroso de cuidado.</p>
            <p>Deja que te describa lo que te espera. Oniria es un lugar peligroso al que muy pocos humanos han 
              llegado y aún menos, escapado.</p>
            <p>Debes encontrar la salida antes de que sea demasiado tarde. Avanza por las tierras de Oniria tomando las 
              decisiones correctas y hallarás la salida. Por el contrario, haz caso a los caóticos y no despertarás jamás.</p>
              {gameRdx.choosenGame.difficulty == "easy" ? (
                <>
                <p className='easyText'>MENSAJE DEL JUEGO: &#40;Cada respuesta errónea te otorgará un punto de locura, en el momento en el que acumules tres, 
                  el juego habrá terminado.</p>
                <p className='easyText'>Algunas decisiones te otorgarán insignias, que podrás utilizar más adelante como ayuda ante una decisión difícil.&#41;</p>
                </>
              ) : ("")}
            <p>Por último, me veo en la obligación de decirte que ese aspecto tuyo es demasiado mundano y no pasarás muy 
              desapercibido con él. Eso podría complicar las cosas. Esto es un sueño, te recomiendo que elijas un aspecto 
              más apropiado para la tarea que tienes entre manos.</p>
            </>
          ) : (
            <>
            <p>Has hecho bien en elegirme, {characterRdx.choosenCharacter.name}. Skryx es un mentiroso de cuidado.</p>
            <p>Deja que te describa lo que te espera. Oniria es un lugar genial, perfecto para unas vacaciones. 
              Escucha lo que te digo: relajate antes de querer irte a casa. Me lo agradecerás.</p>
            <p>Encontrar la salida demasiado pronto hará que te arrepientas. Avanza por las tierras de Oniria y disfruta de la 
              experiencia. No sabes como me gustaría estar en tu lugar.</p>
              {gameRdx.choosenGame.difficulty == "easy" ? (
                <>
                <p className='easyText'>MENSAJE DEL JUEGO: &#40;Cada respuesta errónea te otorgará un punto de locura, en el momento en el que acumules tres, 
                  el juego habrá terminado.</p>
                <p className='easyText'>Algunas decisiones te otorgarán insignias, que podrás utilizar más adelante como ayuda ante una decisión difícil.&#41;</p>
                </>
              ) : ("")}
            <p>Por último, no puedo dejar pasar la oportunidad de decirte que ese aspecto tuyo del mundo despierto es genial. Despertará la simpatía de los lugareños. 
              Eso podría incluso mejorar las cosas. La verdad es que no te recomiendo que elijas un aspecto propio del sueño para la tarea que tienes entre manos.
              No haría más que complicarte la vida. Todos los habitantes del reino adoran a los visitantes, pero se centrarán más en ti si pareces un lugareño.</p>
            <p>Aun así estaré atento a tus movimientos por si te metieras en problemas.</p>
            </>
          )}
          </div>
          <div className='closeDialogue' onClick={()=> {closeGuide()}}>Close 
            <svg className='closeIcon' xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-x-circle-fill" viewBox="0 0 16 16">
              <path d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM5.354 4.646a.5.5 0 1 0-.708.708L7.293 8l-2.647 2.646a.5.5 0 0 0 .708.708L8 8.707l2.646 2.647a.5.5 0 0 0 .708-.708L8.707 8l2.647-2.646a.5.5 0 0 0-.708-.708L8 7.293 5.354 4.646z"/>
            </svg>
          </div>
        </div>
      </div>
      <div>
      <Row>
          <Col><div className='selectPjText text-center'>Select your skin</div ></Col>
          <Col xxl={12} xl={12} md={12} sm={12} className="welcomeBox pjsContainer d-flex align-items-center text-center">
              {characterImage.length > 0 ? (
                  <>
                  <div className='scrollBox'>
                    {characterImage.map((cImages) => {
                      return (
                        <>
                        <div className="pjBox" onClick={() => {chooseImage(cImages.id), setModalShow1(true)}} key={cImages.id}>
                          <img className='pjImage s02Img' src={cImages.image} alt={cImages.id} />
                        </div>
                        
                      </>
                      );
                    })}
                    <MyVerticallyCenteredModal1
                        show={modalShow1}
                        onHide={() => setModalShow1(false)}
                        />
                  </div>
                  </>
                ) : (
                  <div><h4>Something went wrong</h4></div>
                )}
          </Col>
      </Row>
      <Row>
        <div className='d-flex flex-column align-items-center'>
          <div className='selectPjText'>Continue without choosing skin</div>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
          <div className='homeBtn' onClick={()=> {setModalShow(true)}}>No skin</div>
        </div>
      </Row>
      </div>
    </Container>
  )
}