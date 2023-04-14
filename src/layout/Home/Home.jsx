import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import './Home.css'
import { useSelector } from 'react-redux';
import { userData } from '../userSlice';
import GirarMovil from '../../image/gira el movil.png'
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';

export const Home = () => {


//   const dataCredentialsRdx = useSelector(userData);


  return (
    <Container fluid className="homeContainerMin d-flex flex-column">
        <TurnPhone/>
        {/* <Row className="d-flex justify-content-center">
            <Col xxl={5} xl={5} sm={10} className="my-3">
                <img src={ Z3 } alt="Z3" className='z3' />
                <div className='home1Container'></div>
            </Col>
        </Row>
      {dataCredentialsRdx.credentials.token ? (
        <Row className="welcomeContainer d-flex justify-content-center text-center">
          <Col xxl={4} xl={5} md={7} sm={7} className="welcomeBox">
              <h1> Happy to see you again, <br/><img src={iconZ2} alt="" /> {dataCredentialsRdx.credentials.userName}! <img src={iconZ1} alt="" /></h1>
          </Col>
        </Row>
      ) : ("")}
        
        <Row className="appointmentBtn d-flex justify-content-center">
          <ButtonNav route={"Book Appointment"} destiny={"/newAppointment"}/>
        </Row> */}
    </Container>
  )
}