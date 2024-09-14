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
                    <p style={{ fontWeight: "bold" }}>
                      <subtitle>
                        Explore the distribution of microplastics across
                        different states in Australia through an interactive
                        heatmap. Delve into detailed insights on various polymer
                        types, identify their potential sources, and discover
                        sustainable alternatives to common plastic products.
                        Track trends and explore solutions to reduce plastic
                        pollution.
                      </subtitle>
                    </p>
                  </Row>
                  <Card>
                    <CardBody
                      style={{ boxShadow: "0 8px 10px rgba(0, 0, 0, 0.1)" }}
                    >
                      <Row style={{ marginTop: 30 }}>
                        <Col>
                          <Box sx={{ minWidth: 120 }}>
                            <FormControl fullWidth>
                              <InputLabel
                                id="demo-simple-select-label"
                                sx={{
                                  color: "#1c3c58",
                                  fontWeight: "bold",
                                }}
                              >
                                State
                              </InputLabel>

                              <Select
                                labelId="demo-simple-select-label"
                                id="demo-simple-select"
                                value={selectedState}
                                label="State"
                                onChange={handleStateChange}
                                sx={{
                                  fontWeight: "bold",
                                  backgroundColor: "#a8caed", // Light blue background, customize as needed
                                  color: "#1c3c58", // Text color
                                  "& .MuiOutlinedInput-notchedOutline": {
                                    borderColor: "#1c3c58", // Outline border color
                                    borderWidth: "2px",
                                  },
                                  "&.Mui-focused .MuiOutlinedInput-notchedOutline":
                                    {
                                      borderColor: "#284567", // Focus border color
                                      borderWidth: "2px",
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
                          <Box sx={{ width: "100%" }}>
                            <Typography
                              variant="body2"
                              gutterBottom
                              sx={{
                                color: "#1c3c58",
                                fontWeight: "bold",
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
