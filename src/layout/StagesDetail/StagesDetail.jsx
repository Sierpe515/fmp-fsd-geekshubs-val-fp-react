
import React, { useState, useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
// import './UserDetail.css'
// import { addRoleByAdmin, deleteUserByAdmin } from "../../services/apiCalls";
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
// import role1 from "../../image/admin.png";
// import role2 from "../../image/player.png";
// import role3 from "../../image/role3.png";
import dayjs from 'dayjs';
// import OverlayTrigger from 'react-bootstrap/OverlayTrigger';
// import Popover from 'react-bootstrap/Popover';
// import Button from 'react-bootstrap/Button';
// import Modal from 'react-bootstrap/Modal';
import { userDetailData } from "../userDetailSlice";
import { addRoleByAdmin, bringCharacterGames, bringGamesStagesByStageId, deleteSavedGameByAdmin, deleteUserByAdmin } from "../../services/apiCalls";
// import { addCharacter } from "../characterSlice";
import { addState } from "../inGameSlice";
import { TurnPhone } from "../../components/TurnPhone/TurnPhone";
import { stageData } from "../stageSlice";
import Chart from 'chart.js/auto'

 
export const StagesDetail = () => {

    // const userDetailRedux = useSelector(userDetailData);
    const credentialsRdx = useSelector(userData);
    const stageRdx = useSelector(stageData);
    console.log(stageRdx);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    // let params = (userDetailRedux.choosenObject.id);
    let token = (credentialsRdx.credentials.token);

    
    
    // const [userRole, setUserRole] = useState("");
    // const [gameId, setGameId] = useState("");
    // const [savedGames, setSavedGames] = useState([]);
    // const [show, setShow] = useState(false);
    // const [show1, setShow1] = useState(false);
    // const [show2, setShow2] = useState(false);
    // const handleClose = () => setShow(false);
    // const handleClose1 = () => setShow1(false);
    // const handleClose2 = () => setShow2(false);
    // const handleShow = () => setShow(true);
    // const handleShow1 = () => setShow1(true);
    // const handleShow2 = () => setShow2(true);
    // const [modalShow, setModalShow] = React.useState(false);
    
    // SAVE AT REDUX INGAME STATE
    // USEEFFECT TO CHECK ADMIN ROLE
    useEffect(() => {
        dispatch(addState({ choosenState: false}))
        {credentialsRdx.credentials.userRole?.includes("Admin") ? ("") : (navigate('/'))}      
    }, []);

    useEffect(() => {
            let params = stageRdx.choosenStage.id
            console.log(params);
          bringGamesStagesByStageId(params)
          .then(result => {
            console.log(result);
            // const recuento33 = result.data.reduce((contador, { answer_id }) => answer_id == '1' ? contador += 1 : contador, 0)
            // const recuento34 = result.data.reduce((contador, { answer_id }) => answer_id == '2' ? contador += 1 : contador, 0)
            // console.log(recuento33);
            // console.log(recuento34);
    
            const resultado = {}
            result.data.forEach(el => (resultado[el.answer_id] = resultado[el.answer_id] + 1 || 1))
            console.log(resultado);
            console.log(resultado[1]);
            // const result33 = (resultado[33])
    
            (async function() {
                if (stageRdx.choosenStage.id == 1){
                    const data = [
                      { year: "Respuesta 1", count: resultado[1] },
                      { year: "Respuesta 2", count: resultado[2] },
                      { year: "NS/NR", count: resultado[null] },
                    ];
                    new Chart(
                      document.getElementById('adminStatistics'),
                      {type: 'bar',
                      data: {
                          labels: data.map(row => row.year),
                          datasets: [
                              {label: 'Respuestas de los jugadores',
                              data: data.map(row => row.count)
                      }]}});
                }

                if (stageRdx.choosenStage.id == 2){
                    const data = [
                      { year: "Respuesta 1", count: resultado[3] },
                      { year: "Respuesta 2", count: resultado[4] },
                      { year: "Respuesta 2", count: resultado[5] },
                      { year: "NS/NR", count: resultado[null] },
                    ];
                    new Chart(
                      document.getElementById('adminStatistics'),
                      {type: 'bar',
                      data: {
                          labels: data.map(row => row.year),
                          datasets: [
                              {label: 'Respuestas de los jugadores',
                              data: data.map(row => row.count)
                      }]}});
                }
            
            })();
          })
          .catch((error) => console.log(error))
    
    }, [stageRdx]);


     return (
        <Container fluid className="homeContainerMin homeBg d-flex flex-column justify-content-center">
            <TurnPhone/>
            <Row className="d-flex justify-content-center align-items-center flex-column">
                <Col xxl={5} xl={5} sm={10} className="my-3">
                    <div className='newPjContainer loadGamesContainer userDataBox d-flex flex-column justify-content-center text-center'>
                        <h1 className="text-center">Stage: <strong> {stageRdx?.choosenStage?.id} </strong></h1>
                        <p><strong>Name:</strong> {stageRdx?.choosenStage?.name}</p>
                        <p><strong>Code:</strong> {stageRdx?.choosenStage?.code}</p>
                    </div>
                </Col>
                <Col xxl={5} xl={5} sm={10} className="my-3 d-flex justify-content-center">
                    <div>
                        <canvas className="statisticTable" id="adminStatistics"></canvas>
                    </div>
                </Col>
            </Row>
        </Container>
     )
}