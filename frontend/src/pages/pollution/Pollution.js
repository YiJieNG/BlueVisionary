import { Container } from "reactstrap";
import PollutionMap from "./PollutionMap";
import PollutionLefMap from "./PollutionLefMap";

function Pollution () {
    return (
        <>
        <div className="section-with-space">
            <div className="section-marinelife">
            <Container fluid>
                {/* <PollutionMap width={800} height={600}/> */}
                <PollutionLefMap />
            </Container>
            </div>
           


        </div>
        </>
    );
}

export default Pollution;