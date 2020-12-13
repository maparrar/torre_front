import React, {useEffect, useState, useCallback} from "react";
import * as d3 from "d3";

import classes from "./Graph.module.css";

const Graph = props => {
  const [viewerHeight, setViewerHeight] = useState(null);
  const [viewerWidth, setViewerWidth] = useState(null);

  useEffect(() => {
    if(props.data){
      drawChart(props.data);
    }
  }, [props.data]);

  const div = useCallback(node => {
    if (node !== null) {
      setViewerHeight(node.getBoundingClientRect().height);
      setViewerWidth(node.getBoundingClientRect().width);
    }
  }, []);

  const drawChart = (data) => {

    d3.select("svg").remove();

    const color = () => {
      const scale = d3.scaleOrdinal(d3.schemeCategory10);
      return d => scale(d.group);
    };

    const drag = simulation => {

      function dragstarted(event) {
        if (!event.active) simulation.alphaTarget(0.3).restart();
        event.subject.fx = event.subject.x;
        event.subject.fy = event.subject.y;
      }

      function dragged(event) {
        event.subject.fx = event.x;
        event.subject.fy = event.y;
      }

      function dragended(event) {
        if (!event.active) simulation.alphaTarget(0);
        event.subject.fx = null;
        event.subject.fy = null;
      }

      return d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended);
    };



    const margin = {top: 10, right: 30, bottom: 30, left: 40},
      width = viewerWidth - margin.left - margin.right,
      height = viewerHeight - margin.top - margin.bottom;


    const simulation = d3.forceSimulation(data.nodes)
      .force("link", d3.forceLink(data.links).id(d => d.id).distance(d => d.distance))
      .force("charge", d3.forceManyBody())
      .force("center", d3.forceCenter(width / 2, height / 2))
    ;

    const zoom = d3.zoom()
      .on('zoom', (event) => {
        svg.attr('transform', event.transform);
      })
      .scaleExtent([1, 40]);

    const svg = d3.select("#viewer")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .call(zoom)
      .append("g")
    ;

    const link = svg.append("g")
      .attr("stroke", "#999")
      .attr("stroke-opacity", 0.6)
      .selectAll("line")
      .data(data.links)
      .join("line")
      .attr("stroke-width", d => Math.sqrt(d.value))
    ;

    const node = svg.append("g")
      .attr("stroke", "#fff")
      .attr("stroke-width", 1.5)
      .selectAll("circle")
      .data(data.nodes)
      .join("circle")
      .attr("r", d => d.radius)
      .attr("fill", color)
      .call(drag(simulation))
      // .append("g")
    ;

    node.append("title")
      .text(d => {
        let text = d.name;
        if(d.compensation){
          text += ' - USD $' + d.compensation.amount;
        }
        return text
      }
    );

    node.append("image")
      .attr("xlink:href", "https://github.com/favicon.ico")
      .attr("x", 16)
      .attr("y", 16)
      .attr("width", 100)
      .attr("height", 120)
    ;

    node.append("text")
      .attr("dx", 12)
      .attr("dy", ".35em")
      .attr("color", "#ffffff")
      .text(d => d.name)
    ;

    simulation.on("tick", () => {
      link
        .attr("x1", d => d.source.x)
        .attr("y1", d => d.source.y)
        .attr("x2", d => d.target.x)
        .attr("y2", d => d.target.y);

      node
        .attr("cx", d => d.x)
        .attr("cy", d => d.y);
    });
  };

  return <div className={classes.wrapper}>
    <div id="viewer" className={classes.viewer} ref={div} />
  </div>
};

export default Graph;
