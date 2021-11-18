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

export default function OrganizationDetails (props) {
    
    const [organizationData, setOrganizationData] = useState({});
    const [organizationID, setOrganizationID] = useState('');
    const [organizationName, setOrganizationName] = useState('');
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
                const res = await fetchData(`${ENV.domain}/organizations/${id}`, requestOptions);
                if(res.status === 200){
                    // history.push('/organizations')
                    window.location.reload();
                }else{
                    setWarning('Delete organization failed');
                    console.log(res.message);
                }
            }catch(err){
                setWarning(err);
            }
        }
    }

    function handleEdit () {
        document.getElementById("inputOrganizationName").disabled = false;
    }

    async function handleSave () {
        document.getElementById("inputOrganizationName").disabled = true;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({organizationName: organizationName})
        };
        try{
            const res = await fetchData(`${ENV.domain}/organizations/${id}`, requestOptions);
            if(res.status === 200){
                // history.push('/organizations')
                window.location.reload();
            }else{
                setWarning('Update organization failed')
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
            //get organization details
            try {
                const data = await fetchData(`${ENV.domain}/organizations/${id}`, requestOptions);

                if(data.status === 200) {
                    setOrganizationID(data.organization[0].organizationID);
                    setOrganizationName(data.organization[0].organizationName);
                    
                    setOrganizationData(data.organization[0]);
                }else{
                    setOrganizationData(null);
                    sessionStorage.clear();
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])
    
    return (
        token && organizationData !== null ? (
            <div>
                <CRow>
                <h2>Organization Details:</h2>
                <CForm>
                    <label>Organization ID {organizationData.organizationID}</label><br />

                    <label>Organization Name </label>
                    <CFormInput 
                        type='text' 
                        id='inputOrganizationName' 
                        value={organizationName || ''} 
                        onChange={(e)=>setOrganizationName(e.target.value)} 
                        disabled />
                        <br />
                </CForm>
                <br />
                <ButtonGroup disabledElevation variant="contained">
                    <Button id='edit-btn' onClick={handleEdit}>Edit Organization</Button>
                    <Button id='save-btn' onClick={handleSave}>Save</Button>
                    <Button id='cancel-btn' onClick={handleCancel}>Cancel</Button>
                    <Button id='delete-btn' onClick={handleDelete}>Delete Organization</Button>
                </ButtonGroup>
                <Alert>{warning}</Alert>
                <Dialog
                    open={open}
                    aria-labelledby="alert-dialog-title"
                    aria-describedby="alert-dialog-description"
                >
                    <DialogTitle id="alert-dialog-title"></DialogTitle>
                    <DialogContent>
                        <DialogContentText id="alert-dialog-description">Do you want to delete this admin?</DialogContentText>
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

OrganizationDetails.propTypes = {
    id: PropTypes.number.isRequired,
}
OrganizationDetails.defaultProps = {
    id: null,
}