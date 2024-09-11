import { Container, Row, Col } from "reactstrap";
import { useEffect, useState } from "react";
import Box from '@mui/material/Box';
import Slider from '@mui/material/Slider';
import { Card, CardContent, Typography } from "@mui/material";
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import axios from "axios";
import PollutionLefMap from "./PollutionLefMap";
import PollutionRadarChart from "./PollutionRadarChart";
import PollutionLineChart from "./PollutionLineChart";
const marks = [
    {
        value: '2021',
        label: '2021',
    },
    {
        value: '2022',
        label: '2022',
    },
    {
        value: '2023',
        label: '2023',
    },
    {
        value: '2024',
        label: '2024',
    },
];


function Pollution() {
    const [selectedState, setSelectedState] = useState('ALL');
    const [selectedYear, setSelectedYear] = useState('2024');
    const [pollutionData, setPollutionData] = useState(); // Pollution data from backend
    const [filteredStates, setFilteredStates] = useState([]); // All available stated

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
        // axios
        //     .get(
        //         `http://127.0.0.1:5000/api/get_pollution/${selectedYear}`
        //     )
        //     .then((res) => {
        //         setPollutionData(res.data);
        //         const statesForYear = res.data.map((p) => p.state);
        //         setFilteredStates(statesForYear);
        //         if (!statesForYear.includes(selectedState)) {
        //             setSelectedState("ALL");
        //         }
        //     })
        //     .catch((err) => {
        //         console.log(err);
        //     });
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
    }, [selectedYear]);
    return (
        <>
            <div className="section-with-space">
                <div className="section-marinelife">
                    {pollutionData &&
                        <Container fluid>
                            <Row>
                                <Col md={6} className="scrollable-col">
                                    <Row style={{ marginTop: 30 }}>
                                        <h3>Pollution Data Insights</h3>
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
                                                    step={1}
                                                    valueLabelDisplay="auto"
                                                    min={2021}
                                                    max={2024}
                                                    marks={marks}
                                                    onChange={handleYearChange}
                                                />
                                            </Box>
                                        </Col>
                                    </Row>
                                    <Row>
                                        <Card variant="outlined" style={{ maxWidth: 600, margin: "0 auto" }}>
                                            <CardContent>
                                                <Row>
                                                    <Col>
                                                        <div style={{ height: '220px', width: '100%' }}>
                                                            <PollutionRadarChart />
                                                        </div>
                                                    </Col>
                                                    <Col>
                                                        <Card variant="outlined" style={{ height: "100%" }}>
                                                            <CardContent>
                                                                <Typography variant="subtitle1" gutterBottom sx={{ display: 'block' }}>[Pollution type]</Typography>
                                                                <Typography variant="body2" gutterBottom sx={{ display: 'block' }}>Potential source: </Typography>
                                                            </CardContent>
                                                        </Card>
                                                    </Col>
                                                </Row>
                                                <Row style={{ marginTop: 10 }}>
                                                    <Card variant="outlined" style={{ maxWidth: 540, margin: "0 auto" }}>
                                                        <CardContent>
                                                            <Typography variant="body2" component="div">
                                                                Alternatives
                                                            </Typography>
                                                        </CardContent>
                                                    </Card>
                                                </Row>
                                            </CardContent>
                                        </Card>
                                    </Row>
                                    <Row style={{ marginTop: 10 }}>
                                        <Card className="hover-card" variant="outlined" style={{ maxWidth: 600, margin: "0 auto" }}>
                                            <CardContent className="chart-container">
                                                <Box className="line-chart-wrapper">
                                                    <div className="chart">
                                                        <PollutionLineChart />
                                                    </div>
                                                    {/* description for potential source, potential product */}
                                                </Box>
                                                <Typography className="hover-text" variant="body2" component="div">
                                                    Trend for pollution
                                                </Typography>
                                            </CardContent>
                                        </Card>

                                    </Row>
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