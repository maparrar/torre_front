import React from "react";

const User = props => (
  <>
    <ul>
      {props.strengths.map( strength => (
        <li key={strength.id}>{strength.name}</li>
      ))}
    </ul>
  </>
);

export default User;
