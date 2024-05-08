import LoginImage from "../../components/userinterface/LoginImage";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { Grid } from "@mui/material";
import LoginOtp from "../../components/userinterface/LoginOtp";
import LoginDetail from "../../components/userinterface/LoginDetail";
import GetOtp from "../../components/userinterface/GetOtp";
import {useLocation} from "react-router-dom"
export default function LoginPage(){

    const theme = useTheme();   
    const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
   

    return(
        <Grid container Spacing={2}>

            <Grid item xs={12} style={{marginTop:20,display:'flex',alignItems:'center',justifyContent:'center'}}>
                <Grid item md={6}>
                    {!matchesMd?<div> 
                    <LoginImage/>
                    </div>:<div></div>}
                </Grid>
                <Grid item xs={12} md   ={6}  style={{marginTop:20, display:'flex',justifyContent:'center'}} >
                    <LoginOtp  />
                </Grid>
            </Grid>
        </Grid>
    )
}