import { ConcernCss } from "./ConcernCss";
import { useState } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import TitleComponent from "../../components/TitleComponent";
import { postData } from "../../services/FetchnodeServices";
import Swal from "sweetalert2";

export default function Concern() {
    var classes=ConcernCss()
    const [concern,setConcern]=useState('')
    const [picture,setPicture]=useState({file:'md.png',bytes:''})
    const [error,setError]=useState({})
   
    
   
    const handlePicture=(event)=>{
   
       setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
   
    }
   
    const handleError =(label,msg)=>{
       setError((prev)=>({...prev,[label]:msg}))
    }
   
    const handleReset=()=>{
       setConcern('')
       setPicture({file:'md.png',bytes:''})
    }
   
   
    const handleSubmit= async()=>{  
       var submit=true
       if(concern.length==0)
       {
           handleError('concern','Pls Input Concern Name.....')
           submit=false;
       }
   
       if (picture.bytes.length==0 )
       {
           handleError('picture','Pls Choose Icon...')
           submit=false;
       }
       if(submit)
       {
           var formData= new FormData
           formData.append('concernname',concern)
           formData.append('picture',picture.bytes)
           var result=await postData('concern/submit_concern',formData)
           
           if(result.status)
           {
               Swal.fire({
                   icon: "success",
                   title: result.message,
                   timer:1500
                 });
   
           }
           else
           {
               Swal.fire({
                   icon: "error",
                   title: result.message,
                   timer:1500
                 });
           }
           
       }
   }
   
       return(<div className={classes.mainBox} >
           <div className={classes.Box}>
               <Grid container spacing={3}>
                   <Grid item xs={12}>
                       <TitleComponent title="Add New Concern"    />
                   </Grid>
                   
                   <Grid item xs={12}>
                       <TextField value={concern}  onFocus={()=>handleError('concern',null)} error={error.concern} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{ error.concern}</span>}  onChange={(event)=>setConcern(event.target.value)} label="concern Name" fullWidth/>
                   </Grid>
   
                   <Grid item xs={6}>
                       <Button variant="contained" component="label" fullWidth>
                           Upload
                           <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="image/*" multiple/>
                       </Button>
                       {error.picture?<span style={{color:'#d32f2f',marginLeft:'5%',fontSize:13,fontFamily:'kanit' }} >{error.picture}</span>:<></>}
                   </Grid>
   
                   <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                       <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
                   </Grid>
   
                   <Grid item xs={6}>
                       <Button onClick={handleSubmit} variant='contained' fullWidth>
                           Submit
                       </Button>
                   </Grid>
   
                   <Grid item xs={6}>
                       <Button onClick={handleReset} variant="contained" fullWidth>
                           Reset
                       </Button>
                   </Grid>
   
               </Grid>
           </div>
           
       </div>)
   
   
   }