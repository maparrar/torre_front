import React from "react";

const User = props => (
  <>
    User
    <ul>
      {props.strengths.map( strength => (
        <li key={strength.id}>{strength.name}</li>
      ))}
    </ul>
  </>
);

export default User;
