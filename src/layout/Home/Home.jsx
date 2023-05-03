import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
import { bringUserCharacters, deletePjByUser } from '../../services/apiCalls';
// import Spinner from 'react-bootstrap/Spinner';
import { addCharacter } from '../characterSlice';
import { useNavigate } from 'react-router-dom';
import { addState } from '../inGameSlice';
import  logo4 from '../../image/logo4.png'
import  noLog from '../../image/homeImg.png'
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';

export const Home = () => {

  const [characters, setCharacters] = useState([]);
  const [pjSelected, setPjSelected] = useState([])
  const dataCredentialsRdx = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(addState({ choosenState: false}));

  let token = dataCredentialsRdx.credentials.token;

  // useEffect(() => {
  //   if (dataCredentialsRdx.credentials.token) {
  //     navigate("/");
  //   }
  // }, []);

  useEffect(() => {
  if (dataCredentialsRdx?.credentials?.token && characters.length === 0) {
    bringUserCharacters(dataCredentialsRdx?.credentials.token)
      .then((result) => {
        setCharacters(result.data.data);
        console.log(result);
      })
      .catch((error) => console.log(error));
  }}, []);

  const selected = (pj) => {
    dispatch(addCharacter({ choosenCharacter: pj }))

      setTimeout(()=>{
          navigate("/loadGame");
      },500)
  }

  const deletePj = () => {
    console.log(pjSelected.id);
    let params = pjSelected.id
    deletePjByUser(params, token)
    .then(
      bringUserCharacters(dataCredentialsRdx?.credentials.token)
      .then((result) => {
        setCharacters(result.data.data);
        console.log(result);
      })
      .catch((error) => console.log(error))
    )
    .catch((error) => console.log(error));
  }

  const goNewCharacter = () => {
    setTimeout(()=>{
      navigate("/newCharacter");
    },500)
  }

  const goRegister = () => {
    setTimeout(()=>{
      navigate("/register");
    },500)
  }

  const goLogin = () => {
    setTimeout(()=>{
      navigate("/login");
    },500)
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
            Deletion character
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>
            Are you sure to delete this character? 
          </p>
        </Modal.Body>
        <Modal.Footer>
          <Button className='confirmBtn' onClick={()=> {deletePj(), setModalShow(false)}}>Confirm</Button>
        </Modal.Footer>
      </Modal>
    );
  }

  const [modalShow, setModalShow] = React.useState(false);

  return (
    <Container fluid className="homeContainerMin homeBg d-flex flex-column justify-content-around align-items-center p-0">
        <TurnPhone/>
        <Row className="title d-flex justify-content-center align-items-center">
            <Col xxl={12} xl={12} sm={12} className="my-3 titleBox">
                {/* <div className='home1Container text-center titleText'>Oniria</div> */}
                <img className='logo' src={logo4} alt="" />
            </Col>
        </Row>
      {dataCredentialsRdx.credentials.token ? (
        <>
        <Row>
        <MyVerticallyCenteredModal
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          <Col xxl={12} xl={12} sm={12} className='text-center'>
              <div className='welcomeText'> Welcome to the dream, {dataCredentialsRdx.credentials.userName}! </div>
          </Col>
        </Row>
              <div className='selectPjText'>Select Character</div>
        <Row className="pjsContainer d-flex justify-content-center align-items-center text-center">
          <Col xxl={12} xl={12} md={12} sm={12} className="welcomeBox">
              {characters.length > 0 ? (
                  <>
                  <div className='scrollBox'>
                    {characters.map((pj) => {
                      return (
                        <div className='d-flex flex-column'>
                          <div className="pjBox" onClick={() => selected(pj)} key={pj.id}>
                            <img className='pjImage' src={pj.characters_images.image} alt={pj.characters_images.id} />
                            <p className='pjName'><strong> {pj.name} </strong></p> 
                          </div>
                          <div className='deleteIcon' onClick={() =>{setPjSelected(pj), setModalShow(true)} } key={pj.id}>
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-trash3-fill" viewBox="0 0 16 16">
                              <path d="M11 1.5v1h3.5a.5.5 0 0 1 0 1h-.538l-.853 10.66A2 2 0 0 1 11.115 16h-6.23a2 2 0 0 1-1.994-1.84L2.038 3.5H1.5a.5.5 0 0 1 0-1H5v-1A1.5 1.5 0 0 1 6.5 0h3A1.5 1.5 0 0 1 11 1.5Zm-5 0v1h4v-1a.5.5 0 0 0-.5-.5h-3a.5.5 0 0 0-.5.5ZM4.5 5.029l.5 8.5a.5.5 0 1 0 .998-.06l-.5-8.5a.5.5 0 1 0-.998.06Zm6.53-.528a.5.5 0 0 0-.528.47l-.5 8.5a.5.5 0 0 0 .998.058l.5-8.5a.5.5 0 0 0-.47-.528ZM8 4.5a.5.5 0 0 0-.5.5v8.5a.5.5 0 0 0 1 0V5a.5.5 0 0 0-.5-.5Z"/>
                            </svg>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {/* <div onClick={()=> goNewCharacter()}><h4>New Character</h4></div> */}
                  </>
                ) : (
                  <div className='welcomeText noCharMargin'>No Characters</div>
                )}
          </Col>
        </Row>
        <Row className="d-flex flex-column justify-content-center text-center">
          <div className='homeBtn' onClick={()=> goNewCharacter()}>New Character</div>
        </Row>
        </>
      ) : (
        <>
        <Row>
          <div className='welcomeText'>Please, register or login to play</div>
        </Row>
        <Row className="appointmentBtn d-flex flex-column align-items-center justify-content-center text-center">
          <img className='noLogImg' src={noLog} alt="" />
          <div className='d-flex'>
            <div className='homeBtn marginR' onClick={()=> goRegister()}>Register</div>
            <div className='homeBtn' onClick={()=> goLogin()}>Login</div>
          </div>
        </Row>
        </>
      )}
    </Container>
  )
}