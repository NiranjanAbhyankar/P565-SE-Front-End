import React, { useState, useEffect} from 'react'
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import Button from '@material-ui/core/Button';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import { DataGrid } from '@material-ui/data-grid';

function AddSnack() {
    const [values, setValues] = useState({
        name: '',
        price: '',
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
        console.log(values);
      };
    function handleClick (){
      var array = [{
        "id": '0',
        "name": values.name,
        "price": values.price,
      }];
  
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/concessions", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(array));
  
    };

    return (
        <div >
        <Typography>Add Snack Form:</Typography>
        <TextField id="standard-basic" 
          label="Snack Name"
          onChange={handleChange('name')} />
        <br/><br/>
        <InputLabel htmlFor="standard-adornment-amount">Price</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.amount}
            onChange={handleChange('price')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <br/><br/>
        <Button variant="outlined"
           color="primary"
            onClick={handleClick}
            >Submit</Button>
        </div>
    )
}

export default AddSnack
