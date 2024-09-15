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
    useState("Polyethylene");
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
              <span className="span-h3">What is </span>
              <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle
                  caret
                  style={{
                    width: "180px",
                    borderColor: "#1c3c58", // Outline border color
                    borderWidth: "2px",
                    fontWeight: "bold",
                    backgroundColor: "#a8caed", // Light blue background
                    color: "#1c3c58", // Text color
                    fontSize: "1rem",
                  }}
                >
                  {selectedPollutionType}
                </DropdownToggle>
                <DropdownMenu style={{ width: "180px" }}>
                  <DropdownItem onClick={() => handleSelect("Polyethylene")}>
                    Polyethylene
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("Polypropylene")}>
                    Polypropylene
                  </DropdownItem>
                  <DropdownItem
                    onClick={() => handleSelect("Polyethylene Glycol")}
                  >
                    Polyethylene Glycol
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("Polystyrene")}>
                    Polystyrene
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("Thermoset")}>
                    Thermoset
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("Thermoplastic")}>
                    Thermoplastic
                  </DropdownItem>
                  <DropdownItem onClick={() => handleSelect("Other")}>
                    Other
                  </DropdownItem>
                </DropdownMenu>
              </Dropdown>
              <span className="span-h3" style={{ paddingLeft: "10px" }}>
                ?
              </span>
            </div>
          </Row>
          {/* <hr className="solid" /> */}
          <Row className="polytype-padding">
            <h4 style={{ color: "#006895" }}>1. It potentially came from </h4>
            <Card
              style={{
                width: "95%",
                margin: "0 auto",
                boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <div>
                  {pollutionSuggestion.sources.map((source, index) => (
                    <span className="span-card" key={index}>
                      {source}
                    </span>
                  ))}
                </div>
              </CardContent>
            </Card>
          </Row>
          {/* <hr className="solid" /> */}
          <Row className="polytype-padding">
            <h4 style={{ color: "#006895" }}>
              2. The potential plastic products & suggested alternatives
            </h4>
            <Card
              className="pollution-card"
              variant="outlined"
              style={{
                width: "95%",
                margin: "0 auto",
                boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)",
              }}
            >
              <CardContent>
                <Row className="scrollable-suggestion-content">
                  <Row style={{ paddingTop: 15 }}>
                    <Col
                      md={5}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Product</h5>
                    </Col>
                    <Col
                      md={2}
                      style={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <div className="alternatives-arrow"></div>
                    </Col>
                    <Col
                      md={5}
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "center",
                        alignItems: "center",
                      }}
                    >
                      <h5>Alternative</h5>
                    </Col>
                  </Row>

                  {pollutionSuggestion.products.map((source, index) => (
                    <Row key={index}>
                      <Col md={5}>
                        <Card
                          style={{
                            margin: 15,
                            height: 210,
                            backgroundColor: "#d4e9ff",
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            border: "5px solid #003366",
                          }}
                        >
                          <CardContent className="custom-card"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <img
                                width="50px"
                                height="50px"
                                src={source[0].img}
                                alt={source[0].alt}
                              />
                            </Grid>
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ margin: "16px 0 0" }}
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
                        <Card
                          style={{
                            margin: 15,
                            height: 210,
                            backgroundColor: "#d4e9ff",
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            border: "5px solid #003366",
                          }}
                        >
                          <CardContent className="custom-card"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <img
                                width="50px"
                                height="50px"
                                src={source[1].img}
                                alt={source[1].alt}
                              />
                            </Grid>
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ margin: "16px 0 0" }}
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
          {pollutionSuggestion.other.length > 0 && (
            <Row className="polytype-padding">
              <h4 style={{ color: "#006895" }}>
                3. Other potential plastic products
              </h4>
              <Card
                className="pollution-card"
                variant="outlined"
                style={{
                  width: "95%",
                  margin: "0 auto",
                  boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)",
                }}
              >
                <CardContent>
                  <Row
                    className="justify-content-start"
                    style={{
                      display: "flex",
                      overflowX: "auto",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {pollutionSuggestion.other.map((source, index) => (
                      <Col key={index} md={6}>
                        <Card
                          style={{
                            margin: 15,
                            height: 210,
                            backgroundColor: "#d4e9ff",
                            borderRadius: "15px",
                            boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
                            border: "5px solid #003366",
                          }}
                        >
                          <CardContent className="custom-card"
                            sx={{
                              display: "flex",
                              flexDirection: "column",
                              justifyContent: "center",
                              alignItems: "center",
                              height: "100%",
                            }}
                          >
                            <Grid
                              container
                              justifyContent="center"
                              alignItems="center"
                            >
                              <img
                                width="50px"
                                height="50px"
                                src={source.img}
                                alt={source.alt}
                              />
                            </Grid>
                            <Typography
                              variant="h6"
                              align="center"
                              sx={{ margin: "16px 0 0" }}
                            >
                              {source.name}
                            </Typography>
                          </CardContent>
                        </Card>
                      </Col>
                    ))}
                  </Row>
                </CardContent>
              </Card>
            </Row>
          )}
        </Container>
      )}
    </>
  );
}

export default PollutionDistribution;
