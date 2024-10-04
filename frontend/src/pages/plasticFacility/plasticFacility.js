import { useRef, useEffect, useState } from "react";
import { Col, Row, Card, CardBody, Container } from "reactstrap";
import mapboxgl from 'mapbox-gl';

import 'mapbox-gl/dist/mapbox-gl.css';
import { Autocomplete, Typography, TextField, Select, MenuItem, InputLabel, Box, FormControl } from "@mui/material";
import axios from "axios";


function PlasticFacility() {
    const mapContainerRef = useRef();
    const mapRef = useRef();
    const markersRef = useRef([]);

    const [location, setLocation] = useState(null);
    const [selectedState, setSelectedState] = useState("VIC");
    const [inputSuburb, setInputSuburb] = useState(null);
    const [availableFacilities, setAvailableFacilities] = useState([]); // all available facilities
    const [distanceFacilities, setDistanceFacilities] = useState([]); // facilities used for filter
    const [facility, setFacility] = useState(); // filtered facilities
    const [stateFacility, setStateFacility] = useState(); // facilities in selected state
    const [availableSuburb, setAvailableSuburb] = useState([]);
    const [userSuburb, setUserSuburb] = useState(null);
    const [userState, setUserState] = useState(null);
    const [selectedCardIndex, setSelectedCardIndex] = useState(null);

    const availableState = ["VIC", "NSW", "QLD", "TAS", "WA", "SA", "NT"];


    // function handleLocationClick() {
    //     if (navigator.geolocation) {
    //         navigator.geolocation.getCurrentPosition(success, error);
    //     } else {
    //         console.log("Geolocation not supported");
    //     }
    // }

    function success(position) {
        const latitude = position.coords.latitude;
        const longitude = position.coords.longitude;
        setLocation({ latitude, longitude });
        axios
            .get(`https://api.mapbox.com/search/geocode/v6/reverse?longitude=${longitude}&latitude=${latitude}&access_token=pk.eyJ1IjoieWluZzAzMDIiLCJhIjoiY2xtazZ6ZGhzMGE3bzJpcnBxeDBpdWtxOSJ9.yqzTjBA_A6g5arWp4H2ZBA`)
            .then((res) => {
                setUserState(res.data.features[0].properties.context.region.region_code);
                setUserSuburb(res.data.features[0].properties.context.place.name);
                setSelectedState(res.data.features[0].properties.context.region.region_code);
                // console.log(res.data.features[0].properties.context.place.name)
            })
            .catch((err) => {
                // console.log(err);
            });
        // setUserState("VIC");
        // setUserSuburb("Moolap");
        // setSelectedState("VIC");
        // console.log(`Latitude: ${latitude}, Longitude: ${longitude}`);
    }

    function error() {
        // console.log("Unable to retrieve your location");
    }

    //This function takes in latitude and longitude of two location and returns the distance between them as the crow flies (in km)
    function calcCrow(lat1, lon1, lat2, lon2) {
        var R = 6371; // km
        var dLat = toRad(lat2 - lat1);
        var dLon = toRad(lon2 - lon1);
        lat1 = toRad(lat1);
        lat2 = toRad(lat2);

        var a = Math.sin(dLat / 2) * Math.sin(dLat / 2) +
            Math.sin(dLon / 2) * Math.sin(dLon / 2) * Math.cos(lat1) * Math.cos(lat2);
        var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
        var d = R * c;
        return d;
    }

    // Converts numeric degrees to radians
    function toRad(Value) {
        return Value * Math.PI / 180;
    }

    const handleSuburb = (e, newValue) => {
        // console.log(newValue);
        setInputSuburb(newValue);
        setSelectedCardIndex(null);
    };

    const handleCardClick = (index) => {
        if (selectedCardIndex) {
            const oldMarker = markersRef.current.find(m => m.index === selectedCardIndex).marker;
            let markerElement = oldMarker.getElement();
            markerElement.style.zIndex = "0";
            markerElement
                .querySelectorAll('svg path[fill="' + oldMarker._color + '"]')[0]
                .setAttribute('fill', "#07bbf7")
            oldMarker._color = "#07bbf7";
        }
        const marker = markersRef.current.find(m => m.index === index).marker;
        let markerElement = marker.getElement();
            markerElement.style.zIndex = "1000";
            markerElement
                .querySelectorAll('svg path[fill="' + marker._color + '"]')[0]
                .setAttribute('fill', "#7cf573")
            marker._color = "#7cf573";
        setSelectedCardIndex(index);
    };

    const handleMarkerHover = (index, isHovering) => {
        const marker = markersRef.current.find(m => m.index === index).marker;
        if (isHovering) {
            let markerElement = marker.getElement();
            markerElement.style.zIndex = "1000";
            markerElement
                .querySelectorAll('svg path[fill="' + marker._color + '"]')[0]
                .setAttribute('fill', "#f72f07")
            marker._color = "#f72f07";
        } else {
            // console.log(selectedCardIndex)
            // console.log(index)
            const color = index === selectedCardIndex ? "#7cf573" : "#07bbf7";
            const zIndex = index === selectedCardIndex ? "1000" : "0";
            // console.log(color)
            let markerElement = marker.getElement();
            markerElement.style.zIndex = zIndex;
            markerElement
                .querySelectorAll('svg path[fill="' + marker._color + '"]')[0]
                .setAttribute('fill', color)
            marker._color = color;
        }
    };

    // get user location & initialize map & get all facilities
    useEffect(() => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition(success, error);
        } else {
            // console.log("Geolocation not supported");
        }
        axios
            .get('http://127.0.0.1:5000/api/facilities/')
            .then((res) => {
                const facilities = res.data;
                setAvailableFacilities(facilities);
                setDistanceFacilities(facilities);
            })
            .catch((err) => {
                // console.log(err);
            });

        // initialize map
        mapboxgl.accessToken = 'pk.eyJ1IjoieWluZzAzMDIiLCJhIjoiY2xtazZ6ZGhzMGE3bzJpcnBxeDBpdWtxOSJ9.yqzTjBA_A6g5arWp4H2ZBA';

        mapRef.current = new mapboxgl.Map({
            container: 'map-container',
            style: 'mapbox://styles/mapbox/streets-v12',
            center: [144.946457, -37.840935],
            // center: [centerLng, centerLat],
            zoom: 8
        });

        mapRef.current.addControl(new mapboxgl.NavigationControl());

        return () => {
            markersRef.current.forEach(marker => {
                marker.marker.remove();
            });
            mapRef.current.remove();
        };

    }, []);

    // add distance info to facilities if get user location
    useEffect(() => {
        if (!location) return;
        if (availableFacilities.length === 0) return;
        const facilitiesDistance = availableFacilities.map(item => {
            const calDistance = calcCrow(item.latitude, item.longitude, location.latitude, location.longitude);
            // console.log(calDistance);
            return {
                ...item,
                'distance': calDistance
            }
        })
        facilitiesDistance.sort((a, b) => a.distance - b.distance);
        // console.log(facilitiesDistance);
        setDistanceFacilities(facilitiesDistance);
    }, [location, availableFacilities])

    // filter data for state
    useEffect(() => {
        if (distanceFacilities.length === 0) return;

        const selectedFacility = distanceFacilities.filter(item => item.state === selectedState);
        const availableSuburbs = selectedFacility.map(item => item.suburb);
        setFacility(selectedFacility);
        setStateFacility(selectedFacility);
        setAvailableSuburb([...new Set(availableSuburbs)].sort())
        setInputSuburb(null);
        if ((userState && userState !== selectedState) || (userSuburb && !availableSuburbs.includes(userSuburb))) {
            console.log("not found user suburb")
        }
        if (userState && userState === selectedState && userSuburb && availableSuburbs.includes(userSuburb)) {
            console.log("found user suburb")
            setInputSuburb(userSuburb);
        }
        // console.log(selectedFacility)

    }, [distanceFacilities, selectedState, userSuburb]);

    // filter suburb
    useEffect(() => {
        if (!stateFacility) return;
        if (!inputSuburb) {
            // const foundFacility = availableFacilities.filter(item => item.state.toLowerCase() === selectedState.toLowerCase());
            if (stateFacility.length === facility.length) return;
            setFacility(stateFacility);
            return;
        }
        // console.log("inputSuburb")
        // console.log(inputSuburb)

        const foundFacility = stateFacility.filter(item => item.suburb.toLowerCase() === inputSuburb.toLowerCase());
        // console.log(foundFacility);

        if (foundFacility.length === 0) {
            return;
        }

        setFacility(foundFacility);
    }, [inputSuburb, stateFacility]);

    // add marker to map
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

        mapRef.current.flyTo({
            center: [centerLng, centerLat], // Target location
            zoom: 8, // Target zoom level
            speed: 1.5, // Animation speed
            curve: 1, // Adjust "smoothness" of the animation
            essential: true // This animation is considered essential with respect to user accessibility
        });


        markersRef.current.forEach(marker => marker.marker.remove());
        markersRef.current = [];

        facility.forEach((item, index) => {
            const popup = new mapboxgl.Popup({ offset: 25 }).setHTML(`
                <div style="padding-right: 20px">
                <h6>${item.name}</h6>
                <p><strong>Address:</strong> ${item.address}</p>
                <p><strong>Type:</strong> ${item.type}</p>
                <p><strong>Phone:</strong> ${item.phone}</p>
                <p><strong>Website:</strong> <a href="${item.website}">${item.website}</a></p>
                </div>`);
            const marker = new mapboxgl.Marker({color: "#07bbf7"}) //
                .setLngLat([item.longitude, item.latitude])
                .setPopup(popup)
                .addTo(mapRef.current);
            markersRef.current.push({ marker, index });
            // const markerElement = marker.getElement();
            // markerElement.classList.add(`marker-${item.id}`);
            // markersRef.current.push(marker);
        });


    }, [facility]);



    return (
        <>
            <div className="section-facility" style={{ paddingTop: "7rem" }}>
                <Container fluid>
                    {/* <h3>test</h3> */}
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
                                    <Container fluid className="placeList" style={{ marginTop: 20 }}>
                                        {facility &&
                                            facility.map((item, i) => (
                                                <Row key={i}>
                                                    <Card
                                                        key={i}
                                                        style={{ 
                                                            width: "100%", 
                                                            marginTop: 10,
                                                            cursor: "pointer",
                                                            backgroundColor: selectedCardIndex === i ? "#d2e7fa" : "white", 
                                                            borderColor: selectedCardIndex === i ? "#003366": "#d1d1d1",
                                                        }}
                                                        className="facility-card"
                                                        onClick={() => handleCardClick(i)}
                                                        onMouseEnter={() => handleMarkerHover(i, true)}
                                                        onMouseLeave={() => handleMarkerHover(i, false)}
                                                    >
                                                        <CardBody>
                                                            <Row>
                                                                <Col md="9">
                                                                    {/* <Typography variant="h5">
                                                                {i + 1}. {item.name}
                                                                </Typography> */}
                                                                    <h5 className="facility-caption"><strong>{i + 1}. {item.name}</strong></h5>
                                                                </Col>
                                                                <Col md="3">
                                                                    {item.distance &&
                                                                        <Typography variant="caption" sx={{ display: 'block' }}>
                                                                            {item.distance.toFixed(2)} km
                                                                        </Typography>
                                                                    }
                                                                </Col>
                                                            </Row>

                                                            <Typography variant="caption" className="facility-caption" gutterBottom sx={{ display: 'block' }}><strong>Address:</strong> {item.address}, {item.suburb}, {item.state}</Typography>
                                                            {/* <FacilityInfo content={item} /> */}
                                                            {/* <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                                                                Address: {item.address}
                                                            </Typography> */}
                                                            <Typography variant="caption" className="facility-caption" gutterBottom sx={{ display: 'block' }}>
                                                                <strong>Phone:</strong> {item.phone}
                                                            </Typography>
                                                            <Typography variant="caption" className="facility-caption" gutterBottom sx={{ display: 'block' }}>
                                                                <strong>Facility type:</strong> {item.type}
                                                            </Typography>
                                                            <Typography variant="caption" className="facility-caption" gutterBottom sx={{ display: 'block' }}>
                                                                {/* Website: {item.website} */}
                                                                <strong>Website:</strong> <a href={item.website}>{item.website}</a>
                                                            </Typography>
                                                            {/* {item.distance &&
                                                                <Typography variant="caption" gutterBottom sx={{ display: 'block' }}>
                                                                    {item.distance.toFixed(2)} km
                                                                </Typography>
                                                            } */}
                                                        </CardBody>
                                                    </Card>
                                                </Row>
                                            ))
                                        }
                                    </Container>

                                </Col>
                                <Col md="8" style={{ height: "78vh" }}>
                                    <div id='map-container' ref={mapContainerRef} />
                                </Col>
                            </Row>
                        </CardBody>
                    </Card>
                </Container>
            </div>
        </>
    );
}

export default PlasticFacility;