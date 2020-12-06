import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormHelperText from '@material-ui/core/FormHelperText';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(1),
    minWidth: 120,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));

function DropdownTheater({theaters, selectDropDown}){
    const classes = useStyles();
    const [theater, setTheater] = React.useState('');

    const handleChange = (event) => {
        setTheater(event.target.value);
        selectDropDown(event.target.value);
      //  console.log(event.target.value)
    };


      return (
        <div>
            <FormControl variant="filled" className={classes.formControl}>
                <InputLabel id="demo-simple-select-filled-label">Selected Theater</InputLabel>
                <Select
                    labelId="demo-simple-select-filled-label"
                    id="demo-simple-select-filled"
                    value={theater}
                    onChange={handleChange}
                >

                <MenuItem value="-1">All</MenuItem>

                {theaters.map( (theater) => <MenuItem value = {theater.id}>{theater.name}</MenuItem> )}

                </Select>
            </FormControl>
        </div>
      )
    }
  

  export default DropdownTheater;
