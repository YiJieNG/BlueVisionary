import { Container, Row, Col, Card, CardBody, Tooltip } from "reactstrap";
import { useEffect, useState } from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { Typography } from "@mui/material";
import InputLabel from "@mui/material/InputLabel";
import MenuItem from "@mui/material/MenuItem";
import FormControl from "@mui/material/FormControl";
import Select from "@mui/material/Select";
import axios from "axios";
import PollutionLefMap from "./PollutionLefMap";
import PollutionLineChart from "./PollutionLineChart";
import PollutionDistribution from "./PollutionDistribution";
import PollutionDataInsights from "./PollutionDataInsights";
import { FaInfoCircle } from "react-icons/fa";

const marks = [
  {
    value: 2021,
    label: "2021",
  },
  {
    value: 2022,
    label: "2022",
  },
  {
    value: 2023,
    label: "2023",
  },
  {
    value: 2024,
    label: "2024",
  },
  {
    value: 2025,
    label: "All",
  },
];

function Pollution() {
  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [pollutionData, setPollutionData] = useState(); // Pollution data from backend
  const [filteredStates, setFilteredStates] = useState([]); // All available stated
  const [pollutionLine, setPollutionLine] = useState(); // Pollution type data
  const [pollutionRadar, setPollutionRadar] = useState();
  // const [selectedPollutionType, setSelectedPollutionType] = useState("polyethylene");
  // const [pollutionSuggestion, setPollutionSuggestion] = useState();

  const [tooltipStateOpen, setTooltipStateOpen] = useState(false);
  const toggleState = () => setTooltipStateOpen(!tooltipStateOpen);

  const [tooltipYearOpen, setTooltipYearOpen] = useState(false);
  const toggleYear = () => setTooltipYearOpen(!tooltipYearOpen);

  const stateInfo = () => {
    return (
      <div className="custom-tooltip">
        <p>ACT has been excluded due to the absence of ocean pollution.</p>
      </div>
    );
  };

  const yearInfo = () => {
    return (
      <div className="custom-tooltip">
        <p>Data collected from January 2021 to April 2024.</p>
      </div>
    );
  };

  // Handle state dropdown change
  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);
  };

  // Handle year dropdown change
  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
  };

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/get_pollution_type_all")
      .then((res) => {
        setPollutionLine(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, []);
  useEffect(() => {
    // get heatmap data
    axios
      .get(`http://127.0.0.1:5000/api/get_pollution_intensity/${selectedYear}`)
      .then((res) => {
        setPollutionData(res.data);
        const statesForYear = res.data.map((p) => p.state);
        setFilteredStates(statesForYear);
        if (!statesForYear.includes(selectedState)) {
          setSelectedState("ALL");
        }
      })
      .catch((err) => {
        console.log(err);
      });
    // get radar data
    axios
      .get(`http://127.0.0.1:5000/api/get_pollution_type/${selectedYear}`)
      .then((res) => {
        setPollutionRadar(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [selectedYear]);
  return (
    <>
      <div className="section-with-space section-pollution">
        <div className="marine-life-content">
          {pollutionData && pollutionLine && pollutionRadar && (
            <Container fluid>
              <Row>
                <Col
                  md={6}
                  className="scrollable-col"
                  style={{
                    paddingLeft: 100,
                    paddingRight: 100,
                    boxShadow: "4 0px 6px rgba(39, 74, 230, 0.2)",
                  }}
                >
                  <Row style={{ marginTop: 50 }}>
                    <h2>Explore Plastic Pollution Distribution</h2>
                    <h5
                      style={{
                        fontWeight: "bold",
                        color: "#3f4447",
                        margin: "0 0 30px",
                      }}
                    >
                      Explore the distribution of microplastics across different
                      states in Australia. Delve into detailed insights on
                      various polymer types, identify their potential sources,
                      and discover sustainable alternatives to common plastic
                      products.
                    </h5>
                  </Row>

                  <Card>
                    <CardBody
                      style={{
                        boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <h5 style={{ padding: "10px 30px 0" }}>Filtered by :</h5>
                      <Row style={{ marginTop: 30 }}>
                        <Col>
                          <h3
                            style={{
                              color: "#1c3c58",
                              fontWeight: "bold",
                              fontSize: "1.3rem",
                              padding: "0 30px",
                            }}
                          >
                            State
                            <span
                              id="stateInfo"
                              style={{
                                marginLeft: "10px",
                                paddingBottom: "10px",
                                fontSize: "1.3rem",
                                cursor: "pointer",
                              }}
                            >
                              <FaInfoCircle />
                            </span>
                            <Tooltip
                              isOpen={tooltipStateOpen}
                              target="stateInfo"
                              toggle={toggleState}
                              placement="right"
                              style={{ width: "200%" }}
                            >
                              {stateInfo}
                            </Tooltip>
                          </h3>{" "}
                          <Box sx={{ minWidth: 50, padding: "0 40px 0 30px" }}>
                            <FormControl fullWidth>
                              {/* <InputLabel
                                id="demo-simple-select-label"
                                sx={{
                                  color: "#1c3c58",
                                  fontWeight: "bold",
                                }}
                                style={{ fontSize: "20px" }}
                              >
                                State
                              </InputLabel> */}

                              <Select
                                id="demo-simple-select"
                                value={selectedState}
                                onChange={handleStateChange}
                                sx={{
                                  fontWeight: "bold",
                                  backgroundColor: "#a8caed", // Light blue background
                                  color: "#1c3c58", // Text color
                                  fontSize: "1rem",
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1c3c58", // Outline border color
                                    borderWidth: "2px", // Ensure border is complete
                                    "& legend": {
                                      width: 0, // Completely remove the white gap
                                      visibility: "hidden", // Ensure it doesn't render
                                    },
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#284567", // Focus border color
                                      borderWidth: "2px",
                                    },
                                  "& .MuiSelect-select": {
                                    padding: "16px", // Increase padding to make it look better without the label
                                  },
                                }}
                              >
                                <MenuItem value="ALL">All States</MenuItem>
                                {filteredStates.map((p) => (
                                  <MenuItem key={p} value={p}>
                                    {p}
                                  </MenuItem>
                                ))}
                              </Select>
                            </FormControl>
                          </Box>
                        </Col>
                        <Col>
                          <Box sx={{ width: "100%", padding: "0 30px 0 5px" }}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              sx={{
                                fontWeight: "bold",
                              }}
                              style={{
                                color: "#1c3c58",
                                fontSize: "1.3rem",
                              }}
                            >
                              Year Range
                              <span
                                id="yearInfo"
                                style={{
                                  marginLeft: "10px",
                                  paddingBottom: "10px",
                                  fontSize: "1.3rem",
                                  cursor: "pointer",
                                }}
                              >
                                <FaInfoCircle />
                              </span>
                              <Tooltip
                                isOpen={tooltipYearOpen}
                                target="yearInfo"
                                toggle={toggleYear}
                                placement="right"
                                style={{ width: "200%" }}
                              >
                                {yearInfo}
                              </Tooltip>
                            </Typography>

                            <Slider
                              defaultValue={2024}
                              step={null}
                              track={false}
                              // valueLabelDisplay="auto"
                              min={2021}
                              max={2025}
                              marks={marks}
                              onChange={handleYearChange}
                            />
                          </Box>
                        </Col>
                      </Row>
                    </CardBody>
                  </Card>

                  <hr className="solid" />
                  <Row>
                    <PollutionDistribution
                      data={pollutionRadar}
                      selectedState={selectedState}
                    />
                  </Row>
                  <hr className="solid" />
                  <Row>
                    <Card
                      style={{
                        width: "95%",
                        margin: "0 auto",
                        boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <CardBody>
                        <PollutionLineChart
                          data={pollutionLine}
                          selectedState={selectedState}
                        />
                      </CardBody>
                    </Card>
                  </Row>
                  <hr className="solid" />
                  <Row>
                    <Card
                      className="scrollable-linechart-content pollution-card"
                      variant="outlined"
                      style={{
                        width: "95%",
                        margin: "0 auto",
                        boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <CardBody>
                        <PollutionDataInsights selectedState={selectedState} />
                      </CardBody>
                    </Card>
                  </Row>
                  <hr className="solid" />
                  <Row>
                    <Col md="12" xs="12" style={{ paddingBottom: "2rem" }}>
                      <Card
                        style={{
                          width: "100%",
                          margin: "0 auto",
                          padding: "20px",
                          boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)",
                        }}
                      >
                        <h4>
                          <b>Data References</b>
                        </h4>
                        <p>
                          <strong>MicroPlastic distribution dataset: </strong>
                          https://portal.aodn.org.au/search?uuid=fd3d74b0-0234-4864-bbc6-751c44e41f5e
                        </p>
                      </Card>
                    </Col>
                  </Row>
                </Col>
                <Col md={6}>
                  <PollutionLefMap
                    selectedState={selectedState}
                    pollutionData={pollutionData}
                  />
                </Col>
              </Row>
            </Container>
          )}
        </div>
      </div>
    </>
  );
}

export default Pollution;
