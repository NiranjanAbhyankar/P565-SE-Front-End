import React, { useState, useEffect } from "react";

import Dialog from '@material-ui/core/Dialog';
import { Button } from "react-bootstrap";



const TimesPopup = ({handleClose, movie, open}) => {  

    const [myData , setData] = useState([]);

     async function getTheatersFromApi() {
        const url = "http://silo.soic.indiana.edu:29102/api/theaters";
        fetch(url)
            .then(response => response.json())
            .then(data => setData(data));
            const PostData = getTheatersFromApi();
            console.log(myData);
      }

  return (
    <Dialog open = {open} onClose = {() => handleClose}>
        <h1>SOMETHING</h1> <Button onClick={handleClose}>Close</Button></Dialog>
  );
}

export default TimesPopup;
