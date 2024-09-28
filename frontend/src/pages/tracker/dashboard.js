import { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { styled } from '@mui/material/styles';
import FormControlLabel from '@mui/material/FormControlLabel';
import { Switch, Typography, Grid } from '@mui/material';
// import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from '@mui/material/Stack';
import { Button, Col, Container, Row, Input } from "reactstrap";
import PlasticStackBarChart from "./PlasticStackBarChart";
import {
    addDataToDB,
    getAllDataFromDB,
    deleteAllData,
    getDataWithinDateRange,
} from "../../util/db";
import plasticDataTest from "./plasticInputTest.json";
import { useNavigate } from "react-router-dom";
import PlasticLineChart from "./PlasticLineChart";

function Dashboard() {
    // const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedShowType, setSelectedShowType] = useState("Past 7 days");//past 7 days, this month, this year(start at month has data)
    const [dataset, setDataset] = useState();
    const [xLabels, setXLabels] = useState();
    const [checked, setChecked] = useState(false);
    const [selectedCountType, setSelectedCountType] = useState("weight");
    const [totalWeight, setTotalWeight] = useState();
    const [xTooltip, setXTooltip] = useState();

    const handleChange = (event) => {
        setChecked(event.target.checked);
        if (event.target.checked) {
            setSelectedCountType("count");
        } else {
            setSelectedCountType("weight");
        }
    };


    // console.log(yesterday);
    // function getRandomArbitrary(min, max) {
    //     return Math.random() * (max - min) + min;
    //   }

    // const handleAddData = async () => {
    //     const currentDate = new Date().getTime();
    //     for(let i = 1; i < 30; i += 1) {
    //         const yesterday = new Date().setDate(new Date().getDate() - i);

    //         for (var plasticType in plasticDataTest.plasticItems) {
    //             console.log(plasticType);
    //             const newData = {
    //                 // date: currentDate,
    //                 date: yesterday,
    //                 type: plasticType,
    //                 weight: getRandomArbitrary(0,15),
    //                 count:
    //                     plasticDataTest.plasticItems[plasticType].approximateCount,
    //             };
    //             await addDataToDB(newData);
    //         }

    //         // Update state to show new data
    //         const updatedData = await getAllDataFromDB();
    //         setData(updatedData);
    //     }

    // };

    // const handleDeleteData = async () => {
    //     await deleteAllData();
    //     // Update state to show new data
    //     const updatedData = await getAllDataFromDB();
    //     setData(updatedData);
    // };

    // const handleSelectedData = async () => {
    //     const startDate = new Date("2024-09-22T00:00:00"); // Example start date
    //     console.log(new Date(startDate).toString());
    //     const endDate = new Date(); // Example end date
    //     // await getDataWithinDateRange(startDate, endDate);
    //     const results = await getDataWithinDateRange(startDate, endDate);
    //     setSelectedData(results);
    // };

    const fetchSelectedData = async (startDate, endDate) => {
        const results = await getDataWithinDateRange(startDate, endDate);
        setSelectedData(results);
    }

    const navigate = useNavigate();

    const navigateToPlasticInput = () => {
        navigate("/plasticInput");
    };

    const navigateToFacility = () => {
        navigate("/facility");
    };

    const barColor = {
        // "Plastic Bag": "#66B2FF",
        // "Plastic Bottle": "#FF9999",
        // "Plastic Container": "#FFCC99",
        // "Plastic Cup": "#FFFF99",
        // "Plastic Straw": "#99FFCC",
        // "Plastic Utensil": "#CCCCFF"
        "Plastic Bag": "rgba(102,178,255,0.8)",
        "Plastic Bottle": "rgba(255,153,153,0.8)",
        "Plastic Container": "rgba(255,204,153,0.8)",
        "Plastic Cup": "rgba(255,255,153,0.8)",
        "Plastic Straw": "rgba(153,255,204,0.8)",
        "Plastic Utensil": "rgba(204,204,255,0.8)"
    }

    const MaterialUISwitch = styled(Switch)(({ theme }) => ({
        width: 62,
        height: 34,
        padding: 7,
        '& .MuiSwitch-switchBase': {
            margin: 1,
            padding: 0,
            transform: 'translateX(6px)',
            '&.Mui-checked': {
                color: '#fff',
                transform: 'translateX(22px)',
                '& .MuiSwitch-thumb:before': {
                    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                        '#fff',
                    )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
                },
                '& + .MuiSwitch-track': {
                    opacity: 1,
                    backgroundColor: '#aab4be',
                },
            },
        },
        '& .MuiSwitch-thumb': {
            backgroundColor: '#001e3c',
            width: 32,
            height: 32,
            '&::before': {
                content: "''",
                position: 'absolute',
                width: '100%',
                height: '100%',
                left: 0,
                top: 0,
                backgroundRepeat: 'no-repeat',
                backgroundPosition: 'center',
                backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
                    '#fff',
                )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
            },
        },
        '& .MuiSwitch-track': {
            opacity: 1,
            backgroundColor: '#aab4be',
            borderRadius: 20 / 2,
        },
    }));

    const fetchYearWeight = async (startDate, endDate) => {
        const results = await getDataWithinDateRange(startDate, endDate);
        let totalWeight = 0;
        results.forEach((item) => {
            totalWeight += item.weight;
        });
        setTotalWeight(totalWeight);
    }

    useEffect(() => {
        const startOfYear = new Date(new Date().getFullYear(), 0, 1);
        fetchYearWeight(startOfYear, new Date());
    }, []);

    useEffect(() => {
        // Fetch data from indexedDB based on selected date range
        const endDate = new Date();
        const startDate = new Date();
        if (selectedShowType === "Past 7 days") {
            startDate.setDate(endDate.getDate() - 7);
        } else if (selectedShowType === "Past 30 days") {
            startDate.setDate(endDate.getDate() - 30);
        } else {
            startDate.setDate(endDate.getDate() - 365);
        }
        startDate.setHours(0, 0, 0, 0);

        // Fetch data from IndexedDB when the component loads
        fetchSelectedData(startDate, endDate);
    }, [selectedShowType]);

    useEffect(() => {
        // Assemble data for stacked bar chart
        if (selectedData.length <= 0) return;
        if (selectedShowType === "Past 7 days") {
            const dayNames = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
            const todayIndex = new Date().getDay();
            // console.log(todayIndex);
            const today = new Date();
            const pastDate = new Date();
            const tooltipText = [];
            for(let i = 6; i >= 0; i--) {
                pastDate.setDate(today.getDate() - i);
                tooltipText.push(pastDate.toLocaleDateString('en-GB'));
            }
            console.log(tooltipText);
            setXTooltip(tooltipText);

            const rearrangedDays = todayIndex === 6 ? dayNames : dayNames.slice(todayIndex + 1).concat(dayNames.slice(0, todayIndex + 1));
            setXLabels(rearrangedDays);
            const plasticData = {};
            selectedData.forEach((item) => {
                const dayName = dayNames[new Date(item.date).getDay()];
                if (!(item.type in plasticData)) {
                    plasticData[item.type] = {
                        label: item.type,
                        data: [0, 0, 0, 0, 0, 0, 0],
                        stack: "total",
                        color: barColor[item.type]
                    }
                }
                if (selectedCountType === "weight") {
                    plasticData[item.type].data[rearrangedDays.indexOf(dayName)] += item.weight;
                } else {
                    plasticData[item.type].data[rearrangedDays.indexOf(dayName)] += item.count;
                }
            });
            const chartData = [];
            for (const key in plasticData) {
                chartData.push(plasticData[key]);
            }
            // console.log(chartData);
            // console.log(rearrangedDays);
            setDataset(chartData);
        } else if (selectedShowType === "Past 30 days") { // scrollable for x axis
            const dates = [];
            const today = new Date();
            for (let i = 29; i >= 0; i--) {
                const pastDate = new Date();
                pastDate.setDate(today.getDate() - i);
                dates.push(pastDate.getDate()); // You can format the date as needed
            }
            setXLabels(dates);

            const plasticData = {};
            selectedData.forEach((item) => {
                const dayName = new Date(item.date).getDate();
                if (!(item.type in plasticData)) {
                    plasticData[item.type] = {
                        label: item.type,
                        data: new Array(30).fill(0),
                        stack: 'total',
                        color: barColor[item.type]
                    }
                }
                if (selectedCountType === "weight") {
                    plasticData[item.type].data[dates.indexOf(dayName)] += item.weight;
                } else {
                    plasticData[item.type].data[dates.indexOf(dayName)] += item.count;
                }
            });
            const chartData = [];
            for (const key in plasticData) {
                chartData.push(plasticData[key]);
            }
            // console.log(chartData);
            // console.log(dates);
            setDataset(chartData);


        } else {
            const monthNames = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];

            const todayIndex = new Date().getMonth();
            // console.log(todayIndex);

            const rearrangedMonths = todayIndex === 11 ? monthNames : monthNames.slice(todayIndex + 1).concat(monthNames.slice(0, todayIndex + 1));
            setXLabels(rearrangedMonths);

            const plasticData = {};
            selectedData.forEach((item) => {
                const monthName = monthNames[new Date(item.date).getMonth()];
                if (!(item.type in plasticData)) {
                    plasticData[item.type] = {
                        label: item.type,
                        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
                        stack: 'total',
                        color: barColor[item.type]
                    }
                }
                if (selectedCountType === "weight") {
                    plasticData[item.type].data[rearrangedMonths.indexOf(monthName)] += item.weight;
                } else {
                    plasticData[item.type].data[rearrangedMonths.indexOf(monthName)] += item.count;
                }
            });
            const chartData = [];
            for (const key in plasticData) {
                chartData.push(plasticData[key]);
            }
            // console.log(chartData);
            // console.log(rearrangedMonths);
            setDataset(chartData);

        }
    }, [selectedData, selectedCountType]);

    return (
        <>
            <div className="section-with-space">
                <div className="section-marinelife">
                    <Container fluid>
                        <Row>
                            <Col md="8">
                                <Card style={{ height: "100%" }}>
                                    <CardContent>
                                        <Row>
                                            <h4>
                                                Plastic history
                                            </h4>
                                        </Row>
                                        <Row>
                                            <Col>
                                                <Input
                                                    type="select"
                                                    value={selectedShowType}
                                                    style={{ width: 160 }}
                                                    onChange={(e) => setSelectedShowType(e.target.value)}
                                                >
                                                    <option>
                                                        Past 7 days
                                                    </option>
                                                    <option>
                                                        Past 30 days
                                                    </option>
                                                    <option>
                                                        This year
                                                    </option>
                                                </Input>
                                            </Col>
                                            <Col>
                                                <Grid container alignItems="center" justifyContent="center" spacing={1}>
                                                    <Grid item>
                                                        <Typography variant="body1">Weight</Typography>
                                                    </Grid>
                                                    <Grid item>
                                                        <MaterialUISwitch checked={checked} onChange={handleChange} />
                                                    </Grid>
                                                    <Grid item>
                                                        <Typography variant="body1">Count</Typography>
                                                    </Grid>
                                                </Grid>
                                            </Col>
                                        </Row>
                                        <Row>
                                            {xLabels && xLabels.length > 0 && dataset && dataset.length > 0 &&
                                                <PlasticStackBarChart xLabels={xLabels} dataset={dataset}/>
                                            }
                                        </Row>
                                    </CardContent>
                                </Card>
                            </Col>
                            <Col md="4">
                                <Card style={{ height: "100%" }}>
                                    <CardContent>
                                        <Row
                                            style={{
                                                display: "flex",
                                                justifyContent: "center",
                                                alignItems: "center", // Center horizontally
                                                textAlign: "center", // Center text
                                                height: "100%",
                                            }}
                                        >
                                            <h4>Your Contribution</h4>
                                            <div>8%</div>
                                            <div>Total weight: {totalWeight}</div>
                                        </Row>
                                        <Row>
                                            <Card>
                                                <CardContent>
                                                    <PlasticLineChart />
                                                </CardContent>
                                            </Card>
                                        </Row>
                                    </CardContent>
                                </Card>
                            </Col>
                        </Row>
                        <Row style={{ marginTop: 20 }}>
                            <Col className="d-flex justify-content-center align-items-center">
                                <Button color="primary" onClick={navigateToPlasticInput}>
                                    {" "}
                                    Make contribution
                                </Button>
                            </Col>
                            <Col className="d-flex justify-content-center align-items-center">
                                <Button color="primary" onClick={navigateToFacility}>
                                    {" "}
                                    Find location
                                </Button>
                            </Col>
                        </Row>
                        {/* <Row>
                            <h1>IndexedDB Example</h1>
                        </Row>
                        <Row>
                            <Col>
                                <Button color="dark" onClick={handleAddData}>
                                    Add Data
                                </Button>
                            </Col>
                            <Col>
                                <Button color="dark" onClick={handleDeleteData}>
                                    Delete All Data
                                </Button>
                            </Col>
                            <Col>
                                <Button color="dark" onClick={handleSelectedData}>
                                    Get Selected Data
                                </Button>
                            </Col>
                        </Row>
                        <Row>
                            <h2>Stored Data:</h2>
                            <ul>
                                {data.map((item, index) => (
                                    <li key={index}>
                                        {new Date(item.date).toString()}-{item.date}-{item.type}-
                                        {item.weight}
                                    </li>
                                ))}
                            </ul>
                        </Row> */}
                        {/* <Row>
                            <h2>Selected Data:</h2>
                            <ul>
                                {selectedData.map((item, index) => (
                                    <li key={index}>
                                        {new Date(item.date).toString()}-{item.date}-{item.type}-
                                        {item.weight}
                                    </li>
                                ))}
                            </ul>
                        </Row> */}
                    </Container>
                </div>
            </div>
        </>
    );
}

export default Dashboard;
