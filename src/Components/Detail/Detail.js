import { lazy,useEffect } from 'react';
import { Redirect } from "react-router";
import { useState } from "react/cjs/react.development";
import fetchData from "../../common/fetchData";
import ENV from '../../ENV';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableRow from '@mui/material/TableRow';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import Paper from '@mui/material/Paper';
import {
  CCard,
  CCardBody,
  CCol,
  CRow,
} from '@coreui/react'
import Grid from '@mui/material/Grid';
import * as React from 'react';
import { styled } from '@mui/material/styles';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import InputBase from '@mui/material/InputBase';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import CloseIcon from '@mui/icons-material/Close';
import Slide from '@mui/material/Slide';
import useMediaQuery from '@mui/material/useMediaQuery';
import { useTheme } from '@mui/material/styles';
import OutlinedInput from '@mui/material/OutlinedInput';

const Item = styled(Paper)(({ theme }) => ({
  ...theme.typography.body2,
  padding: theme.spacing(1.5),
  textAlign: 'center',
  color: theme.palette.text.secondary,
}));
const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});
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
const DetailDetails = React.lazy(()=>import  ('./DetailDetails'));
const CreateDetail = React.lazy(()=>import  ('./CreateDetail'));

export default function Detail () {
    const [search, setSearch] = useState('');
    const [column, setColumn] = useState('activityID')
    const [currentPage, setCurrentpage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [totalPage, setTotalPage] = useState([]);
    const [data, setData] = useState([]);
    const [open, setOpen] = React.useState(false);
    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

    const [openDetails,setOpenDetails] = useState(false);
    const [id,setId] = useState('')
    const OpendDetails= (id)=>{
        setId(id);
        setOpenDetails(true);
    }
    const handleClose = () => {
        setOpen(false);
        setOpenDetails(false);
    };

    const handleChange = (event) => {
        setColumn(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true)
    };

    let token = sessionStorage.getItem('token');

    const [params, setParams] = useState('');

    const requestOptions = {
        method: 'GET',
        headers: { 'Content-Type': 'application/json', 'Authorization': token },
    };

    async function handleSearch () {
        const newParams = '&column=' + column + '&search=' +  search;
        setParams(newParams);
        console.log(newParams);

        try {
            const data = await fetchData(`${ENV.domain}/details?${newParams}`, requestOptions);
    
            if(data.status === 200) {
                setData(data.details);
                setNumberOfPages(data.numberOfPages);

                const pages = [];
                for (let page = 1; page <= data.numberOfPages; page++) { 
                    pages.push(page);
                }
                setTotalPage(pages);

                setCurrentpage(1);
                //console.log(data);
            }else{
                setData(null);
                sessionStorage.clear();
            }
        } catch (error) {
            console.log(error);
        }
    }

    function handlePreviousPage () {
        if(currentPage > 1) {
            setCurrentpage(currentPage - 1);
            changePage(currentPage - 1, params);
        }
    }

    function handleNextPage () {
        if(currentPage < numberOfPages) {
            setCurrentpage(currentPage + 1);
            changePage(currentPage + 1, params);
        }
    }

    useEffect(() => {
        (async () => {
            try {
                const data = await fetchData(`${ENV.domain}/details`, requestOptions);
                // console.log(data);
                if(data.status === 200) {
                    setData(data.details);
                    setNumberOfPages(data.numberOfPages);

                    const pages = [];
                    for (let page = 1; page <= data.numberOfPages; page++) { 
                        pages.push(page);
                    }
                    setTotalPage(pages);

                    setCurrentpage(data.currentPage);
                    
                }else{
                    setData(null);
                    sessionStorage.clear();
                }
            } catch (error) {
                console.log(error);
            }
        })()
    }, [])

    async function changePage (page, params) {
        try {
            const data = await fetchData(`${ENV.domain}/details?page=${page + params}`, requestOptions);
    
            if(data.status === 200) {
                setData(data.details);
                //console.log(data);
            }else{
                setData(null);
                sessionStorage.clear();
            }
        } catch (error) {
            console.log(error);
        }
    }

    return (
        token ? <div className="detail">
            <CCard>
                <CCardBody>
                    <FormControl sx={{left:480,top:10,color:'dodgerblue',fontfamily: "Lucida Console"}}><h1 >Detail Page</h1></FormControl>
                    <CRow>
                    <CCol>
                        <FormControl sx={{top:32}}>
                            
                            
                                <Grid container  item xs={4} md={12}>
                                    <Item>Search</Item>
                                </Grid>
                            
                        </FormControl>
                        <FormControl sx={{top:24, m: 1 }} variant="standard">
                            <BootstrapInput 
                                
                                multiple
                                input={<OutlinedInput label="Name" />}
                                type='text' 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)} 
                            />
                        </FormControl>
                        <FormControl sx={{ m: 1 }} variant="standard">
                            <InputLabel 
                                type='text' 
                                value={search}
                                onChange={(e) => setSearch(e.target.value)}
                                label={'search'}
                            >
                                
                            </InputLabel>
                            <Select    
                                id="search-columns" 
                                value={column} onChange={(e) => setColumn(e.target.value)}
                                input={<BootstrapInput />}
                                displayEmpty
                            >
                                <MenuItem value="detailID">detail ID</MenuItem>
                                <MenuItem value="activityID">Activity ID</MenuItem>
                                <MenuItem value="userID">User ID</MenuItem>
                            </Select>

                            
                        </FormControl>
                        <FormControl sx={{top:33}} >
                            <Button variant="contained" size="large" onClick={() => {handleSearch()}}>Search</Button>
                        </FormControl>
                        <FormControl sx={{top:33, left:10}} >
                        <Button variant="contained" size="large" onClick={handleClickOpen }>Create New Detail</Button>
                        <Dialog
                            fullScreen={fullScreen}
                            open={open}
                            onClose={handleClose}
                            TransitionComponent={Transition}
                            
                        >
                            <AppBar sx={{ position: 'relative' }}>
                                <Toolbar>
                                    <IconButton
                                        edge="start"
                                        color="inherit"
                                        onClick={handleClose}
                                        aria-label="close"
                                    >
                                    <CloseIcon />
                                    </IconButton>
                                    <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                        Create Detail
                                    </Typography>
                                </Toolbar>
                            </AppBar><>

                            <CreateDetail />
                            </>

                        </Dialog>
                        </FormControl>
                    </CCol>    
                    </CRow>
                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Detail ID</TableCell>
                                <TableCell align="right">Activity ID</TableCell>
                                <TableCell align="right">Activity Name</TableCell>
                                <TableCell align="right">User ID</TableCell>
                                <TableCell align="right">First Name</TableCell>
                                <TableCell align="right">Last Name</TableCell>
                                <TableCell align="right">User Organization ID</TableCell>
                                <TableCell align="right">User Organization Name</TableCell>
                                <TableCell align="right">In Time</TableCell>
                                <TableCell align="right">Out Time</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data && data.map((detail) => (
                                <TableRow
                                key={detail.detailID}
                                sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                                >
                                <TableCell component="th" scope="detailid">{detail.detailID}</TableCell>
                                <TableCell align="right">{detail.activityID}</TableCell>
                                <TableCell align="right">{detail.activityName}</TableCell>
                                <TableCell align="right">{detail.userID}</TableCell>
                                <TableCell align="right">{detail.firstName}</TableCell>
                                <TableCell align="right">{detail.lastName}</TableCell>
                                <TableCell align="right">{detail.organizationID}</TableCell>
                                <TableCell align="right">{detail.organizationName}</TableCell>
                                <TableCell align="right">{detail.inTime}</TableCell>
                                <TableCell align="right">{detail.outTime}</TableCell>
                                <TableCell align="right">
                                    <Button onClick={() =>OpendDetails(detail.detailID)}>Detail</Button>
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                        </TableContainer>
                        <Dialog
                        fullScreen={fullScreen}
                        open={openDetails}
                        onClose={handleClose}
                        TransitionComponent={Transition}
                        >
                        <AppBar sx={{ position: 'relative' }}>

                            <Toolbar>
                                <IconButton
                                    edge="start"
                                    color="inherit"
                                    onClick={handleClose}
                                    aria-label="close"
                                >
                                    <CloseIcon />
                               </IconButton>
                                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                                    Detail Details
                                </Typography>
                            </Toolbar>

                        </AppBar>
                            <div style={{width: '100%', height: 'auto'}}>

                               <DetailDetails id={id} />
                            
                            </div>
                        </Dialog>
                        <p>Current Page: {currentPage}</p>
                        <div>
                            <Button id='previousPage' onClick={handlePreviousPage}variant="outlined">Previous Page</Button>
                            {
                                totalPage && totalPage.map(page => {
                                    return (
                                        <Button
                                            id={'page-'+page}
                                            key={page}
                                            onClick={() => {
                                                setCurrentpage(page);
                                                changePage(page, params);
                                            }}
                                            variant="outlined"
                                        >
                                            {page}
                                        </Button>
                                    )
                                })
                            }
                            <Button id='nextPage' onClick={handleNextPage} variant="outlined" >Next Page</Button>
                        </div>
                </CCardBody>
            </CCard>
        </div>: <Redirect to='/' />
    )
}