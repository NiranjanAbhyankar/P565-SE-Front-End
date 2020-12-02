import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormHelperText from '@material-ui/core/FormHelperText';
import Checkbox from '@material-ui/core/Checkbox';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  formControl: {
    margin: theme.spacing(3),
  },
}));

function CheckboxGenre({genres}){
  const classes = useStyles();

    const [state, setState] = React.useState({
      action: false, adventure: false, horror: false, comedy: false

      });
    
      const handleChange = (event) => {
        setState({ ...state, [event.target.name]: event.target.checked });
      };


      return (
        <FormControl component="fieldset" >
                <FormGroup>
                  <FormControlLabel
                    control={<Checkbox checked={state.action} onChange={handleChange} name="action" />}
                    label="Action"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.adventure} onChange={handleChange} name="adventure" />}
                    label="Adventure"
                  />
                  <FormControlLabel
                    control={<Checkbox checked={state.horror} onChange={handleChange} name="horror" />}
                    label="Horror"
                  />

        <FormControlLabel
                    control={<Checkbox checked={state.comedy} onChange={handleChange} name="comedy" />}
                    label="Comedy"
                  />
                </FormGroup>
              </FormControl>
      )
    }
  

  export default CheckboxGenre;
