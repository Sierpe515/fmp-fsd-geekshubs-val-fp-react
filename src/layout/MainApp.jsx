import './MainApp.css'
import { Body } from './Body/Body';
import { NavBar } from '../components/NavBar/NavBar';
import { GameBar } from '../components/GameBar/GameBar';
import { Container } from 'react-bootstrap';
// import { NavBarSpace } from '../components/NavBarSpace/NavBarSpace';

export const MainApp = () => {
  return (
    <Container fluid className='mainBox p-0'>
      <div>
      <NavBar/>
      </div>
      <div className='d-flex'>
      <GameBar/>
      <Body/>
      </div>
    </Container>
  )
}