import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import PollutionLefMap from "./PollutionLefMap";
import PollutionLineChart from "./PollutionLineChart";
import PollutionDistribution from "./PollutionDistribution";
import PollutionDataInsights from "./PollutionDataInsights";
const marks = [
    {
        value: 2021,
        label: '2021',
    },
    {
        value: 2022,
        label: '2022',
    },
    {
        value: 2023,
        label: '2023',
    },
    {
        value: 2024,
        label: '2024',
    },
    {
        value: 2025,
        label: 'all',
    },
];


function Pollution() {
    const [selectedState, setSelectedState] = useState('ALL');
    const [selectedYear, setSelectedYear] = useState('2024');
    const [pollutionData, setPollutionData] = useState(); // Pollution data from backend
    const [filteredStates, setFilteredStates] = useState([]); // All available stated
    const [pollutionLine, setPollutionLine] = useState(); // Pollution type data
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
            .get('http://127.0.0.1:5000/api/get_pollution_type_all')
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
            .get(
                `http://127.0.0.1:5000/api/get_pollution_intensity/${selectedYear}`
            )
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
            .get(
                `http://127.0.0.1:5000/api/get_pollution_type/${selectedYear}`
            )
            .then((res) => {
                setPollutionRadar(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedYear]);
    return (
        <>
            <div className="section-with-space">
                <div className="marine-life-content">
                    {pollutionData && pollutionLine && pollutionRadar &&
                        <Container fluid>
                            <Row>
                                <Col md={6} className="scrollable-col" style={{ paddingLeft: 30, boxShadow: "4 0px 6px rgba(39, 74, 230, 0.2)" }}>
                                    <Row style={{ marginTop: 30 }}>
                                        <h2>Pollution Data Insights</h2>
                                    </Row>
                                    <Row style={{ marginTop: 30 }}>
                                        <Col>
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedState}
                                                        label="State"
                                                        onChange={handleStateChange}
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
                                            <Box sx={{ width: 300 }}>
                                                <Typography variant="body2" gutterBottom>Year Range</Typography>
                                                <Slider
                                                    defaultValue={2024}
                                                    step={null}
                                                    // valueLabelDisplay="auto"
                                                    min={2021}
                                                    max={2025}
                                                    marks={marks}
                                                    onChange={handleYearChange}
                                                />
                                            </Box>
                                        </Col>
                                    </Row>
                                    <hr className="solid" />
                                    <Row>
                                        <div style={{ height: "300px" }}>
                                            <PollutionLineChart data={pollutionLine} selectedState={selectedState} />
                                        </div>
                                    </Row>
                                    <hr className="solid" />
                                    <Row className="scrollable-linechart-content">
                                        <PollutionDataInsights selectedState={selectedState} />
                                    </Row>
                                    <hr className="solid" />
                                    <Row>
                                        <PollutionDistribution data={pollutionRadar} selectedState={selectedState} />
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
                                    <PollutionLefMap selectedState={selectedState} pollutionData={pollutionData} />
                                </Col>
                            </Row>
                        </Container>
                    }
                </div>
            </div>
        </>
    );
}

export default Pollution;