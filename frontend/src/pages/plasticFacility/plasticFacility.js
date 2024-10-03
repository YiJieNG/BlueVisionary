import { useRef, useEffect, useState } from "react";
import { Col, Row, Card, CardBody, Input, Button, Container } from "reactstrap";
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import FacilityInfo from "./FacilityInfo";
import facilities from "./facilities.json"





function PlasticFacility() {
    const mapContainerRef = useRef();
    const mapRef = useRef();

    const [location, setLocation] = useState(null);
    const [selectedState, setSelectedState] = useState("VIC");
    const [inputSuburb, setInputSuburb] = useState('');
    const [facility, setFacility] = useState();

    const availableState = ["VIC", "ACT", "NSW", "QLD", "TAS", "WA", "SA", "NT"];


    function handleLocationClick() {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            console.log("Geolocation not supported");
        }
    }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    const handleSuburb = (e) => {
        setInputSuburb(e.target.value); // Update state with input value
    };

    useEffect(() => {
        const selectedFacility = facilities.filter(item => item.state === selectedState);
        setFacility(selectedFacility);
    }, [selectedState]);

    useEffect(() => {
        if(!facility) return;

        let totalLat = 0;
        let totalLng = 0;

        facility.forEach((item) => {
            totalLat += item.latitude;
            totalLng += item.longitude;
        });

        const centerLat = totalLat / facility.length;
        const centerLng = totalLng / facility.length;

        console.log(centerLat)
        console.log(centerLng)


        mapboxgl.accessToken = 'pk.eyJ1IjoieWluZzAzMDIiLCJhIjoiY2xtazZ6ZGhzMGE3bzJpcnBxeDBpdWtxOSJ9.yqzTjBA_A6g5arWp4H2ZBA';

        mapRef.current = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/streets-v12',
            // center: [144.946457, -37.840935],
            center: [centerLng, centerLat],
            zoom: 8
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl());

        const markers = [];

        facility.forEach((item) => {
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div style="padding-right: 20px">
                <p><strong>${item.name}</strong></p>
                <p><strong>address:</strong> ${item.address}, ${item.suburb}</p>
                </div>`);
            const marker = new mapboxgl.Marker()
                .setLngLat([item.longitude, item.latitude])
                .setPopup(popup)
                .addTo(mapRef.current);
            markers.push(marker);
        });

        return () => {
            mapRef.current.remove()
        };
    }, [facility]);

    useEffect(() => {
        if(!facility) return;
        if(inputSuburb === "") {
            const foundFacility = facilities.filter(item => item.state.toLowerCase() === selectedState.toLowerCase());
            setFacility(foundFacility);
            return;
        }

        const foundFacility = facility.filter(item => item.suburb.toLowerCase() === inputSuburb.toLowerCase());
        console.log(foundFacility);

        if(foundFacility.length == 0) {
            return;
        }
        
        setFacility(foundFacility);
    }, [inputSuburb]);

    return (
        <>
            <div className="section-with-space">
                <div className="section-facility">
                    <Card>
                        <CardBody>
                            <Row>
                                <Col md="4">
                                    <Row>
                                        <Col md="3" style={{ paddingRight: 0 }}>
                                            <Input
                                                type="select"
                                                placeholder="State"
                                                value={selectedState}
                                                onChange={(e) =>
                                                    setSelectedState(e.target.value)
                                                }
                                                style={{ marginLeft: 15 }}
                                            >
                                                {
                                                    availableState.map((state) =>
                                                        <option key={state}>
                                                            {state}
                                                        </option>
                                                    )
                                                }
                                            </Input>
                                        </Col>
                                        <Col md="5">
                                            <Input
                                                type="search"
                                                placeholder="Suburb"
                                                style={{ marginLeft: 15 }}
                                                value={inputSuburb}
                                                onChange={handleSuburb}
                                            />
                                        </Col>
                                        <Col md="2">
                                            <Button color="primary">
                                                Search
                                            </Button>
                                        </Col>
                                    </Row>
                                    {/* <Row>
                                        {!location ? <button onClick={handleLocationClick}>Get Location</button> : null}
                                    </Row> */}
                                    <Container fluid className="placeList" style={{ margin: 10 }}>
                                        {facility &&
                                            facility.map((item, i) => (
                                                <Row key={i}>
                                                    <Card style={{ width: "90%", marginLeft: 5, marginTop: 10 }}>
                                                        <CardBody>
                                                            <h5>{i + 1}. {item.name}</h5>
                                                            <p>{item.address}, {item.suburb}, {item.state}</p>
                                                            <FacilityInfo content={item} />
                                                        </CardBody>
                                                    </Card>
                                                </Row>
                                            ))
                                        }
                                    </Container>

                                </Col>
                                <Col md="8" style={{ height: "75vh" }}>
                                    <div id='map-container' ref={mapContainerRef} />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </div>
            </div>
        </>
    );
}

export default PlasticFacility;