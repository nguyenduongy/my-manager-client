import { useState } from "react";
import { Redirect } from "react-router";
import ENV from '../../ENV';
import fetchData from "../../common/fetchData";
import {
  CForm,
  CFormInput,
  CRow,
  CAlert,
} from '@coreui/react'
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';

export default function CreateAdmin () {
    let token = sessionStorage.getItem('token');

    const [adminUserName, setAdminUserName] = useState('');
    const [adminPassword, setAdminPassword] = useState('');
    const [adminFirstName, setAdminFirstName] = useState('');
    const [adminLastName, setAdminLastName] = useState('');
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState('');

    async function handleSubmit () {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({userName: adminUserName, 
                                  password: adminPassword, 
                                  firstName: adminFirstName, 
                                  lastName: adminLastName})
        };

        try{
            const res = await fetchData(`${ENV.domain}/admins`, requestOptions)
            if(res.status === 200){
                setMsg(res.message);
                setVisible(true)
            }else{
                setMsg('Adding admin failed')
                setVisible(true)
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        token ? (
            <div>
                <CRow sx={{top:20}}>
                    <h2>Create New Admin Page</h2>
                      
                    <CForm>
                        <label> User Name </label>
                        <CFormInput
                            type="text"
                            required
                            value={adminUserName}
                            onChange={(e) => setAdminUserName(e.target.value)}
                        />
                        <label> Password </label>
                        <CFormInput
                            type="text"
                            required
                            value={adminPassword}
                            onChange={(e) => setAdminPassword(e.target.value)}
                    
                        />
                        <label> First Name </label>
                        <CFormInput
                            type="text"
                            required
                            value={adminFirstName}
                            onChange={(e) => setAdminFirstName(e.target.value)}
                        />
                        <label> Last Name </label>
                        <CFormInput
                            type="text"
                            required
                            value={adminLastName}
                            onChange={(e) => setAdminLastName(e.target.value)}
                        />

                        </CForm>
                                            
                            <Stack spacing={2} direction="row">
                                <Button sx={{top:20,left:440,right:5}} variant="contained" size="large" autoFocus onClick={() => handleSubmit()}>Add Admin</Button>
                                <CAlert color="primary" dismissible visible={visible} onClose={() => setVisible(false)}>{msg}</CAlert>
                            </Stack>
                                            
                               
                    </CRow>
               
            </div>
        ) : (
            <Redirect to="/" />
        )
    )
}