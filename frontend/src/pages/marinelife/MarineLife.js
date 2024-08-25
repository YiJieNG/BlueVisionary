import { useState, useEffect } from "react";
import { Container, Row, Col } from "reactstrap";
import CommonNavbar from "../../components/Navbar/CommonNavbar";
// import BarChart from "./BarChart";
import StateMap from "./StateMap";
import BluePieChart from "./BluePieChart";
import BlueBarChart from "./BlueBarChart";
import axios from "axios";


function MarineLife() {
    const [stateSelected, setStateSelected] = useState(["Victoria", "VIC"]);
    const [endangerType, setEndangerType] = useState("Endangered");
    const [stateStat, setStateStat] = useState();
    const [endangerData, setEndangerData] = useState();
    const [xAxis, setXAxis] = useState();
    const stateSpeciesData = {
        Victoria: [
            { value: 10, label: "Critically Endangered", color: "#003366" },
            { value: 15, label: "Endangered", color: "#36A2EB" },
            { value: 20, label: "Vulnerable", color: "#bbe0f7" },
        ],
        Queensland: [
            { value: 10, label: "Critically Endangered", color: "#003366" },
            { value: 30, label: "Endangered", color: "#36A2EB" },
            { value: 20, label: "Vulnerable", color: "#bbe0f7" },
        ],
        "Australian Capital Territory": [
            { value: 20, label: "Critically Endangered", color: "#003366" },
            { value: 30, label: "Endangered", color: "#36A2EB" },
            { value: 10, label: "Vulnerable", color: "#bbe0f7" },
        ],
        Tasmania: [
            { value: 10, label: "Critically Endangered", color: "#003366" },
            { value: 30, label: "Endangered", color: "#36A2EB" },
            { value: 20, label: "Vulnerable", color: "#bbe0f7" },
        ],
        "Northern Territory": [
            { value: 10, label: "Critically Endangered", color: "#003366" },
            { value: 30, label: "Endangered", color: "#36A2EB" },
            { value: 40, label: "Vulnerable", color: "#bbe0f7" },
        ],
        "South Australia": [
            { value: 10, label: "Critically Endangered", color: "#003366" },
            { value: 30, label: "Endangered", color: "#36A2EB" },
            { value: 10, label: "Vulnerable", color: "#bbe0f7" },
        ],
        "Western Australia": [
            { value: 20, label: "Critically Endangered", color: "#003366" },
            { value: 30, label: "Endangered", color: "#36A2EB" },
            { value: 20, label: "Vulnerable", color: "#bbe0f7" },
        ],
        "New South Wales": [
            { value: 30, label: "Critically Endangered", color: "#003366" },
            { value: 30, label: "Endangered", color: "#36A2EB" },
            { value: 20, label: "Vulnerable", color: "#bbe0f7" },
        ],
    };
    const topSpecies = ["aaaaaa", "bbbbbbbbb", "cccccc", "dddddd", "eeeeee"];

    const updateStateSelected = (newState) => {
        setStateSelected(newState);
    };

    const updateEndangerType = (newType) => {
        setEndangerType(newType);
    };

    // Fetch state statistic from backend
    useEffect(() => {
        axios
            .get("http://127.0.0.1:5000/api/get_state_stat")
            .then((res) => {
                let stateSpecies = {}
                for (let key in res.data) {
                    stateSpecies[key] = [
                        { value: res.data[key]["critically_endangered"], label: "Critically Endangered", color: "#003366" },
                        { value: res.data[key]["endangered"], label: "Endangered", color: "#36A2EB" },
                        { value: res.data[key]["vulnerable"], label: "Vulnerable", color: "#bbe0f7" }
                    ]
                }
                setStateStat(stateSpecies)
            })
            .catch(err => {
                console.log(err);
            });
    }, []);

    // fetch state species threat status data from backend
    useEffect(() => {
        axios
            .get(`http://127.0.0.1:5000/api/get_state_species/${stateSelected[1]}/${endangerType}`)
            .then((res) => {
                let endangerSpecies = { data: [] }
                let x = { scaleType: 'band', data: [] }
                for (let key in res.data) {
                    endangerSpecies["data"].push(res.data[key]);
                    x["data"].push(key);
                }
                // store data for bar chart series and xAxis
                setEndangerData([endangerSpecies]);
                setXAxis([x]);
            })
            .catch(err => {
                console.log(err);
            });
    }, [stateSelected, endangerType]);

    return (
        <>
            <div className="section-with-space">
                <div className="section-marinelife">
                    <Container fluid>
                        <Row>
                            <Col md="6">
                                <StateMap
                                    w={700}
                                    h={700}
                                    stateSelected={stateSelected[0]}
                                    updateStateSelected={updateStateSelected}
                                />
                            </Col>
                            {stateStat &&
                                <Col md="6">
                                    <Row>
                                        <h1>{stateSelected[0]}</h1>
                                    </Row>
                                    <Row>
                                        <BluePieChart
                                            //   data={stateSpeciesData[stateSelected[0]]}
                                            data={stateStat[stateSelected[1]]}
                                            width={500}
                                            height={300}
                                            updateEndangerType={updateEndangerType}
                                        />
                                    </Row>
                                    <Row>
                                        <h1>
                                            Top{" "}
                                            <b className={endangerType.replace(/\s+/g, "")}>
                                                {endangerType}
                                            </b>{" "}
                                            Species
                                        </h1>
                                    </Row>
                                    <Row>
                                        {/* {topSpecies.map((item, i) => (
                                            <p key={i}>{item}</p>
                                        ))} */}
                                        {endangerData && xAxis &&
                                            <BlueBarChart width={430} height={300} data={endangerData} xAxis={xAxis} />
                                        }
                                    </Row>
                                </Col>
                            }

                        </Row>
                    </Container>
                </div>
            </div>
        </>
    );
}

export default MarineLife;
