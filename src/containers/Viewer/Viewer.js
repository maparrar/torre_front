import React, {useEffect} from 'react';

import axios from 'axios';

const Viewer = () => {

  // useEffect(() => {
  //
  //   const data = {
  //     currency: "USD",
  //     page:0,
  //     periodicity:"hourly",
  //     lang: "es",
  //     size: 20,
  //     aggregate: false,
  //     offset: 0
  //   }
  //   axios.post( 'https://search.torre.co/opportunities/_search', data).then((response) => {
  //     const opportunities = response.data;
  //     console.log(opportunities);
  //
  //   });
  // },[]);








  useEffect(() => {


    fetch('https://torre.bio/api/bios/maparrar', {
      crossDomain:true,
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type':'application/json',
        // 'Access-Control-Allow-Origin': 'https://localhost:3000',
       // ' Access-Control-Allow-Headers': 'Authorization'
      },
      mode: 'no-cors',
      // cors: true,
    }).then( response => {
      console.log(response);
    });



    // // payload is your post data
    // // const payload = {data: 'test'};
    // const options = {
    //   method: 'GET',
    //   headers: {
    //     'Accept': 'application/json',
    //     'Content-Type': 'application/json',
    //   },
    //   // body: JSON.stringify(payload),
    //   // cors: true, // allow cross-origin HTTP request
    //   // credentials: 'same-origin', // This is similar to XHR’s withCredentials flag,
    //   mode: 'no-cors'
    // };
    //
    // // SEND REQUEST
    // fetch('https://torre.bio/api/bios/maparrar', options).then((response) => {
    //   // TODO
    //   console.log(response);
    // }).catch((error) => {
    //   // TODO
    // });


    // axios.get( 'https://torre.bio/api/bios/maparrar', {
    //   headers: {"Access-Control-Allow-Origin": "*"}
    // }).then((response) => {
    //   const opportunities = response.data;
    //   console.log(opportunities);
    //
    // });



    // axios.get( 'https://bio.torre.co/api/people/maparrar/detail', {
    //   headers: {
    //     "Access-Control-Allow-Headers"
    //     Access-Control-Allow-Origin
    //     Access-Control-Allow-Methods
    //
    //     // Accept
    //     // Accept Language
    //     // Content Language
    //     // Last-Event-ID
    //     // Content-Type, but only if the value is one of:
    //     //   application/x-www-form-urlencoded
    //     //   multipart/form-data
    //     //   text/plain
    //
    //   }
    // }).then((response) => {
    //   const opportunities = response.data;
    //   console.log(opportunities);
    //
    // });
  },[]);


  return (
    <>Viewer</>
  );
};

export default Viewer;
