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
import Checkbox from '@mui/material/Checkbox';

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

const CardDetails = React.lazy(()=>import  ('./CardDetails'));
const CreateCard = React.lazy(()=>import  ('./CreateCard'));

export default function Cards () {
    const [search, setSearch] = useState('');
    const [column, setColumn] = useState('')
    const [currentPage, setCurrentpage] = useState(1);
    const [numberOfPages, setNumberOfPages] = useState(1)
    const [totalPage, setTotalPage] = useState([]);
    const [data, setData] = useState([]);
    const [open, setOpen] = useState(false);
    const [openCardDetails, setOpenCardDetails] = useState(false);
    const [cardId, setCardId] = useState(0);

    const theme = useTheme();
    const fullScreen = useMediaQuery(theme.breakpoints.down('md'));
    
    const handleChange = (event) => {
        setColumn(event.target.value);
    };
    const handleClickOpen = () => {
        setOpen(true)
    };
    const handleClose = () => {
        setOpen(false);
        setOpenCardDetails(false);
    };
    const OpenCardDetails= (id)=>{
        console.log('------------------',id,'------------------');
        setCardId(id);
        setOpenCardDetails(true);
    }

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
            const data = await fetchData(`${ENV.domain}/cards?${newParams}`, requestOptions);
    
            if(data.status === 200) {
                setData(data.cards);
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
                const data = await fetchData(`${ENV.domain}/cards`, requestOptions);

                if(data.status === 200) {
                    setData(data.cards);
                    setNumberOfPages(data.numberOfPages);

                    const pages = [];
                    for (let page = 1; page <= data.numberOfPages; page++) { 
                        pages.push(page);
                    }
                    setTotalPage(pages);

                    setCurrentpage(data.currentPage);
                    //console.log(data);
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
            const data = await fetchData(`${ENV.domain}/cards?page=${page + params}`, requestOptions);
    
            if(data.status === 200) {
                setData(data.cards);
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
        
        token ? <div>
            <CCard className="mb12">                
                <CCardBody>
                    <FormControl sx={{left:480,top:10,color:'dodgerblue',fontfamily: "Lucida Console"}}><h1 >Card Page</h1></FormControl>
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
                                <MenuItem value="cardID">card ID</MenuItem>
                                <MenuItem value="userID">User ID</MenuItem>
                                <MenuItem value="cardCode">Card Code</MenuItem>
                            </Select>

                            
                        </FormControl>
                        <FormControl sx={{top:33}} >
                            <Button variant="contained" size="large" onClick={() => {handleSearch()}}>Search</Button>
                        </FormControl>
                        <FormControl sx={{top:33, left:10}} >
                        <Button variant="contained" size="large" onClick={handleClickOpen }>Create New card</Button>
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
                                        CreateCard
                                    </Typography>
                                </Toolbar>
                            </AppBar>
                                <CreateCard />
                        </Dialog>
                        </FormControl>
                    </CCol>    
                    </CRow>

                    <TableContainer component={Paper}>
                        <Table sx={{ minWidth: 650 }} size="small" aria-label="a dense table">
                            <TableHead>
                            <TableRow>
                                <TableCell>Card ID</TableCell>
                                <TableCell align="right">User ID</TableCell>
                                <TableCell align="right">Card Code</TableCell>
                                <TableCell align="right"></TableCell>
                            </TableRow>
                            </TableHead>
                            <TableBody>
                            {data && data.map((card) => (
                                <TableRow
                                key={card.cardID}
                                sx={{ '&:last-child , &:last-child ': { border: 0 } }}
                                >
                                
                                 
                                <TableCell component="th" scope="cardID">{card.cardID}</TableCell>
                                <TableCell align="right">{card.userID}</TableCell>
                                <TableCell align="right">{card.cardCode}</TableCell>
                                <TableCell align="right" onVolumeChangeCapture >
                                    
                                    <Button onClick={()=>OpenCardDetails(card.cardID)}>Detail</Button>
                                    
                                </TableCell>
                                </TableRow>
                            ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                        

                    <Dialog
                        fullScreen={fullScreen}
                        open={openCardDetails}
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
                                    Card Detail
                                </Typography>
                            </Toolbar>
                           </AppBar>
                            <div style={{width: '100%', height: 'auto'}}>
                               <CardDetails id={cardId} />
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
                            <Button onClick={() =>OpenCardDetails()} >test</Button>
                        </div>
                </CCardBody>
            </CCard>

        </div>: <Redirect to='/' />
    )
}