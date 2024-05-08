//import redBull from "../../assests/redBull.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button,Grid } from "@mui/material";
import parse from 'html-react-parser';
import PlusMinusComponent from "../userinterface/PlusMinusComponent"
import {useDispatch,useSelector} from "react-redux"
import { useNavigate } from "react-router-dom";

export default function ProductInformationComponent(props){
    var dispatch = useDispatch()

    var navigate = useNavigate()
    
    var productFromRedux = useSelector(state=>state.data)
    var values = Object.values(productFromRedux)

    var product
    if(values?.length==0)
    {
        product = props?.item
        product['qty']=0
    }
    else
    {
        var prd = productFromRedux[props.item?.productdetailid]
        if(prd===undefined)
        {
            product = props?.item
            product['qty']=0
        }
        else
        {
            product = prd
        }
       
    }

   


    const handleChange =(v,item)=>{
        if(v>0)
        {
          item['qty']=v
          dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
          
        }
        else
        {
          dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
        }  
        props.setPageRefresh(!props.pageRefresh)
      }

     
    return(<div style={{width:'100%',heigth:'auto',display:'flex',fontFamily:'Kanit',color:''}}>
        
        
        <div style={{width:'100%' ,color:'#000'}}>
            <div style={{fontSize:20,fontWeight:'bolder'}}> 
                {product?.productname} {product?.weight} {product?.weighttype} 

                <div style={{fontSize:20,fontWeight:'bold',marginTop:-1}}>
                    {product?.productsubname}
                </div>
             
                <div style={{fontSize:16,fontWeight:'bold',marginTop:-1}} >
                    <a href="#"> Be the First One to Review.</a> 
                </div>

                <div style={{fontSize:25,fontWeight:'bolder'}}>
                    &#8377; {product?.offerprice!=0?product?.offerprice:product?.price}
                </div>

                <div style={{fontSize:14,fontWeight:'bold'}} >
                    (Incl. all Taxes)
                </div>
                <hr />

            </div>

            <div style={{marginTop:-5}}>
                <div style={{fontSize:18,fontWeight:'bolder'}}><s style={{color:'grey'}}>
                    MPR:&#8377;{product?.price}</s>
                    {
                        product?.offerprice!=0?<>(Save &#8377; {product?.price-product?.offerprice})</>:<></>
                    } 
                </div>

                <div  style={{fontWeight:'bold',fontSize:18,marginTop:10}}>
                    Weight Type
                </div>

                <div style={{marginTop:5}} > 
                    <Button variant="outlined">MM</Button>
                    <Button variant="outlined" style={{marginLeft:15}}> Ml</Button>
                    <Button variant="outlined" style={{marginLeft:15}}> L</Button>
                </div>
            </div>

            <div>
                <div  style={{fontWeight:'bold',fontSize:18,marginTop:15}}>Type</div>
                    <div style={{marginTop:5}} > 
                        <Button variant="outlined" >BOTTLE</Button>
                        <Button variant="outlined" style={{marginLeft:15}}>STRIP</Button>
                        <Button variant="outlined" style={{marginLeft:15}}>PACK</Button>
                    </div>
                </div>

                <div style={{marginTop:15,width:'70%'}}>
                    <Grid  style={{display:'flex',justifyContent:'space-between',alignItems:'center'}}>
                        <Grid item xs={6}>
                            <PlusMinusComponent qty={product?.qty}  onChange={(v)=>handleChange(v,product)} width="80%" />
                        </Grid>

                        <Grid item xs={6}>
                            <Button  size="small" onClick={()=>navigate("/home")} fullWidth style={{fontWeight:'bold',background:'#00391c',color:'#fff'}}>
                                Continue Shopping
                            </Button>
                        
                        </Grid>
                    </Grid>
                </div>

          
                <div>
                    <div  style={{fontWeight:'bold',fontSize:18,marginTop:15}}>
                        Super Saving (2 Offers)
                    </div>
                    <hr style={{marginTop:15}}/>     
                </div>

                <div style={{display:'flex',marginTop:10}}>
                    <div style={{border:'solid 1px',width:'35%',height:'auto',padding:10,borderRadius:15}}>

                    <div style={{color:'red'}}>
                        ICIC Bank
                    </div>
                    <div>
                        <hr/>
                    </div>
                    <div style={{fontSize:14,fontWeight:'500'}}>
                        Rs.2000 Cashback on ICICI, HDFC, KOTAK, ONECARD, INDUSIND & BOB Bank credit card transactions
                    </div>
                    <div style={{fontSize:14,fontWeight:'500',marginTop:10}}>
                        View All..
                    </div>
                </div>

                <div style={{border:'solid 1px',width:'35%',height:'auto',padding:10,marginLeft:20,borderRadius:15}}>
                    <div style={{color:'blue'}}>
                        SBI Bank
                    </div>
                    <div>
                        <hr/>
                    </div>
                    <div style={{fontSize:14,fontWeight:'500'}}>
                        Rs.2000 Cashback on SBI ONECARD, INDUSIND & BOB Bank credit card transactions
                    </div>
                    <div style={{fontSize:14,fontWeight:'500',marginTop:10}}>
                        View All..
                    </div>
                </div>
            </div>

            <div style={{border:'solid 1px',width:'100%',height:'auto',padding:10,borderRadius:15,marginTop:10}}>
                <div style={{fontSize:18,fontWeight:'bold'}}>
                    Product Description
                </div>
                <div>
                    <hr/>
                </div>
                <div style={{fontSize:14,fontWeight:'400'}}> 
                <div style={{fontSize:25,fontWeight:'bold'}}>
                    About this item
                </div>
                    {parse(product?.pd_description)}
                </div>
            </div>

        </div>

    </div>)


}