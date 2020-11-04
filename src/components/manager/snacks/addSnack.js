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
        snackid: '',
        snackname: '',
        price: '',
      });

    const handleChange = (prop) => (event) => {
        setValues({ ...values, [prop]: event.target.value });
      };

    return (
        <div>
        <Typography>Add Snack Form:</Typography>
        <TextField id="standard-basic" label="Snack Name" />
        <br/><br/>
        <InputLabel htmlFor="standard-adornment-amount">Amount</InputLabel>
          <Input
            id="standard-adornment-amount"
            value={values.amount}
            onChange={handleChange('amount')}
            startAdornment={<InputAdornment position="start">$</InputAdornment>}
          />
          <br/><br/>
        <Button variant="outlined" color="primary">Submit</Button>
        </div>
    )
}

export default AddSnack
