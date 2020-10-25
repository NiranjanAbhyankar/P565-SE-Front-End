import React from 'react'
import "./Row.css";
import Button from '@material-ui/core/Button';



function ViewFormsButton({selectedMovie, viewForm }) {
    const handleClick = () =>{
        alert(selectedMovie.title ? selectedMovie.title : selectedMovie.name)
    }
  
	return (
		
        <Button size="small" color="primary" onClick={()=> viewForm()} > View Showings </Button> 
  
	)
}

export default ViewFormsButton