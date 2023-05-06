
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import './UserDetail.css'
// import { addRoleByAdmin, deleteUserByAdmin } from "../../services/apiCalls";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import role1 from "../../image/admin.png";
import role2 from "../../image/player.png";
// import role3 from "../../image/role3.png";
import dayjs from 'dayjs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { userDetailData } from "../userDetailSlice";
import { addRoleByAdmin, bringCharacterGames, deleteSavedGameByAdmin, deleteUserByAdmin } from "../../services/apiCalls";
import { addCharacter } from "../characterSlice";
import { addState } from "../inGameSlice";
import { TurnPhone } from "../../components/TurnPhone/TurnPhone";

 
export const UserDetail = () => {

    const userDetailRedux = useSelector(userDetailData);
    const credentialsRdx = useSelector(userData);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    let params = (userDetailRedux.choosenObject.id);
    let token = (credentialsRdx.credentials.token);

    // SAVE AT REDUX INGAME STATE
    dispatch(addState({ choosenState: false}))


    const [userRole, setUserRole] = useState("");
    const [gameId, setGameId] = useState("");
    const [savedGames, setSavedGames] = useState([]);
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleShow2 = () => setShow2(true);
    const [modalShow, setModalShow] = React.useState(false);

    // USEEFFECT TO CHECK ADMIN ROLE
    useEffect(() => {
      {credentialsRdx.credentials.userRole?.includes("Admin") ? ("") : (navigate('/'))}      
    }, []);

    // FUNCTION TO SELECT AND SAVE GAME AT REDUX AND AT HOOK
    const selected = (game) => {
      dispatch(addCharacter({ choosenCharacter: game }))
      setGameId(game.id)
    }

    // DELETE USER FUNCTION
    const deleteUser = () => {
        deleteUserByAdmin(params, token)
        .then(
            userDeleteByAdmin => {
                setTimeout(() => {
                    navigate("/usersList");
                  }, 500);
            }
        )
        .catch(error => {
            console.log(error);
        })
    }

    // UPDATE ROLE USER FUNCTIONS
    const updateUserRole = () => {
        if(userRole === ""){
            handleShow()
            return;
        }
        let body = {
            role_id: userRole
        }
        let params = userDetailRedux.choosenObject.id
        addRoleByAdmin(body, params, token)
        .then(
            handleShow2()
        )
        .catch((error) => console.log(error));
    }

    const chooseRole = (Role) => {
        setUserRole(Role) 
    }

    // DELETE SAVED GAME FOR CHARACTER
    const deleteSavedGame = () => {
        let params = gameId
        deleteSavedGameByAdmin(params, token)
        .then(
            userDeleteByAdmin => {
                setTimeout(() => {
                    navigate("/usersList");
                  }, 500);
            }
        )
        .catch(error => {
            console.log(error);
        })
    }    

    // USEEFFECT TO BRING SAVED GAMES FOR CHARACTER
    useEffect(() => {
        if (credentialsRdx?.credentials?.userRole?.includes('Admin')) {
            bringCharacterGames(params)
            .then((result) => {
                if (result.data.data[result.data.data.length -1].id !== savedGames[savedGames.length -1]?.id){
                    setSavedGames(result.data.data);
                }
            })
            .catch((error) => console.log(error));
        }
    }, [savedGames]);

    // MODAL TO VIEW SAVED GAMES FOR CHARACTER
    function MyVerticallyCenteredModal(props) {
        return (
          <Modal
            {...props}
            size="lg"
            aria-labelledby="contained-modal-title-vcenter"
            centered
          >
            <Modal.Header closeButton>
              <Modal.Title id="contained-modal-title-vcenter">
                Juegos guardados del personaje
              </Modal.Title>
            </Modal.Header>
            <Modal.Body>
                {savedGames.length > 0 ? (
                    <>
                    <div className='loadGamesBox'>
                        {savedGames.map((load) => {
                        return (
                            <>
                            <div className="loadBox text-center" key={load.id}>
                                <p>Game:<strong> {load.select_games.name} </strong></p> 
                                <p>Saved at:<strong> {load.updated_at} </strong></p> 
                            </div>
                            <div className="text-center" onClick={()=> deleteSavedGame()}>Eliminar partida</div>
                            </>
                        );
                        })}
                    </div>
                    </>
                ) : (
                    <div><h1>No hay juegos guardados con este personaje</h1></div>
                )}
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={props.onHide}>Cerrar</Button>
            </Modal.Footer>
          </Modal>
        );
      }

    // POPOVERS
    const popoverHoverFocus1 = (
        <Popover className="popoverRole" id="popover-trigger-hover-focus" title="Popover bottom">
            Admin
        </Popover>
    );

    const popoverHoverFocus2 = (
        <Popover className="popoverRole" id="popover-trigger-hover-focus" title="Popover bottom">
            Player
        </Popover>
    );


     return (
        <Container fluid className="homeContainerMin homeBg d-flex flex-column justify-content-center">
            <TurnPhone/>
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Agregar rol</Modal.Title>
                </Modal.Header>
                <Modal.Body>Por favor, selecciona un rol antes de pulsar el botón</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                <Modal.Title>Eliminar usuario</Modal.Title>
                </Modal.Header>
                <Modal.Body>¿Estás seguro de querer eliminar a este usuario?</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={()=> deleteUser()}>
                    Confirmar
                </Button>
                <Button variant="secondary" onClick={handleClose1}>
                    Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                <Modal.Title>Rol asignado</Modal.Title>
                </Modal.Header>
                <Modal.Body>El rol ha sido asignado al usuario
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                    Cerrar
                </Button>
                </Modal.Footer>
            </Modal>
            <Row className="d-flex justify-content-center align-items-center flex-column">
                <Col xxl={5} xl={5} sm={10} className="my-3">
                    <div className='newPjContainer loadGamesContainer userDataBox d-flex flex-column justify-content-center text-center'>
                        <h1 className="text-center">User Detail Admin</h1>
                        <p><strong>Username:</strong> {userDetailRedux?.choosenObject?.userName}</p>
                        <p><strong>Nombre:</strong> {userDetailRedux?.choosenObject?.name}</p>
                        <p><strong>Apellido:</strong> {userDetailRedux?.choosenObject?.surname}</p>
                        <p><strong>Email:</strong> {userDetailRedux?.choosenObject?.email}</p>
                        <p><strong>Rol:</strong> {userDetailRedux?.choosenObject?.role_id == 1 ? ("Admin") : ("Player")}</p>
                        <p><strong>Fecha de Nacimiento:</strong> {dayjs(userDetailRedux.choosenObject.birthdate).format('YYYY-MMMM-DD')}</p>
                    </div>
                </Col>
                <Col xxl={5} xl={5} sm={10} className="my-3 d-flex justify-content-center">
                    <div className="newPjContainer loadGamesContainer charDivWidth d-flex flex-column justify-content-center align-items-center text-center">
                        {userDetailRedux?.choosenObject?.characters.map((pj) => {
                        return (
                            <>
                            <div className="charBox" onClick={() => {selected(pj), setModalShow(true)}} key={pj.id}>
                            Nombre de personaje: <strong>{pj.name}</strong> 
                            </div>
                            <MyVerticallyCenteredModal
                            show={modalShow}
                            onHide={() => setModalShow(false)}
                          />
                          </>
                        );
                        })}
                    </div>
                </Col>
            </Row>
            <Row className="justify-content-center flex-column align-items-center">
                <div className="addRoleContainer">
                <Col className="d-flex justify-content-center">
                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="bottom"
                        overlay={popoverHoverFocus1}
                    >                   
                        <div onClick={()=> chooseRole('1')}
                            className='roleDiv roleDivChoosen d-flex justify-content-center align-items-center'>
                                <img className='roleIcon' src={ role1 } alt="" />
                                </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="bottom"
                        overlay={popoverHoverFocus2}
                    >       
                        <div onClick={()=> chooseRole('2')}
                            className='roleDiv roleDivChoosen d-flex justify-content-center align-items-center'>
                                <img className='roleIcon' src={ role2 } alt="" />
                                </div>
                    </OverlayTrigger>
                </Col>
                <Col className="d-flex justify-content-center">
                    <div className="adminButton" name="button" onClick={()=> updateUserRole()}>Add role</div>
                </Col>
                </div>
            </Row>
            <Row className="justify-content-center">
                <div>
                    <div className="adminButton d-flex justify-content-center" name="button" onClick={()=> handleShow1()}>Delete User</div>
                </div>
            </Row>
        </Container>
     )
}