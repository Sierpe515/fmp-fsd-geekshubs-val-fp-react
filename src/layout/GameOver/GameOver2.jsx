import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addState } from '../inGameSlice';

export const GameOver2 = () => {

  const dispatch = useDispatch();

  dispatch(addState({ choosenState: false}))

  return (
    <Container fluid className="homeContainerMin d-flex flex-column justify-content-center align-items-center">
      Game Over2
    </Container>
  )
}