import { useEffect } from "react";
import * as d3 from "d3";
import stateData from "../../data/FINAL_STATE_data_rewind.json"



function StateMap({w, h}) {

    useEffect(() => {

        //Define map projection
        const projection = d3.geoMercator()
            .center([132, -28])
            .translate([w / 2, h / 2])
            .scale(1000);
        
        //Define path generator
        const path = d3.geoPath()
            .projection(projection);
            
        // projection.fitSize([w, h], stateData);
        
        var color = d3.scaleLinear().domain([1,10])
        .range(["white", "#03bafc"])

        //Create SVG
        const svg = d3.select(".svg-map");

        //Load in GeoJSON data
        //Binding data and creating one path per GeoJSON feature
        svg.selectAll("path")
            .data(stateData.features)
            .join("path")
            .attr("d", path)
            .attr("stroke", "dimgray")
            .attr("fill", (d, i) => { return color(i) })
            .attr("class", (state) => {
                return "state";
              });

        //States
        svg.selectAll("text")
            .data(stateData.features)
            .enter()
            .append("text")
            .attr("fill", "darkslategray")
            .attr("x", function(d) {
                return path.centroid(d)[0];
              })
              .attr("y", function(d) {
                if(d.properties.ste_iso3166_code === "ACT") {
                    return path.centroid(d)[1]-20;
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
    }, [w, h]);


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