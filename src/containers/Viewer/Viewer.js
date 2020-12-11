import React, {useEffect} from 'react';

import axios from 'axios';

const Viewer = () => {

  useEffect(() => {
    const proxy = "https://corsshield.herokuapp.com/";
    const url = "https://torre.bio/api/bios/maparrar";
    axios.get( proxy + url).then((response) => {
      // opportunities = response.data;
      console.log(response.data);
    });
  },[]);

   useEffect(() => {

     const data = {
       currency: "USD",
       page:0,
       periodicity:"hourly",
       lang: "es",
       size: 20,
       aggregate: false,
       offset: 0
     }
     axios.post( 'https://search.torre.co/opportunities/_search', data).then((response) => {
       const opportunities = response.data;
       console.log(opportunities);

     });
   },[]);


  return (
    <>Viewer</>
  );
};

export default Viewer;
