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

import MenuItem from '@mui/material/MenuItem';
import Select from '@mui/material/Select';

function formatDate(date) {
    var d = new Date(date),
        month = '' + (d.getMonth() + 1),
        day = '' + d.getDate(),
        year = d.getFullYear();

    if (month.length < 2)
        month = '0' + month;
    if (day.length < 2)
        day = '0' + day;

    return [year, month, day].join('-');
}

function UserDetails (props) {

    const [userData, setUserData] = useState({});
    const [userFirstName, setUserFirstName] = useState('');
    const [userLastName, setUserLastName] = useState('');
    const [userDoB, setUserDoB] = useState('');
    const [userTitle, setUserTitle] = useState('');
    const [allOrganization, setAllOrganization] = useState();
    const [userOrganizationID, setUserOrganizationID] = useState('');
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
                const res = await fetchData(`${ENV.domain}/users/${id}`, requestOptions);
                if(res.status === 200){
                    // history.push('/users')
                    window.location.reload();
                }else{
                    setWarning('Delete user failed');
                    console.log(res.message);
                }
            }catch(err){
                setWarning(err);
            }
        }
    }

    function handleEdit () {
        document.getElementById("inputFirstName").disabled = false;
        document.getElementById("inputLastName").disabled = false;
        document.getElementById("inputDoB").disabled = false;
        document.getElementById("inputTitle").disabled = false;
        // document.getElementById("inputOrganization").disabled = false;
        setCheck(false);
    }

    async function handleSave () {
        document.getElementById("inputFirstName").disabled = true;
        document.getElementById("inputLastName").disabled = true;
        document.getElementById("inputDoB").disabled = true;
        document.getElementById("inputTitle").disabled = true;
        document.getElementById("inputOrganization").disabled = true;

        console.log(userFirstName);
        console.log(userLastName);
        console.log(userDoB);
        console.log(userTitle);
        console.log(userOrganizationID);

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({firstName: userFirstName, 
                                  lastName: userLastName, 
                                  dateOfBirth: userDoB, 
                                  title: userTitle, 
                                  organizationID: userOrganizationID})
        };
        try{
            const res = await fetchData(`${ENV.domain}/users/${id}`, requestOptions);
            if(res.status === 200){
                // history.push('/users')
                window.location.reload();
            }else{
                setWarning('Update user failed')
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
            //get user details
            try {
                const data = await fetchData(`${ENV.domain}/users/${id}`, requestOptions);

                if(data.status === 200) {
                    setUserFirstName(data.user[0].firstName);
                    setUserLastName(data.user[0].lastName);
                    
                    const dateString = formatDate(data.user[0].dateOfBirth);
                    setUserDoB(dateString);
                    // console.log(dateString);

                    setUserTitle(data.user[0].title);
                    setUserOrganizationID(data.user[0].organizationID);
                    
                    setUserData(data.user[0]);
                }else{
                    setUserData(null);
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
        token && userData !== null ? (
            <div>
                <CRow>
                <h2>User Details</h2>
                <CForm>
                    <label>User ID {userData.userID}</label><br />

                    <label> Fisrt Name </label>
                    <CFormInput 
                        type='text' 
                        id='inputFirstName' 
                        value={userFirstName || ''} 
                        onChange={(e)=>setUserFirstName(e.target.value)} 
                        disabled /><br />

                    <label>last Name </label>
                    <CFormInput 
                        type='text' 
                        id='inputLastName' 
                        value={userLastName || ''} 
                        onChange={(e)=>setUserLastName(e.target.value)} 
                        disabled /><br />

                    <label>Date of Birth </label>
                    <CFormInput 
                        type='date' 
                        id='inputDoB'
                        value={userDoB || ''} 
                        onChange={(e)=>{setUserDoB(e.target.value)}} 
                        disabled /><br />

                    <label>Title </label>
                    <CFormInput 
                        type='text' 
                        id='inputTitle' 
                        value={userTitle || ''} 
                        onChange={(e)=>setUserTitle(e.target.value)} 
                        disabled /><br />

                    <label>Organization </label>
                        <Select 
                            id="inputOrganization" 
                            value={userOrganizationID}
                            onChange={(e)=>setUserOrganizationID(e.target.value)} 
                            disabled = {check}
                        >
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
                    </Select>
                </CForm>
                <br />
                
                <ButtonGroup sx={{top:50}} disabledElevation variant="contained">
                    <Button id='edit-btn' onClick={handleEdit}>Edit User</Button>
                    <Button id='save-btn' onClick={handleSave}>Save</Button>
                    <Button id='cancel-btn' onClick={handleCancel}>Cancel</Button>
                    <Button id='delete-btn' onClick={handleDelete}>Delete User</Button>                
                </ButtonGroup>
                <Alert>{warning}</Alert>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Do you want to delete this User?</DialogContentText>
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

export default UserDetails;