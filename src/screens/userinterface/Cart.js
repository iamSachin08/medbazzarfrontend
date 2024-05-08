import { useEffect, useState } from "react";
import FooterComponent from "../../components/userinterface/FooterComponent";
import Header from "../../components/userinterface/Header";
import PaymentDetails from "../../components/userinterface/PaymentDetails";
import ShowCart from "../../components/userinterface/ShowCart";
import {useSelector} from "react-redux"
import { Grid } from "@mui/material";
import AddAddress from "../../components/userinterface/AddAddress";
import { postData } from "../../services/FetchnodeServices";
import DeliveryAddress from "../../components/userinterface/DeliveryAddress";

export default function CartComponent(){

    const [pageRefresh , setPageRefresh] = useState(false)
    const [status , setStatus] = useState(false)
    const [userAddress , setUserAddress] = useState([])
    
   
    var products = useSelector (state=>state.data)
    var userData =Object.values( useSelector (state=>state.user))[0]

    

    const check_user_address = async() =>
    {
        var result = await postData('users/check_user_address',{mobileno:userData?.mobileno})
       // alert(userData?.mobileno)
        if(userData?.mobileno==undefined)
        {
            setStatus(false)
        }
        else
        {
            if(result.status==false)
            {
                setStatus(true)
            }
            else
            {   
                setStatus(false)
                setUserAddress(result.data)
            }
        }    
    }
    useEffect(function(){
        check_user_address()
    },[userData?.mobileno,pageRefresh])


    return(
    <div >
        <Header/>
        <div style={{width:'100%',height:'auto',display:'flex',justifyContent:'space-between', margin:10,padding:5}} >
            <Grid container spacing={2} >
                <Grid item xs={12} md={8}>
                    <div style={{margin:10,display:'flex'}}>
                        <DeliveryAddress pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} status={status} setStatus={setStatus}  userData={userData} userAddress={userAddress} />
                    </div>
        
                    <div style={{margin:10,display:'flex'}}>
                        <ShowCart pageRefresh={pageRefresh} setPageRefresh={setPageRefresh}  products={products}/>
                    </div>
                </Grid>
                <Grid item xs={12} md={4}>
                    <div style={{margin:10}} >
                        <PaymentDetails userData={userData} userAddress={userAddress} products={products}/>
                    </div>
                </Grid>

            </Grid>
        </div>
        <AddAddress userData={userData} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} status={status} setStatus={setStatus}  />

        <div style={{marginTop:'auto',display:'flex'}}>
            <FooterComponent/>       
        </div>
       
    </div>
    )
}