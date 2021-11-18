
//import {Button, Col, Container, Form, Row} from "react-bootstrap";
import * as React from 'react';

//import { Card, CardBody } from 'reactstrap';
import {makeStyles} from '@material-ui/core/styles';
import { CssBaseline } from '@material-ui/core';
import Headerpage from './Headerpage.js'
import Botpage from './Botpage'
import { images } from '../../images.js';

const useStyles = makeStyles((theme) => ({
  root:{
  minHeight: '100vh',
  backgroundImage: `url(${process.env.PUBLIC_URL+images.bgHome})`,
  backgroundRepeat: "no-repeat",
  backgroundSize:  "cover",
  


},

}));

export default function Home  (){
 
   const classes = useStyles();
   return <div className={classes.root}>
      <CssBaseline/>
      <Headerpage/>
      <Botpage/>
   </div>;
        
   

}














