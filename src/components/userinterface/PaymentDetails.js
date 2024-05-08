import PercentIcon from '@mui/icons-material/Percent';
import { Button,TextField,Grid,Drawer } from '@mui/material';
import Radio from '@mui/material/Radio';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState,useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { serverURL } from '../../services/FetchnodeServices';
import {logo} from "../../assests/logo.png"
export default function PaymentDetails(props){

    const [status , setStatus] = useState()
    const [caption , setCaption] = useState('Login To proceed')
    var navigate = useNavigate()
    
    var productFromRedux = props.products  
    var product = Object.values(productFromRedux)


    useEffect(function(){
        if(props?.userAddress?.length>0)
        {
            setCaption('make payment')
        }
    },[props.userAddress])
  
    
    var totalamount = product.reduce((p1,p2)=>{
        var amt=p2.qty*p2.price
        return p1+amt

    },0)

    var amountpaid = product.reduce((p1,p2)=>{
        var amt=p2.qty*(p2.offerprice>0?p2.offerprice:p2.price)
        return p1+amt

    },0)

    var save = totalamount-amountpaid
  
//    var total=0;
   
//    productFromRedux.forEach(item => {
//     if(item.offerprice==0)
//     total+=item.price
//     else
//     total+=item.offerprice

//    })

 ///********Payment Gateway********** */
 const options = {
    key: "rzp_test_GQ6XaPC6gMPNwH",
    amount: amountpaid*100, //  = INR 1
    name: "MedBazzar",
    description: 'some description',
    image:
      `${serverURL}/images/logo.png`,
    handler: function (response) {
         
        alert(response.razorpay_payment_id);
    },
    prefill: {
      name: props?.userData?.username,
      contact: props?.userData?.mobileno,
      email: props?.userData?.emailid,
    },
    notes: {
      address: "some address",
    },
    theme: {
      color: "#00319c",
      hide_topbar: false,
    },
  };

  const openPayModal = () => {
    var rzp1 = new window.Razorpay(options);
    rzp1.open();
  };
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://checkout.razorpay.com/v1/checkout.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);



  ////********************* */




const handleLogin = () => {
    if(caption.toUpperCase()==="MAKE PAYMENT")
        openPayModal()
    else

    navigate('/loginpage' )
}


const handleClose=()=>{
    setStatus(false)
  }



   
    return(
        <div style={{width:'90%',background:'',fontFamily:'kanit'}} >
           <div style={{width:'98%',fontSize:'1.2em',background:'#fff212',borderRadius:12,padding:3,fontWeight:600, display:'flex',justifyContent:'center'}}>
             Payment Details
           </div>
            <div style={{marginLeft:10,marginTop:20,display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:'0.98em'}}>
                    Total Amount
                </span>   
                <span style={{fontWeight:'bold',fontSize:'1.12em'}}>
                    &#x20B9;{totalamount}
                </span>  

            </div>   

            <div style={{marginLeft:10,marginTop:10,display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:'0.98em'}}>
                    Amount Paid
                </span>   
                <span style={{fontWeight:'bold',fontSize:'0.9em'}}>
                 &#x20B9;{amountpaid}
                </span>  

            </div> 

            <div style={{marginTop:10,marginLeft:10,display:'flex',justifyContent:'space-between',}}>
                <span style={{fontSize:'1.0em'}}>
                   Saving
                </span>   
                <span style={{fontWeight:'bold',fontSize:'1.0em',marginLeft:'auto'}}>
                 &#x20B9;{save}
                </span>  

            </div> 

            <div style={{width:'99%',marginTop:5,display:'flex',justifyContent:'space-between',background:'#fff212',borderRadius:12,padding:5}}>
                <span style={{fontSize:'1.1em',fontWeight:'bolder',marginRight:'auto'}}>
                    Order Total
                </span>
               
                <span style={{fontWeight:'bold',fontSize:'1.12em',marginLeft:'auto'}}>
                    &#x20B9;{amountpaid}
                </span>  
            </div>

           <div style={{fontSize:'0.9em',color:'grey',marginTop:9}}>
             <i> Price may vary depending on the product batch*</i>
           </div>

           <div style={{marginTop:25}}>
            <hr/>
           </div>

           <div style={{marginTop:5,display:'flex',alignItems:'center'}}>
              <div style={{display:'flex',alignItems:'center'}}>
                <PercentIcon style={{color:'green'}} /> 
              </div>

             <div style={{margin:5}}>
                <div style={{fontSize:'1.0em',fontWeight:'bold'}} >Use Coupon</div>
                <div style={{fontSize:'0.9em',color:'grey',marginTop:-3}}>Also get a gift code after placing this order</div>
             </div> 
           </div>

           <div style={{marginTop:5}}>
             <hr/>
           </div>

           <div style={{border:'solid 1px grey', borderRadius:5}}>
               <div style={{background:'#ecf0f1',padding:5,borderRadius:5}}>
                   <div style={{display:'flex',alignItems:'center',justifyContent:'space-between'}}>
                       <span >
                            <Radio/>
                            <span style={{fontSize:'0.8em',color:'#000',fontWeight:'550'}}>
                              Get it Deliver
                            </span>

                        </span>

                        <span>
                            <Radio/>
                            <span style={{fontSize:'0.8em' ,color:'#000',fontWeight:'550'}}>
                                Pick up from store
                            </span>
                        </span>

                    </div> 
               </div>

               <div style={{display:'flex',alignItems:'center',justifyContent:'space-evenly'}}>
                    <div  style={{marginTop:10}}>
                        <div style={{fontSize:'0.8em',color:'grey'}}>{product.length}ITEM</div>
                        <div style={{fontSize:'0.8em',fontWeight:'650'}}>&#x20B9;{amountpaid} </div>
                    </div>

                   <div style={{marginLeft:160}} >
                        <Button  onClick={handleLogin} variant='contained' style={{color:'#fff',background:'#00391c',fontSize:'0.9em'}}fullWidth>
                            {caption}
                        </Button>
                   </div>

                </div>

            </div>

            <div style={{marginTop:18}}>
                <hr/>
            </div>

            <div style={{marginTop:18}}>
                <div>
                    <span style={{fontSize:'1.0em',fontWeight:600}}>
                     Delivery Instruction
                    </span>
                </div>
                <div style={{marginTop:10,display:'flex',alignItems:'center'}}>
                    <span ><DeliveryDiningIcon style={{fontSize:35,marginTop:5}}/></span>
                    <span style={{fontSize:'1.0em',fontWeight:'600',marginLeft:20}}>Add delivery Instructions</span>
                    <span  style={{fontSize:'1.8em',marginLeft:"42%"}}><ArrowForwardIosIcon/></span>
                </div>
            </div>

            <div style={{marginTop:15}}>
                <hr/>
            </div>

          
        </div>
    )
} 