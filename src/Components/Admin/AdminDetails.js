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

export default function AdminDetails (props) {
    
    const [adminData, setAdminData] = useState({});
    const [adminUserName, setAdminUserName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminFirstName, setAdminFirstName] = useState('');
    const [adminLastName, setAdminLastName] = useState('');
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
                const res = await fetchData(`${ENV.domain}/admins/${id}`, requestOptions);
                if(res.status === 200){
                    // history.push('/admins')
                    window.location.reload();
                }else{
                    setWarning('Delete admin failed');
                    console.log(res.message);
                }
            }catch(err){
                setWarning(err);
            }
        }
    }

    function handleEdit () {
        document.getElementById("inputUserName").disabled = false;
        document.getElementById("inputPassword").disabled = false;
        document.getElementById("inputFirstName").disabled = false;
        document.getElementById("inputLastName").disabled = false;
    }

    async function handleSave () {
        document.getElementById("inputUserName").disabled = true;
        document.getElementById("inputPassword").disabled = true;
        document.getElementById("inputFirstName").disabled = true;
        document.getElementById("inputLastName").disabled = true;

        const requestOptions = {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({userName: adminUserName, 
                                  password: adminPassword, 
                                  firstName: adminFirstName, 
                                  lastName: adminLastName})
        };
        try{
            const res = await fetchData(`${ENV.domain}/admins/${id}`, requestOptions);
            if(res.status === 200){
                // history.push('/admins')
                window.location.reload();
            }else{
                setWarning('Update admin failed')
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
            //get admin details
            try {
                const data = await fetchData(`${ENV.domain}/admins/${id}`, requestOptions);

                if(data.status === 200) {
                    setAdminUserName(data.admin[0].userName);
                    setAdminPassword(data.admin[0].password);
                    setAdminFirstName(data.admin[0].firstName);
                    setAdminLastName(data.admin[0].lastName);
                    
                    setAdminData(data.admin[0]);
                }else{
                    setAdminData(null);
                    sessionStorage.clear();
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, []);
    
    return (
        token && adminData !== null ? (
            <div>
                <CRow>
                    <h2>Admin Details</h2>
                    <label>Admin ID: {adminData.adminID}</label><br />
                    <CForm>
                    <label>UserName </label>
                    <CFormInput 
                        type='text' 
                        id='inputUserName' 
                        value={adminUserName || ''} 
                        onChange={(e)=>setAdminUserName(e.target.value)} 
                        disabled />
                        <br />

                    <label>Password </label>
                    <CFormInput 
                        type='text' 
                        id='inputPassword' 
                        value={adminPassword || ''} 
                        onChange={(e)=>setAdminPassword(e.target.value)} 
                        disabled />
                        <br />

                    <label>Fisrt Name </label>
                    <CFormInput 
                        type='text' 
                        id='inputFirstName' 
                        value={adminFirstName || ''} 
                        onChange={(e)=>setAdminFirstName(e.target.value)} 
                        disabled />
                        <br />

                    <label>last Name </label>
                    <CFormInput 
                        type='text' 
                        id='inputLastName' 
                        value={adminLastName || ''} 
                        onChange={(e)=>setAdminLastName(e.target.value)} 
                        disabled />
                        <br />
                </CForm>
                <br />
                <ButtonGroup disabledElevation variant="contained">
                    <Button id='edit-btn' onClick={handleEdit}>Edit Admin</Button>
                    <Button id='save-btn' onClick={handleSave}>Save</Button>
                    <Button id='cancel-btn' onClick={handleCancel}>Cancel</Button>
                    <Button id='delete-btn' onClick={handleDelete}>Delete Admin</Button>
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

AdminDetails.propTypes = {
    id: PropTypes.number.isRequired,
}
AdminDetails.defaultProps = {
    id: null,
}