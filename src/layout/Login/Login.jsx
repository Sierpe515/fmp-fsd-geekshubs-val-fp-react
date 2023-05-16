import React, { useState, useEffect } from "react";
import Form from "react-bootstrap/Form";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import "./Login.css";
import "../../components/InputBox/InputBox.css"
import { useDispatch, useSelector } from "react-redux";
import { login, userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { validate } from "../../helpers/useful";
import { logMe } from "../../services/apiCalls";
import { TurnPhone } from "../../components/TurnPhone/TurnPhone";
import { addState } from "../inGameSlice";
import logImg from "../../image/logImg.png";
import wellImg from "../../image/wellImg.png";

export const Login = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const credentialsRdx = useSelector(userData);

  // SAVE AT REDUX INGAME STATE
  // USEEFFECT TO CHECK IF USER IS LOGGED IN
  useEffect(() => {
    dispatch(addState({ choosenState: false}))
    if (credentialsRdx.credentials.token) {
      navigate("/");
    }
  }, []);

  // HOOKS
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });

  const [credentialsError, setCredentialsError] = useState({
    emailError: "",
    passwordError: "",
    messageButton: ""
  });

  const [welcome, setWelcome] = useState("");
  const [btnMessage, setBtnMessage] = useState("")

  // HANDLER TO SAVE VALUE AT HOOK
  const newCredentials = (e) => {
    setCredentials((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // FUNCTION TO CHECK ERROR AT VALIDATION
  const checkError2 = (e) => {
    let error = "";
    let checked = validate(
      e.target.name,
      e.target.value,
      e.target.required
    );

    error = checked.message;

    setCredentialsError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  // LOGIN FUNCTION
  const logIn = () => {

    logMe(credentials)
      .then(
          respuesta => {
            let dateBackend = {
              token: respuesta.data.token,
              userName: respuesta.data.user.userName,
              userRole: respuesta.data.user.role.privilege
            }
            
            dispatch(login({credentials: dateBackend}));
            
              setWelcome(`Welcome again, ${dateBackend.userName}`);
              setTimeout(() => {
                navigate("/");
              }, 3000);
          }
      )
      .catch(error => {
        console.log(error)
        setBtnMessage("Email or password invalid")
      })
  }

  return (
    <Container fluid className="homeContainerMin homeBg d-flex flex-column justify-content-center">
      <TurnPhone/>
      <Row className="d-flex flex-column align-items-center justify-content-center">
        <Col xxl={4} xl={5} sm={7} className="my-3">
          <div className="logRegContainer">
            <h5 className="text-center actionTitle">Login</h5>
            <Form className="formContainer">
              {welcome !== "" ? (
                <div className="welcomeBox1 d-flex flex-column align-items-center justify-content-center text-center">
                  <div className="welcomeText">{welcome}</div>
                  <div className="d-flex justify-content-center"><img className="regImg" src={wellImg} alt="" /></div>
                </div>
              ) : (
                <>
              <Form.Group className="mb-3 formBox" controlId="formBasicEmail" >
                <Form.Control
                  className={
                    credentialsError.emailError === ""
                      ? "inputBasicDesign"
                      : "inputBasicDesign inputErrorDesign"
                  }
                  type="email"
                  name="email"
                  placeholder="Email"
                  onChange={(e) => newCredentials(e)}
                  onBlur={(e) => checkError2(e)}
                />
              </Form.Group>
                <Form.Text className="errorMessage">{credentialsError.emailError}</Form.Text>
              <Form.Group className="mb-3 formBox" controlId="formBasicPassword">
                <Form.Control
                  className={
                    credentialsError.passwordError === ""
                      ? "inputBasicDesign"
                      : "inputBasicDesign inputErrorDesign"
                  }
                  type="password"
                  name="password"
                  placeholder="Password"
                  onChange={(e) => newCredentials(e)}
                  onBlur={(e) => checkError2(e)}
                />
              </Form.Group>
                <Form.Text className="errorMessage">{credentialsError.passwordError}</Form.Text>
              <Form.Text className="errorMessage">{btnMessage}</Form.Text>
              <div className="logButton" name="button" onClick={()=> logIn()}>Login</div>
              <div className="d-flex justify-content-center"><img className="regImg" src={logImg} alt="" /></div>
              </>
              )}
            </Form>
          </div>
        </Col>
        {/* <Col>
          
        </Col> */}
      </Row>
    </Container>
  );
};
