import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import CssBaseline from '@material-ui/core/CssBaseline';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Paper from '@material-ui/core/Paper';
import Stepper from '@material-ui/core/Stepper';
import Step from '@material-ui/core/Step';
import StepLabel from '@material-ui/core/StepLabel';
import Button from '@material-ui/core/Button';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';
import AddressForm from './AddressForm';
import PaymentForm from './PaymentForm';
import Review from './Review';
import axios from "axios";
import { useAuth0, withAuthenticationRequired } from "@auth0/auth0-react";

const useStyles = makeStyles((theme) => ({

  layout: {
    width: 'auto',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(2) * 2)]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up(600 + theme.spacing(3) * 2)]: {
      marginTop: theme.spacing(6),
      marginBottom: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  stepper: {
    padding: theme.spacing(3, 0, 5),
  },
  buttons: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginTop: theme.spacing(3),
    marginLeft: theme.spacing(1),
  },
}));

const steps = ['Billing address', 'Payment details', 'Review your order'];

function getStepContent(step,values) {
    
    /*const[state, setState] = React.useState({name: "",
                                            address:"",
                                            cardInfo: {},
                                            orderedItems: {}})

    const setPaymentDetails = () =>{

    }*/


  switch (step) {
    case 0:
      return <AddressForm />;
    case 1:
      return <PaymentForm />;
    case 2:
      return <Review 
                values = {values}/>;
    default:
      throw new Error('Unknown step');
  }
}

export default function Checkout({values}) {
  const classes = useStyles();
  const [activeStep, setActiveStep] = React.useState(0);
  const { getAccessTokenSilently, getAccessTokenWithPopup } = useAuth0();
  const { user } = useAuth0();

  const getConcessionsIDString = () =>{
      var concessionString = "";
      var i;
      var j;
      console.log(values.concessions);
      for (i = 0; i < values.concessions.length; i++){
          if (values.concessions[i].quantity > 0){
              for (j = 0; j < values.concessions[i].quantity; j++){
                  concessionString += values.concessions[i].id + " "
              }
          }
      }
      return concessionString.trim();
  }

  const handleSubmit = async function(){
    const accessToken = getAccessTokenSilently({
      audience: 'MainAPI',
      scope: ''
    });

    let data = [
        {
            id: 0,
            showing: values.selectedShowing.id,
            status: 1,
            customer: user.sub,
            concessions: getConcessionsIDString()
        }
    ];
    console.log(data);

    var xhr = new XMLHttpRequest();
      xhr.open("POST", "https://asdfghjklmnopqrstuvwxyz.herokuapp.com/api/bookings", true);
      xhr.setRequestHeader('Content-Type', 'application/json');
      xhr.setRequestHeader('Authorization', `Bearer ${accessToken}`);
      xhr.send(JSON.stringify(data));

      handleNext();
     // window.location.reload(false);
}

  const handleNext = () => {
    setActiveStep(activeStep + 1);
  };

  const handleBack = () => {
    setActiveStep(activeStep - 1);
  };

  return (
<div className={classes.layout}>
          <Typography component="h1" variant="h4" align="center">
            Checkout
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <React.Fragment>
            {activeStep === steps.length ? (
              <React.Fragment>
                <Typography variant="h5" gutterBottom>
                  Thank you for your order.
                </Typography>
                <Typography variant="subtitle1">
                  Your order number is #2001539. We have emailed your order confirmation. Please bring it to {values.theaterInfo.name} to recieve your order. Thank you for using Ticket Faster! 
                </Typography>
              </React.Fragment>
            ) : (
              <React.Fragment>
                {getStepContent(activeStep, values)}
                <div className={classes.buttons}>
                  {activeStep !== 0 && (
                    <Button onClick={handleBack} className={classes.button}>
                      Back
                    </Button>
                  )}
                  <Button
                    variant="contained"
                    color="primary"
                    onClick={(activeStep === steps.length - 1 ? handleSubmit : handleNext)}
                    className={classes.button}
                  >
                    {activeStep === steps.length - 1 ? 'Place order' : 'Next'}
                  </Button>
                </div>
              </React.Fragment>
            )}
          </React.Fragment>
      </div>  );
}
