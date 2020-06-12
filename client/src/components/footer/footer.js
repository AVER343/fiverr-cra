import React from 'react';
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import { makeStyles } from '@material-ui/core/styles';
import Container from '@material-ui/core/Container';
import Link from '@material-ui/core/Link';
import './footer.styles.css'
function Copyright() {
  return (
    <Typography  variant="body2" color="textSecondary">
      {'Copyright © '}
       {' '}SkyLuxTravel.com  All rights reserved. CST # 2119950-40{' '}
      {'.'}
    </Typography>
  );
}

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexDirection: 'column',
    minHeight: '100vh',
  },
  main: {
    marginBottom: theme.spacing(2),
  },
  footer: {
    padding: theme.spacing(3, 2),
    marginTop: 'auto',
    backgroundColor:
      theme.palette.type === 'light' ? theme.palette.grey[200] : theme.palette.grey[800],
  }
}));

export default function StickyFooter() {
  const classes = useStyles();
  return (
    <div className={classes.root}>   
      <footer className={classes.footer}>
        <Container maxWidth="sm">
        <div _ngcontent-fgm-c13="" class="wrapper partners"><ul _ngcontent-fgm-c13="" class="partners-list"><li _ngcontent-fgm-c13="" class="partners-item partners-item__asta"></li><li _ngcontent-fgm-c13="" class="partners-item partners-item__pata"></li><li _ngcontent-fgm-c13="" class="partners-item partners-item__acta"></li><li _ngcontent-fgm-c13="" class="partners-item partners-item__norton"></li><li _ngcontent-fgm-c13="" class="partners-item partners-item__master-card"></li><li _ngcontent-fgm-c13="" class="partners-item partners-item__visa"></li><li _ngcontent-fgm-c13="" class="partners-item partners-item__discover"></li><li _ngcontent-fgm-c13="" class="partners-item partners-item__american"></li><li _ngcontent-fgm-c13="" class="partners-item partners-item__diners"></li><li _ngcontent-fgm-c13="" class="partners-item partners-item__bbb"></li></ul></div>
          <Copyright />
        </Container>
      </footer>
    </div>
  );
}