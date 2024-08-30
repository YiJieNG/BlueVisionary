import { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardHeader, CardBody } from "reactstrap";
import CommonNavbar from "../../components/Navbar/CommonNavbar";
// import BarChart from "./BarChart";
import StateMap from "./StateMap";
import BluePieChart from "./BluePieChart";
import BlueBarChart from "./BlueBarChart";
import axios from "axios";
import BlueModal from "./BlueModal";

function MarineLife() {
  const [stateSelected, setStateSelected] = useState(["Victoria", "VIC"]);
  const [endangerType, setEndangerType] = useState("Endangered");
  const [stateStat, setStateStat] = useState();
  const [endangerData, setEndangerData] = useState();
  const [xAxis, setXAxis] = useState();
  const [speciesSelected, setSpeciesSelected] = useState();
  const [isOpen, setIsOpen] = useState(false);

  // const stateSpeciesData = {
  //     "Victoria": [
  //         { value: 10, label: "Critically Endangered", color: "#003366" },
  //         { value: 15, label: "Endangered", color: "#36A2EB" },
  //         { value: 20, label: "Vulnerable", color: "#bbe0f7" },
  //     ],
  //     "Queensland": [
  //         { value: 10, label: "Critically Endangered", color: "#003366" },
  //         { value: 30, label: "Endangered", color: "#36A2EB" },
  //         { value: 20, label: "Vulnerable", color: "#bbe0f7" },
  //     ],
  //     "Australian Capital Territory": [
  //         { value: 20, label: "Critically Endangered", color: "#003366" },
  //         { value: 30, label: "Endangered", color: "#36A2EB" },
  //         { value: 10, label: "Vulnerable", color: "#bbe0f7" },
  //     ],
  //     "Tasmania": [
  //         { value: 10, label: "Critically Endangered", color: "#003366" },
  //         { value: 30, label: "Endangered", color: "#36A2EB" },
  //         { value: 20, label: "Vulnerable", color: "#bbe0f7" },
  //     ],
  //     "Northern Territory": [
  //         { value: 10, label: "Critically Endangered", color: "#003366" },
  //         { value: 30, label: "Endangered", color: "#36A2EB" },
  //         { value: 40, label: "Vulnerable", color: "#bbe0f7" },
  //     ],
  //     "South Australia": [
  //         { value: 10, label: "Critically Endangered", color: "#003366" },
  //         { value: 30, label: "Endangered", color: "#36A2EB" },
  //         { value: 10, label: "Vulnerable", color: "#bbe0f7" },
  //     ],
  //     "Western Australia": [
  //         { value: 20, label: "Critically Endangered", color: "#003366" },
  //         { value: 30, label: "Endangered", color: "#36A2EB" },
  //         { value: 20, label: "Vulnerable", color: "#bbe0f7" },
  //     ],
  //     "New South Wales": [
  //         { value: 30, label: "Critically Endangered", color: "#003366" },
  //         { value: 30, label: "Endangered", color: "#36A2EB" },
  //         { value: 20, label: "Vulnerable", color: "#bbe0f7" },
  //     ],
  // };
  const topSpecies = ["aaaaaa", "bbbbbbbbb", "cccccc", "dddddd", "eeeeee"];

  const updateStateSelected = (newState) => {
    setStateSelected(newState);
  };

  const updateEndangerType = (newType) => {
    setEndangerType(newType);
  };

  const updateSpeciesSelected = (newSpecies) => {
    setSpeciesSelected(newSpecies);
    setIsOpen(true);
  };

  const updateIsOpen = (openStatus) => {
    setIsOpen(openStatus);
  };

  // Fetch state statistic from backend
  useEffect(() => {
    axios
      .get("https://www.bluevisionary.studio/api/get_state_stat")
      .then((res) => {
        let stateSpecies = {};
        for (let key in res.data) {
          stateSpecies[key] = [
            {
              value: res.data[key]["critically_endangered"],
              label: "Critically Endangered",
              color: "#003366",
            },
            {
              value: res.data[key]["endangered"],
              label: "Endangered",
              color: "#36A2EB",
            },
            {
              value: res.data[key]["vulnerable"],
              label: "Vulnerable",
              color: "#bbe0f7",
            },
          ];
        }
        setStateStat(stateSpecies);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);

  // fetch state species threat status data from backend
  useEffect(() => {
    axios
      .get(
        `https://www.bluevisionary.studio/api/get_state_species/${stateSelected[1]}/${endangerType}`
      )
      .then((res) => {
        let endangerSpecies = { data: [] };
        let x = { scaleType: "band", data: [] };
        for (let key in res.data) {
          endangerSpecies["data"].push(res.data[key]);
          x["data"].push(key);
        }
        // store data for bar chart series and xAxis
        setEndangerData([endangerSpecies]);
        setXAxis([x]);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [stateSelected, endangerType]);

  return (
    <>
      <div className="section-with-space">
        <div className="section-marinelife">
          <Container fluid>
            <Row>
              <Col md="6" sm={{ size: "auto" }}>
                <StateMap
                  w={650}
                  h={650}
                  stateSelected={stateSelected[0]}
                  updateStateSelected={updateStateSelected}
                />
              </Col>
              {/* add a card boundary */}
              {stateStat && (
                <Col md="6" sm={{ size: "auto" }}>
                  <Card
                    style={{
                      "margin-top": "50px",
                      "margin-left": "40px",
                      "margin-right": "40px",
                      padding: "10px",
                    }}
                  >
                    <CardBody>
                      <Row>
                        {/* change font bigger later */}
                        <h2>
                          <b>{stateSelected[0]}</b>
                        </h2>
                      </Row>
                      <Row>
                        <h4>Threatened status</h4>
                        <p>*** Please click the pie chart below to select different status</p>
                        <BluePieChart
                          //   data={stateSpeciesData[stateSelected[0]]}
                          data={stateStat[stateSelected[1]]}
                          width={500}
                          height={180}
                          updateEndangerType={updateEndangerType}
                        />
                      </Row>
                      <Row style={{ "margin-top": "20px" }}>
                        <h4>
                          Species under{" "}
                          <b className={endangerType.replace(/\s+/g, "")}>
                            {endangerType}
                          </b>{" "}
                          status
                        </h4>
                      </Row>
                      <Row>
                        {endangerData && xAxis && (
                          <BlueBarChart
                            width={430}
                            height={200}
                            data={endangerData}
                            xAxis={xAxis}
                            updateSpeciesSelected={updateSpeciesSelected}
                            updateIsOpen={updateIsOpen}
                          />
                        )}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              )}
            </Row>
            <Row>
              <Col md="12" xs="12">
                <Card
                  style={{
                    "margin-top": "20px",
                    "margin-left": "40px",
                    "margin-right": "40px",
                    padding: "20px",
                  }}
                >
                  <Row>
                    <h3>
                      <b>Information session</b>
                    </h3>
                    <p>
                      *** Please click the bar chart above to select the species
                    </p>
                    {/* <h5>{endangerType} {speciesSelected} - {stateSelected[0]}</h5> */}
                    <BlueModal
                      isOpen={isOpen}
                      speciesType={speciesSelected}
                      stateName={stateSelected}
                      threatStatus={endangerType}
                      updateIsOpen={updateIsOpen}
                    />
                  </Row>
                </Card>
              </Col>
            </Row>
          </Container>
        </div>
      </div>
      {/* <div>
                <BlueModal isOpen={isOpen} speciesType={speciesSelected} stateName={stateSelected} threatStatus={endangerType} updateIsOpen={updateIsOpen} />
            </div> */}
    </>
  );
}

export default MarineLife;
