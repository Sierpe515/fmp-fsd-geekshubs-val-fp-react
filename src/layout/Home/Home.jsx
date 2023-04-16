import React, { useEffect, useState } from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css'
import { useDispatch, useSelector } from 'react-redux';
import { userData } from '../userSlice';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
import { bringUserCharacters } from '../../services/apiCalls';
import Spinner from 'react-bootstrap/Spinner';
import { addCharacter } from '../characterSlice';
import { useNavigate } from 'react-router-dom';

export const Home = () => {

  const [characters, setCharacters] = useState([]);
  const dataCredentialsRdx = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

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
  }}, [characters]);

  const selected = (pj) => {
    dispatch(addCharacter({ choosenCharacter: pj }))

      setTimeout(()=>{
          navigate("/loadGame");
      },500)

  }

  return (
    <Container fluid className="homeContainerMin d-flex flex-column justify-content-center align-items-center p-0">
        <TurnPhone/>
        <Row className="title d-flex justify-content-center">
            <Col xxl={12} xl={12} sm={12} className="my-3">
                <div className='home1Container text-center'><h1>Title</h1></div>
            </Col>
        </Row>
      {dataCredentialsRdx.credentials.token ? (
        <>
        <Row>
          <Col xxl={12} xl={12} sm={12} className='text-center'>
              <h2> Welcome to the dream, {dataCredentialsRdx.credentials.userName}! </h2>
          </Col>
        </Row>
        <Row className="pjsContainer d-flex justify-content-center align-items-center text-center">
          <Col xxl={12} xl={12} md={12} sm={12} className="welcomeBox">
            <h2>Select Character</h2>
              {characters.length > 0 ? (
                  <div className='scrollBox'>
                    {characters.map((pj) => {
                      return (
                        <div className="pjBox" onClick={() => selected(pj)} key={pj.id}>
                          <p>Name:<strong> {pj.name} </strong></p> 
                        </div>
                      );
                    })}
                  </div>
                ) : (
                  <div><Spinner animation="grow" variant="primary" /><h1>New Character</h1></div>
                )}
          </Col>
        </Row>
        </>
      ) : (
        <Row className="appointmentBtn d-flex justify-content-center text-center">
          <div><h1>Register</h1></div>
        </Row>
      )}
        
        <Row className="appointmentBtn d-flex justify-content-center text-center">
          <div><h1>Other</h1></div>
        </Row>
    </Container>
  )
}