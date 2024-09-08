import { Container, Row, Col } from "reactstrap";
import PollutionLefMap from "./PollutionLefMap";
import PollutionRadarChart from "./PollutionRadarChart";
import PollutionLineChart from "./PollutionLineChart";

function Pollution() {
    return (
        <>
            <div className="section-with-space">
                <div className="section-marinelife">
                    <Container fluid>
                        <Row className="justify-content-center">
                            <PollutionLefMap />
                        </Row>
                        <Row>
                            
                            <Col className="md-6 d-flex justify-content-end" style={{height: "300px"}}>
                                <PollutionLineChart />
                            </Col>
                            <Col className="md-6" style={{height: "300px"}}>
                                <PollutionRadarChart />
                            </Col>
                        </Row>
                    </Container>
                </div>



            </div>
        </>
    );
}

export default Pollution;