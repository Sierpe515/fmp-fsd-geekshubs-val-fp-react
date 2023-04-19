
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useSelector } from 'react-redux';
// import './UserDetail.css'
// import { addRoleByAdmin, deleteUserByAdmin } from "../../services/apiCalls";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
// import role1 from "../../image/role1.png";
// import role2 from "../../image/role2.png";
// import role3 from "../../image/role3.png";
// import dayjs from 'dayjs';
import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
import Popover from 'react-bootstrap/Popover';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
import { userDetailData } from "../userDetailSlice";

 
export const UserDetail = () => {

    const userDetailRedux = useSelector(userDetailData);
    const credentialsRdx = useSelector(userData);
    const navigate = useNavigate();

    console.log(userDetailRedux);

    // let params = (userDetailRedux.choosenObject.id);
    let token = (credentialsRdx.credentials.token);
    const isAdmin = credentialsRdx.credentials.userRole?.includes("Admin");

    const [userRole, setUserRole] = useState("");
    const [show, setShow] = useState(false);
    const [show1, setShow1] = useState(false);
    const [show2, setShow2] = useState(false);
    const handleClose = () => setShow(false);
    const handleClose1 = () => setShow1(false);
    const handleClose2 = () => setShow2(false);
    const handleShow = () => setShow(true);
    const handleShow1 = () => setShow1(true);
    const handleShow2 = () => setShow2(true);

    // useEffect(() => {
    //     {credentialsRdx.credentials.userRole ? isAdmin ? ('') : (navigate('/')) : (navigate('/'))}
        
    //   }, []);
    
      useEffect(() => {
        {credentialsRdx.credentials.userRole?.includes("Admin") ? (""
            // {!credentialsRdx.credentials.userRole.includes("admin") ? () : ()} 
            
        ) : (navigate('/'))}
        
      }, []);


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
          handleShow1()
        })
    }

    const addUserRole = () => {
        if(userRole === ""){
            handleShow()
            return;
        }
        let body = {
            user_id: userDetailRedux.choosenObject.id,
            role_id: userRole
        }
        addRoleByAdmin(body, token)
        .then(
            handleShow2()
        )
        .catch((error) => console.log(error));
    }

    const chooseRole = (Role) => {
        setUserRole(Role) 
    }

    const popoverHoverFocus1 = (
        <Popover className="popoverRole" id="popover-trigger-hover-focus" title="Popover bottom">
          Admin
        </Popover>
    );

    const popoverHoverFocus2 = (
      <Popover className="popoverRole" id="popover-trigger-hover-focus" title="Popover bottom">
        Doctor
      </Popover>
    );
    
    const popoverHoverFocus3 = (
      <Popover className="popoverRole" id="popover-trigger-hover-focus" title="Popover bottom">
        Patient
      </Popover>
    );


     return (
        <Container fluid className="homeContainerMin d-flex flex-column justify-content-between">
            <Modal show={show} onHide={handleClose}>
                <Modal.Header closeButton>
                <Modal.Title>Add role</Modal.Title>
                </Modal.Header>
                <Modal.Body>Please, choose a role before pressing the button</Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show1} onHide={handleClose1}>
                <Modal.Header closeButton>
                <Modal.Title>It can not be deleted</Modal.Title>
                </Modal.Header>
                <Modal.Body>It's not posible delete an user with upcoming appointments
                    <br /> Please, cancel first any booked appointment to delete user.
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose1}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Modal show={show2} onHide={handleClose2}>
                <Modal.Header closeButton>
                <Modal.Title>Role assignment</Modal.Title>
                </Modal.Header>
                <Modal.Body>User role added
                </Modal.Body>
                <Modal.Footer>
                <Button variant="secondary" onClick={handleClose2}>
                    Close
                </Button>
                </Modal.Footer>
            </Modal>
            <Row className="d-flex justify-content-center">
                <Col xxl={5} xl={5} sm={10} className="my-3">
                    <div className='logRegContainer d-flex flex-column justify-content-center text-center'>
                        <h1 className="text-center">User Detail Admin</h1>
                        <p><strong>Username:</strong> {userDetailRedux?.choosenObject?.userName}</p>
                        <p><strong>Name:</strong> {userDetailRedux?.choosenObject?.name}</p>
                        <p><strong>Surname:</strong> {userDetailRedux?.choosenObject?.surname}</p>
                        <p><strong>Email:</strong> {userDetailRedux?.choosenObject?.email}</p>
                        {/* <p><strong>Birth Date:</strong> {dayjs(userDetailRedux.choosenObject.birth_date).format('YYYY-MMMM-DD')}</p> */}
                        {/* <p><strong>Password:</strong> {userDetailRedux?.choosenObject?.password}</p> */}
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
                            className={userRole === "1" ? ('roleDiv roleDivChoosen d-flex justify-content-center align-items-center') : ('roleDiv d-flex justify-content-center align-items-center')}>
                                {/* <img className='roleIcon' src={ role1 } alt="" /> */}
                                </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="bottom"
                        overlay={popoverHoverFocus2}
                    >       
                        <div onClick={()=> chooseRole('2')}
                            className={userRole === "2" ? ('roleDiv roleDivChoosen d-flex justify-content-center align-items-center') : ('roleDiv d-flex justify-content-center align-items-center')}>
                                {/* <img className='roleIcon' src={ role2 } alt="" /> */}
                                </div>
                    </OverlayTrigger>
                    <OverlayTrigger
                        trigger={['hover', 'focus']}
                        placement="bottom"
                        overlay={popoverHoverFocus3}
                    >  
                        <div onClick={()=> chooseRole('3')} 
                        className={userRole === "3" ? ('roleDiv roleDivChoosen d-flex justify-content-center align-items-center') : ('roleDiv d-flex justify-content-center align-items-center')}>
                            {/* <img className='roleIcon' src={ role3 } alt="" /> */}
                            </div>
                    </OverlayTrigger>
                </Col>
                <Col className="d-flex justify-content-center">
                    <div className="deleteButton" name="button" onClick={()=> addUserRole()}>Add role</div>
                </Col>
                </div>
            </Row>
            <Row className="justify-content-center">
                <div className="deleteButton d-flex justify-content-center" name="button" onClick={()=> goNewAppointmentAdm()}>New Appointment</div>
            </Row>
            <Row className="justify-content-center">
                <div className="deleteButton d-flex justify-content-center" name="button" onClick={()=> deleteUser()}>Delete User</div>
            </Row>
        </Container>
     )
}