import { useEffect, useState } from "react";
import { Redirect } from "react-router";
import ENV from '../../ENV';
import fetchData from "../../common/fetchData";
import {
  CForm,
  CFormInput,
  CRow,
  CAlert,
} from '@coreui/react'
import MenuItem from '@mui/material/MenuItem';
import Stack from '@mui/material/Stack';
import Button from '@mui/material/Button';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import { styled } from '@mui/material/styles';

const BootstrapInput = styled(InputBase)(({ theme }) => ({
  'label + &': {
    marginTop: theme.spacing(3),
  },
  '& .MuiInputBase-input': {
    borderRadius: 4,
    position: 'relative',
    backgroundColor: theme.palette.background.paper,
    border: '1px solid #ced4da',
    fontSize: 16,
    padding: '10px 26px 10px 12px',
    transition: theme.transitions.create(['border-color', 'box-shadow']),
    // Use the system font instead of the default Roboto font.
    fontFamily: [
      '-apple-system',
      'BlinkMacSystemFont',
      '"Segoe UI"',
      'Roboto',
      '"Helvetica Neue"',
      'Arial',
      'sans-serif',
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(','),
    '&:focus': {
      borderRadius: 4,
      borderColor: '#80bdff',
      boxShadow: '0 0 0 0.2rem rgba(0,123,255,.25)',
    },
  },
}));

export default function CreateActivity () {
    let token = sessionStorage.getItem('token');

    const [activityName, setActivityName] = useState('');
    const [activityOrganizationID, setActivityOrganizationID] = useState('');
    const [activityDescription, setActivityDescription] = useState('');
    const [activityStartTime, setActivityStartTime] = useState('');
    const [activityEndTime, setActivityEndTime] = useState('');
    const [visible, setVisible] = useState(false);
    const [allOrganization, setAllOrganization] = useState();
    const [msg, setMsg] = useState('');

    async function handleSubmit () {

        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({activityName: activityName, 
                                  organizationID: activityOrganizationID,
                                  description: activityDescription, 
                                  startTime: activityStartTime, 
                                  endTime: activityEndTime})
        };

        try{
            const res = await fetchData(`${ENV.domain}/activities`, requestOptions)
            if(res.status === 200){
                setMsg(res.message);
                setVisible(true);
            }else{
                setMsg('Adding activity failed');
                setVisible(true);
            }
        }catch(err){
            console.log(err);
        }
    }

    useEffect(() => {
        (async () => {
            const requestOptions = {
                method: 'GET',
                headers: { 'Content-Type': 'application/json', 'Authorization': token },
            };

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
    },[])

    return (
        token ? (
            <div>
                <CRow sx={{top:20}}>
                <h2>Create New Activity Page</h2>
                <CForm>
                    <label>Activity Name</label>
                    <CFormInput
                        type="text"
                        required
                        value={activityName}
                        onChange={(e) => setActivityName(e.target.value)}
                    />
                    <label>Organization</label>
                    <Select 
                        id="organization-ID" 
                        input={<BootstrapInput />}
                        onChange={(e)=>setActivityOrganizationID(e.target.value)}
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
                    <br />
                    <label>Description</label>
                    <CFormInput
                        type="text"
                        required
                        value={activityDescription}
                        onChange={(e) => setActivityDescription(e.target.value)}
                    />
                    <label>Start Time</label>
                    <CFormInput
                        type="datetime-local"
                        required
                        value={activityStartTime}
                        onChange={(e) => setActivityStartTime(e.target.value)}
                    />
                    <label>End Time</label>
                    <CFormInput

                        type="datetime-local"
                        required
                        value={activityEndTime}
                        onChange={(e) => setActivityEndTime(e.target.value)}
                    />

                     
                </CForm>
                    <Stack spacing={2} direction="row">
                        <Button sx={{top:20,left:420,right:5}} variant="contained" size="large" autoFocus onClick={() => handleSubmit()}>Add Activity</Button>
                        <CAlert color="primary" dismissible visible={visible} onClose={() => setVisible(false)}>{msg}</CAlert>
                    </Stack> 
                </CRow>
            </div>
        ) : (
            <Redirect to="/" />
        )
    )
}