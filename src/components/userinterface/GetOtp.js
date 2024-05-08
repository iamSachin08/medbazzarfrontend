import { Grid, Input,Button, Paper } from "@mui/material";
import { useState } from "react";
import OTPInput from "react-otp-input";
import LoginOtp from "./LoginOtp";
import {useNavigate} from "react-router-dom"

export default function GetOtp(props){

    var navigate = useNavigate()
    const [otp , setOtp] =useState('')
    const [status , setStatus] = useState(true)

    const handleVerifyOtp = ()=>
    {
        if(otp==props.otp)
        {
          navigate('/cart')
        }
        else
        {
            alert("Invalid Otp...")
        }

    }



    return(
        <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
        {
        status?

        <Paper elevation={5} style={{ width:'90%',fontFamily:'kanit',borderRadius:'50px 10px'}}>
        <Grid container spacing={2} style={{display:'flex',alignItems:'center',justifyContent:'center',height:500}} >
            <Grid item xs={6} > 
            
            <Grid item xs={12} style={{textAlign:'center'}} > 
                <div style={{fontWeight:'bold',fontSize:30 , marginBottom:3}}>Verify Phone Number</div>
                <div  style={{fontSize:13 , marginBottom:3}}>
                An SMS with 4-digit OTP was sent to
                </div>
            </Grid>
            <Grid item xs={12} fullWidth style={{display:'flex',justifyContent:'center',alignItems:'center'}} >
                <div style={{fontSize:15,fontWeight:'bold',margin:5}}>+91 - {props.mobileno}</div>
                <Button onClick={() => setStatus(!status) } size="small" variant="text">Change</Button>
 
            </Grid>


            <Grid item xs={12} style={{display:'flex',justifyContent:'center',alignItems:'center',marginTop:40}}>
                <OTPInput
                value={otp}
                onChange={setOtp}
                numInputs={4}
                renderSeparator={<span>-</span>}
                renderInput={(props) => <input {...props}/>}
                inputStyle={{width: 35 , height:40}}/>
            </Grid>

            <Grid item xs={12} style={{display:'flex',marginTop:60,justifyContent:'center',alignItems:'center',}}> 
                <Button onClick={handleVerifyOtp} variant="contained" fullWidth style={{borderRadius:15}}>
                    Verify
                </Button>
            </Grid>

            <Grid item xs={12} style={{marginTop:40}} >
                <p style={{fontSize:14}}>By continuing, you agree to our <span style={{color:'blue'}}> Terms of Service </span> and <span style={{color:'blue'}}>Privacy & Legal Policy</span> </p>

            </Grid>

         
            </Grid>

        </Grid>
        </Paper>:<LoginOtp/>}</div>
    )
}