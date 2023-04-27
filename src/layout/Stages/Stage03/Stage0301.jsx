import React from 'react'
import { Container } from 'react-bootstrap'
import { addState } from '../../inGameSlice'
import { useDispatch } from 'react-redux';
import './Stage0301.css'


export const Stage0301 = () => {

  const dispatch = useDispatch();

  dispatch(addState({ choosenState: true}))
  return (
    <Container fluid className="homeContainerMin bg0301 d-flex flex-column justify-content-center">
      Stage0301
    </Container>
  )
}
