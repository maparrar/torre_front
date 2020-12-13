import React, {useEffect, useState} from 'react';
import {connect} from "react-redux";
import axios from 'axios';

import Graph from "./Graph/Graph";
import * as actionTypes from "../../store/actions/actionTypes";
import {generateGraphData} from "./Graph/dataTools";

const Viewer = props => {
  const [data, setData] = useState(null);

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
      const jobsByPage = 150;
      const url = `https://search.torre.co/opportunities/_search?size=${jobsByPage}&offset=0&lang=es`;
      const data = {currency: "USD", page: 0, periodicity:"monthly", lang: props.locale,aggregate: false}
      axios.post(url, data).then((response) => {
        const opportunities = response.data.results;
        props.doSetOpportunities(opportunities);
      });
    }
  },[props.user]);

  useEffect(() => {
    if(props.opportunities.length){
      const data = generateGraphData(props.user, props.opportunities);

      console.log("DATA");
      console.log(data);

      setData(data);
    }
  }, [props.opportunities]);

  return (
    <>
      <Graph
        data={data}
      />
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
