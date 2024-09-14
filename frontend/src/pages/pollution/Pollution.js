import { Container, Row, Col, Card, CardBody } from "reactstrap";
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
    label: "all",
  },
];

function Pollution() {
  const [selectedState, setSelectedState] = useState("ALL");
  const [selectedYear, setSelectedYear] = useState("2024");
  const [pollutionData, setPollutionData] = useState(); // Pollution data from backend
  const [filteredStates, setFilteredStates] = useState([]); // All available stated
  const [pollutionType, setPollutionType] = useState(); // Pollution type data
  const [pollutionRadar, setPollutionRadar] = useState();
  // const [selectedPollutionType, setSelectedPollutionType] = useState("polyethylene");
  // const [pollutionSuggestion, setPollutionSuggestion] = useState();

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

  // // Handle radar click event to change selected pollution type
  // const handlePollutionTypeChange = (newType) => {
  //     setSelectedPollutionType(newType);
  // };

  // useEffect(() => {
  //     axios
  //         .get(`http://127.0.0.1:5000/api/get_pollution_type_suggestions/${selectedPollutionType}`)
  //         .then((res) => {
  //             setPollutionSuggestion(res.data);
  //         })
  //         .catch((err) => {
  //             console.log(err);
  //         });
  // }, [selectedPollutionType]);

  useEffect(() => {
    axios
      .get("http://127.0.0.1:5000/api/get_pollution_type_all")
      .then((res) => {
        setPollutionType(res.data);
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
          {pollutionData && pollutionType && pollutionRadar && (
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
                    <h2>Explore Plastic Pollution Distribution now</h2>
                    <h4
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
                    </h4>
                  </Row>

                  <Card>
                    <CardBody
                      style={{
                        boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)",
                      }}
                    >
                      <h5 style={{ padding: "10px 60px 0" }}>Filtered by:</h5>
                      <Row style={{ marginTop: 30 }}>
                        <Col>
                          <h3
                            style={{
                              color: "#1c3c58",
                              fontWeight: "bold",
                              fontSize: "25px",
                              padding: "0 60px",
                            }}
                          >
                            State
                          </h3>
                          <Box sx={{ minWidth: 50, padding: "0 100px 0 60px" }}>
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
                                  fontSize: "20px",
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
                          <Box sx={{ width: "100%", padding: "0 60px" }}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              sx={{
                                fontWeight: "bold",
                              }}
                              style={{
                                color: "#1c3c58",
                                fontSize: "25px",
                              }}
                            >
                              Year Range
                            </Typography>
                            <Slider
                              defaultValue={2024}
                              step={1}
                              valueLabelDisplay="auto"
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
                    <PollutionLineChart data={pollutionType} />
                  </Row>
                  <hr className="solid" />
                  <Row>
                    <PollutionDistribution
                      data={pollutionRadar}
                      selectedState={selectedState}
                    />
                  </Row>
                  {/* <Row style={{ marginTop: 10}}>
                                        <Card className="hover-card" variant="outlined" style={{ maxWidth: 600, margin: "0 auto" }}>
                                            <CardContent className="chart-container">
                                                <Box className="line-chart-wrapper">
                                                    <div className="chart">
                                                        <PollutionLineChart data={pollutionType} />
                                                    </div>
                                                </Box>
                                                <Typography className="hover-text" variant="body2" component="div">
                                                    Trend for pollution
                                                </Typography>
                                            </CardContent>
                                        </Card>

                                    </Row> */}
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
