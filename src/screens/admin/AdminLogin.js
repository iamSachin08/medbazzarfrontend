import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import TextField from '@mui/material/TextField';

import Link from '@mui/material/Link';

import Box from '@mui/material/Box';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useState } from 'react';
import { postData } from '../../services/FetchnodeServices';
import Swal from 'sweetalert2';

import { useNavigate } from 'react-router-dom';

function Copyright(props) {
  return (
    <Typography variant="body2" color="text.secondary" align="center" {...props}>
      {'Copyright © '}
      <Link color="inherit" href="https:// Medbazzar.in/">
        Medbazzar..in
      </Link>{' '}
      {new Date().getFullYear()}
      {'.'}
    </Typography>
  );
}

// TODO remove, this demo shouldn't need to reset the theme.

const defaultTheme = createTheme();

export default function AdminLogin() {
  var navigate=useNavigate()

    const [emailid,setEmailId]=useState('')
    const [password,setPassword]=useState('')
    const [error,setError]=useState('')

    const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg}))
  
     }

    const handleClick=async()=>{
      var submit = true;
      if(emailid.length==0)
      {
        handleError('emailid','Pls Enter Email.....')
        submit=false
      }
      if (password.length==0)
      {
        handleError('password','Pls Enter Password.....')
        submit=false
      }
      if(submit)
      {
        var result=await postData('admin/check_admin_login',{emailid,password})
        if(result.status)
        {
          localStorage.setItem('ADMIN',JSON.stringify(result.data))
          navigate('/admindashboard')
        }
        else
        {
            Swal.fire({
                icon: "error",
                title: result.message,
                timer:1500,
                toast:true
              });  

        }
    }
  }
  
    

  return (
    <ThemeProvider theme={defaultTheme}>
      <Container component="main" maxWidth="xs">
        <CssBaseline />
        <Box
          sx={{
            marginTop: 8,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
          }}
        >
          <Avatar sx={{ m: 1, bgcolor: 'secondary.main' }}>
            <LockOutlinedIcon />
          </Avatar>
          <Typography component="h1" variant="h5">
            Sign in
          </Typography>
          <Box  sx={{ mt: 1 }}>
            <TextField
              margin="normal"
              required
              error={error.emailid}
              fullWidth
              onFocus={()=>handleError('emailid',null)}     
              helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.emailid}</span>} 
              id="email"
              label="Email Address"
              name="email"
              autoComplete="email"
              autoFocus
              onChange={(e)=>setEmailId(e.target.value)}
            />
            <TextField
              margin="normal"
              required
              fullWidth
              onFocus={()=>handleError('password',null)}
               error={error.password}
             
              helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.password}</span>} 
              name="password"
              label="Password"
              type="password"
              id="password"
              autoComplete="current-password"
              onChange={(e)=>setPassword(e.target.value)}
            />
           
            <Button
             onClick={handleClick}
              fullWidth
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
            >
              Sign In
            </Button>
            
          </Box>
        </Box>
        <Copyright sx={{ mt: 8, mb: 4 }} />
      </Container>
    </ThemeProvider>
  );
}