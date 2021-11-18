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

export default function CreateCard () { 
    let token = sessionStorage.getItem('token');

    const [cardUserID, setCardUserID] = useState('');
    const [cardCode, setCardCode] = useState('');
    const [visible, setVisible] = useState(false);
    const [msg, setMsg] = useState('');

    async function handleSubmit () {
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json', 'Authorization': token },
            body: JSON.stringify({userID: cardUserID, 
                                  cardCode: cardCode})
        };

        try{
            const res = await fetchData(`${ENV.domain}/cards`, requestOptions)
            if(res.status === 200){
                setMsg(res.message);
                setVisible(true);
            }else{
                setMsg('Adding card failed')
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
                    <h2>Create New Card Page</h2>
                      
                <CForm>
                    <label> User ID </label>
                    <CFormInput
                    type="text"
                    required
                    value={cardUserID}
                    onChange={(e) => setCardUserID(e.target.value)}
                />
                <label> Card Code </label>
                <CFormInput
                    type="text"
                    required
                    value={cardCode}
                    onChange={(e) => setCardCode(e.target.value)}
                    
                />

            </CForm>
                                            
                <Stack spacing={2} direction="row">
                    <Button sx={{top:20,left:440,right:5}} variant="contained" size="large" autoFocus onClick={() => handleSubmit()}>Add Card</Button>
                    <CAlert color="primary" dismissible visible={visible} onClose={() => setVisible(false)}>{msg}</CAlert>
                </Stack>        
            </CRow>
                
            </div>
        ) : (
            <Redirect to="/" />
        )
    )
}