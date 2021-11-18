import React,{ useState } from "react";
import ENV from "../../ENV";
import {
  CButton,
  CCard,
  CCardBody,
  CCardGroup,
  CCol,
  CContainer,
  CForm,
  CFormInput,
  CInputGroup,
  CInputGroupText,
  CRow,
  CAlert,
} from '@coreui/react'
import { useHistory } from 'react-router-dom'
import CIcon from '@coreui/icons-react'
import { cilLockLocked, cilUser } from '@coreui/icons'
import logo from '../../assets/images/logo.png';
import './style.css'


function Login () {
    const [userName, setUserName] = useState('');
    const [password, setPassword] = useState('');
    const [warings, setWarings] = useState('');
    const [visible, setVisible] = useState(false);
    const history = useHistory();
 
    const handleSubmit = (e) => {
        e.preventDefault();
        const user = { userName, password };
        if (!userName || !password) {
            setVisible(true);
            setWarings('Chưa nhập User Name Password');
        return
        }
        const requestOptions = {
            method: 'POST',
            headers: { 'Content-Type': 'application/json'},
            body: JSON.stringify(user)
        };
        console.log(requestOptions.body);
        fetch(`${ENV.domain}`, requestOptions)
            .then(res => res.json())
            .then(data => {
                if(data.message === 'login successfully'){
                    sessionStorage.setItem('token', data.token);
                     history.push('/Home') ;
                }else {
                    setVisible(true);
                    setWarings('User Name hoặc password không đúng');
                }
            })
            .catch(err => {
                setVisible(true);
                setWarings(err.message);
              });
    }
    //const backgroundS = useStyles();
    return (
        
 //       <div className="bg-light min-vh-100 d-flex flex-row align-items-center" >
       
            <div className="bg-light min-vh-100 d-flex flex-row align-items-center bg-home">
            <CContainer >
                <CRow className="justify-content-center">
                    <CCol md={4}>
                        <CCardGroup>
                            <CCard className="p-4">
                                <CCardBody>
                                    <CForm>
                                        <div className="mx-auto mb-5">
                                                    <a >
                                                        <img src={logo} alt="" height="24" />
                                                        <h3 className="d-inline align-middle ml-1 text-logo">My Manager</h3>
                                                    </a>
                                                </div>
                                        <label> User Name </label>
                                        <CInputGroup className="mb-3" >
                                            <CInputGroupText>
                                                <CIcon icon={cilUser} />
                                            </CInputGroupText>
                                            <CFormInput
                                                placeholder="Username"
                                                autoComplete=""
                                                required
                                                value={userName}
                                                onChange={(event) => setUserName(event.target.value)}
                                                
                                            />
                                        </CInputGroup>
                                        <label> Password </label>
                                        <CInputGroup className="mb-4">
                                            <CInputGroupText>
                                                <CIcon icon={cilLockLocked} />
                                            </CInputGroupText>
                                            <CFormInput
                                                type="password"
                                                placeholder="Password"
                                                autoComplete="current-password"
                                                required
                                                value={password}
                                                onChange={(event) => setPassword(event.target.value)}
                                                
                                            />
                                        </CInputGroup>
                                        <CRow>
                                            <CAlert color="primary" dismissible visible={visible} onClose={() => setVisible(false)}>{warings}</CAlert>
                                            <CButton color="primary" className="px-4" onClick={handleSubmit}>
                                                Login
                                            </CButton>
                                        </CRow>
                                    </CForm>
                                </CCardBody>
                            </CCard>
                        </CCardGroup>
                    </CCol>
                </CRow>
            </CContainer>
        </div>
    )
}

export default Login;