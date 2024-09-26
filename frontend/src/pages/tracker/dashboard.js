import { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
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
    const [data, setData] = useState([]);
    const [selectedData, setSelectedData] = useState([]);
    const [selectedShowType, setSelectedShowType] = useState("Past 7 days");//past 7 days, this month, this year(start at month has data)
    const [dataset, setDataset] = useState();
    const [xLabels, setXLabels] = useState();


    const yesterday = new Date().setDate(new Date().getDate() - 3);
    // console.log(yesterday);

    const handleAddData = async () => {
        const currentDate = new Date().getTime();
        for (var plasticType in plasticDataTest.plasticItems) {
            console.log(plasticType);
            const newData = {
                // date: currentDate,
                date: yesterday,
                type: plasticType,
                weight: plasticDataTest.plasticItems[plasticType].weight,
                count:
                    plasticDataTest.plasticItems[plasticType].approximateCount,
            };
            await addDataToDB(newData);
        }
        
        // Update state to show new data
        const updatedData = await getAllDataFromDB();
        setData(updatedData);
    };

    const handleDeleteData = async () => {
        await deleteAllData();
        // Update state to show new data
        const updatedData = await getAllDataFromDB();
        setData(updatedData);
    };

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

            const rearrangedDays = todayIndex === 6 ? dayNames : dayNames.slice(todayIndex + 1).concat(dayNames.slice(0, todayIndex + 1));
            setXLabels(rearrangedDays);
            const plasticData = {};
            selectedData.forEach((item) => {
                const dayName = dayNames[new Date(item.date).getDay()];
                if (!(item.type in plasticData)) {
                    plasticData[item.type] = {
                        label: item.type,
                        data: [0, 0, 0, 0, 0, 0, 0],
                        stack: 'total'
                    }
                }
                plasticData[item.type].data[rearrangedDays.indexOf(dayName)] += item.weight;
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
                        stack: 'total'
                    }
                }
                plasticData[item.type].data[dates.indexOf(dayName)] += item.weight;
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
                        stack: 'total'
                    }
                }
                plasticData[item.type].data[rearrangedMonths.indexOf(monthName)] += item.weight;
            });
            const chartData = [];
            for (const key in plasticData) {
                chartData.push(plasticData[key]);
            }
            // console.log(chartData);
            // console.log(rearrangedMonths);
            setDataset(chartData);

        }
    }, [selectedData]);

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
                                        </Row>
                                        <Row>
                                            {xLabels && xLabels.length > 0 && dataset && dataset.length > 0 &&
                                                <PlasticStackBarChart xLabels={xLabels} dataset={dataset} />
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
