import { Divider, Paper } from "@mui/material";
import {useSelector} from "react-redux";
import { useNavigate } from "react-router-dom";

export default function ShowCartProducts(props)
{
    var navigate = useNavigate()

    var products=useSelector((state)=>state.data)
    var keys=Object?.keys(products)
    var products= Object?.values(products)
    const showProducts =() =>{
        return products.map((item)=>{
            return <div style={{fontFamily:'kanit',fontSize:15, display:'flex',flexDirection:'row',justifyContent:'space-between',marginTop:6}} ><div >{item.productname}</div><div>Qty:{item.qty}</div></div>
        })
    }
    return(
        <Paper elevation={2} style={{fontFamily:'kanit',display:props.isOpen?'flex':'none',position:'absolute',top:50,right:70,zIndex:3,justifyContent:'center'}}>
            <div style={{padding:5,width:300,display:'flex',flexDirection:'column',height:'auto',}}>
                <div style={{display:'flex',flexDirection:'row',justifyContent:'space-between'}}>
                    <div style={{fontSize:16,fontWeight:'bold'}} >Order Summary</div>
                    <div style={{fontSize:16,fontWeight:'bold'}} >{keys.length} Items</div> 
                </div>
                <Divider/>
                {showProducts()}

                <div style={{marginLeft:'auto',marginRight:'auto',marginTop:10,display:'flex',alignItems:'center',justifyContent:'center',color:'#fff',background:'#00391c',width:280,height:37,borderRadius:10}}>
                    <div  style={{cursor:'pointer'}} onClick={()=>navigate("/cart")}>Proceed to Cart</div>
                </div>
            </div>
        </Paper>

    )
}