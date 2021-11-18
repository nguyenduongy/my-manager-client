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

export default function CreateDetail () {
    let token = sessionStorage.getItem('token');
    const [activityID, setActivityID] = useState('');
    const [userID, setUserID] = useState('');
    const [inTime, setInTime] = useState('');
    const [outTime, setOutTime] = useState('');
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState('');

    async function handleSubmit () {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({activityID: activityID,
                                  userID: userID, 
                                  inTime: inTime, 
                                  outTime: outTime})
        };

        try{
            const res = await fetchData(`${ENV.domain}/details`, requestOptions)
            if(res.status === 200){
                setMsg(res.message);
                setVisible(true);
            }else{
                setMsg('Adding detail failed');
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
                    <h2>Create New Detail Page</h2>
                    <CForm>
                        <label> Activity ID </label>
                            <CFormInput
                                type="text"
                                required
                                value={activityID}
                                onChange={(e) => setActivityID(e.target.value)}
                            />
                            <label> User ID </label>
                            <CFormInput
                                type="text"
                                required
                                value={userID}
                                onChange={(e) => setUserID(e.target.value)}
                            />
                            <label> Time In </label>
                            <CFormInput
                                type="datetime-local"
                                required
                                value={inTime}
                                onChange={(e) => setInTime(e.target.value)}
                            />
                            <label> Time Out </label>
                            <CFormInput
                                type="datetime-local"
                                required
                                value={outTime}
                                onChange={(e) => setOutTime(e.target.value)}
                            />
                    </CForm>
                    <Stack spacing={2} direction="row">
                        <Button sx={{top:20,left:440,right:5}} variant="contained" size="large" autoFocus onClick={() => handleSubmit()}>Add Detail</Button>
                        <CAlert color="primary" dismissible visible={visible} onClose={() => setVisible(false)}>{msg}</CAlert>
                    </Stack>

                </CRow>
            </div>
        ) : (
            <Redirect to="/" />
        )
    )
}