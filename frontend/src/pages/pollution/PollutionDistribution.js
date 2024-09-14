import { useEffect, useState } from "react";
import {
  Container,
  Row,
  Col,
  Dropdown,
  DropdownToggle,
  DropdownMenu,
  DropdownItem,
} from "reactstrap";
import { Card, CardContent, Grid, Typography } from "@mui/material";
import { FaAngleRight } from "react-icons/fa";

import axios from "axios";
import PollutionRadarChart from "./PollutionRadarChart";

function PollutionDistribution({ data, selectedState }) {
  const [selectedPollutionType, setSelectedPollutionType] =
    useState("polyethylene");
  const [pollutionSuggestion, setPollutionSuggestion] = useState();
  const [dropdownOpen, setDropdownOpen] = useState(false);

  // Handle radar click event to change selected pollution type
  const handlePollutionTypeChange = (newType) => {
    setSelectedPollutionType(newType);
  };

  const handleSelect = (type) => {
    setSelectedPollutionType(type); // Update the selected pollution type
    // setDropdownOpen(false);  // Optionally close the dropdown
  };

  const toggle = () => setDropdownOpen(!dropdownOpen);

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000/api/get_pollution_type_suggestions/${selectedPollutionType}`
      )
      .then((res) => {
        setPollutionSuggestion(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedPollutionType]);

  return (
    <>
      {pollutionSuggestion && (
        <Container>
          <Row>
            <div>
              <h3>Distribution of Plastic Types by Material</h3>
              <h5 style={{ fontWeight: "bold", color: "#3f4447" }}>
                This chart visualizes the distribution of various plastic types,
                highlighting the prevalence of materials.
              </h5>
            </div>
            <div
              style={{
                height: "500px",
                width: "100%",
                display: "flex",
                justifyContent: "center",
              }}
            >
              <PollutionRadarChart
                data={data}
                selectedState={selectedState}
                handlePollutionTypeChange={handlePollutionTypeChange}
              />
            </div>
          </Row>
          <hr className="solid" />
          <Row>
            <div style={{ display: "flex", alignItems: "center" }}>
              <span className="span-h3">Insights of </span>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret style={{ width: "180px" }}>
                  {selectedPollutionType}
                </DropdownToggle>
                <DropdownMenu style={{ width: "180px" }}>
                  <DropdownItem onClick={() => handleSelect("polyethylene")}>
                    polyethylene
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("polypropylene")}>
                    polypropylene
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleSelect("polyethylene glycol")}
                  >
                    polyethylene glycol
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("polystyrene")}>
                    polystyrene
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("thermoset")}>
                    thermoset
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("thermoplastic")}>
                    thermoplastic
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("other")}>
                    other
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
            </div>
          </Row>
          {/* <hr className="solid" /> */}
          <Row>
            <h4>Potential Source</h4>
            <div>
              {pollutionSuggestion.sources.map((source, index) => (
                <span className="span-card" key={index}>
                  {source}
                </span>
              ))}
            </div>
          </Row>
          {/* <hr className="solid" /> */}
          <Row>
            {/* <h4>Potential Products & Alternatives</h4> */}
            <Card
              className="pollution-card"
              variant="outlined"
              style={{ width: "95%", margin: "0 auto" }}
            >
              <CardContent>
                <Row>
                  <h4>Potential Products & Alternatives</h4>
                </Row>
                <Row className="scrollable-suggestion-content">
                  {pollutionSuggestion.products.map((source, index) => (
                    <Row key={index}>
                      <Col md={5}>
                        <Card style={{ margin: 5, height: 110 }}>
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <img
                                width="25px"
                                height="25px"
                                src={source[0].img}
                                alt={source[0].alt}
                              />
                            </Grid>
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ marginTop: "16px" }}
                            >
                              {source[0].name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Col>
                      <Col
                        md={2}
                        style={{
                          display: "flex",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <div className="alternatives-arrow">
                          <FaAngleRight />
                        </div>
                      </Col>
                      <Col md={5}>
                        <Card style={{ margin: 5, height: 110 }}>
                          <CardContent
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                            }}
                          >
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <img
                                width="25px"
                                height="25px"
                                src={source[1].img}
                                alt={source[1].alt}
                              />
                            </Grid>
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ marginTop: "16px" }}
                            >
                              {source[1].name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Col>
                    </Row>
                  ))}
                </Row>
              </CardContent>
            </Card>
          </Row>
          <hr className="solid" />
          {pollutionSuggestion.other.length > 0 && (
            <Row>
              <h4>Other potential products</h4>
              <Row
                className="justify-content-start"
                style={{ overflowX: "auto", whiteSpace: "nowrap" }}
              >
                {pollutionSuggestion.other.map((source, index) => (
                  <Col key={index} md={3}>
                    <Card style={{ margin: 5 }}>
                      <CardContent
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        <Grid
                          container
                          justifyContent="center"
                          alignItems="center"
                        >
                          <img
                            width="25px"
                            height="25px"
                            src={source.img}
                            alt={source.alt}
                          />
                        </Grid>
                        <Typography
                          variant="h6"
                          align="center"
                          sx={{ marginTop: "16px" }}
                        >
                          {source.name}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Col>
                ))}
              </Row>
            </Row>
          )}
        </Container>
      )}
    </>
  );
}

export default PollutionDistribution;
