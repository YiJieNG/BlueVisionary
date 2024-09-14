import { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody } from "reactstrap";
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
      .get("http://127.0.0.1:5000/api/get_state_stat")
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
        `http://127.0.0.1:5000/api/get_state_species/${stateSelected[1]}/${endangerType}`
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
        <div className="section-marinelife marine-life-content">
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
                      margin: "50px 40px 30px 40px",
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
                        <p>
                          <strong>
                            Please click the pie chart below to select different
                            status
                          </strong>
                        </p>
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
              <Col md="12" xs="12" style={{ paddingBottom: "2rem" }}>
                <Card
                  style={{
                    "margin-top": "20px",
                    "margin-left": "40px",
                    "margin-right": "40px",
                    padding: "20px",
                  }}
                >
                  <Row>
                    <h4>
                      <b>Information session</b>
                    </h4>
                    <p>
                      <strong>
                        Please click the bar chart above to select the species
                      </strong>
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
            <Row>
              <Col md="12" xs="12" style={{ paddingBottom: "2rem" }}>
                <Card
                  style={{
                    "margin-top": "20px",
                    "margin-left": "40px",
                    "margin-right": "40px",
                    padding: "20px",
                  }}
                >
                  <h4>
                    <b>Data References</b>
                  </h4>
                  <p>
                    <strong>Species dataset: </strong>
                    https://fed.dcceew.gov.au/datasets/erin::species-of-national-environmental-significance-and-selected-marine-and-cetacean-species/explore?location=-19.690183%2C-73.460000%2C2.72&showTable=true
                  </p>
                  <p>
                    <strong>Species state: </strong>
                    https://data.gov.au/data/dataset/ae652011-f39e-4c6c-91b8-1dc2d2dfee8f/resource/78401dce-1f40-49d3-92c4-3713d6e34974/download/20240716spcs.csv
                  </p>
                  <p>
                    <strong>Species API narrative: </strong>
                    https://apiv3.iucnredlist.org/api/v3/docs#version
                  </p>
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
