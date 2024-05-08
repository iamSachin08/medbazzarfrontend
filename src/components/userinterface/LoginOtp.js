import { Grid, Input,Button, Paper } from "@mui/material";
import { useState } from "react";
import GetOtp from "./GetOtp";
import { postData } from "../../services/FetchnodeServices";
import LoginDetail from "./LoginDetail";
import {useDispatch} from "react-redux";

export default function LoginOtp(){
    const [status , setStatus] = useState(true)
    const [otp , setOpt] = useState(0)
    const [mobileno, setMobileNo] =useState('')
    const [userStatus , setUserStatus] = useState(false)

    var dispatch = useDispatch()
    

    const generateOTP = () =>
    {
        var myotp = parseInt(Math.random()*8999)+1000
        alert(myotp)
        setOpt(myotp)
    }

    const handleOTP = async() =>
    {
        var result = await postData('users/check_userdata',{mobileno:mobileno})
        if(result.status==false)
        {
            generateOTP()
            setStatus(!status)
            setUserStatus(false)
            
            
        }
        else
        {   
            generateOTP()
            setStatus(!status)
            setUserStatus(true)
            dispatch({type:'ADD_USER',payload:[mobileno,result.data]})
        }
    }


    return(
        <div style={{display:'flex',width:'100%',justifyContent:'center',alignItems:'center'}}>
            {
            status?
               
           <Paper elevation={5} style={{ width:'89%',fontFamily:'kanit',borderRadius:'50px 10px'}}>
        <Grid container spacing={2} style={{display:'flex',alignItems:'center',justifyContent:'center',height:500}} >
            <Grid item xs={6} > 
            
            <Grid item xs={12} style={{fontSize:'2.2em',fontWeight:'bolder'}}> 
                <div>Sign in to MedBazzar</div>
            </Grid>

            <Grid item xs={12} style={{fontSize:'1.0em',marginTop:-5,color:'grey'}}> 
                <div>
                    to access your Addresses, Orders & Wishlist
                </div>
            </Grid>

            <Grid item xs={12} style={{display:'flex',marginTop:40,justifyContent:'center',alignItems:'center',fontSize:'1.0em'}}> 
              <div style={{fontSize:22,fontWeight:'bold'}}>+91-</div>
              <Input onChange={(e)=>setMobileNo(e.target.value)} style={{fontSize:20,fontWeight:'bold'}} placeholder="Enter your Mobile number" fullWidth/>    
            </Grid>

            <Grid item xs={12} style={{display:'flex',marginTop:80,justifyContent:'center',alignItems:'center',}}> 
                <Button onClick={handleOTP} variant="contained" fullWidth style={{borderRadius:20}}>
                    Get Opt
                </Button>
            </Grid>

            <Grid item xs={12}>
                <p>By continuing, you agree to our <span style={{color:'blue'}}>Terms of Service</span> and <span style={{color:'blue'}}>  Privacy & Legal Policy</span> </p>

            </Grid>

            </Grid>

        </Grid>
        </Paper>:userStatus?<GetOtp mobileno={mobileno} otp={otp} />:<LoginDetail mobileno={mobileno} otp={otp}/>}
        </div>
 
    )
}