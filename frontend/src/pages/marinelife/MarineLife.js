import { Container, Row, Col } from "reactstrap";
import CommonNavbar from "../../components/Navbar/CommonNavbar";
// import BarChart from "./BarChart";
import StateMap from "./StateMap";
import BluePieChart from "./BluePieChart";

function MarineLife() {
  const stateSpeciesData = [
    { value: 10, label: "Critically Endangered" },
    { value: 15, label: "Endangered" },
    { value: 20, label: "Vulnerable" },
  ];
  return (
    <>
      <CommonNavbar />
      <div className="section-with-space">
        {/* <Container>
                    <Row>
                        <Col md="8">
                            <StateMap />
                        </Col>
                        <Col md="4">
                            <BarChart data={data} width={400} height={200} />
                            test
                        </Col>
                    </Row>
                </Container> */}
        {/* <StateMap w={1000} h={800}/> */}
        {/* <BarChart data={data} width={600} height={400} /> */}
        <BluePieChart data={stateSpeciesData} width={500} height={300} />
      </div>
    </>
  );
}

export default MarineLife;
