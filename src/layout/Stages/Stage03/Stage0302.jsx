import React from 'react'
import { Container } from 'react-bootstrap'
import { useDispatch } from 'react-redux';
import { addState } from '../../inGameSlice';

export const Stage0302 = () => {

  const dispatch = useDispatch();

  dispatch(addState({ choosenState: true}))
  return (
    <Container fluid className="homeContainerMin d-flex flex-column justify-content-center">
      Stage0302
    </Container>
  )
}
