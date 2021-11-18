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

export default function CreateOrganization () {
    let token = sessionStorage.getItem('token');

    const [organizationID, setOrganizationID] = useState('');
    const [organizationName, setOrganizationName] = useState('');
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState('');

    async function handleSubmit () {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({organizationName: organizationName})
        };

        try{
            const res = await fetchData(`${ENV.domain}/organizations`, requestOptions)
            if(res.status === 200){
                setMsg(res.message);
                setVisible(true);
            }else{
                setMsg('Adding organization failed')
                setVisible(true);
            }
        }catch(err){
            console.log(err);
        }
    }

    return (
        token ? (
            <div>
                <CRow sx={{top:20}}>
                <h2>Create New Organization Page</h2>
                    <CForm>
                        <label>Organization Name:</label>
                        <CFormInput
                            type="text"
                            required
                            value={organizationName}
                            onChange={(e) => setOrganizationName(e.target.value)}
                        />
                    </CForm>
                        <Stack spacing={2} direction="row">
                                <Button sx={{top:20,left:380,right:5}} variant="contained" size="large" autoFocus onClick={() => handleSubmit()}>Add Organization</Button>
                                <CAlert color="primary" dismissible visible={visible} onClose={() => setVisible(false)}>{msg}</CAlert>
                        </Stack>
                    
                </CRow>
            </div>
        ) : (
            <Redirect to="/" />
        )
    )
}