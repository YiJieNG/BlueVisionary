import { MapContainer, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { useEffect, useState } from 'react';
import { useMap } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet.heat';
import pollutionData from "../../data/pollution_1.json"
// import pollutionData1 from "../../data/pollution_1.json"



const points = [
  {
    pollutions: [
      { lat: -12.346343, long: 130.710817, type: 'polypropylene' },
      { lat: -12.341733, long: 130.6993, type: 'polybutadiene rubber' },
    ],
    state: 'NT',
  },
  {
    pollutions: [
      { lat: -19.280412, long: 147.610186, type: 'rayon' },
      { lat: -19.280412, long: 147.610186, type: 'polyethylene' },
    ],
    state: 'QLD',
  },
];
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

// Heatmap Layer Component
function HeatmapLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    console.log(pollutionData)
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
      console.log(center)
      map.flyTo(center, zoomLevel); // Zoom in on the selected state with a zoom level of 6
    }
  }, [center, map]);

  return null;
}

function PollutionLefMap() {
  // Manage selected state and center of the map
  const [selectedState, setSelectedState] = useState('ALL');
  const [center, setCenter] = useState([-20.0, 135.0]); // Default center for all states

  // Handle dropdown change
  const handleStateChange = (event) => {
    const state = event.target.value;
    setSelectedState(state);

    if (state === 'ALL') {
      // Set center of the map to Australia when "All" is selected
      setCenter([-20.0, 135.0]);
    } else {
      // Set center of the map based on the selected state
      const selected = pollutionData.find((p) => p.state === state);
      console.log(state)
      if (selected && selected.pollutions.length > 0) {
        const { lat, long } = selected.pollutions[0];
        setCenter([lat, long]);
      }
    }
  };

  return (
    <div>
      <div>
        <label>Select State: </label>
        <select onChange={handleStateChange} value={selectedState}>
          <option value="ALL">All States</option>
          {pollutionData.map((p) => (
            <option key={p.state} value={p.state}>
              {p.state}
            </option>
          ))}
        </select>
      </div>

      <MapContainer center={center} zoom={4} style={{ height: '500px', width: '100%' }}>
        <TileLayer
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        />
        <StateZoom center={center} zoomLevel={selectedState === 'ALL' ? 4 : 7}/>
        <HeatmapLayer data={selectedState === 'ALL' ? pollutionData : [pollutionData.find((p) => p.state === selectedState)]} />
      </MapContainer>
    </div>
  );
};

export default PollutionLefMap;
