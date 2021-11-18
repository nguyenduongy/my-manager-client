import { Redirect } from "react-router";
function Home () {

    let token = sessionStorage.getItem('token');

    return (
        token ? <div className="admin">
            <h2>Home Page</h2>
            <p>Welcome to <strong>My Manager</strong> website</p>
            <p>Created using <strong>ReactJS</strong> as front-end and <strong>NodeJS</strong> as back-end</p>
            <p>Developed by: <strong>Khuu Tu Minh</strong></p>
        </div>: <Redirect to='/' />
    )
}

export default Home;


// import * as React from 'react';

// //import { Card, CardBody } from 'reactstrap';
// import {makeStyles} from '@material-ui/core/styles';
// import { CssBaseline } from '@material-ui/core';
// import Headerpage from './Headerpage'
// import Botpage from './Botpage'

// const useStyles = makeStyles((theme) => ({
//   root:{
//   minHeight: '100vh',
//   backgroundImage: `url('/assets/bg.jpg'})`,
//   backgroundRepeat: "no-repeat",
//   backgroundSize:  "cover",
// },

// }));

// export default function Home  (){
 
//    const classes = useStyles();
//    return <div className={classes.root}>
//      <CssBaseline/>
//      <Headerpage/>
//       <Botpage/>
//    </div>;
// }