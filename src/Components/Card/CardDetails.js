import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import ENV from '../../ENV.js';
import fetchData from "../../common/fetchData.js";
import { useHistory } from "react-router-dom"
import React from 'react'
import PropTypes from 'prop-types';
import {
  CForm,
  CFormInput,
  CRow,
} from '@coreui/react'
import ButtonGroup from '@mui/material/ButtonGroup';
import Button from '@mui/material/Button';
import Alert from '@mui/material/Alert';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';

const CardDetails= (props)=> {
    
    const [cardData, setCardData] = useState({});
    const [cardUserID, setCardUserID] = useState('');
    const [cardCode, setCardCode] = useState('');
    const [warning, setWarning] = useState('');

    const [result,setResult] = useState(false);
    const { id }=props;
    const [open, setOpen] = React.useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleOK = () => {
        setOpen(false);
        setResult(true);
        
    };
    const handleCancelDelete = () => {
        setOpen(false);
        setResult(false);
        
    };
    
    let token = sessionStorage.getItem('token');
    
    
    useEffect(() => {
           
        const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
        };
        
        (async () => {
        //get card details
            try {
            const data = await fetchData(`${ENV.domain}/cards/${id}`, requestOptions);

            if(data.status === 200) {
                setCardUserID(data.card[0].userID);
                    setCardCode(data.card[0].cardCode);
               
                setCardData(data.card[0]);
            }else{
                setCardData(null);
                sessionStorage.clear();
            }
            } catch (error) {
                console.log(error);
            }
        })()
    }, []) 
  
    async function handleDelete () {

        handleClickOpen()

        const requestOptions = {
            method: 'DELETE',
            headers: { 'Content-Type': 'application/json', 'Authorization': token }
        };
        
        if (result === true) {
            
            try{
                const res = await fetchData(`${ENV.domain}/cards/${id}`, requestOptions);
                if(res.status === 200){
                    window.location.reload();
                         
                }else{
                    setWarning('Delete card failed');
                    console.log(res.message);
                }
            }catch(err){
                setWarning(err);
            }
        }
        
    }

    function handleEdit () {
        document.getElementById("inputUserID").disabled = false;
        document.getElementById("inputCardCode").disabled = false;
    }

    async function handleSave () {
        document.getElementById("inputUserID").disabled = true;
        document.getElementById("inputCardCode").disabled = true;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({userID: cardUserID, 
                                  cardCode: cardCode})
        };
        try{
            const res = await fetchData(`${ENV.domain}/cards/${id}`, requestOptions);
            if(res.status === 200){
                window.location.reload();
            }else{
                setWarning('Update card failed')
                console.log(res.message);
            }
        }catch(err){
            setWarning(err);
        }
    }

    function handleCancel () {
        window.location.reload();
    }
    
    return (
        token && cardData !== null ? (
            <div>
                <CRow sx={{top:20}}>
                <h2>Card Details</h2>
                
                <CForm>
                    <label>Card ID {id}</label><br />
                    <label>User ID </label>
                    
                    <CFormInput 
                        type='text' 
                        id='inputUserID' 
                        value={cardUserID || ''} 
                        onChange={(e)=>setCardUserID(e.target.value)} 
                        disabled
                        />
                        <br />

                    <label>Card Code </label>
                    <CFormInput 
                        type='text' 
                        id='inputCardCode' 
                        value={cardCode || ''} 
                        autocomplete={cardCode}
                        onChange={(e)=>setCardCode(e.target.value)} 
                        disabled
                    /><br />
                </CForm>
                
                <ButtonGroup disableElevation variant="contained">
                    <Button id='edit-btn' onClick={handleEdit}>Edit Card</Button>
                    <Button id='save-btn' onClick={handleSave}>Save</Button>
                    <Button id='cancel-btn' onClick={handleCancel}>Cancel</Button>
                    <Button id='delete-btn' onClick={handleDelete}>Delete Card</Button>
                </ButtonGroup>
                <Alert severity="warning">{warning}</Alert>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Do you want to delete this card?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={handleOK}>OK</Button>
                        <Button onClick={handleCancelDelete}>Cancel</Button> 
                    </DialogActions>
                </Dialog>
                
                </CRow>
            </div>
        ) : (
            
            <Redirect to="/" />
        )
    )
}
CardDetails.propTypes = {
    id: PropTypes.number.isRequired,
}
CardDetails.defaultProps = {
    id: null,
}

export default CardDetails