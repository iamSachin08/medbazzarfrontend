import { Grid, Input,Button, Paper } from "@mui/material";
import { useState } from "react";
import OTPInput from "react-otp-input";
import {useNavigate} from "react-router-dom"
import LoginOtp from "./LoginOtp";
import { postData } from "../../services/FetchnodeServices";
import Swal from 'sweetalert2';
import {useDispatch} from "react-redux";

export default function LoginDetail(props){
    const [otp , setOtp] = useState('')
    const [status , setStatus] = useState(true)
    const [firstName , setFirstName] = useState('')
    const [lastName , setLastName] = useState('')
    const [emailId , setEmailId] = useState('')
    const [mobileno , setMobileNo] = useState('')
    var dispatch = useDispatch()
    var navigate = useNavigate()

    const handleSubmit =async () =>
    {
        if(props.otp == otp)
        {
            var body={mobileno:props.mobileno,emailid:emailId,username:(firstName+" "+lastName)}
            var result = await postData('users/submit_user',body)
            if(result.status)
            {
                Swal.fire({
                    position:"top-end",
                    icon:"success",
                    title:"You are Registered Now....",
                    showConfirnButton:false,
                    timer:1500,
                    toast:true
                })
                dispatch({type:'ADD_USER',payload:[props.mobileno,body]})
                navigate('/cart')
            }
            else
            {
                alert("Invalid Otp.....")
            }

        }
    }
    

    return(
        <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
        {
        status?
        <Paper elevation={5} style={{ width:'90%',fontFamily:'kanit',borderRadius:'50px 10px'}}>
        <Grid container spacing={2} style={{display:'flex',alignItems:'center',justifyContent:'center',height:'auto',padding:20}} >
            <Grid item xs={6} fullWidth   > 
            
            <Grid item xs={12} fullWidth > 
                <div style={{fontSize:30,fontWeight:'bolder'}}>Welcome To MedBazzar</div>
                <div style={{fontSize:13,color:'grey'}}>
                    Please enter your details for a better shopping experience
                </div>
            </Grid>


            <Grid item xs={12} fullWidth style={{marginTop:20,fontSize:'1.0em'}}> 
              
              <Input style={{fontSize:15,fontWeight:'bold',letterSpacing:3}} placeholder="Enter First Name" onChange={(e)=>setFirstName(e.target.value)}   fullWidth/>    
              
            </Grid>

            <Grid item xs={12} fullWidth style={{marginTop:20,fontSize:'1.0em'}}> 
              
              <Input style={{fontSize:15,fontWeight:'bold',letterSpacing:3}} placeholder="Enter last Name (Optional)" onChange={(e)=>setLastName(e.target.value)}  fullWidth/>  

            </Grid>

            <Grid item xs={12} fullWidth style={{marginTop:20,fontSize:'1.0em'}}> 
              
              <Input style={{fontSize:15,fontWeight:'bold',letterSpacing:3}} placeholder="Enter Email Id (Optional)" onChange={(e)=>setEmailId(e.target.value)}  fullWidth/> 

            </Grid>

            <Grid item xs={12} fullWidth style={{marginTop:20,display:'flex',justifyContent:'center',flexDirection:'column',alignItems:'center'}} >
                <div style={{fontSize:'1.6em',fontWeight:'bolder'}}>Verify Phone Number</div>
                <div style={{fontSize:'0.8em'}}>An SMS with 4-digit OTP was sent to</div>
 
            </Grid>
            <Grid item xs={12} fullWidth style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                <div style={{fontSize:15,fontWeight:'bold',margin:5}}>+91 - {props.mobileno}</div>
                <Button onClick={() => setStatus(!status)} size="small" variant="text">Change</Button>
 
            </Grid>

            <Grid item xs={12} fullWidth style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:10}}>
                <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props}/>}
                inputStyle={{width: 35 , height:40}}/>
            </Grid>
            
            

            <Grid item xs={12} style={{display:'flex',marginTop:30,justifyContent:'center',alignItems:'center',}}> 
                <Button variant="contained" fullWidth onClick={handleSubmit} style={{borderRadius:5}}>
                    Get Started
                </Button>
            </Grid>

            </Grid>

        </Grid>
        </Paper>:<LoginOtp/>}
        </div>
    )
}