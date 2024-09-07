import { Container, Row } from "reactstrap";
import PollutionLefMap from "./PollutionLefMap";

function Pollution () {
    return (
        <>
        <div className="section-with-space">
            <div className="section-marinelife">
            <Container fluid>
                <Row className="justify-content-center">
                    <PollutionLefMap />
                </Row>
            </Container>
            </div>
           


        </div>
        </>
    );
}

export default Pollution;