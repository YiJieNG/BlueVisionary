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
                        <Row className="justify-content-md-center">
                            <Col className="col-md-3" style={{height: "300px"}}>
                            <Row>
                                <PollutionLineChart />
                            </Row>
                            <Row>
                                <div>
                                    <h4>Trend for pollution</h4>
                                </div>
                            </Row>
                            </Col>
                            <Col className="col-md-3" style={{height: "300px"}}>
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