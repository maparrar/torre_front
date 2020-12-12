import React, {useEffect} from 'react';
import * as d3 from "d3";

import axios from 'axios';

import * as actionTypes from "../../store/actions/actionTypes";
import {connect} from "react-redux";

import UserBox from "../../components/UserBox/UserBox";
import User from "../../components/User/User";
import Opportunity from "../../components/Opportunity/Opportunity";

import classes from './Viewer.module.css';
import {generateGraphData} from "../../Util/data";
import Graph from "./Graph/Graph";

const Viewer = props => {

  useEffect(() => {
    if(props.username && props.username.length){
      const proxy = "https://corsshield.herokuapp.com/";
      const url = "https://torre.bio/api/bios/" + props.username;
      axios.get( proxy + url).then((response) => {
        const person = response.data.person;
        props.doSetUser(
          person.locale,
          person.name,
          person.pictureThumbnail,
          person.professionalHeadline,
          response.data.strengths
        );
      });
    }
  },[props.username]);

  useEffect(() => {
    if(props.user && props.user.name){
      const data = {currency: "USD", page: 0, periodicity:"monthly", lang: props.locale,aggregate: false}
      axios.post( 'https://search.torre.co/opportunities/_search?size=20&offset=0&lang=es&periodicity=monthly', data).then((response) => {
        const opportunities = response.data.results;
        props.doSetOpportunities(opportunities);
      });
    }
  },[props.user]);

  useEffect(() => {
    if(props.opportunities.length){
      const data = generateGraphData(props.user, props.opportunities);


      console.log("USER");
      console.log(props.user);
      console.log("OPPORTUNITIES");
      console.log(props.opportunities);
      console.log("DATA");
      console.log(data);

      drawChart(data);
    }
  }, [props.opportunities]);

  const drawChart = (data) => {
    const margin = {top: 10, right: 30, bottom: 30, left: 40},
      width = 400 - margin.left - margin.right,
      height = 800 - margin.top - margin.bottom;

    // append the svg object to the body of the page
    const svg = d3.select("#viz")
      .append("svg")
      .attr("width", width + margin.left + margin.right)
      .attr("height", height + margin.top + margin.bottom)
      .append("g")
      .attr("transform", "translate(" + margin.left + "," + margin.top + ")");

    //d3.json("https://raw.githubusercontent.com/holtzy/D3-graph-gallery/master/DATA/data_network.json", function( data) {

    // const data = {
    //   "nodes": [
    //     {"id": 1, "name": "A"},
    //     {"id": 2, "name": "B"},
    //     {"id": 3, "name": "C"},
    //     {"id": 4, "name": "D"},
    //     {"id": 5, "name": "E"},
    //     {"id": 6, "name": "F"},
    //     {"id": 7, "name": "G"},
    //     {"id": 8, "name": "H"},
    //     {"id": 9, "name": "I"},
    //     {"id": 10, "name": "J"}
    //   ],
    //   "links": [
    //     {"source": 1, "target": 2},
    //     {"source": 1, "target": 5},
    //     {"source": 1, "target": 6},
    //     {"source": 2, "target": 3},
    //     {"source": 2, "target": 7},
    //     {"source": 3, "target": 4},
    //     {"source": 8, "target": 3},
    //     {"source": 4, "target": 5},
    //     {"source": 4, "target": 9},
    //     {"source": 5, "target": 10}
    //   ]
    // };

    // Initialize the links
      const link = svg
        .selectAll("line")
        .data(data.links)
        .enter()
        .append("line")
        .style("stroke", "#aaa")
      ;

      // Initialize the nodes
      const node = svg
        .selectAll("circle")
        .data(data.nodes)
        .enter()
        .append("circle")
        //.append('image')
        //.attr('href', function (d) { return 'https://p7.hiclipart.com/preview/504/146/323/5bbd85fd5f32a.jpg' })
        .attr("height", 24)
        .attr("r", 20)
        .style("fill", "#69b3a2")

    node.append("title")
      .text(function(d) { return d.name; });

    node.append("text")
      .text(function(d) {
        return d.name;
      })
      .attr('x', 6)
      .attr('y', 3);

      // Let's list the force we wanna apply on the network
      const simulation = d3.forceSimulation(data.nodes)                 // Force algorithm is applied to data.nodes
        .force("link", d3.forceLink()                               // This force provides links between nodes
          .id(function(d) { return d.id; })                     // This provide  the id of a node
          .links(data.links)                                    // and this the list of links
        )
        .force("charge", d3.forceManyBody().strength(-400))         // This adds repulsion between nodes. Play with the -400 for the repulsion strength
        .force("center", d3.forceCenter(width / 2, height / 2))     // This force attracts nodes to the center of the svg area
        .on("end", ticked);

      // This function is run at each iteration of the force algorithm, updating the nodes position.
      function ticked() {
        link
          .attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

        node
          .attr("cx", function (d) { return d.x+6; })
          .attr("cy", function(d) { return d.y-6; });
      }

    //});

  };

  return (
    <>
      <UserBox />
      <Graph />
      <div id="viz" className={classes.viewer}></div>
      <User
        strengths={props.user ? props.user.strengths : []}
      />

      <h2>Opportunities</h2>
      {props.opportunities && props.opportunities.map( opportunity => (
        <Opportunity
          id={opportunity.id}
          key={opportunity.id}
          name={opportunity.objective}
          skills={opportunity.skills}
        />
      ))}


    </>
  );
};

const mapStateToProps = state => ({
  username: state.username,
  user: state.user,
  opportunities: state.opportunities
});

const mapDispatchToProps = dispatch => {
  return {
    doSetUsername: username => dispatch({type: actionTypes.SET_USERNAME, username: username}),
    doSetUser: (locale, name, pictureThumbnail, professionalHeadline, strengths) => dispatch({
      type: actionTypes.SET_USER,
      locale: locale,
      name: name,
      pictureThumbnail: pictureThumbnail,
      professionalHeadline: professionalHeadline,
      strengths: strengths
    }),
    doSetOpportunities: opportunities => dispatch({type: actionTypes.SET_OPPORTUNITIES, opportunities: opportunities})
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (Viewer);
