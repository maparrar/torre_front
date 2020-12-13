import React from "react";

import classes from './Comparator.module.css';

import {slugify} from "../../containers/Viewer/Graph/dataTools";

const Comparator = props => (
  <>
    {props.opportunity && <div>
      <div>
        <div className={classes.opportunityName}>{props.opportunity.name}</div>
        <div className={classes.money}>
          <label>Monetary compensation</label>
          <div className={classes.moneyContent}>
            {props.opportunity.compensation.currency}
            <div className={classes.amount}>{props.opportunity.compensation.minAmount.toLocaleString()}</div> -
            <div className={classes.amount}>{
              props.opportunity.compensation.maxAmount && props.opportunity.compensation.maxAmount.toLocaleString()
            }</div>/
            <div>{props.opportunity.compensation.periodicity}</div>
          </div>
        </div>
      </div>

      <div className={classes.comparator}>
        <div className={classes.container}>
          <a target='_blank' rel="noreferrer" href={`https://torre.co/jobs/${props.opportunity.id}`}>
            <div>
              <div className={classes.logo} >
                <img
                  src={props.opportunity.image}
                  alt={props.opportunity.organization.name}
                  title={props.opportunity.organization.name}
                />
              </div>
            </div>
          </a>
          <div className={classes.skills}>
            <h4>Skills and experience needed</h4>
            <div className={classes.itemsContent}>
              {props.opportunity.skills.map( skill => (
                <div className={classes.items} key={skill.name}>{skill.name}</div>
              ))}
            </div>
          </div>
        </div>

        <div className={classes.container}>
          <a target='_blank' rel="noreferrer" href={`https://bio.torre.co/es/${props.username}`}>
            <div className={classes.organization}>
              <div className={classes.logo} >
                <img
                  src={props.user.pictureThumbnail}
                  alt={props.user.name}
                  title={props.user.name}
                />
              </div>
            </div>
          </a>
          <div className={classes.strengths}>
            <h4>Candidate's strengths for this job</h4>
            <div className={classes.itemsContent}>
              {props.user.strengths.map( strength => {
                for(let i = 0; i < props.opportunity.skills.length; i++) {
                  const skill = props.opportunity.skills[i];
                  if(slugify(skill.name) ===  slugify(strength.name)){
                    return <div className={classes.items} key={strength.name}>{strength.name}</div>
                  }
                }
                return null;
              })}
            </div>
          </div>
        </div>
      </div>
    </div>}
  </>
);

export default Comparator;
