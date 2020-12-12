import React, {useEffect, useState} from 'react';

import axios from 'axios';
import UserBox from "../../components/UserBox/UserBox";
import * as actionTypes from "../../store/actions/actionTypes";
import {connect} from "react-redux";
import User from "../../components/User/User";
import Opportunity from "../../components/Opportunity/Opportunity";

const Viewer = props => {
  const [strengths, setStrengths] = useState([]);

  useEffect(() => {
    props.doDropOpportunities();
    props.doSetLocale(null);
  },[]);

  useEffect(() => {
    if(props.username && props.username.length){
      const proxy = "https://corsshield.herokuapp.com/";
      const url = "https://torre.bio/api/bios/" + props.username;
      axios.get( proxy + url).then((response) => {
        setStrengths(response.data.strengths);
        props.doDropOpportunities();
        props.doSetLocale(response.data.person.locale);
      });
    }
  },[props.username]);

  useEffect(() => {
    if(props.initOpportunities && props.locale){
      const data = {currency: "USD", page: 0, periodicity:"hourly", lang: props.locale,aggregate: false}
      axios.post( 'https://search.torre.co/opportunities/_search?size=200&offset=0&lang=es', data).then((response) => {
        const opportunities = response.data.results;
        props.doAddOpportunities(opportunities);
      });
    }
  },[props.initOpportunities, props.locale]);

  return (
    <>
      <UserBox />
      Viewer
      <User
        strengths={strengths}
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
  locale: state.locale,
  initOpportunities: state.initOpportunities,
  opportunities: state.opportunities
});

const mapDispatchToProps = dispatch => {
  return {
    doSetUser: username => dispatch({type: actionTypes.SET_USERNAME, username: username}),
    doSetLocale: locale => dispatch({type: actionTypes.SET_LOCALE, locale: locale}),
    doSetInitOpportunities: initOpportunities => dispatch({type: actionTypes.SET_INIT_OPPORTUNITIES, initOpportunities: initOpportunities}),
    doDropOpportunities: () => dispatch({type: actionTypes.DROP_OPPORTUNITIES}),
    doAddOpportunities: opportunities => dispatch({type: actionTypes.ADD_OPPORTUNITIES, opportunities: opportunities}),
  }
};

export default connect(mapStateToProps, mapDispatchToProps) (Viewer);
