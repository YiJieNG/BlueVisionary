import { useEffect } from "react";
import * as d3 from "d3";
import stateData from "../../data/FINAL_STATE_data_rewind.json"



function StateMap({ w, h, stateSelected, updateStateSelected }) {
    useEffect(() => {
        //Define map projection
        const projection = d3.geoMercator()
            .center([132, -28])
            .translate([w / 2, h / 2])
            .scale(750);

        //Define path generator
        const path = d3.geoPath()
            .projection(projection);

        // projection.fitSize([w, h], stateData);

        var color = d3.scaleLinear().domain([1, 10])
            .range(["white", "#03bafc"])

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
            .attr("fill", (d, i) => { 
                // fill color based on state name
                if(d.properties.ste_name[0] === stateSelected) {
                    return "orange";
                } else {
                    return color(i);
                }
             })
            .attr("class", (state, i) => {
                return "state";
            })
            .on("mouseover", function (event, d) {
                // change text color to white
                svg.selectAll("text")
                    .filter((textData, textIndex) => (textIndex === d.properties.index && textIndex !== 6))
                    .attr("fill", "white");
            })
            .on("mouseout", function (event, d) {
                // restore text color
                svg.selectAll("text")
                    .filter((textData, textIndex) => textIndex === d.properties.index)
                    .attr("fill", "darkslategray");
            })
            .on("click", function (event, d) {
                //update selected state
                updateStateSelected([d.properties.ste_name[0], d.properties.ste_iso3166_code]);
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

    }, [stateSelected]);


    return (
        <>
            <div id="svganchor">
                <svg width={w} height={h} className="svg-map">
                </svg>
            </div>
        </>
    );
}

export default StateMap;