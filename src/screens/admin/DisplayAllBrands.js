import MaterialTable from "@material-table/core"
import { brandStyles } from "./BrandCss"
import {  useEffect, useState } from "react"
import { getData, postData, serverURL } from "../../services/FetchnodeServices"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';

import { Button,Grid,Avatar,TextField } from "@mui/material";
import TitleComponent from "../../components/TitleComponent"
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllBrands(){
    var classes=brandStyles()
    var navigate=useNavigate()
    
    const [brandData,setBrandData]=useState([])
    const [open,setOpen]=useState(false)
    const [error,setError]=useState({})
    const [brand,setBrand]=useState('')
    const [brandId,setBrandId]=useState('')
    const [showBtn,setShowBtn]=useState(false)
    const [tempPicture,setTepmPicture]=useState('')
    const [picture,setPicture]=useState({file:'md.png',bytes:''})

   const handlePicture=(event)=>{
    setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
    setShowBtn(true)
   }

   const handleError=(label,msg)=>{
    setError((prev)=>({...prev,[label]:msg}))

   }
   const handleCancel=()=>{
    setPicture({file:tempPicture,bytes:''})
    setShowBtn(false)
   }


     const handleEditData=async()=>{
      var submit=true;
      if(brand.length==0)
      {
        handleError('brand','Pls Input  Brand Name')
        submit=false;
      }
      if (submit)
      {
        var body={brandid:brandId,brandname:brand}
        var result=await postData('brand/edit_brand_data',body)
        if(result.status)
        {
          Swal.fire({
            icon: "Success",
            title: result.message,
            timer:1500,
            toast:'true'
          });
      
         }
         else
         {
          Swal.fire({
            icon:"Error",
            title:result.message,
            timer:1500,
            toast:'true'
          });
         }
         fetchAllBrand()
         

      }
 }
     

   const handleEditPicture=async()=>{
    var formData=new FormData()
    formData.append('brandid',brandId)
    formData.append('picture',picture.bytes)
    var result=await postData('brand/edit_brand_picture',formData)
    if(result.status)
    {
      Swal.fire({
        icon: "success",
        title: result.message,
        timer:1500,
        toast:'true'
      });
  
     }
     else
     {
      Swal.fire({
        icon:"error",
        title:result.message,
        timer:1500,
        toast:'true'
      });
     }
     fetchAllBrand()
   }

   const handleDelete=async(rowData)=>{
    Swal.fire({
      title: "Do you want to delete category?",
      toast:true,
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: "Delete",
      denyButtonText: `Don't Delete`
    }).then(async(result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        var body={brandid:rowData.brandid}
        var result=await postData('brand/delete_brand_data',body)
        if (result.status)
        {
           Swal.fire({toast:true,title:"Deleted",icon:"success"})
           fetchAllBrand()
        }
        else
        {
          Swal.fire({toast:true,title:" Fail to Delete Record",icon:"success"});
        }
      } else if (result.isDenied) {
          Swal.fire({toast:true,title:"Your Record is safe",  icon:"info"});
      }
    });

   }


  
    const fetchAllBrand =async()=>{
      var result=await getData('brand/display_all_brand')
      
      if (result.status)
      {
        setBrandData(result.data)
      }
      
    }
    useEffect(function(){
      fetchAllBrand()
    },[])

    const handleClose=()=>{
      setOpen(false)
    }
    const handleOpen=(rowData)=>{
      setOpen(true)
      setBrandId(rowData.brandid)
      setBrand(rowData.brandname)
      setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
      setTepmPicture(`${serverURL}/images/${rowData.picture}`)
    }
  
   const showBrandForm=()=>{
    return(
    <Dialog
     open={open}
     onClose={handleClose}
     maxWidth={'md'}>
      
      <DialogContent>
      <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title="Edit Brands" />
                </Grid>

                <Grid item xs={12}>
                    <TextField value={brand}  onFocus={()=>handleError('brand',null)} error={error.brand} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.brand}</span>} onChange={(event)=>setBrand(event.target.value)} label="Brand Name"  fullWidth/>
                </Grid>

                <Grid item xs={6}>
                  {showBtn?<div style={{width:'100%',height:100,justifyContent:'space-evenly', display:'flex', alignItems:'center'}} ><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button onClick={handleCancel} variant="contained">Cancel</Button> </div>:<div style={{width:'100%',height:100,justifyContent:'space-evenly', display:'flex', alignItems:'center'}} >
                    <Button variant="contained" component="label" fullWidth >
                        Set New Picture
                        <input onClick={()=>handleError('picture',null)} onChange={handlePicture} type="file" hidden accept="images/*" multiple/>
                    </Button> 
                   
                    </div> }
                </Grid>

                <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                   <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" style={{width:100,height:100}} />
                </Grid>
            </Grid>

        </div>
      </DialogContent>
      <DialogActions>
        <Button  onClick={handleEditData}>Edit Data</Button>
        <Button onClick={handleClose} >Close</Button>
      </DialogActions>

    </Dialog>
   )}

    function ShowBrand() {
        return (
          <MaterialTable
            title="Main Brands"
            columns={[
              { title: 'Brand Id', field: 'brandid' },
              { title: 'Brand Name', field: 'brandname' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}} /></>},
             
            ]}
            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,9,10],    // rows selection options
            }}
            data={brandData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Brand',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Brand',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Brand',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/brand')
              }
            ]}
          />
        )
      }
      
return(<div className={classes.mainBox}>
    <div className={classes.boxDisplay}>
        {ShowBrand()}
    </div>
    {showBrandForm()}
</div>)
}