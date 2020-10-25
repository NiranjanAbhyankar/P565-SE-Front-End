import React, {useState, useEffect } from "react";
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import TextField from '@material-ui/core/TextField';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import Select from '@material-ui/core/Select';
import FormControl from '@material-ui/core/FormControl';
import InputAdornment from '@material-ui/core/InputAdornment';
import Input from '@material-ui/core/Input';
import FormHelperText from '@material-ui/core/FormHelperText';
import Button from '@material-ui/core/Button';
import clsx from 'clsx';




import axios from "axios";
import Search from "./Search.js";
import Poster from "../row/Poster.js";
import Popup from "./Popup.js";

const useStyles = makeStyles((theme) => ({
  formControl: {
    margin: theme.spacing(0),
    minWidth: 140,
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
}));
function AddShowing() {
  const classes = useStyles();
  const [state, setState] = useState({
    movies: [],
    selected: undefined})

    const [values, setValues] = React.useState({
      amount: '',
      password: '',
      duration: '',
      weightRange: '',
      showPassword: false,
    });

  useEffect(() => {
      // Update the document title using the browser API
      fetchData()
  });

  const [movies, setMovies]=useState([])
  var d = new Date();
  const baseUrl = "https://image.tmdb.org/t/p/original/";
  const url = "http://silo.soic.indiana.edu:29102/api/movies";
  function fetchData(){
    axios(url).then((data)=>{
      console.log(data.data)
    })
  }

  const [room, setRoom] = React.useState('');

  const handleChange = (event) => {
    setRoom(event.target.value);
  };
  const handleChangeDur = (prop) => (event) => {
    setValues({ ...values, [prop]: event.target.value });
  };
  
    
     
        return (
            <div>
            <Typography>Add Showing </Typography>
            <TextField
              id="datetime-local"
              label="Showing Start Time"
              type="datetime-local"
              defaultValue="2020-10-21T10:30"
              InputLabelProps={{
                shrink: true,
              }}
            />
        <br/><br/>
            <FormControl className={classes.formControl}>
              <InputLabel id="demo-simple-select-label">Room Number</InputLabel>
              <Select
                labelId="demo-simple-select-label"
                id="demo-simple-select"
                value={room}
                onChange={handleChange}
              >
                <MenuItem value={1}>1</MenuItem>
                <MenuItem value={2}>2</MenuItem>
                <MenuItem value={3}>3</MenuItem>
              </Select>
            </FormControl>

            <br/><br/>

            <FormControl className={clsx(classes.margin, classes.withoutLabel, classes.textField)}>
          <Input
            id="standard-adornment-weight"
            value={values.duration}
            onChange={handleChangeDur('durationweight')}
            endAdornment={<InputAdornment position="end">minutes</InputAdornment>}
            aria-describedby="standard-weight-helper-text"
            inputProps={{
              'aria-label': 'duration',
            }}
          />
          <FormHelperText id="standard-weight-helper-text">Duration</FormHelperText>
        </FormControl>
        <br/><br/>
        <Button variant="outlined" color="primary">
        Submit
      </Button>
          </div>
        )

}

export default AddShowing;