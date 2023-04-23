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

export const Stage02 = () => {

  const gameRdx = useSelector(gameDetailData)
  const gameStageRedux = useSelector(gameStageData);
  const dataCredentialsRdx = useSelector(userData);
  const characterRdx = useSelector(characterDetailData);
  const navigate = useNavigate();
  // const dispatch = useDispatch();

  // const [answer, setAnswer] = useState("");
  const [characterImage, setCharacterImage] = useState([]);
  const [imageId, setImageId] = useState("");

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

  function MyVerticallyCenteredModal(props) {
    return (
      <Modal
        {...props}
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
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
          <Button onClick={()=> {noImage()}}>Confirm</Button>
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
      >
        <Modal.Header closeButton>
          <Modal.Title id="contained-modal-title-vcenter">
            Skin selection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <h4>Centered Modal</h4>
          <p>
          Are you sure to choose this skin? 
          The chosen skin will be applied to your character replacing the previous one
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button onClick={()=> saveImage()}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);
  const [modalShow1, setModalShow1] = React.useState(false);

  return (
    <Container fluid className="homeContainerMin d-flex flex-column justify-content-center">Stage02
      <Row>
          <Col><h2>Select your skin</h2></Col>
          <Col xxl={12} xl={12} md={12} sm={12} className="welcomeBox pjsContainer d-flex align-items-center text-center">
              {characterImage.length > 0 ? (
                  <>
                  <div className='scrollBox'>
                    {characterImage.map((cImages) => {
                      return (
                        <>
                        <div className="pjBox" onClick={() => {chooseImage(cImages.id), setModalShow1(true)}} key={cImages.id}>
                          <img className='pjImage' src={cImages.image} alt={cImages.id} />
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
        <div className='d-flex'>
        <MyVerticallyCenteredModal
          show={modalShow}
          onHide={() => setModalShow(false)}
        />
          <div onClick={()=> {setModalShow(true)}}>Continue without choosing skin</div>
        </div>
      </Row>
    </Container>
  )
}