import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import ENV from '../../ENV.js';
import fetchData from "../../common/fetchData.js";
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

function formatDate(string) {
    var d = new Date(string),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
        minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()

    return year+'-'+month+'-'+day+'T'+hour+':'+minute;
}

export default function DetailDetails (props) {
    
    const [detailData, setDetailData] = useState({});
    const [detailID, setDetailID] = useState('');
    const [activityID, setActivityID] = useState('');
    const [userID, setUserID] = useState('');
    const [inTime, setInTime] = useState('');
    const [outTime, setOutTime] = useState('');
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

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
    };
    //console.log(token);

    async function handleDelete () {
        handleClickOpen()
        if (result === true) {
            const requestOptions = {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json', 'Authorization': token }
            };
            try{
                const res = await fetchData(`${ENV.domain}/details/${id}`, requestOptions);
                if(res.status === 200){
                    // history.push('/details')
                    window.location.reload();
                }else{
                    setWarning('Delete detail failed');
                    console.log(res.message);
                }
            }catch(err){
                setWarning(err);
            }
        }
    }

    function handleEdit () {
        document.getElementById("inputActivityID").disabled = false;
        document.getElementById("inputUserID").disabled = false;
        document.getElementById("inputInTime").disabled = false;
        document.getElementById("inputOutTime").disabled = false;
    }

    async function handleSave () {
        document.getElementById("inputActivityID").disabled = true;
        document.getElementById("inputUserID").disabled = true;
        document.getElementById("inputInTime").disabled = true;
        document.getElementById("inputOutTime").disabled = true;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({activityID: activityID,
                                  userID: userID, 
                                  inTime: inTime, 
                                  outTime: outTime})
        };
        try{
            const res = await fetchData(`${ENV.domain}/details/${id}`, requestOptions);
            if(res.status === 200){
                // history.push('/details')
                window.location.reload();
            }else{
                setWarning('Update detail failed')
                console.log(res.message);
            }
        }catch(err){
            setWarning(err);
        }
    }

    function handleCancel () {
        window.location.reload();
    }

    useEffect(() => {
        (async () => {
            //get detail details
            try {
                const data = await fetchData(`${ENV.domain}/details/${id}`, requestOptions);

                if(data.status === 200) {
                    setDetailID(data.detail[0].detailID);
                    setActivityID(data.detail[0].activityID);
                    setUserID(data.detail[0].userID);

                    const inTimeString = formatDate(data.detail[0].inTime);
                    setInTime(inTimeString);

                    const outTimeString = formatDate(data.detail[0].outTime);
                    setOutTime(outTimeString);
                    
                    setDetailData(data.detail[0]);
                }else{
                    setDetailData(null);
                    sessionStorage.clear();
                }
            } catch (error) {
                console.log(error);
            }
            
        })()
    }, [])
    
    return (
        token && detailData !== null ? (
            
            <div className="detail-details">
                <CRow>
                    <h2>Detail Details:</h2>
                <CForm>
                    <label>Detail ID: {detailData.detailID}</label>
                    <br />

                    <label>Activity ID </label>
                    <CFormInput 
                        type='text' 
                        id='inputActivityID' 
                        value={activityID || ''} 
                        onChange={(e)=>setActivityID(e.target.value)} 
                        disabled />
                        <br />

                    <label>User ID </label>
                    <CFormInput 
                        type='text' id='inputUserID' 
                        value={userID || ''} 
                        onChange={(e)=>setUserID(e.target.value)} 
                        disabled />
                        <br />
                    
                    <label>In Time </label>
                    <CFormInput 
                        type='datetime-local' 
                        id='inputInTime' 
                        value={inTime || ''} 
                        onChange={(e)=>setInTime(e.target.value)} 
                        disabled />
                        <br />

                    <label>Out Time </label>
                    <CFormInput 
                        type='datetime-local' 
                        id='inputOutTime' 
                        value={outTime || ''} 
                        onChange={(e)=>setOutTime(e.target.value)} 
                        disabled />
                        <br />
                </CForm>
                <br />
                <ButtonGroup disabledElevation variant="contained">
                    <Button id='edit-btn' onClick={handleEdit}>Edit Detail</Button>
                    <Button id='save-btn' onClick={handleSave}>Save</Button>
                    <Button id='cancel-btn' onClick={handleCancel}>Cancel</Button>
                    <Button id='delete-btn' onClick={handleDelete}>Delete Detail</Button>
                </ButtonGroup>
                <Alert>{warning}</Alert>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Do you want to delete this avtivity?</DialogContentText>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={()=>handleOK()}>OK</Button>
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