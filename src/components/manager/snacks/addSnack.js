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
        image: '',
      });

    const handleChangeName = (event) => {
        setValues({ name: event.target.value, price: values.price, image: values.image });
        console.log(values);
      };
    const handleChangePrice = (event) => {
        setValues({ name: values.name, price: event.target.value, image: values.image });
        console.log(values);
      };
     const handleChangeImage = (event) => {
      const fr = new FileReader()
        fr.onloadend = () => setValues({ name: values.name, price: values.price, image: fr.result })
        fr.readAsDataURL(event.target.files[0])
      console.log(values);
    };
      
    function handleClick (){
      
      var array = [{
        "id": '0',
        "name": values.name,
        "price": values.price,
        "image": values.image,
      }];
      console.log(array);
  
      var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/concessions", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.send(JSON.stringify(array));
      //window.location.reload(false);
 
    };

    return (
        <div >
        <Typography>Add Snack Form:</Typography>
        <TextField id="standard-basic" 
          label="Snack Name"
          onChange={handleChangeName} />
        <br/><br/>
          <Input
            id="standard-adornment-amount"
            value={values.amount}
            onChange={handleChangePrice}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <br/><br/>
        <input type="file" onChange={handleChangeImage}></input>
          <br/><br/>
        <Button variant="outlined"
           color="primary"
            onClick={handleClick}
            >Submit</Button>
        </div>
    )
}

export default AddSnack
