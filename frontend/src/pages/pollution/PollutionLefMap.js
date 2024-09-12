import { Row, Col } from "reactstrap";
import { MapContainer, TileLayer, useMap } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState, useRef } from "react";
import L from "leaflet";
import "leaflet.heat";
import stateData from "../../data/FINAL_STATE_data_rewind.json"

// Choropleth map color
function getColor(d, colorData) {
  const index = colorData.findIndex((obj) => obj[0] === d);
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

// Choropleth Map Layer Component
function ChoroplethLayer({ data, colorData }) {
  const map = useMap();

  function style(feature) {
    return {
      fillColor: getColor(feature.properties.ste_iso3166_code, colorData),
      weight: 2,
      opacity: 1,
      color: 'white',
      dashArray: '3',
      fillOpacity: 0.4
    };
  }
  useEffect(() => {
    const choroplethLayer = L.geoJson(data, { style: style });
    choroplethLayer.addTo(map);
    return () => {
      map.removeLayer(choroplethLayer);
    };
  }, [data, colorData]);
}

// Legend Component
function Legend({ colorData }) {
  const map = useMap();
  useEffect(() => {
    const legend = L.control({ position: 'bottomright' });

    legend.onAdd = function () {
      const div = L.DomUtil.create('div', 'info legend');

      for (let i = 0; i < colorData.length; i++) {
        div.innerHTML +=
          '<i style="background:' + getColor(colorData[i][0], colorData) + '"></i> <b>' +
          colorData[i][1] + '</b> (' + colorData[i][0] + ')<br>';
      }
      div.innerHTML += '<i style="background:#DCDCDC"></i> 0';
      return div;
    };

    legend.addTo(map);
    return () => {
      legend.remove(); // Clean up on component unmount
    };

  }, [map, colorData]);
}

// Component for adding state names on the map
const Labels = ({ geojson }) => {
  const map = useMap();
  const markersRef = useRef([]);

  useEffect(() => {
    // Clear previous markers when component re-renders or unmounts
    markersRef.current.forEach(marker => {
      map.removeLayer(marker);
    });

    // Add new markers for state names
    const markers = geojson.features.map((feature) => {
      const center = L.latLng(feature.properties.geo_point_2d.lat, feature.properties.geo_point_2d.lon);
      const marker = L.marker(center, {
        icon: L.divIcon({
          className: 'label',
          html: `<div style="font-size:12px;color:black;font-weight:bold;">${feature.properties.ste_iso3166_code}</div>`
        })
      }).addTo(map);

      return marker;
    });

    // Store the markers in the ref for cleanup
    markersRef.current = markers;

    // Remove the markers when the component unmounts
    return () => {
      markersRef.current.forEach(marker => {
        map.removeLayer(marker);
      });
    };
  }, [geojson, map]);
};

// Heatmap Layer Component
function HeatmapLayer({ data }) {
  const map = useMap();

  useEffect(() => {
    const heatData = data.flatMap((state) =>
      state.pollutions.map((pollution) => [pollution.lat, pollution.long, pollution.count])
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

    // add markers for tooltip
    const markers = heatData.map(point => {
      const marker = L.marker([point[0], point[1]]).setOpacity(0).addTo(map);
      marker.bindTooltip(
        `Tooltip for point (${point[0]}, ${point[1]}, ${point[2]})`,
        {
          permanent: false,   // Only show on hover
          direction: "top",   // Tooltip position relative to the marker
          offset: L.point(0, -10)  // Offset to adjust position slightly above the marker
        }
      );
      return marker;
    });

    // heatData.forEach(function (point) {
    //   var marker = L.marker([point[0], point[1]]).setOpacity(0).addTo(map);
    //   marker.bindTooltip("Tooltip for point (" + point[0] + ", " + point[1] + ", " + point[2] + ")", {
    //     permanent: false,   // Only show on hover
    //     direction: "top",   // Tooltip position relative to the marker
    //     offset: L.point(0, -10)  // Offset to adjust position slightly above the marker
    //   });
    // });

    return () => {
      map.removeLayer(heatLayer);
      markers.forEach(marker => map.removeLayer(marker));
    };
  }, [data, map]);

  return null;
}

// Component to handle zooming when a state is selected
function StateZoom({ center, zoomLevel }) {
  const map = useMap();

  useEffect(() => {
    if (center) {
      map.flyTo(center, zoomLevel); // Zoom in on the selected state
      // map.setView(center, zoomLevel); // Zoom in on the selected state
    }
  }, [center, zoomLevel, map]);

  return null;
}

function PollutionLefMap({ selectedState, pollutionData }) {
  const [center, setCenter] = useState([-28.0, 132.0]); // Default center for all states
  const [severeData, setSevereData] = useState(); // Count of pollution in eadh state

  useEffect(() => {
    // const severe = pollutionData.map((p) => ([p.state, p.pollutions.length]));
    // // sort state pollution data by number of pollutions
    // const sortedData = severe.sort((a, b) => {
    //   return b[1] - a[1]; // Sort in descending order
    // });
    // setSevereData(sortedData);

    const severe = pollutionData.map(stateData => {
      const sum = stateData.pollutions.reduce((acc, pollution) => acc + pollution.count, 0);
      return [stateData.state, sum];
    });
    const sortedData = severe.sort((a, b) => {
      return b[1] - a[1]; // Sort in descending order
    });
    setSevereData(sortedData);

  }, [pollutionData]);

  // update center of map when selected state change
  useEffect(() => {
    if (selectedState === 'ALL') {
      // Set center of the map to Australia when "All" is selected
      setCenter([-28.0, 132.0]);
    } else {
      // Set center of the map based on the selected state
      const selected = pollutionData.find((p) => p.state === selectedState);
      if (selected && selected.pollutions.length > 0) {
        const { lat, long } = selected.pollutions[0];
        setCenter([lat, long]);
      }
    }
  }, [selectedState, pollutionData]);

  return (
    <>
      {pollutionData && severeData &&
        <Row className="justify-content-center">
          <MapContainer center={center} zoom={4} style={{ height: '90vh', width: '100%' }}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <StateZoom center={center} zoomLevel={selectedState === 'ALL' ? 4 : 8} />
            <ChoroplethLayer data={stateData} colorData={severeData} />
            <Legend colorData={severeData} />
            <Labels geojson={stateData} />
            <HeatmapLayer data={pollutionData} />
          </MapContainer>
        </Row>
      }
    </>
  );
};

export default PollutionLefMap;
