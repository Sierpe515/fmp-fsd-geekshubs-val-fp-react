import React from 'react'
import { Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom';

export const Opening = () => {

    const navigate = useNavigate();

    const goStage01 = () => {
        setTimeout(()=>{
          navigate("/stage01");
        },500)
      }

    return (
        <Container fluid className="homeContainerMin d-flex flex-column justify-content-center align-items-center">
          <Row className='d-flex align-items-center justify-content-center'>
            <div onClick={()=> goStage01()}>Start Game</div>
          </Row>
        </Container>
    )
}