import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
import { bringStages } from "../../services/apiCalls";
import { userData } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
// import { addChoosen } from '../userDetailSlice';
import { addState } from '../inGameSlice';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
import { addChoosenStage } from '../stageSlice';
// import './UserList.css'

export const StagesList = () => {
  const [stages, setStages] = useState([]);
//   const [searchUser, setSearchUser] = useState("");
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isAdmin = ReduxCredentials.credentials.userRole?.includes("Admin")

  // SAVE AT REDUX INGAME STATE
  // USEEFFECT TO CHECK ADMIN ROLE
  useEffect(() => {
    dispatch(addState({ choosenState: false}))
    {isAdmin ? ("") : (navigate('/'))}
  }, []);

  //USEEFFECT TO BRING USERS LIST
  useEffect(() => {
    if (ReduxCredentials?.credentials?.userRole?.includes('Admin')) {
      bringStages()
        .then((result) => {
          setStages(result.data);
        console.log(result.data);
        })
        .catch((error) => console.log(error));
    }}, [ReduxCredentials]);

  // SELECTION STAGE
  const selectedSt = (etapa) => {
    dispatch(addChoosenStage({ choosenStage: etapa }))
    if (ReduxCredentials.credentials.userRole?.includes('Admin')){
        setTimeout(()=>{
            navigate("/stagesDetail");
        },500)
        console.log(etapa);
      }
  };

  return (
    <Container
      fluid
      className="homeContainerMin homeBg d-flex flex-column justify-content-center"
    >
      <TurnPhone/>
      <Row className="d-flex justify-content-center">
        <Col xxl={6} xl={7} sm={10} className="my-3">
          <div className="newPjContainer loadGamesContainer d-flex flex-column justify-content-center align-items-center text-center">      
            {stages.length > 0 ? (
              <div>
                {stages.map((etapa) => {
                  return (
                    <div className="userListBox" onClick={() => selectedSt(etapa)} key={etapa.id}>
                      id: <strong>{etapa.id}</strong> name: <strong>{etapa.name}</strong> code <strong>{etapa.name}</strong>
                    </div>
                  );
                })}
              </div>
            ) : (
              <div><Spinner animation="grow" variant="primary" /><h1>LOADING</h1></div>
            )}
          </div>
        </Col>
      </Row>
      <Row className="d-flex justify-content-center">
      </Row>
    </Container>
  );
};