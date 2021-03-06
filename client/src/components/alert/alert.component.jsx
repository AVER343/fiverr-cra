import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Alert from '@material-ui/lab/Alert';

const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    '& > * + *': {
      marginTop: theme.spacing(2),
    },
  },
}));

export default function SimpleAlerts() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Alert style={{marginTop:"20px",fontSize:'15px',textAlign:'center'}} severity="success">Thank you for booking tickets with us !</Alert>
    </div>
  );
}
export const SimpleAlerts1 =()=> {
    const classes = useStyles();
  
    return (
      <div className={classes.root}>
        <Alert style={{marginTop:"20px",fontSize:'15px',textAlign:'center'}} severity="error">CHECKBOXES NOT CHECKED !</Alert>
      </div>
    );
  }