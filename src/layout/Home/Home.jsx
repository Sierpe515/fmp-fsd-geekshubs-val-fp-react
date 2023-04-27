import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
import { bringUserCharacters } from '../../services/apiCalls';
// import Spinner from 'react-bootstrap/Spinner';
import { addCharacter } from '../characterSlice';
import { useNavigate } from 'react-router-dom';
import { addState } from '../inGameSlice';
import  logo4 from '../../image/logo4.png'
import  noLog from '../../image/homeImg.png'

export const Home = () => {

  const [characters, setCharacters] = useState([]);
  const dataCredentialsRdx = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(addState({ choosenState: false}))

  useEffect(() => {
    if (dataCredentialsRdx.credentials.token) {
      navigate("/");
    }
  }, []);

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
                        <div className="pjBox" onClick={() => selected(pj)} key={pj.id}>
                          <img className='pjImage' src={pj.characters_images.image} alt={pj.characters_images.id} />
                          <p><strong> {pj.name} </strong></p> 
                        </div>
                      );
                    })}
                  </div>
                  {/* <div onClick={()=> goNewCharacter()}><h4>New Character</h4></div> */}
                  </>
                ) : (
                  <div><h4>No Characters</h4></div>
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