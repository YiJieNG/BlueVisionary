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
    const [pollutionType, setPollutionType] = useState(); // Pollution type data
    const [pollutionRadar, setPolollutionRadar] = useState();
    const [selectedPollutionType, setSelectedPollutionType] = useState("polyethylene");
    const [pollutionSuggestion, setPollutionSuggestion] = useState();

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

    // Handle radar click event to change selected pollution type
    const handlePollutionTypeChange = (newType) => {
        setSelectedPollutionType(newType);
    };

    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/api/get_pollution_type_suggestions/${selectedPollutionType}`)
            .then((res) => {
                console.log(res.data);
                setPollutionSuggestion(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedPollutionType]);

    useEffect(() => {
        axios
            .get('http://127.0.0.1:5000/api/get_pollution_type_all')
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
                setPolollutionRadar(res.data);
            })
            .catch((err) => {
                console.log(err);
            });
    }, [selectedYear]);
    return (
        <>
            <div className="section-with-space">
                <div className="section-marinelife">
                    {pollutionData && pollutionType && pollutionRadar && pollutionSuggestion &&
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
                                                    max={2025}
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
                                                    <div style={{ height: '400px', width: '100%', display: "flex" ,justifyContent: 'center' }}>
                                                        <PollutionRadarChart data={pollutionRadar} selectedState={selectedState} handlePollutionTypeChange={handlePollutionTypeChange} />
                                                    </div>
                                                </Row>
                                                <Row>
                                                    <Card variant="outlined" style={{ height: "100%" }}>
                                                        <CardContent>
                                                            <Typography variant="h5" gutterBottom sx={{ display: 'block' }}><b>{selectedPollutionType}</b></Typography>
                                                            <Typography variant="h6" gutterBottom sx={{ display: 'block' }}>Potential source: </Typography>
                                                            {/* card for each souce, icon ~ text, scrollable vertical or horizontal */}
                                                            {pollutionSuggestion.sources.map((source, index) => (
                                                                <span className="span-card" key={index}>{source}</span> 
                                                            ))}
                                                            <Typography variant="h6" gutterBottom sx={{ display: 'block' }}>Potential products: </Typography>
                                                            {/* card for each products, icon ~ text, scrollable vertical or horizontal */}
                                                            {pollutionSuggestion.products.map((source, index) => (
                                                                <span className="span-card" key={index}>{source}</span>
                                                            ))}
                                                            <Typography variant="h6" component="div">Alternatives:</Typography>
                                                            {/* card for each Alternatives, icon ~ text, scrollable vertical or horizontal */}
                                                            {pollutionSuggestion.alternatives.map((source, index) => (
                                                                <span className="span-card" key={index}>{source}</span>
                                                            ))}
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
                                                        <PollutionLineChart data={pollutionType} />
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