import React, { useState } from 'react'
import { Container } from 'react-bootstrap'
import Form from "react-bootstrap/Form";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { userData } from '../userSlice';
import { TurnPhone } from '../../components/TurnPhone/TurnPhone';
import { validate } from "../../helpers/useful";
import { createCharacter } from '../../services/apiCalls';
import { addState } from '../inGameSlice';
import './NewCharacter.css'

export const NewCharacter = () => {

    const navigate = useNavigate();
    const dispatch = useDispatch();
    const dataCredentialsRdx = useSelector(userData);

    dispatch(addState({ choosenState: false}))

    let token = dataCredentialsRdx.credentials.token

    const [character, setCharacter] = useState({
        name: "",
        gender: ""
    })

    const [characterError, setCharacterError] = useState({
        nameError: "",
    });

    // const [characterGender, setCharacterGender] = useState("")


    const [btnMessage, setBtnMessage] = useState("")

    const newCharacter = (e) => {
        console.log(character);
        setCharacter((prevState) => ({
          ...prevState,
          [e.target.name]: e.target.value,
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
    
        setCharacterError((prevState) => ({
          ...prevState,
          [e.target.name + "Error"]: error,
        }));
    };

    // const chooseGender = (gender) => {
    //     console.log(gender);
    //     setCharacterGender(gender)
    // }

    const chooseGender = (gender) => {
        setCharacter((prevState) => ({
            ...prevState,
            gender,
          }));
    }

    const sendCharacter = () => {
        // let dataCharacter = {
        //     name : character,
        //     gender : characterGender
        // }
        console.log(character);

        createCharacter(character, token)
          .then(
              respuesta => {

                  setTimeout(() => {
                    navigate("/");
                  }, 500);
              }
          )
          .catch(error => {
            console.log(error)
            setBtnMessage("Error creating new Character")
          })
    }

    return (
        <Container fluid className="homeContainerMin homeBg d-flex flex-column justify-content-center">
            <TurnPhone/>
            <Row className="d-flex justify-content-center">
                <Col xxl={4} xl={5} sm={7} className="my-3">
                <div className="logRegContainer newPjContainer">
                    <h5 className="text-center actionTitle">New Character</h5>
                    <Form>
                    <Form.Group className="mb-3 d-flex" controlId="formBasicName">
                        <Form.Label className='pType'>Name</Form.Label>
                        <Form.Control
                        className={
                            btnMessage === ""
                            ? "inputBasicDesign"
                            : "inputBasicDesign inputErrorDesign"
                        }
                        type="text"
                        name="name"
                        placeholder="Character name"
                        onChange={(e) => newCharacter(e)}
                        onBlur={(e) => checkError2(e)}
                        />
                        <Form.Text className="errorMessage">{characterError.nameError}</Form.Text>
                    </Form.Group>
                    <Form.Text className="errorMessage">{btnMessage}</Form.Text>
                    <div>
                        <div className='pType'>Gender</div> 
                        <div className='d-flex justify-content-around'>
                            <div className='genderBtn' name="gender" onClick={() => chooseGender('male')}>Male</div>
                            <div className='genderBtn' name="gender" onClick={() => chooseGender('female')}>Female</div>
                            <div className='genderBtn' name="gender" onClick={() => chooseGender('undefined')}>Undefined</div>
                        </div>
                    </div>
                    </Form>
                    <div className='d-flex justify-content-center'>
                        <div className="logButton newPjBtn" name="button" onClick={()=> sendCharacter()}>Create Charater</div>
                    </div>
                </div>
                </Col>
            </Row>
        </Container>
    )
}
