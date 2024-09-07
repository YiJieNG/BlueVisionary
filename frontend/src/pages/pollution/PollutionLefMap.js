import { Row, Col } from "reactstrap";
import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import axios from "axios";
import stateData from "../../data/FINAL_STATE_data_rewind.json"


const stateCenter = {
  "VIC": {
    "lon": 144.30415866686647,
    "lat": -36.84997039395135
  },
  "NSW": {
    "lon": 147.00826243979776,
    "lat": -32.165643426308634
  },
  "WA": {
    "lon": 122.1816351541453,
    "lat": -25.46688628368836
  },
  "SA": {
    "lon": 135.83186732039903,
    "lat": -30.107902779697323
  },
  "NT": {
    "lon": 133.364679622243,
    "lat": -19.415065457018095
  },
  "QLD": {
    "lon": 144.54564198425672,
    "lat": -22.567505517773675
  },
  "ACT": {
    "lon": 149.0025288517912,
    "lat": -35.488314482956845
  },
  "TAS": {
    "lon": 146.59469130995754,
    "lat": -41.936844460847325
  },
  "All": {
    "lon": 135.0,
    "lat": -20.0
  }
}

// Choropleth Map Layer Component
function ChoroplethLayer({ data, colorData }) {
  const map = useMap();
  const sortedData = colorData.sort((a, b) => {
    return b[1] - a[1]; // Sort in descending order
  });
  console.log(sortedData);
  function getColor(d) {
    const index = sortedData.findIndex((obj) => obj[0] === d);
    return index === 0 ? '#800026' :
      index === 1 ? '#BD0026' :
        index === 2 ? '#E31A1C' :
          index === 3 ? '#FC4E2A' :
            index === 4 ? '#FD8D3C' :
              index === 5 ? '#FEB24C' :
                index === 6 ? '#FED976' :
                  index === 7 ?
                    '#FFEDA0' :
                    '#DCDCDC';
  }
  function style(feature) {
    return {
        fillColor: getColor(feature.properties.ste_iso3166_code),
        weight: 2,
        opacity: 1,
        color: 'white',
        dashArray: '3',
        fillOpacity: 0.4
    };
}
  useEffect(() => {
    const choroplethLayer =L.geoJson(data, {style: style});
    choroplethLayer.addTo(map);
    return () => {
      map.removeLayer(choroplethLayer);
    };
    // L.geoJson(data, {style: style}).addTo(map);
    // L.geoJson(data).addTo(map);

  }, [data, colorData]);

}

// Heatmap Layer Component
function HeatmapLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    const heatData = data.flatMap((state) =>
      state.pollutions.map((pollution) => [pollution.lat, pollution.long, 1])
    );

    const heatLayer = L.heatLayer(heatData, {
      radius: 25,
      blur: 10,
      minOpacity: 0.7,
      gradient: {
        0.0: 'green',
        0.5: 'yellow',
        1.0: 'red'
      }
    });
    heatLayer.addTo(map);
    return () => {
      map.removeLayer(heatLayer);
    };
  }, [data, map]);

  return null;
}

// Component to handle zooming when a state is selected
function StateZoom({ center, zoomLevel }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoomLevel); // Zoom in on the selected state with a zoom level of 6
    }
  }, [center, zoomLevel, map]);

  return null;
}

function PollutionLefMap() {
  // Manage selected state and center of the map
  const [selectedState, setSelectedState] = useState('ALL');
  const [filteredStates, setFilteredStates] = useState([]);
  const [center, setCenter] = useState([-28.0, 132.0]); // Default center for all states
  const [selectedYear, setSelectedYear] = useState('2024')
  const [pollutionData, setPollutionData] = useState();
  const [severeData, setSevereData] = useState();

  useEffect(() => {
    axios
      .get(
        `http://127.0.0.1:5000/api/get_pollution/${selectedYear}`
      )
      .then((res) => {
        setPollutionData(res.data);
        const severe = res.data.map((p) => ([p.state, p.pollutions.length]));
        setSevereData(severe);
        const statesForYear = res.data.map((p) => p.state);
        setFilteredStates(statesForYear);
        if (!statesForYear.includes(selectedState)) {
          setSelectedState("ALL");
          setCenter([-28.0, 132.0]);
        }
      })
      .catch((err) => {
        console.log(err);
      });

  }, [selectedYear]);

  // Handle state dropdown change
  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);

    if (state === 'ALL') {
      // Set center of the map to Australia when "All" is selected
      setCenter([-28.0, 132.0]);
    } else {
      // Set center of the map based on the selected state
      const selected = pollutionData.find((p) => p.state === state);
      if (selected && selected.pollutions.length > 0) {
        const { lat, long } = selected.pollutions[0];
        setCenter([lat, long]);
      }
      // setCenter([stateCenter[state]["lat"], stateCenter[state]["lon"]]);
    }
  };

  // Handle year dropdown change
  const handleYearChange = (event) => {
    const year = event.target.value;
    setSelectedYear(year);
  };

  return (
    <>
      <Row>
        <Col>
          <div>
            <label>Select State: </label>
            {pollutionData &&
              <select onChange={handleStateChange} value={selectedState}>
                <option value="ALL">All States</option>
                {filteredStates.map((p) => (
                  <option key={p} value={p}>
                    {p}
                  </option>
                ))}
              </select>
            }
          </div>
        </Col>
        <Col>
          <div>
            <label>Select Year: </label>
            <select onChange={handleYearChange} value={selectedYear}>
              <option value="2024">2024</option>
              <option value="2023">2023</option>
              <option value="2022">2022</option>
              <option value="2021">2021</option>
            </select>
          </div>
        </Col>
      </Row>
      {pollutionData &&
        <Row className="justify-content-center">
          <MapContainer center={center} zoom={4} style={{ height: '500px', width: '80%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <StateZoom center={center} zoomLevel={selectedState === 'ALL' ? 4 : 8} />
            <ChoroplethLayer data={stateData} colorData={severeData} />
            <HeatmapLayer data={pollutionData} />
          </MapContainer>
        </Row>
      }
    </>
  );
};

export default PollutionLefMap;
