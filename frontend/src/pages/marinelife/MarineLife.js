import { useState } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonNavbar from "../../components/Navbar/CommonNavbar";
// import BarChart from "./BarChart";
import StateMap from "./StateMap";
import BluePieChart from "./BluePieChart";

function MarineLife() {
  const [stateSelected, setStateSelected] = useState("Victoria");
  const [endangerType, setEndangerType] = useState("Endangered");
  const stateSpeciesData = {
    Victoria: [
      { value: 10, label: "Critically Endangered", color: "#003366" },
      { value: 15, label: "Endangered", color: "#36A2EB" },
      { value: 20, label: "Vulnerable", color: "#bbe0f7" },
    ],
    Queensland: [
      { value: 10, label: "Critically Endangered", color: "#003366" },
      { value: 30, label: "Endangered", color: "#36A2EB" },
      { value: 20, label: "Vulnerable", color: "#bbe0f7" },
    ],
    "Australian Capital Territory": [
      { value: 20, label: "Critically Endangered", color: "#003366" },
      { value: 30, label: "Endangered", color: "#36A2EB" },
      { value: 10, label: "Vulnerable", color: "#bbe0f7" },
    ],
    Tasmania: [
      { value: 10, label: "Critically Endangered", color: "#003366" },
      { value: 30, label: "Endangered", color: "#36A2EB" },
      { value: 20, label: "Vulnerable", color: "#bbe0f7" },
    ],
    "Northern Territory": [
      { value: 10, label: "Critically Endangered", color: "#003366" },
      { value: 30, label: "Endangered", color: "#36A2EB" },
      { value: 40, label: "Vulnerable", color: "#bbe0f7" },
    ],
    "South Australia": [
      { value: 10, label: "Critically Endangered", color: "#003366" },
      { value: 30, label: "Endangered", color: "#36A2EB" },
      { value: 10, label: "Vulnerable", color: "#bbe0f7" },
    ],
    "Western Australia": [
      { value: 20, label: "Critically Endangered", color: "#003366" },
      { value: 30, label: "Endangered", color: "#36A2EB" },
      { value: 20, label: "Vulnerable", color: "#bbe0f7" },
    ],
    "New South Wales": [
      { value: 30, label: "Critically Endangered", color: "#003366" },
      { value: 30, label: "Endangered", color: "#36A2EB" },
      { value: 20, label: "Vulnerable", color: "#bbe0f7" },
    ],
  };
  const topSpecies = ["aaaaaa", "bbbbbbbbb", "cccccc", "dddddd", "eeeeee"];

  const updateStateSelected = (newState) => {
    setStateSelected(newState);
  };

  const updateEndangerType = (newType) => {
    setEndangerType(newType);
  };

  return (
    <>
      <div className="section-with-space">
        <div className="section-marinelife">
          <Container fluid>
            <Row>
              <Col md="6">
                <StateMap
                  w={700}
                  h={700}
                  stateSelected={stateSelected}
                  updateStateSelected={updateStateSelected}
                />
              </Col>
              <Col md="6">
                <Row>
                  <h1>{stateSelected}</h1>
                </Row>
                <Row>
                  <BluePieChart
                    data={stateSpeciesData[stateSelected]}
                    width={500}
                    height={300}
                    updateEndangerType={updateEndangerType}
                  />
                </Row>
                <Row>
                  <h1>
                    Top{" "}
                    <b className={endangerType.replace(/\s+/g, "")}>
                      {endangerType}
                    </b>{" "}
                    Species
                  </h1>
                </Row>
                <Row>
                  {topSpecies.map((item, i) => (
                    <p key={i}>{item}</p>
                  ))}
                </Row>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default MarineLife;
