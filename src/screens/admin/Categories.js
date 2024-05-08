import { useState } from "react";
import { Button,Grid,TextField,Avatar } from "@mui/material";
import { useStyles } from "./CategoriessCss";
import TitleComponent from "../../components/TitleComponent";
import { postData } from "../../services/FetchnodeServices";
import Swal from "sweetalert2";

export default function Categories() {
 var classes=useStyles()

 const [category,setCategory]=useState('')
 const [picture,setPicture]=useState({file:'md.png',bytes:''})
 const [error,setError]=useState({})

 

 const handlePicture=(event)=>{

    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})

 }

 const handleError =(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))
 }

 const handleReset=()=>{
    setCategory('')
    setPicture({file:'md.png',bytes:''})
 }


 const handleSubmit= async()=>{  
    var submit=true
    if(category.length==0)
    {
        handleError('category','Pls Input Category Name.....')
        submit=false
    }

    if (picture.bytes.length==0 )
    {
        handleError('picture','Pls Choose Icon...')
        submit=false
    }
    if(submit)
    {
        var formData= new FormData
        formData.append('categoryname',category)
        formData.append('picture',picture.bytes)
        var result=await postData('category/submit_category',formData)
        
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

    return(<div className={classes.root} >
        <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title="Add New Category"   page="/admindashboard/displayallcategory" />
                </Grid>
                
                <Grid item xs={12}>
                    <TextField value={category}  onFocus={()=>handleError('category',null)} error={error.category} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{ error.category}</span>}  onChange={(event)=>setCategory(event.target.value)} label="Category Name" fullWidth/>
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