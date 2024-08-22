import { useEffect } from "react";
import * as d3 from "d3";
import stateData from "../../data/aust.json"

function StateMap() {

    useEffect(() => {
        //Width and height
        const w = 1000;
        const h = 800;
        console.log(stateData.features)

        //Define map projection
        const projection = d3.geoMercator()
            .center([132, -28])
            .translate([w / 2, h / 2])
            .scale(1000);

        //Define path generator
        const path = d3.geoPath()
            .projection(projection);

        const color = d3.scaleOrdinal()
            .range(['Azure']);
            console.log(color)

        //Create SVG
        const svg = d3.select(".svg-map");

        //Load in GeoJSON data
        //Binding data and creating one path per GeoJSON feature
        svg.selectAll("path")
            .data(stateData.features)
            .enter()
            .append("path")
            .attr("d", path)
            .attr("stroke", "dimgray")
            .attr("fill", (d, i) => { return color(i) });

        //States
        svg.selectAll("text")
            .data(stateData.features)
            .enter()
            .append("text")
            .attr("fill", "darkslategray")
            .attr("transform", (d) => { return "translate(" + path.centroid(d) + ")"; })
            .attr("text-anchor", "middle")
            .attr("dy", ".35em")
            .text((d) => {
                return d.properties.STATE_NAME;
            });

        //Append the name
        svg.append("text")
            .attr("x", 0)
            .attr("y", 340)
            .attr("font-size", 90)
            .attr("font-weight", "bold")
            .attr("font-family", "Times New Roman")
            .attr("text-anchor", "middle")
            .attr("opacity", 0.5)
    }, []);


    return (
        <>
            <div id="svganchor">
                <svg width={1000} height={800} className="svg-map">

                </svg>
            </div>
        </>
    );
}

export default StateMap;