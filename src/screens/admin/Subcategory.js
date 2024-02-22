import { useEffect, useState } from "react";
import TitleComponent from "../../components/TitleComponent";
import { subcategoryStyle } from "./SubcategoryCss";
import { Grid,TextField,Button, Avatar } from "@mui/material";
import { getData, postData } from "../../services/FetchnodeServices";
import Swal from "sweetalert2";
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';

export default function Subcategory(props){
    var classes=subcategoryStyle()
    
    const [picture,setPicture]=useState({file:'md.png',bytes:''})
    const [error,setError]=useState({})
    const [categoryId,setCategoryId]=useState('')
    const [subCategory,setSubCategory]=useState('')
    const [categoryList,setCategoryList]=useState([])

    const fetchAllCategory=async()=>{
        var result=await getData('category/display_all_category')

        if(result.status)
        {setCategoryList(result.data)}
    }
    useEffect(function(){fetchAllCategory()},[])

    const fillAllCategory=()=>{
        return categoryList.map((item)=>{
            return <MenuItem value={item.categoryid}>{item.categoryname}</MenuItem>
        })
    }

    const handleError=(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))


    }
    const handleSubmit=async()=>{
        var submit=true
        if(categoryId.length==0)
        {
            handleError('categoryId','Pls Choose CategoryId....')
            submit=false
        }
        if(subCategory.length==0)
        {
            handleError('subCategory','Pls Input Subcategory Name....')
            submit=false
        }
        if(picture.bytes.length==0)
        {
            handleError('picture','Pls Choose Icon....')
            submit=false
        }
        if(submit)
        {
            var formData = new FormData
            formData.append('categoryid',categoryId)
            formData.append('subcategoryname',subCategory)
            formData.append('picture',picture.bytes)
            var result=await postData('subcategory/submit_subcategory',formData)
            if(result.status)
        {
            Swal.fire({
                icon: "Success",
                title: result.message,
                timer:1500
              });

        }
        else
        {
            Swal.fire({
                icon: "Error",
                title: result.message,
                timer:1500
              });
        }

        }

    }
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    }

    const handleReset=()=>{
        setPicture({file:'md.png'})
        setCategoryId('')
        setSubCategory('')
    }
    
    return(<div className={classes.mainBox}>
        <div className={classes.box}>
            <Grid container spacing={3}>

                <Grid item xs={12}>
                    <TitleComponent title=" Add New Sub Categories"  page="/admindashboard/displayallsubcategory" />  
                </Grid>
                
                <Grid item xs={12}>
                    <FormControl  fullWidth >
                        <InputLabel>Category</InputLabel>
                        <Select
                          label="Category" 
                          value={categoryId}
                          onChange={(event)=>setCategoryId(event.target.value)}
                          onFocus={()=>handleError('categoryId',null)}
                          error={error.categoryId}                          
                          >
                            {fillAllCategory()}
                            
                          </Select>
                    </FormControl>
                    {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}
                </Grid>

                <Grid item xs={12}>
                    <TextField  value={subCategory} onFocus={()=>handleError('subCategory',null)} error={error.subCategory} helperText={<span style={{fontSize:13,fontFamily:'kanit'}} >{error.subCategory}</span>}  onChange={(event)=>setSubCategory(event.target.value)} label="Subcategory Name" fullWidth/>
                </Grid>

                <Grid item xs={6}>
                    <Button variant="contained" component="label" fullWidth >
                        Upload
                        <input onClick={()=>handleError('picture',null)}  onChange={handlePicture} type="file" hidden accept="images/*" multiple/> 
                    </Button>
                    {error.picture?<span style={{fontSize:13,fontFamily:'kanit',margin:'5%',color:'#d32f2f'}}> {error.picture}</span>:<></>}
                </Grid>
                <Grid  item xs={6} style={{display:'flex',justifyContent:'center'}} >
                    <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" />
                </Grid>

                <Grid item  xs={6}>
                    <Button variant="contained" onClick={handleSubmit} fullWidth>
                        Submit             
                    </Button>
                </Grid>

                <Grid item  xs={6}>
                    <Button variant="contained" onClick={handleReset}  fullWidth>
                        Reset             
                    </Button>
                </Grid>
            </Grid>
           
        </div>
    </div>)

}