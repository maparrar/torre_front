import React from "react";

const Opportunity = props => (
  <div>
    Opportunity: {props.id}
    <h3>skills</h3>
    <ul>
      {props.skills.map( skill => (
        <li key={props.id + skill.name}>{props.id + skill.name} - {skill.name}</li>
      ))}
    </ul>
  </div>
);

export default Opportunity;
