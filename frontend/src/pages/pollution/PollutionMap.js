import { useEffect, useRef } from "react";
import * as d3 from "d3";
import stateData from "../../data/FINAL_STATE_data_rewind.json"
import pollutionData from "../../data/pollution.json"
import pollutionData1 from "../../data/pollution_1.json"

const points = [
    {
        "pollutions": [
            {
                "lat": -12.346343,
                "long": 130.710817,
                "type": "polypropylene"
            },
            {
                "lat": -12.341733,
                "long": 130.6993,
                "type": "polybutadiene rubber"
            },
        ],
        "state": "NT"
    },
    {
        "pollutions": [
            {
                "lat": -19.280412,
                "long": 147.610186,
                "type": "rayon"
            },
            {
                "lat": -19.280412,
                "long": 147.610186,
                "type": "polyethylene"
            }
        ],
        "state": "QLD"
    }
]
function PollutionMap({ width, height }) {
    const svgRef = useRef();
    useEffect(() => {
        const svg = d3.select(svgRef.current);
        // map controls events
        d3.select("#btn-zoomin").on("click", () => {
            zoom.scaleBy(svg.transition().duration(500), 1.5);
        });
        d3.select("#btn-zoomout").on("click", () => {
            zoom.scaleBy(svg.transition().duration(500), -1);
        });
        d3.select("#btn-recentre").on("click", () => {
            zoom.scaleBy(svg.transition().duration(500), -10);
        });
        //Define map projection
        const projection = d3.geoMercator()
            .center([132, -28])
            .translate([width / 2, height / 2])
            .scale(600);

        //Define path generator
        const path = d3.geoPath()
            .projection(projection);

        let color = d3.scaleLinear().domain([1, 10])
            .range(["white", "#03bafc"])
        
        let pointColor = d3.scaleOrdinal(d3.schemeCategory10);

        //Load in GeoJSON data
        //Binding data and creating one path per GeoJSON feature
        svg.selectAll("path")
            .data(stateData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("stroke", "dimgray")
            .attr("fill", (d, i) => { 
                return color(i);
                // // fill color based on state name
                // if(d.properties.ste_name[0] === stateSelected) {
                //     return "orange";
                // } else {
                //     return color(i);
                // }
             })
            .attr("class", (state, i) => {
                return "state";
            })
            // .on("mouseover", function (event, d) {
            //     // change text color to white
            //     svg.selectAll("text")
            //         .filter((textData, textIndex) => (textIndex === d.properties.index && textIndex !== 6))
            //         .attr("fill", "white");
            // })
            // .on("mouseout", function (event, d) {
            //     // restore text color
            //     svg.selectAll("text")
            //         .filter((textData, textIndex) => textIndex === d.properties.index)
            //         .attr("fill", "darkslategray");
            // })
            .on("click", function (event, d) {
                //update selected state
                // updateStateSelected([d.properties.ste_name[0], d.properties.ste_iso3166_code]);
                // update all state color
                svg.selectAll("path").attr("fill", (dd, i) => { 
                    if(dd.properties.ste_name[0] === d.properties.ste_name[0]) {
                        return "orange";
                    } else {
                        return color(i);
                    }
                 })
            });

        //States
        svg.selectAll("text")
            .data(stateData.features)
            .enter()
            .append("text")
            .attr("fill", "darkslategray")
            .attr("x", function (d) {
                return path.centroid(d)[0];
            })
            .attr("class", (d) => {
                return "state_" + d.properties.ste_iso3166_code;
            })
            .attr("y", function (d) {
                if (d.properties.ste_iso3166_code === "ACT") {
                    return path.centroid(d)[1] - 20;
                } else {
                    return path.centroid(d)[1];
                }
            })
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .attr("font-size", 20)
            .attr("font-weight", "bold")
            .attr("font-family", "Helvetica")
            .text((d) => {
                return d.properties.ste_iso3166_code;
            });

        // add points
        pollutionData.forEach(stateData => {
            stateData.pollutions.forEach(pollution => {
                svg.append("circle")
                    .attr("cx", () => projection([pollution.long, pollution.lat])[0])
                    .attr("cy", () => projection([pollution.long, pollution.lat])[1])
                    .attr("r", 3)
                    .attr("fill", (d) => { return pointColor(pollution.type)})
                    .attr("opacity", 0.7)
                    // .append("title")  // Tooltip for pollution type
                    // .text(pollution.type);
            });
        });

        svg.selectAll("myCircle")
            .data(pollutionData1)
            .enter()
            .append("circle")
            .attr("cx", (d) => { return projection([+d.long, +d.lat])[0] })
            .attr("cy", (d) => { return projection([+d.long, +d.lat])[1] })
            .attr("r", 3)
            .attr("stroke-width", 1)
            .attr("fill-opacity", 0.6)
            .style("fill", "red");
        
        // zoom functions
    const zoomed = (event) => {
        svg
          .selectAll("path, text, circle") // To prevent stroke width from scaling
          .attr("transform", event.transform);
      };
    const zoom = d3
        .zoom()
        .scaleExtent([1, 40])
        .translateExtent([
          [0, 0],
          [width, height]
        ])
        .extent([
          [0, 0],
          [width, height]
        ])
        .on("zoom", zoomed);
    svg.call(zoom);
    }, [width, height]);
    return (
        <>
        <svg ref={svgRef} width={width} height={height} />
        <div className="map-controls">
          <button id="btn-recentre" icon="recentre">
            Recentre
          </button>
          <button id="btn-zoomin" icon="plus">
            +
          </button>
          <button id="btn-zoomout" icon="minus">
            -
          </button>
        </div>
        </>
    );
}

export default PollutionMap;