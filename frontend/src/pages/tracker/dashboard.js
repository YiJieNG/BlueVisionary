import { useState, useEffect } from "react";
import { styled } from "@mui/material/styles";
import FormControlLabel from "@mui/material/FormControlLabel";
import { Switch, Typography, Grid } from "@mui/material";
// import Switch, { SwitchProps } from '@mui/material/Switch';
import Stack from "@mui/material/Stack";
import { Button, Col, Container, Row, Input, Card, CardBody } from "reactstrap";
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
import { FaRecycle, FaWeight } from "react-icons/fa";
import { GiSeaTurtle } from "react-icons/gi";

function Dashboard() {
  //   const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);
  const [selectedShowType, setSelectedShowType] = useState("Past 7 days"); //past 7 days, this month, this year(start at month has data)
  const [dataset, setDataset] = useState();
  const [xLabels, setXLabels] = useState();
  const [checked, setChecked] = useState(false);
  const [selectedCountType, setSelectedCountType] = useState("weight");
  const [totalWeight, setTotalWeight] = useState(0);
  const [totalCount, setTotalCount] = useState(0);
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
  function getRandomArbitrary(min, max) {
    return Math.random() * (max - min) + min;
  }

  const handleAddData = async () => {
    const currentDate = new Date().getTime();
    for (let i = 1; i < 30; i += 1) {
      const yesterday = new Date().setDate(new Date().getDate() - i);

      for (var plasticType in plasticDataTest.plasticItems) {
        console.log(plasticType);
        const newData = {
          // date: currentDate,
          date: yesterday,
          type: plasticType,
          weight: getRandomArbitrary(0, 15),
          count: plasticDataTest.plasticItems[plasticType].approximateCount,
        };
        await addDataToDB(newData);
      }

      // Update state to show new data
      //   const updatedData = await getAllDataFromDB();
      //   setData(updatedData);
    }
  };

  const handleDeleteData = async () => {
    await deleteAllData();
    // Update state to show new data
    // const updatedData = await getAllDataFromDB();
    // setData(updatedData);
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
  };

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
    "Plastic Utensil": "rgba(204,204,255,0.8)",
  };

  const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    "& .MuiSwitch-switchBase": {
      margin: 1,
      padding: 0,
      transform: "translateX(6px)",
      "&.Mui-checked": {
        color: "#fff",
        transform: "translateX(22px)",
        "& .MuiSwitch-thumb:before": {
          // Change to count icon when checked
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
            "#fff"
          )}" d="M3 17h2v-7H3v7zm5 0h2v-10H8v10zm5 0h2v-4h-2v4zm5-8v8h2v-8h-2z"/></svg>')`,
        },
        "& + .MuiSwitch-track": {
          opacity: 1,
          backgroundColor: "#aab4be",
        },
      },
    },
    "& .MuiSwitch-thumb": {
      backgroundColor: "#001e3c",
      width: 32,
      height: 32,
      "&::before": {
        // Change to weight icon when not checked
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 24 24"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M5 21h14v-2H5v2zm7-17L5.33 16h13.34L12 4zm0 2.94L16.6 14H7.4L12 6.94z"/></svg>')`,
      },
    },
    "& .MuiSwitch-track": {
      opacity: 1,
      backgroundColor: "#aab4be",
      borderRadius: 20 / 2,
    },
  }));

  const fetchYearWeight = async (startDate, endDate) => {
    const results = await getDataWithinDateRange(startDate, endDate);
    let totalWeight = 0;
    let totalCount = 0;
    results.forEach((item) => {
      totalWeight += item.weight;
      totalCount += item.count;
    });
    setTotalWeight(totalWeight);
    setTotalCount(totalCount);
  };

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
      for (let i = 6; i >= 0; i--) {
        pastDate.setDate(today.getDate() - i);
        tooltipText.push(pastDate.toLocaleDateString("en-GB"));
      }
      console.log(tooltipText);
      setXTooltip(tooltipText);

      const rearrangedDays =
        todayIndex === 6
          ? dayNames
          : dayNames
              .slice(todayIndex + 1)
              .concat(dayNames.slice(0, todayIndex + 1));
      setXLabels(rearrangedDays);
      const plasticData = {};
      selectedData.forEach((item) => {
        const dayName = dayNames[new Date(item.date).getDay()];
        if (!(item.type in plasticData)) {
          plasticData[item.type] = {
            label: item.type,
            data: [0, 0, 0, 0, 0, 0, 0],
            stack: "total",
            color: barColor[item.type],
          };
        }
        if (selectedCountType === "weight") {
          plasticData[item.type].data[rearrangedDays.indexOf(dayName)] +=
            item.weight;
        } else {
          plasticData[item.type].data[rearrangedDays.indexOf(dayName)] +=
            item.count;
        }
      });
      const chartData = [];
      for (const key in plasticData) {
        chartData.push(plasticData[key]);
      }
      // console.log(chartData);
      // console.log(rearrangedDays);
      setDataset(chartData);
    } else if (selectedShowType === "Past 30 days") {
      // scrollable for x axis
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
            stack: "total",
            color: barColor[item.type],
          };
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
      const monthNames = [
        "Jan",
        "Feb",
        "Mar",
        "Apr",
        "May",
        "Jun",
        "Jul",
        "Aug",
        "Sep",
        "Oct",
        "Nov",
        "Dec",
      ];

      const todayIndex = new Date().getMonth();
      // console.log(todayIndex);

      const rearrangedMonths =
        todayIndex === 11
          ? monthNames
          : monthNames
              .slice(todayIndex + 1)
              .concat(monthNames.slice(0, todayIndex + 1));
      setXLabels(rearrangedMonths);

      const plasticData = {};
      selectedData.forEach((item) => {
        const monthName = monthNames[new Date(item.date).getMonth()];
        if (!(item.type in plasticData)) {
          plasticData[item.type] = {
            label: item.type,
            data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
            stack: "total",
            color: barColor[item.type],
          };
        }
        if (selectedCountType === "weight") {
          plasticData[item.type].data[rearrangedMonths.indexOf(monthName)] +=
            item.weight;
        } else {
          plasticData[item.type].data[rearrangedMonths.indexOf(monthName)] +=
            item.count;
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
        <div className="section-dashboard">
          <Container fluid>
            <Row>
              <Col md="12" sm={{ size: "auto" }}>
                <div
                  style={{
                    margin: "0px 40px 0px 40px",
                    padding: "20px 20px 5px",
                  }}
                  className="marine-life-content"
                >
                  <h2 style={{ paddingTop: "30px" }}>
                    Plastic Waste Recycling Efforts Tracker
                  </h2>
                  <h4 style={{ color: "#3f4447" }}>
                    Track your plastic waste recycling effort, visualize your
                    progress and see how much sea turtles you have saved!!!
                  </h4>
                </div>
              </Col>
            </Row>

            <Row
              style={{
                margin: "10px 20px 30px 20px",
              }}
              // className="card-margin no-margin"
            >
              <Col md="4" sm="6" xs="12" className="mb-4 d-flex">
                <Card
                  className="weight-feature-card dash-features-row custom-border"
                  style={{ padding: "2rem" }}
                >
                  <CardBody
                    className="d-flex flex-column align-items-center"
                    style={{ justifyContent: "center" }}
                  >
                    <FaWeight
                      size={"30%"}
                      style={{ color: "#d1a400", marginBottom: "20px" }}
                    />{" "}
                    <h4
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        color: "#d1a400",
                      }}
                    >
                      {totalWeight.toFixed(2)} gram
                    </h4>
                    <p
                      style={{
                        fontSize: "1.0rem",
                        color: "#d1a400",
                      }}
                    >
                      <strong>Total weight of Plastic Items Recycled</strong>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              <Col md="4" sm="6" xs="12" className="mb-4 d-flex">
                <Card
                  className="count-feature-card dash-features-row custom-border"
                  style={{ padding: "2rem" }}
                >
                  <CardBody
                    className="d-flex flex-column align-items-center"
                    style={{ justifyContent: "center" }}
                  >
                    <FaRecycle
                      size={"30%"}
                      style={{ color: "#0e9f7d", marginBottom: "20px" }}
                    />{" "}
                    <h4
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        color: "#0e9f7d",
                      }}
                    >
                      {totalCount}
                    </h4>
                    <p
                      style={{
                        fontSize: "1.0rem",
                        color: "#0e9f7d",
                      }}
                    >
                      <strong>Total number of Plastic Items Recycled</strong>
                    </p>
                  </CardBody>
                </Card>
              </Col>

              <Col md="4" sm="6" xs="12" className="mb-4 d-flex">
                <Card
                  className="seaturtle-feature-card dash-features-row custom-border"
                  style={{ padding: "2rem" }}
                >
                  <CardBody
                    className="d-flex flex-column align-items-center"
                    style={{ justifyContent: "center" }}
                  >
                    <GiSeaTurtle
                      size={"30%"}
                      style={{ color: "#003366", marginBottom: "20px" }}
                    />{" "}
                    <h4
                      style={{
                        fontSize: "1.8rem",
                        fontWeight: "bold",
                        color: "#003366",
                      }}
                    >
                      {((totalCount / 14) * 0.5).toFixed(0)}
                    </h4>
                    <p style={{ fontSize: "1.0rem", color: "#003366" }}>
                      <strong>Total Sea turtles potentially saved</strong>
                    </p>
                  </CardBody>
                </Card>
              </Col>
            </Row>

            {xLabels && xLabels.length > 0 && dataset && dataset.length > 0 && (
              <Row
                style={{
                  margin: "10px 40px 30px 40px",
                }}
              >
                <Col md="8" style={{ display: "flex" }}>
                  <Card style={{ height: "100%", flex: 1 }}>
                    <CardBody>
                      <Row style={{ paddingTop: "1rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              fontSize: "1.3rem",
                              fontWeight: "bold",
                              paddingRight: "5px",
                            }}
                          >
                            Total&nbsp;
                          </h4>

                          <div
                            style={{
                              display: "flex",
                              alignItems: "center",
                              backgroundColor: "#f0f0f0",
                              border: "2px solid #1c3c58",
                              padding: "5px 10px",
                              margin: "5px 0",
                              borderRadius: "10px",
                            }}
                          >
                            <Typography
                              variant="body1"
                              style={{
                                fontSize: "1.0rem",
                                color: "#1c3c58",
                                fontWeight: "bold",
                                marginRight: "5px",
                              }}
                            >
                              Weight
                            </Typography>
                            <MaterialUISwitch
                              checked={checked}
                              onChange={handleChange}
                            />
                            <Typography
                              variant="body1"
                              style={{
                                fontSize: "1.0rem",
                                color: "#1c3c58",
                                fontWeight: "bold",
                                marginLeft: "5px",
                              }}
                            >
                              Count
                            </Typography>
                          </div>

                          <h4
                            style={{
                              margin: 0,
                              fontSize: "1.3rem",
                              marginLeft: "10px",
                              fontWeight: "bold",
                            }}
                          >
                            of Plastic Waste Recycled in
                          </h4>

                          <Input
                            type="select"
                            value={selectedShowType}
                            onChange={(e) =>
                              setSelectedShowType(e.target.value)
                            }
                            style={{
                              width: 150,
                              color: "#1c3c58",
                              fontWeight: "bold",
                              fontSize: "1.0rem",
                              marginLeft: "10px",
                              backgroundColor: "#f0f0f0",
                              border: "2px solid #1c3c58",
                              outline: "none",
                              // marginTop: "5px",
                            }}
                          >
                            <option
                              style={{
                                color: "#1c3c58",
                                fontWeight: "bold",
                                fontSize: "1.0rem",
                              }}
                            >
                              Past 7 days
                            </option>
                            <option
                              style={{
                                color: "#1c3c58",
                                fontWeight: "bold",
                                fontSize: "1.0rem",
                              }}
                            >
                              Past 30 days
                            </option>
                            <option
                              style={{
                                color: "#1c3c58",
                                fontWeight: "bold",
                                fontSize: "1.0rem",
                              }}
                            >
                              This year
                            </option>
                          </Input>
                        </div>
                      </Row>

                      <Row>
                        {/* {xLabels &&
                          xLabels.length > 0 &&
                          dataset &&
                          dataset.length > 0 && ( */}
                        <PlasticStackBarChart
                          xLabels={xLabels}
                          dataset={dataset}
                          yLabel={
                            selectedCountType === "weight"
                              ? "Weight in g"
                              : "Total Count"
                          }
                        />
                        {/* )} */}
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
                <Col md="4" style={{ display: "flex" }}>
                  <Card style={{ height: "100%", flex: 1 }}>
                    <CardBody>
                      <Row style={{ paddingTop: "2rem" }}>
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            flexWrap: "wrap",
                            justifyContent: "center",
                          }}
                        >
                          <h4
                            style={{
                              margin: 0,
                              fontSize: "1.3rem",
                              fontWeight: "bold",
                            }}
                          >
                            What if others follow your effort?
                          </h4>
                        </div>
                      </Row>
                      <Row>
                        <PlasticLineChart />
                      </Row>
                      <Row>
                        <p>
                          <strong>
                            If everyone in Australia follow your recycle impact,
                            in 2025 eghnjrtgnjr. If everyone in Australia follow
                            your recycle impact, in 2025 eghnjrtgnjr.If everyone
                            in Australia follow your recycle impact, in 2025
                            eghnjrtgnjr.
                          </strong>
                        </p>
                      </Row>
                    </CardBody>
                  </Card>
                </Col>
              </Row>
            )}

            <Row
              className="justify-content-between mt-4"
              style={{
                padding: "20px 20px 50px 20px",
                margin: "10px 20px 0px 20px",
              }}
            >
              <Col xs="12" md="6" style={{ display: "flex" }}>
                <Button
                  className="yes-btn"
                  onClick={navigateToPlasticInput}
                  block
                >
                  {" "}
                  Record Your Contribution here
                </Button>
              </Col>

              <Col xs="12" md="6" style={{ display: "flex" }}>
                <Button
                  className="dash-button"
                  onClick={navigateToFacility}
                  block
                >
                  {" "}
                  Handle Plastic Waste collected
                </Button>
              </Col>
              {/* <Col xs="12" md="4">
                <Button className="no-btn" onClick={handleDeleteData} block>
                  Reset all contribution
                </Button>
              </Col>
              <Col>
                <Button color="dark" onClick={handleAddData}>
                  Add Data
                </Button>
              </Col> */}
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
