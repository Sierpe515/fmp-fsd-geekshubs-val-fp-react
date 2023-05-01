import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Spinner from 'react-bootstrap/Spinner';
// import { ButtonNav } from '../../components/ButtonNav/ButtonNav';
import { bringUsersByAdmin } from "../../services/apiCalls";
import { userData } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { addChoosen } from '../userDetailSlice';
import { addState } from '../inGameSlice';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
// import './UserList.css'

export const UsersList = () => {
  const [users, setUsers] = useState([]);
  const [searchUser, setSearchUser] = useState("");
  const ReduxCredentials = useSelector(userData);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  dispatch(addState({ choosenState: false}))

  const isAdmin = ReduxCredentials.credentials.userRole?.includes("Admin")

  useEffect(() => {
    {isAdmin ? ("") : (navigate('/'))}
  }, []);

  useEffect(() => {

    if (ReduxCredentials?.credentials?.userRole?.includes('Admin')) {
      bringUsersByAdmin(searchUser, ReduxCredentials?.credentials.token)
        .then((result) => {
          setUsers(result.data.data);
          console.log(result.data.data);
        })
        .catch((error) => console.log(error));
    }}, [searchUser, ReduxCredentials]);

  const selected = (persona) => {
    dispatch(addChoosen({ choosenObject: persona }))
    console.log(persona);

    if (ReduxCredentials.credentials.userRole?.includes('Admin')){
        setTimeout(()=>{
            navigate("/userDetail");
        },500)
      }
  };

  return (
    <Container
      fluid
      className="homeContainerMin d-flex flex-column justify-content-between"
    >
      <TurnPhone/>
      <Row className="d-flex justify-content-center">
        <Col xxl={4} xl={5} sm={7} className="my-3">
          <div className="logRegContainer d-flex flex-column justify-content-center align-items-center text-center">
            
            {users.length > 0 ? (
              <div>
                {users.map((persona) => {
                  return (
                    <div className="userBox" onClick={() => selected(persona)} key={persona.id}>
                      <strong>UserName:</strong> {persona.userName}
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
        {/* <ButtonNav route={"View appointment list"} destiny={"/appointments"} /> */}
      </Row>
    </Container>
  );
};
