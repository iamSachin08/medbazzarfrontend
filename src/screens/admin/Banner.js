import { Grid,Button,Avatar } from "@mui/material"
import { bannerStyle } from "./BannerCss"
import TitleComponent from "../../components/TitleComponent"
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import { useEffect, useState } from "react";
import { getData, postData } from "../../services/FetchnodeServices";
import Swal from "sweetalert2";


export default function Banner(){
    var classes=bannerStyle()

    const [picture,setPicture]=useState({file:[],bytes:''})
    const [error,setError]=useState({})
    const [bannerType,setBannerType]=useState('')
    const [brandId,setBrandId]=useState('')
    const [brandList,setBrandList]=useState([])
    
    const handlepicture=(event)=>{
        if(Object.values(event.target.files).length<=3)
        {
            alert('Pls Input Atleast Six Pictures')
        }
        else
        {
            setPicture({file:Object.values(event.target.files),bytes:event.target.files})
        }

    }
    const showImages=()=>{
        return picture?.file?.map((item)=>{
            return (<div style={{margin:2}}><Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="rounded" /></div>)
        })
    }

    const handleError =(label,msg)=>{
        setError((prev)=>({...prev,[label]:msg}))
     }
     const fetchAllBrand=async()=>{
        var result=await getData('brand/display_all_brand')
        if(result.status)
        {setBrandList(result.data)}
    }
    useEffect(function(){fetchAllBrand()},[])
  
    const fillAllBrand=()=>{
        return brandList.map((item)=>{
            return <MenuItem value={item.brandid}>{item.brandname}</MenuItem>
        })
    }

    const handleReset=()=>{
        setBannerType('')
        setBrandId('')
        setPicture('')
    }



    const handleSubmit= async()=>{
        var submit=true;
        if(bannerType.length==0)
        {
            handleError('bannerType','Pls Select Banner Type...')
            submit=false;
        }
        if(picture.bytes.length==0)
        {
            handleError('picture','Pls Input Pictures...')
            submit=false;
        }
        if(brandId.length==0)
        {
            handleError('brandId','Pls Select Brand...')
            submit=false;
        }
        if(submit)
        {
            var formData= new FormData()
            formData.append('bannertype',bannerType)
            formData.append('brandid',brandId)
            picture.file.map((item,i)=>{
                formData.append('picture'+i,item)
            })

            var result=await postData('banner/submit_banner',formData)

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

    





    return(<div className={classes.mainBox}>
        <div className={classes.Box}>
           <Grid container spacing={3}>

            <Grid item xs={12}>
                <TitleComponent title="Add Banners" />
            </Grid>
            
            <Grid item xs={6}>
            <FormControl fullWidth>
                    <InputLabel>Banner Type</InputLabel>
                    <Select
                         label="Banner Type"
                         error={error.bannerType}
                         onChange={(event)=>setBannerType(event.target.value)}
                         value={bannerType}
                         onFocus={() => handleError('bannerType',null)}
                    >

                    <MenuItem value="General">General</MenuItem>
                    <MenuItem value="Brand">Brand</MenuItem> 
                    <MenuItem value="Trending">Trending</MenuItem>     
                    <MenuItem value="Latest">Latest</MenuItem>
                    <MenuItem value="Popular">Popular</MenuItem>          
                    </Select>
                </FormControl>
                {error.bannerType?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.bannerType}</span>:<></>}
            </Grid>

            <Grid item xs={6}>
            <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select
                        label="Brand"
                        error={error.brandId}
                        onFocus={()=>handleError('brandId',null)}
                        onChange={(event) => setBrandId(event.target.value)}
                        value={brandId}
                      >
                        {bannerType ==='Brand' ? (
                            fillAllBrand()
                         ) : (
                            <MenuItem value={0}>None</MenuItem>
                        )}
                                 
                    </Select>
                </FormControl>
                {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.brandId}</span>:<></>}
            </Grid>

            <Grid item xs={6}>
                    <Button variant="contained"  component="label" fullWidth >
                        upload
                        <input type="file" hidden accept="images/*" onClick={()=>handleError('picture',null)}   onChange={handlepicture} multiple/>
                    </Button> 
                    {error.picture?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.picture}</span>:<></>}
                </Grid>

                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                    {showImages()}
                </Grid>

                <Grid item xs={6}>
                    <Button  variant="contained" onClick={handleSubmit} fullWidth >
                        Submit
                    </Button> 
                </Grid>
                <Grid item xs={6}>
                    <Button  onClick={handleReset} variant="contained" fullWidth >
                       Reset
                    </Button> 
                </Grid>



           </Grid>
        </div>
    </div>)
}