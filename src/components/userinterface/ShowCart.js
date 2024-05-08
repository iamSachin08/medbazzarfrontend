import { serverURL } from "../../services/FetchnodeServices"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
import {useSelector,useDispatch} from "react-redux"
import PlusMinusComponent from "./PlusMinusComponent";
import { useState } from "react";
export default function ShowCart(props){

    var productFromRedux = props.products  
    var productDetails = Object.values(productFromRedux)

    var dispatch = useDispatch()

    
    
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

    // const ShowProductImage = (item) => {
    //     const images = item.picture.split(",");
    //    return images.map((item)=>{
    //        return <div><img src={`${serverURL}/images/${item}`} 
    //                   style={{width:100,display:'block'}}/>
    //               </div>
    //    })
    // }

    const CartBox = ()=>{
        return productDetails.map((item) => {
            return(<div 
            style={{border:'solid 1px',
            width:'92%',
            display:'block',
            padding:15,
            borderColor:'#bdc3c7',
            marginTop:7}}
            >

            <div style={{display:'flex'}}> 
            
                <div style={{width:200}}>
                    <div>
                    <img src={`${serverURL}/images/${item.picture}`} style={{width:100,marginRight:'auto',borderRadius:10,display:'block',height:'auto'}} />
                    </div>    
                </div>

                <div style={{width:'85%',marginLeft:-75,marginTop:-5}}>

                    <div style={{fontSize:"1.2em",fontWeight:'700'}}>
                      {item.productname} 
                    </div>

                    <div style={{fontSize:'0.8em',fontWeight:'500',color:'grey',marginTop:3}}>
                        <span >{item.productsubname} </span>
                        <span style={{margin:3}}> |  </span>
                        <span>{item.weight} </span>
                        <span>{item.weighttype} </span>
                    </div>
                    <div style={{display:'flex',justifyContent:'space-between',flexDirection:'row'}}>
                    <div style={{marginTop:8}}>
                        {item.offerprice == 0 ? 
                        <div style={{fontSize:'1.4em',fontWeight:'bolder'}}> 
                          &#x20B9;{item.price} 
                          

                        </div>
                        :
                        <div >
                            <span style={{fontSize:'1.4em',fontWeight:'bolder'}}>
                                &#x20B9;{item.offerprice}
                            </span>
                            <span style={{fontSize:'1.0em',fontWeight:550,color:'grey',margin:5}} >
                                <s >
                                    MRP &#x20B9;{item.price}
                                </s>
                            </span>
                            <span style={{background:'#f1c40f',borderRadius:10}}>
                                <span style={{fontSize:'0.8em',fontWeight:'bold',color:'green',padding:5}}>
                                    20% off
                                </span>
                            </span>
                            
                        </div>}
                    </div>
                    <PlusMinusComponent  qty={productFromRedux[item?.productdetailid]?.qty===undefined?0:productFromRedux[item?.productdetailid]?.qty} onChange={(v)=>handleChange(v,item)} width={120} />
                    </div>

                    <div style={{display:'flex',alignItems:'center'}} >
                    <span>
                        <AccessTimeIcon style={{fontSize:'1.2em',color:'red',marginBottom:-2}}/>
                    </span>    
                    <span style={{margin:5,fontSize:'0.8em',color:'grey'}} >
                        Delivery Within
                    </span>
                    <span style={{margin:5,fontSize:'0.9em',fontWeight:'bold'}} >
                        1-3 Days
                    </span>

                </div>

                <div style={{marginTop:10,marginBottom:10}}>
                     <hr/>
                </div>

                <div style={{display:'flex',alignItems:'center'}}>
                    <span>
                        <DeleteOutlineIcon style={{color:'red',fontSize:'1.4em'}}/>
                    </span>     
                    <span style={{color:'red',margin:6,fontSize:'1.0em'}}>
                        Remove
                    </span>

                    <span style={{marginLeft:25}}>
                         <BookmarkAddOutlinedIcon style={{fontSize:'1.4em'}}/>
                    </span> 
                    <span style={{margin:6,fontSize:'1.0em'}}>
                        Add to Favourites
                    </span>
                </div>

            </div>
        </div>

      </div>)})
    }


 return( 
    <div style={{width:"100%",fontFamily:'kanit',background:''}} >
        <div style={{fontSize:'1.6em',fontWeight:'bolder'}}>
            {productDetails.length} Items in Your Cart
        </div>
    

        <div style={{fontSize:'0.9em',fontWeight:'550',color:'grey',marginTop:'1.0em'}}>
            Prescription Not Required
        </div>
        {CartBox()}

        <div style={{marginBottom:500,marginTop:10,display:'flex',alignItems:'center'}}>
            <span>
               <AddBoxOutlinedIcon style={{fontSize:'1.8em',marginTop:5}}/>
            </span>
            <span style={{fontWeight:'bolder',fontSize:'1.0em',margin:10}}>
              Add more items
            </span>

        </div>
    </div>)
}