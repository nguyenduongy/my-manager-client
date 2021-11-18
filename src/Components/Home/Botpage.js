import { makeStyles } from "@material-ui/core/styles";

import { useEffect, useState } from "react";
import ImageCard from './ImageCard';
import places from './places';
import useWindowPositon from './useWindowPosition'
const useStyles = makeStyles((theme) => ({
    root :{
                          //chinh le
        minHeight: '100vh',
        display: 'flex',
        justifyContent :'center',
        alignItems:'center',
          

    },
   


}));
export default function (){


 const classes = useStyles ();
 const checked = useWindowPositon ('header');
 return <div className={classes.root} id="place-to-bot">

 <ImageCard place={places[1]} checked={checked}/>
 <ImageCard place={places[0]} checked={checked} />

 </div>
}