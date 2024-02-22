import PercentIcon from '@mui/icons-material/Percent';
import { Button } from '@mui/material';
import Radio from '@mui/material/Radio';
import DeliveryDiningIcon from '@mui/icons-material/DeliveryDining';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState } from 'react';
export default function PaymentDetails(){
    var product = [
        {
          productdetailid: 2,
          categoryid: 7,
          subcategoryid: 8,
          brandid: 2,
          productid: 5,
          productsubname: "REAL JUICE",
          weight: 1,
          weighttype: "LTR",
          type: "juice",
          packaging: "box",
          qty: 10,
          price: 128,
          offerprice: 27,
          offertype: "eos",
          description: "Real Power Juice, Mixed Fruit, ",
          picture: "realjuice.jpg",
          concernid: 1,
        },
        
    {
      productdetailid: 3,
      categoryid: 8,
      subcategoryid: 9,
      brandid: 3,
      productid: 6,
      productsubname: "PONDS",
      weight: 275,
      weighttype: "ml",
      type: "cream",
      packaging: "box",
      qty: 8,
      price: 275,
      offerprice: 0,
      offertype: "eos",
      description: "Ponds Vitamin Body Lotion, ",
      picture: "ponds.jpg",
      concernid: 2,
    },
    {
      productdetailid: 4,
      categoryid: 9,
      subcategoryid: 10,
      brandid: 4,
      productid: 7,
      productsubname: "LORIAL SHAMPOO",
      weight: 340,
      weighttype: "ml",
      type: "shampoo",
      packaging: "bottle",
      qty: 7,
      price: 319,
      offerprice: 300,
      offertype: "eos",
      description: "Loreal Paris Shampoo, ",
      picture: "lorial.png",
      concernid: 3,
    }]
  
   var total=0;
   
   product.forEach(item => {
    if(item.offerprice==0)
    total+=item.price
    else
    total+=item.offerprice

   })

   
    return(
        <div style={{width:'90%',background:'',fontFamily:'kanit'}} >
           <div style={{fontSize:'1.1em',fontWeight:'600',marginTop:2}}>
             Payment Details
           </div>
            <div style={{marginLeft:10,marginTop:20,display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:'0.98em'}}>
                    Subtotal
                </span>   
                <span style={{fontWeight:'bold',fontSize:'1.12em'}}>
                    &#x20B9;{total}
                </span>  

            </div>   

            <div style={{marginLeft:10,display:'flex',justifyContent:'space-between'}}>
                <span style={{fontSize:'0.98em'}}>
                    Coupon Discount
                </span>   
                <span style={{fontWeight:'bold',fontSize:'0.8em'}}>
                 &#x20B9;0.0
                </span>  

            </div> 

           <div style={{width:'97%',marginTop:15,display:'flex',justifyContent:'space-between',background:'yellow',padding:9,borderRadius:9}}>
            <span style={{fontSize:'0.98em',fontWeight:'bolder'}}>
                Order Total
            </span>
               
             <span style={{fontWeight:'bold',fontSize:'1.12em'}}>
             &#x20B9;{total}
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
                         <div style={{fontSize:'0.8em',color:'grey'}}>2 ITEM</div>
                        <div style={{fontSize:'0.8em',fontWeight:'650'}}>&#x20B9;{total} ITEM</div>
                    </div>

                   <div style={{marginLeft:160}} >
                        <Button variant='contained' style={{color:'#fff',background:'#000',fontSize:'0.9em'}}fullWidth>
                            Select Address
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