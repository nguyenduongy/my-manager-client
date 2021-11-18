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

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';


function formatDate(string) {
    var d = new Date(string),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear(),
        hour = d.getHours() < 10 ? '0' + d.getHours() : d.getHours(),
        minute = d.getMinutes() < 10 ? '0' + d.getMinutes() : d.getMinutes()

    return year+'-'+month+'-'+day+'T'+hour+':'+minute;
}

export default function ActivityDetails (props) {

    const [activityData, setActivityData] = useState({});
    const [activityName, setActivityName] = useState('');
    const [activityOrganizationID, setActivityOrganizationID] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [activityStartTime, setActivityStartTime] = useState('');
    const [activityEndTime, setActivityEndTime] = useState('');
    const [allOrganization, setAllOrganization] = useState();
    const [warning, setWarning] = useState('');

    const [result,setResult] = useState(false);
    const { id }=props;
    const [open, setOpen] = React.useState(false);
    const [check, setCheck] = React.useState(true);

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
                const res = await fetchData(`${ENV.domain}/activities/${id}`, requestOptions);
                if(res.status === 200){
                    // history.push('/activities')
                    window.location.reload();
                }else{
                    setWarning('Delete activity failed');
                    console.log(res.message);
                }
            }catch(err){
                setWarning(err);
            }
        }
    }

    function handleEdit () {
        document.getElementById("inputActivityName").disabled = false;
        setCheck(false);
        // document.getElementById("inputOrganizationID").disabled = false;
        document.getElementById("inputDescription").disabled = false;
        document.getElementById("inputStartTime").disabled = false;
        document.getElementById("inputEndTime").disabled = false;
    }

    async function handleSave () {
        document.getElementById("inputActivityName").disabled = true;
        document.getElementById("inputOrganizationID").disabled = true;
        document.getElementById("inputDescription").disabled = true;
        document.getElementById("inputStartTime").disabled = true;
        document.getElementById("inputEndTime").disabled = true;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({activityName: activityName, 
                                  organizationID: activityOrganizationID,
                                  description: activityDescription, 
                                  startTime: activityStartTime, 
                                  endTime: activityEndTime})
        };
        try{
            const res = await fetchData(`${ENV.domain}/activities/${id}`, requestOptions);
            if(res.status === 200){
                // history.push('/activities')
                window.location.reload();
            }else{
                setWarning('Update activity failed')
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
            //get activity details
            try {
                const data = await fetchData(`${ENV.domain}/activities/${id}`, requestOptions);

                if(data.status === 200) {
                    setActivityName(data.activity[0].activityName);
                    setActivityOrganizationID(data.activity[0].organizationID);
                    setActivityDescription(data.activity[0].description);

                    const startTimeString = formatDate(data.activity[0].startTime);
                    // setActivityStartTime(startTimeString);
                    setActivityStartTime(startTimeString);

                    console.log(startTimeString);
                    //console.log(startTimeString);

                    const endTimeString = formatDate(data.activity[0].endTime);
                    setActivityEndTime(endTimeString);

                    console.log(endTimeString);
                    //console.log(endTimeString);
                    
                    setActivityData(data.activity[0]);
                }else{
                    setActivityData(null);
                    sessionStorage.clear();
                }
            } catch (error) {
                console.log(error);
            }
            //get all organization to select from
            try {
                const data = await fetchData(`${ENV.domain}/organizations/all`, requestOptions);

                if(data.status === 200) {
                    setAllOrganization(data.organizations)
                    //console.log(data.organizations);
                }else{
                    sessionStorage.clear();
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
    
    return (
        token && activityData !== null ? (
            <div>
                <CRow>
                    <h2>Activity Details</h2>
                    
                    <label>Activity ID {activityData.activityID}</label><br></br>
                    <CForm>
                    <label>Activity Name </label>
                    <CFormInput type='text' id='inputActivityName' 
                        value={activityName || ''} onChange={(e)=>setActivityName(e.target.value)} disabled/><br></br>

                    <label>Organization </label>
                        <Select 
                            id="inputOrganizationID" 
                            value={activityOrganizationID}
                            onChange={(e)=>setActivityOrganizationID(e.target.value)} 
                            disabled = {check}>
                        {allOrganization && allOrganization.map(organization => {
                            return ( 
                                <MenuItem 
                                    value={organization.organizationID} 
                                    key={organization.organizationID}
                                >
                                    {organization.organizationID+'-'+organization.organizationName}
                                </MenuItem>
                            )
                        })
                        }
                    </Select><br></br>

                    <label>Description </label>
                    <CFormInput 
                        type='text' 
                        id='inputDescription' 
                        value={activityDescription || ''} 
                        onChange={(e)=>setActivityDescription(e.target.value)} 
                        disabled/><br></br>
                    
                    <label>Start Time </label>
                    <CFormInput 
                        type='datetime-local' 
                        id='inputStartTime' 
                        value={activityStartTime || ''} 
                        onChange={(e)=>setActivityStartTime(e.target.value)} 
                        disabled/><br></br>

                    <label>End Time </label>
                    <CFormInput 
                        type='datetime-local' 
                        id='inputEndTime' 
                        value={activityEndTime || ''} 
                        onChange={(e)=>setActivityEndTime(e.target.value)} 
                        disabled/><br></br>
                </CForm>
                <ButtonGroup disableElevation variant="contained">
                <Button id='edit-btn' onClick={handleEdit}>Edit Activity</Button>
                <Button id='save-btn' onClick={handleSave}>Save</Button>
                <Button id='cancel-btn' onClick={handleCancel}>Cancel</Button>
                <Button id='delete-btn' onClick={handleDelete}>Delete Activity</Button>
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
ActivityDetails.propTypes = {
    id: PropTypes.number.isRequired,
}
ActivityDetails.defaultProps = {
    id: null,
}