import { useRef, useEffect, useState } from "react";
import { Col, Row, Card, CardBody, Input, Button, Container } from "reactstrap";
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import FacilityInfo from "./FacilityInfo";
import { Autocomplete, Typography, TextField, Select, MenuItem, InputLabel, Box, FormControl } from "@mui/material";
import axios from "axios";


function PlasticFacility() {
    const mapContainerRef = useRef();
    const mapRef = useRef();

    const [location, setLocation] = useState(null);
    const [selectedState, setSelectedState] = useState("VIC");
    const [inputSuburb, setInputSuburb] = useState(null);
    const [availableFacilities, setAvailableFacilities] = useState();
    const [facility, setFacility] = useState();
    const [stateFacility, setStateFacility] = useState();
    const [availableSuburb, setAvailableSuburb] = useState([]);

    const availableState = ["VIC", "NSW", "QLD", "TAS", "WA", "SA", "NT"];


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
        // axios
        // .get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=pk.eyJ1IjoieWluZzAzMDIiLCJhIjoiY2xtazZ6ZGhzMGE3bzJpcnBxeDBpdWtxOSJ9.yqzTjBA_A6g5arWp4H2ZBA`)
        // .then((res) => {
        //     console.log(res.data.features[0].properties.context.place.name);
        // })
        // .catch((err) => {
        //     console.log(err);
        // });
        console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
        console.log("Unable to retrieve your location");
    }

    const handleSuburb = (e, newValue) => {
        // console.log(newValue);
        setInputSuburb(newValue);
    };

    useEffect(() => {
        handleLocationClick();
    }, []);

    useEffect(() => {
        axios
        .get('http://127.0.0.1:5000/api/facilities/')
        .then((res) => {
            const facilities = res.data;
            setAvailableFacilities(facilities);
            const selectedFacility = facilities.filter(item => item.state === selectedState);
            const availableSuburbs = selectedFacility.map(item => item.suburb);
            setFacility(selectedFacility);
            setStateFacility(selectedFacility);
            setAvailableSuburb([...new Set(availableSuburbs)])
            setInputSuburb(null);
        })
        .catch((err) => {
            console.log(err);
        });
        
    }, [selectedState]);

    useEffect(() => {
        if (!facility) return;

        let totalLat = 0;
        let totalLng = 0;

        facility.forEach((item) => {
            totalLat += item.latitude;
            totalLng += item.longitude;
        });

        const centerLat = totalLat / facility.length;
        const centerLng = totalLng / facility.length;

        // console.log(centerLat)
        // console.log(centerLng)


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
                <p><strong>Address:</strong> ${item.address}</p>
                <p><strong>Type:</strong> ${item.type}</p>
                <p><strong>Phone:</strong> ${item.phone}</p>
                <p><strong>Website:</strong> <a href="${item.website}">${item.website}</a></p>
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
        if (!facility) return;
        if (!inputSuburb) {
            const foundFacility = availableFacilities.filter(item => item.state.toLowerCase() === selectedState.toLowerCase());
            if (foundFacility.length == facility.length) return;
            setFacility(foundFacility);
            return;
        }
        console.log("inputSuburb")
        console.log(inputSuburb)

        const foundFacility = stateFacility.filter(item => item.suburb.toLowerCase() === inputSuburb.toLowerCase());
        // console.log(foundFacility);

        if (foundFacility.length == 0) {
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
                                        <Col md="4">
                                            <Box sx={{ minWidth: 120 }}>
                                                <FormControl fullWidth>
                                                    <InputLabel id="demo-simple-select-label">State</InputLabel>
                                                    <Select
                                                        labelId="demo-simple-select-label"
                                                        id="demo-simple-select"
                                                        value={selectedState}
                                                        label="State"
                                                        onChange={(e) =>
                                                            setSelectedState(e.target.value)
                                                        }
                                                    >
                                                        {
                                                            availableState.map((state) =>
                                                                <MenuItem value={state} key={state}>{state}</MenuItem>

                                                            )
                                                        }
                                                    </Select>
                                                </FormControl>
                                            </Box>
                                        </Col>
                                        <Col md="8">
                                            <Autocomplete
                                                disablePortal
                                                options={availableSuburb}
                                                // getOptionLabel={(option) => option.label}
                                                sx={{ width: "100%", color: "#1c3c58" }}
                                                renderInput={(params) => <TextField {...params} label="Suburb" />}
                                                value={inputSuburb}
                                                onChange={handleSuburb}
                                            />
                                        </Col>
                                        {/* <Col md="2">
                                            <Button color="primary">
                                                Search
                                            </Button>
                                        </Col> */}
                                    </Row>
                                    {/* <Row>
                                        {!location ? <button onClick={handleLocationClick}>Get Location</button> : null}
                                    </Row> */}
                                    <Container fluid className="placeList">
                                        {facility &&
                                            facility.map((item, i) => (
                                                <Row key={i}>
                                                    <Card style={{ width: "100%", marginTop: 10 }}>
                                                        <CardBody>
                                                            <h5>{i + 1}. {item.name}</h5>
                                                            <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>Address: {item.address}, {item.suburb}, {item.state}</Typography>
                                                            {/* <FacilityInfo content={item} /> */}
                                                            {/* <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                                                                Address: {item.address}
                                                            </Typography> */}
                                                            <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                                                                Phone: {item.phone}
                                                            </Typography>
                                                            <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                                                                Facility type: {item.type}
                                                            </Typography>
                                                            <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                                                                {/* Website: {item.website} */}
                                                                Website: <a href={item.website}>{item.website}</a>
                                                            </Typography>
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