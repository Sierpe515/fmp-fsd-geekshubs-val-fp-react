import React, { useState, useEffect } from "react";
import { InputBox } from "../../components/InputBox/InputBox";
import { validate } from "../../helpers/useful";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import "./Register.css";
import { ButtonSubmit } from "../../components/ButtonSubmit/ButtonSubmit";
import { useNavigate } from "react-router-dom";
import { RegisterMe } from "../../services/apiCalls";
import { useDispatch, useSelector } from "react-redux";
import { addState } from "../inGameSlice";
import regImg from '../../image/regImg.png'
import { TurnPhone } from "../../components/TurnPhone/TurnPhone";
import { userData } from "../userSlice";


export const Register = () => {

  const dataCredentialsRdx = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  
  // SAVE AT REDUX INGAME STATE
  // USEEFFECT TO CHECK IF USER IS LOGGED IN
  useEffect(() => {
    dispatch(addState({ choosenState: false}))
    if (dataCredentialsRdx.credentials.token) {
      navigate("/");
    }
  }, []);
  
  // HOOKS

  const [dataUser, setDataUser] = useState({
    userName: "",
    email: "",
    password: "",
  });

  const [dataUserValidation, setDataUserValidation] = useState({
    userNameValidation: false,
    emailValidation: false,
    passwordValidation: false
  })

  const [dataUserError, setDataUserError] = useState({
    userNameError: "",
    emailError: "",
    passwordError: ""
  });

  const [registerAct, setRegisterAct] = useState(false);

  // HANDLER TO SAVE VALUE AT HOOK

  const newDataUser = (e) => {
    setDataUser((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // USEEFFECT TO VALITADE VALUES AND SHOW ERRORS

  useEffect(() => {
 
    for(let error in dataUserError){
      if(dataUserError[error] !== ""){
        setRegisterAct(false);
        return;
      }
    }

    for(let vacio in dataUser){
      if(dataUser[vacio] === ""){
        setRegisterAct(false);
        return;
      }
    }

    for(let validated in dataUserValidation){
      if(dataUserValidation[validated] === false){
        setRegisterAct(false);
        return;
      }
    }
  
    setRegisterAct(true);
  });

  // FUNCTIONS TO CHECK ERROR
  const checkError = (e) => {
    let error = "";
    let checked = validate(
      e.target.name,
      e.target.value,
      e.target.required
    );

    error = checked.message;

    setDataUserValidation((prevState) => ({
      ...prevState,
      [e.target.name + "Validation"]: checked.validated,
    }));
  };

  const checkError2 = (e) => {
    let error = "";
    let checked = validate(
      e.target.name,
      e.target.value,
      e.target.required
    );

    error = checked.message;

    setDataUserError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  // REGISTER FUNCTION
  const Register = () => {
    RegisterMe(dataUser)
      .then(
        result => {
        setTimeout(() => {
          navigate("/login");
        }, 500)}
      ).catch(error => console.log(error))
  }

  
  return (
    <Container fluid className="homeContainerMin homeBg d-flex flex-column justify-content-center">
      <TurnPhone/>
      <Row className="d-flex flex-column align-items-center justify-content-center">
        <Col xxl={4} xl={5} sm={7} className="my-3">
          <div className="logRegContainer">
            <h5 className="text-center actionTitle">Register</h5>
            <Form className="formContainer">
                <Form.Group as={Col} controlId="formGridUserName" className="formBox">
                  <InputBox
                    className={
                      dataUserError.userNameError === ""
                        ? "inputBasicDesign"
                        : "inputBasicDesign inputErrorDesign"
                    }
                    type={"text"}
                    name={"userName"}
                    placeholder={"Username"}
                    required={true}
                    changeFunction={(e) => {newDataUser(e); checkError(e)}}
                    blurFunction={(e) => {checkError2(e)}}
                  />
                </Form.Group>
                <Form.Text className="errorMessage">{dataUserError.userNameError}</Form.Text>

                <Form.Group as={Col} controlId="formGridEmail" className="formBox">
                  <InputBox
                    className={
                      dataUserError.emailError === ""
                        ? "inputBasicDesign"
                        : "inputBasicDesign inputErrorDesign"
                    }
                    type={"email"}
                    name={"email"}
                    placeholder={"Email"}
                    required={true}
                    changeFunction={(e) => {newDataUser(e); checkError(e)}}
                    blurFunction={(e) => {checkError2(e)}}
                  />
                </Form.Group>
                  <Form.Text className="errorMessage">{dataUserError.emailError}</Form.Text>

                <Form.Group as={Col} controlId="formGridPassword" className="formBox">
                  <InputBox
                    className={
                      dataUserError.passwordError === ""
                        ? "inputBasicDesign"
                        : "inputBasicDesign inputErrorDesign"
                    }
                    type={"password"}
                    name={"password"}
                    placeholder={"Password"}
                    required={true}
                    changeFunction={(e) => {newDataUser(e); checkError(e)}}
                    blurFunction={(e) => {checkError2(e)}}
                  />
                </Form.Group>
                  <Form.Text className="errorMessage">{dataUserError.passwordError}</Form.Text>

              <ButtonSubmit
                className={registerAct ? "registerSendDeac registerSendAct" : "registerSendDeac"}
                onClick={
                  registerAct
                    ? () => {
                      Register()
                      }
                    : () => {}
                }
                name="Register"
              />
            </Form>
          </div>
        </Col>
        <Col>
          <div className="d-flex justify-content-center"><img className="regImg" src={regImg} alt="" /></div>
        </Col>
      </Row>
    </Container>
  );
};
