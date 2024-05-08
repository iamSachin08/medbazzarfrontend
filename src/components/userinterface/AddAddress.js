import { Button,TextField,Grid,Drawer } from '@mui/material';
import { useState } from 'react';
import CloseIcon from '@mui/icons-material/Close';
import { LaptopMac } from '@mui/icons-material';
import { postData } from '../../services/FetchnodeServices';
import Swal from 'sweetalert2';

export default function AddAddress (props){
    const [addressOne , setAddressOne] = useState('')
    const [addressTwo , setAddressTwo] = useState('')
    const [landmark , setLandmark] = useState('')
    const [pincode , setPincode] = useState('')
    const [state , setState] = useState('')
    const [city , setCity] = useState('')
    const [error , setError] = useState({})
    
              
    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
    
    }

    const handleSubmit =async() =>{
        var body={mobileno:props?.userData?.mobileno,address:addressOne+";"+addressTwo,landmark,state,city,pincode}
        var result=await postData('users/submit_user_address',body)
        if(result.status)
        {
            Swal.fire({
                position:"top-end",
                icon:"success",
                title:"Address Added Successfully....",
                showConfirnButton:false,
                timer:1700,
                toast:true
            })
            props.setPageRefresh(!props.pageRefresh)
            props.setStatus(false)
        }
        else
        {
            alert("oops")
           
        }

    }
    const handleDrawerClose=()=>{
        
        props.setStatus(!props.status)
        props.setPageRefresh(!props.pageRefresh)
    }




    const addressdrawer=()=>{
        return(<div style={{width:400}}>
            <Grid container spacing={2} style={{padding:15}}> 
                <Grid xs={12}>
                    <p style={{fontFamily:'kanit',fontWeight:'bold',fontSize:34,padding:15}}>Add Address </p>
                    <p style={{fontFamily:'kanit',fontWeight:'bold',fontSize:18,padding:15,marginTop:-50}}>{props?.userData?.username} Enter your Address Details</p>
                </Grid>

                <Grid xs={12} style={{display:'flex',justifyContent:'center',marginTop:10,marginLeft:19}}>
                    <TextField 
                        onChange={(event)=>setAddressOne(event.target.value)}
                        label="Address Line 1 "
                        variant="standard"
                        fullWidth
                   />
                   
                </Grid>

                <Grid xs={12} style={{display:'flex',justifyContent:'center',marginTop:10,marginLeft:19}}>
                    <TextField 
                    onChange={(event)=>setAddressTwo(event.target.value)}
                        label="Address Line 2 "
                        variant="standard"
                        fullWidth
                   />
                   
                </Grid>
                <Grid xs={12} style={{display:'flex',justifyContent:'center',marginTop:10,marginLeft:19}}>
                    <TextField 
                    onChange={(event)=>setLandmark(event.target.value)}
                        label="Landmark "
                        variant="standard"
                        fullWidth
                    />
                </Grid>

                <Grid xs={12} style={{display:'flex',justifyContent:'center',marginTop:10,marginLeft:19}}>
                    <TextField 
                    onChange={(event)=>setPincode(event.target.value)}
                        label="Pincode"
                        variant="standard"
                        fullWidth
                    />
                </Grid>

               

                <Grid item xs={6} >  
                    <TextField 
                    onChange={(event)=>setState(event.target.value)}
                        label="State"
                        variant="standard"
                    />
                </Grid>

                <Grid item xs={6}>
                    <TextField 
                    onChange={(event)=>setCity(event.target.value)}
                        label="City"
                        variant="standard"
                    />
                </Grid>

               
  
                <Grid xs={11} style={{marginLeft:20,marginTop:40,background:'#00391c',borderRadius:40,display:'flex',justifyContent:'center',alignItems:'center'}}>
                        <Button onClick={handleSubmit} style={{color:'white'}}>Save & Proceed</Button>
                </Grid>



            </Grid>

        </div>)
    }

   return(
            <div style={{width:'90%',background:'',fontFamily:'kanit'}} >
                <Drawer anchor={"right"} open={props.status} onClose={handleDrawerClose}>
                    {addressdrawer()}
                </Drawer>
            </div>
        )
}