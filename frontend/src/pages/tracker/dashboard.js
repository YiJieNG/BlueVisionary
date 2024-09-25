import { useState, useEffect } from "react";
import { Card, CardContent } from "@mui/material";
import { Button, Col, Container, Row } from "reactstrap";
import PlasticStackBarChart from "./PlasticStackBarChart";
import {
  addDataToDB,
  getAllDataFromDB,
  deleteAllData,
  getDataWithinDateRange,
} from "../../util/db";
import plasticData from "./plasticInputTest.json";

function Dashboard() {
  const [data, setData] = useState([]);
  const [selectedData, setSelectedData] = useState([]);

  const currentTime = new Date();
  const yesterday = new Date().setDate(new Date().getDate() - 1);

  const handleAddData = async () => {
    const currentDate = new Date().getTime();
    for (var plasticType in plasticData.plasticItems) {
      console.log(plasticType);
      const newData = {
        date: currentDate,
        // date: yesterday,
        type: plasticType,
        weight: plasticData.plasticItems[plasticType].weight,
        approximateCount:
          plasticData.plasticItems[plasticType].approximateCount,
      };
      await addDataToDB(newData);
    }
    // const newData = {
    //     date: currentDate,
    //     // date: yesterday,
    //     type: "Plastic Bag",
    //     weight: 10
    // };
    // await addDataToDB(newData);

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

  const handleSelectedData = async () => {
    const startDate = new Date("2024-09-22T00:00:00"); // Example start date
    console.log(new Date(startDate).toString());
    const endDate = new Date(); // Example end date
    // await getDataWithinDateRange(startDate, endDate);
    const results = await getDataWithinDateRange(startDate, endDate);
    setSelectedData(results);
  };

  useEffect(() => {
    // const deleteDatabase = async () => {
    //     deleteDB();
    // }
    // Fetch data from IndexedDB when the component loads
    const fetchData = async () => {
      const result = await getAllDataFromDB();
      setData(result);
    };
    // deleteDatabase();
    fetchData();
  }, []);

  return (
    <>
      <div className="section-with-space">
        <div className="section-marinelife">
          <Container fluid>
            <Row>
              <Col md="8">
                <Card style={{ height: "100%" }}>
                  <CardContent>
                    <PlasticStackBarChart />
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
                        <CardContent>test</CardContent>
                      </Card>
                    </Row>
                  </CardContent>
                </Card>
              </Col>
            </Row>
            <Row style={{ marginTop: 20 }}>
              <Col className="d-flex justify-content-center align-items-center">
                <Button color="primary"> Make contribution</Button>
              </Col>
              <Col className="d-flex justify-content-center align-items-center">
                <Button color="primary"> Find location</Button>
              </Col>
            </Row>
            <Row>
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
            </Row>
            <Row>
              <h2>Selected Data:</h2>
              <ul>
                {selectedData.map((item, index) => (
                  <li key={index}>
                    {new Date(item.date).toString()}-{item.date}-{item.type}-
                    {item.weight}
                  </li>
                ))}
              </ul>
            </Row>
          </Container>
        </div>
      </div>
    </>
  );
}

export default Dashboard;
