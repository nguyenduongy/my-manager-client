import { makeStyles } from "@material-ui/core/styles";
import { AppBar,  Collapse,  IconButton } from "@material-ui/core";
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown';
import { useEffect, useState } from "react";
import { Link  as Scroll } from 'react-scroll'
const useStyles = makeStyles((theme) => ({
    root :{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',                  //chinh le
        height: '100vh',
          textAlign :'center',

    },
     color:{

        color:"#5AFF3D",
        fontFamily :' Nunito',           //chinh mau chu
     },
        title: {
           color:'#fff' ,
           fontSize:'4.5rem', 
        },
         container:{
           
             textAlign:'center',


         },
         godown :{

            color: 'black',
            fontSize:'4em !important',
            
         }


}));

export default function Header() {
    
        const classes =useStyles ();
        const [checked,setChecked] = useState(false);
        useEffect(() =>{

                    setChecked(true);

        },[]
        )
        return ( <div>

          <div className={classes.root } id ="header" >
              <Collapse in={checked} {...(checked ? { timeout: 1000 } : {}) } collapsedHeight ={50}>
              

          <div className={classes.container } >

              <h1 className={classes.title} > Welcome to <br/> <span className={ classes.color}   >MY MANAGER. </span></h1>
         <Scroll to="place-to-bot" smooth={true}>


         
         
               <IconButton>
                   <  ArrowDropDownIcon className={classes.godown} />


               </IconButton>
               </Scroll>
              </div>
         
         
              </Collapse>
          </div>
        </div>

        );
}