import React, { useState, useEffect } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import {
  getProfile,
  updateBirthdateProfile,
  updateEmailProfile,
  updateNameProfile,
  updateSurnameProfile,
  updateUserNameProfile,
} from "../../services/apiCalls";
import { userData } from "../userSlice";
import { useDispatch, useSelector } from "react-redux";
import dayjs from "dayjs";
import updIcon from "../../image/update.png";
import cancelUpdIcon from "../../image/cancel update.png";
import "./Profile.css";
import { useNavigate } from "react-router-dom";
import { InputBox } from "../../components/InputBox/InputBox";
import { validate } from "../../helpers/useful";
import { addState } from "../inGameSlice";
import Calendar from "react-calendar";
import Modal from "react-bootstrap/Modal";
import Button from "react-bootstrap/Button";
import { TurnPhone } from "../../components/TurnPhone/TurnPhone";

export const Profile = () => {
  const ReduxCredentials = useSelector(userData);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  let token = ReduxCredentials.credentials.token;

  // SAVE AT REDUX INGAME STATE
  dispatch(addState({ choosenState: false }));

  // USEEFFECT TO CHECK IF USER IS LOGGED IN
  useEffect(() => {
    if (!ReduxCredentials.credentials.token) {
      navigate("/");
    }
  }, []);

  // HOOKS TO HIDE INPUTS
  const [hide, setHide] = useState(false);
  const [hide1, setHide1] = useState(false);
  const [hide2, setHide2] = useState(false);
  const [hide3, setHide3] = useState(false);
  const [hide4, setHide4] = useState(false);

  // HOOK TO VALIDATE VALUES
  const [registerAct, setRegisterAct] = useState(false);

  // USER VALUES HOOK
  const [users, setUsers] = useState({
    userName: "",
    name: "",
    surname: "",
    email: "",
    birthdate: "",
  });

  // DATE HOOK
  const [bDay, setBDay] = useState(new Date());

  // FUNCTION TO BRING PROFILE DATA
  useEffect(() => {
    if (users.name === "") {
      getProfile(ReduxCredentials.credentials.token)
        .then((result) => {
          setUsers({
            userName: result.data.data.userName,
            name: result.data.data.name,
            surname: result.data.data.surname,
            email: result.data.data.email,
            birthdate: result.data.data.birthdate,
          });
        })
        .catch((error) => console.log(error));
    }
  }, [users]);

  // UPDATE PROFILE VALUES
  const [dataUserUpdate, setDataUserUpdate] = useState({
    userName: "",
    name: "",
    surname: "",
    email: "",
  });

  const [dataUserUpdateValidation, setDataUserUpdateValidation] = useState({
    userNameValidation: false,
    nameValidation: false,
    surnameValidation: false,
    emailValidation: false,
  });

  const [dataUserUpdateError, setDataUserUpdateError] = useState({
    userNameError: "",
    nameError: "",
    surnameError: "",
    emailError: "",
  });

  const newDataUserUpdate = (e) => {
    setDataUserUpdate((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value,
    }));
  };

  // USEEFFECT TO VALIDATE VALUES AND SHOW ERRORS
  useEffect(() => {
    for (let error in dataUserUpdateError) {
      if (dataUserUpdateError[error] !== "") {
        setRegisterAct(false);
        return;
      }
    }
    for (let vacio in dataUserUpdate) {
      if (dataUserUpdate[vacio] === "") {
        setRegisterAct(false);
        return;
      }
    }
    for (let validated in dataUserUpdateValidation) {
      if (dataUserUpdateValidation[validated] === false) {
        setRegisterAct(false);
        return;
      }
    }
    setRegisterAct(true);
  });

  // FUNCTIONS TO CHECK ERROR
  const checkError = (e) => {
    let error = "";
    let checked = validate(e.target.name, e.target.value, e.target.required);

    error = checked.message;

    setDataUserUpdateValidation((prevState) => ({
      ...prevState,
      [e.target.name + "Validation"]: checked.validated,
    }));
  };

  const checkError2 = (e) => {
    let error = "";
    let checked = validate(e.target.name, e.target.value, e.target.required);

    error = checked.message;

    setDataUserUpdateError((prevState) => ({
      ...prevState,
      [e.target.name + "Error"]: error,
    }));
  };

  // SHOW FIELDS
  const changeHide = () => {
    if (hide === false) {
      setHide(true);
    }
    if (hide === true) {
      setHide(false);
    }
  };

  const changeHide1 = () => {
    if (hide1 === false) {
      setHide1(true);
    }
    if (hide1 === true) {
      setHide1(false);
    }
  };

  const changeHide2 = () => {
    if (hide2 === false) {
      setHide2(true);
    }
    if (hide2 === true) {
      setHide2(false);
    }
  };

  const changeHide3 = () => {
    if (hide3 === false) {
      setHide3(true);
    }
    if (hide3 === true) {
      setHide3(false);
    }
  };

  const changeHide4 = () => {
    if (hide4 === false) {
      setHide4(true);
    }
    if (hide4 === true) {
      setHide4(false);
    }
  };

  // FUNCTION TO UPDATE PROFILE DEPENDING ON FIELD
  const updateUser = () => {
    if (dataUserUpdate.userName !== (users.userName && "" && null)) {
      let userNameProfile = {
        userName: dataUserUpdate.userName,
      };
      updateUserNameProfile(userNameProfile, token)
        .then((action) => {
          setUsers((prevState) => ({
            ...prevState,
            userName: action.data.data.userName,
          }));
          changeHide();
        })
        .catch((error) => console.log(error));
    }

    if (dataUserUpdate.name !== (users.name && "" && null)) {
      let nameProfile = {
        name: dataUserUpdate.name,
      };
      updateNameProfile(nameProfile, token)
        .then((action) => {
          setUsers((prevState) => ({
            ...prevState,
            name: action.data.data.name,
          }));
          changeHide1();
        })
        .catch((error) => console.log(error));
    }

    if (dataUserUpdate.surname !== (users.surname && "" && null)) {
      let surnameProfile = {
        surname: dataUserUpdate.surname,
      };
      updateSurnameProfile(surnameProfile, token)
        .then((action) => {
          setUsers((prevState) => ({
            ...prevState,
            surname: action.data.data.surname,
          }));
          changeHide2();
        })
        .catch((error) => console.log(error));
    }

    if (dataUserUpdate.email !== (users.email && "" && null)) {
      let emailProfile = {
        email: dataUserUpdate.email,
      };
      updateEmailProfile(emailProfile, token)
        .then((action) => {
          setUsers((prevState) => ({
            ...prevState,
            email: action.data.data.email,
          }));
          changeHide3();
        })
        .catch((error) => console.log(error));
    }
  };
  
  // FUNCTION TO CHOOSE BIRTHDATE AND UPDATE
  const chooseDay = (day) => {
    if (dayjs(day).isBefore(dayjs())) {
      setBDay(dayjs(day).format("YYYY-MM-DD"));
    } else {
      handleShow1();
      return;
    }

    let birthdateProfile = {
      birthdate: dayjs(day).format("YYYY-MM-DD"),
    };
    updateBirthdateProfile(birthdateProfile, token)
      .then((action) => {
        setUsers((prevState) => ({
          ...prevState,
          birthdate: action.data.data.birthdate,
        }));
        changeHide4();
      })
      .catch((error) => console.log(error));
  };

  const [show1, setShow1] = useState(false);
  const handleClose1 = () => setShow1(false);
  const handleShow1 = () => setShow1(true);

  return (
    <Container
      fluid
      className="homeContainerMin homeBg d-flex flex-column justify-content-center"
    >
      <TurnPhone/>
      <Modal show={show1} onHide={handleClose1} className="my-modal">
        <Modal.Header closeButton>
          <Modal.Title>Fecha no válida</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          Por favor, introduce una fecha anterior al día de hoy.
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose1}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
      <Row className="d-flex justify-content-center">
        <Col xxl={4} xl={5} md={6} sm={9} className="my-3">
          <div className="d-flex justify-content-center">
            <h5 className="actionTitle">Perfil de usuario</h5>
          </div>
          <div className="d-flex flex-column justify-content-center">
            <div className="d-flex">
              <div className="pType">Username:</div>
              <div className={hide === false ? "pValue" : "hide"}>
                <strong>{users.userName}</strong>
              </div>
              <div className={hide === false ? "hide" : "pValue"}>
                <Form.Group as={Col} controlId="formGridUserName">
                  <InputBox
                    className={
                      dataUserUpdateError.userNameError === ""
                        ? "inputBasicDesign"
                        : "inputBasicDesign inputErrorDesign"
                    }
                    type={"text"}
                    name={"userName"}
                    placeholder={"Enter your new username"}
                    required={true}
                    changeFunction={(e) => {
                      newDataUserUpdate(e);
                      checkError(e);
                    }}
                    blurFunction={(e) => {
                      checkError2(e);
                    }}
                  />
                  <Form.Text className="errorMessage">
                    {dataUserUpdateError.nameError}
                  </Form.Text>
                </Form.Group>
              </div>
              <div
                onClick={
                  hide === false ? () => changeHide() : () => updateUser()
                }
              >
                <img className="updIcon" src={updIcon} alt="" />
              </div>
              <div
                className={hide === false ? "hide" : "block"}
                onClick={() => changeHide()}
              >
                <img className="updIcon" src={cancelUpdIcon} alt="" />
              </div>
            </div>
            <div className="d-flex">
              <div className="pType">Nombre:</div>
              <div className={hide1 === false ? "pValue" : "hide"}>
                <strong>{users.name}</strong>
              </div>
              <div className={hide1 === false ? "hide" : "pValue"}>
                <Form.Group as={Col} controlId="formGridName">
                  <InputBox
                    className={
                      dataUserUpdateError.nameError === ""
                        ? "inputBasicDesign"
                        : "inputBasicDesign inputErrorDesign"
                    }
                    type={"text"}
                    name={"name"}
                    placeholder={"Enter your name"}
                    required={true}
                    changeFunction={(e) => {
                      newDataUserUpdate(e);
                      checkError(e);
                    }}
                    blurFunction={(e) => {
                      checkError2(e);
                    }}
                  />
                  <Form.Text className="errorMessage">
                    {dataUserUpdateError.nameError}
                  </Form.Text>
                </Form.Group>
              </div>
              <div
                onClick={
                  hide1 === false ? () => changeHide1() : () => updateUser()
                }
              >
                <img className="updIcon" src={updIcon} alt="" />
              </div>
              <div
                className={hide1 === false ? "hide" : "block"}
                onClick={() => changeHide1()}
              >
                <img className="updIcon" src={cancelUpdIcon} alt="" />
              </div>
            </div>
            <div className="d-flex">
              <div className="pType">Apellidos:</div>
              <div className={hide2 === false ? "pValue" : "hide"}>
                <strong>{users.surname}</strong>
              </div>
              <div className={hide2 === false ? "hide" : "pValue"}>
                <Form.Group as={Col} controlId="formGridSurname">
                  <InputBox
                    className={
                      dataUserUpdateError.surnameError === ""
                        ? "inputBasicDesign"
                        : "inputBasicDesign inputErrorDesign"
                    }
                    type={"text"}
                    name={"surname"}
                    placeholder={"Enter your surname"}
                    required={true}
                    changeFunction={(e) => {
                      newDataUserUpdate(e);
                      checkError(e);
                    }}
                    blurFunction={(e) => {
                      checkError2(e);
                    }}
                  />
                  <Form.Text className="errorMessage">
                    {dataUserUpdateError.surnameError}
                  </Form.Text>
                </Form.Group>
              </div>
              <div
                onClick={
                  hide2 === false ? () => changeHide2() : () => updateUser()
                }
              >
                <img className="updIcon" src={updIcon} alt="" />
              </div>
              <div
                className={hide2 === false ? "hide" : "block"}
                onClick={() => changeHide2()}
              >
                <img className="updIcon" src={cancelUpdIcon} alt="" />
              </div>
            </div>
            <div className="d-flex">
              <div className="pType">Email:</div>
              <div className={hide3 === false ? "pValue" : "hide"}>
                <strong>{users.email}</strong>
              </div>
              <div className={hide3 === false ? "hide" : "pValue"}>
                <Form.Group as={Col} controlId="formGridEmail">
                  <InputBox
                    className={
                      dataUserUpdateError.emailError === ""
                        ? "inputBasicDesign"
                        : "inputBasicDesign inputErrorDesign"
                    }
                    type={"text"}
                    name={"email"}
                    placeholder={"Enter your new email"}
                    required={true}
                    changeFunction={(e) => {
                      newDataUserUpdate(e);
                      checkError(e);
                    }}
                    blurFunction={(e) => {
                      checkError2(e);
                    }}
                  />
                  <Form.Text className="errorMessage">
                    {dataUserUpdateError.emailError}
                  </Form.Text>
                </Form.Group>
              </div>
              <div
                onClick={
                  hide3 === false ? () => changeHide3() : () => updateUser()
                }
              >
                <img className="updIcon" src={updIcon} alt="" />
              </div>
              <div
                className={hide3 === false ? "hide" : "block"}
                onClick={() => changeHide3()}
              >
                <img className="updIcon" src={cancelUpdIcon} alt="" />
              </div>
            </div>
            <div className="d-flex">
              <div className="pType">Fecha de nacimiento:</div>
              <div className={hide4 === false ? "pValue" : "hide"}>
                <strong>{dayjs(users.birthdate).format("DD MMMM YYYY")}</strong>
              </div>
              <div className={hide4 === false ? "hide" : "pValue"}>
                <Calendar name={"birthdate"} onChange={chooseDay} />
              </div>
              <div onClick={() => changeHide4()}>
                <img className="updIcon" src={updIcon} alt="" />
              </div>
              <div
                className={hide4 === false ? "hide" : "block"}
                onClick={() => changeHide4()}
              >
                <img className="updIcon" src={cancelUpdIcon} alt="" />
              </div>
            </div>
          </div>
        </Col>
      </Row>
    </Container>
  );
};
