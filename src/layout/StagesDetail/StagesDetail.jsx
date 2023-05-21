
import React, { useEffect } from "react";
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import { useDispatch, useSelector } from 'react-redux';
import { userData } from "../userSlice";
import { useNavigate } from "react-router-dom";
import { bringGamesStagesByStageId } from "../../services/apiCalls";
import { addState } from "../inGameSlice";
import { TurnPhone } from "../../components/TurnPhone/TurnPhone";
import { stageData } from "../stageSlice";
import Chart from 'chart.js/auto'


export const StagesDetail = () => {

    const credentialsRdx = useSelector(userData);
    const stageRdx = useSelector(stageData);
    console.log(stageRdx);
    const dispatch = useDispatch();
    const navigate = useNavigate();

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
            const resultado = {}
            result.data.forEach(el => (resultado[el.answer_id] = resultado[el.answer_id] + 1 || 1))
            console.log(resultado);

            (async function() {
                const data = [];
                for(let elemento in resultado){
                    data.push({ year: `Respuesta ${elemento}`, count: resultado[elemento] })
                }
                new Chart(
                          document.getElementById('adminStatistics'),
                          {type: 'bar',
                          data: {
                              labels: data.map(row => row.year),
                              datasets: [
                                  {label: 'Respuestas de los jugadores',
                                  data: data.map(row => row.count)
                          }]}});
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
                    <div className='newPjContainer'>
                        <canvas className="statisticTable" id="adminStatistics"></canvas>
                    </div>
                </Col>
            </Row>
        </Container>
     )
}