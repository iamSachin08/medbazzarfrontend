import { useState,useEffect } from "react"
import { subcategoryStyle } from "./SubcategoryCss"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import MaterialTable from "@material-table/core"
import { getData, postData, serverURL } from "../../services/FetchnodeServices"
import { Button,Grid,TextField,Avatar } from "@mui/material";
import TitleComponent from "../../components/TitleComponent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';

export default function DisplayAllSubCategory(){
      var classes=subcategoryStyle()
      var navigate=useNavigate()

    const [subCategoryData,setSubCategoryData]=useState([])
    const [open,setOpen]=useState(false)
    const [subCategoryId,setSubCategoryId]=useState('')
    const [error,setError]=useState({})
    const [categoryId,setCategoryId]=useState('')
    const [subCategory,setSubCategory]=useState('')
    const [picture,setPicture]=useState({file:'md.png',bytes:''})
    const [showBtn,setShowBtn]=useState(false)
    const [tempPicture,setTepmPicture]=useState('')
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
    const handlePicture=(event)=>{
        setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
        setShowBtn(true)
    }

    const fetchAllSubCategory=async()=>{
        var result=await getData('subcategory/display_all_subcategory')
        
        if(result.status)
        {
            setSubCategoryData(result.data)
        }
    }
    useState(function(){
        fetchAllSubCategory()
    },[])

    const handleEditData=async()=>{
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
        if(submit)
        {
        var body={subcategoryid:subCategoryId,categoryid:categoryId,subcategoryname:subCategory}
        var result=await  postData('subcategory/edit_subcategory_Data',body)
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
           fetchAllSubCategory()
    }
  }
     
    const  handleEditPicture=async()=>{
        var formData=new FormData()
        formData.append('subcategoryid',subCategoryId)
        formData.append('picture',picture.bytes)
        var result=await postData('subcategory/edit_subcategory_picture',formData)
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
           fetchAllSubCategory()
        
    }

    const handleDelete=async(rowData)=>{
        Swal.fire({
            title: "Do you want to delete Subcategory?",
            toast:true,
            showDenyButton: true,
            showCancelButton: true,
            confirmButtonText: "Delete",
            denyButtonText: `Don't Delete`
          }).then(async(result) => {
            /* Read more about isConfirmed, isDenied below */
            if (result.isConfirmed) {
              var body={subcategoryid:rowData.subcategoryid}
              var result=await postData('subcategory/delete_subcategory_data',body)
              if (result.status)
              {
              Swal.fire({toast:true,title:"Deleted",icon:"success"})
              fetchAllSubCategory()
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


    const handleCancel=()=>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
    }
    
    const handleClose=()=>{
        setOpen(false)
    }
    const  handleOpen=(rowData)=>{
        setOpen(true)
        setSubCategoryId(rowData.subcategoryid)
        setCategoryId(rowData.categoryid)
        setSubCategory(rowData.subcategoryname)
        setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
        setTepmPicture(`${serverURL}/images/${rowData.picture}`)
    }


 const showSubcategoryForm=()=>{
 return(
  <Dialog
       open={open}
       close={handleClose}
       maxWidth={"md"} >

      <DialogContent>

          <div className={classes.box}>
            <Grid container spacing={3}>
                <Grid item xs={12}>
                    <TitleComponent title=" Edit Sub Category" listicon='list.png'/>  
                </Grid>
                
                <Grid item xs={12}>
                <FormControl  fullWidth >
                        <InputLabel>Category</InputLabel>
                        <Select
                          label="Category" value={categoryId}
                          onChange={(event)=>setCategoryId(event.target.value)}
                          error={error.categoryId}
                          onFocus={()=>handleError('categoryId',null)}
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
                   {showBtn?<div style={{width:'100%',height:100,justifyContent:'space-evenly',display:'flex',alignItems:'center'}}><Button variant="contained" onClick={handleEditPicture} >Save</Button><Button variant="contained" onClick={handleCancel}>Cancel</Button></div>:<div style={{width:'100%',height:100,display:'flex',alignItems:'center'}}>
                    <Button variant="contained" component="label" fullWidth >
                        Set New Icon
                        <input onClick={()=>handleError('picture',null)}  onChange={handlePicture} type="file" hidden accept="images/*" multiple/> 
                    </Button>
                    </div>}
                </Grid>

                <Grid  item xs={6} style={{display:'flex',justifyContent:'center'}} >
                    <Avatar alt="Remy Sharp" src={picture.file} variant="rounded" style={{width:100,height:100}} />
                </Grid>     
            </Grid>
           
          </div>
      </DialogContent>


        <DialogActions>
          <Button onClick={handleEditData} >Edit Data</Button>
          <Button onClick={handleClose} >Close</Button>
        </DialogActions>

  </Dialog>
  ) }

    function showSubcategoryTable() {
        return (
          <MaterialTable
            title="All SubCategories"
            columns={[
              { title: 'SubCategory ID', field: 'subcategoryid' },
              { title: 'Category', field: 'categoryname' },
              { title: 'Subcategory', field: 'subcategoryname' },
              { title: 'Icon' ,  field:'picture' ,render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture}`} style={{width:60,height:60,borderRadius:30}}/> </>}
            
            ]}
            options={{
              paging:true,
              pageSize:3,       // make initial page size
              emptyRowsWhenPaging: false,   // To avoid of having empty rows
              pageSizeOptions:[3,5,7,9,10],    // rows selection options
            }}
            data={subCategoryData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Subcategory',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Subcategory',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Subcategory',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/subcategory')
              }
            ]}
          />
        )
      }

 return(<div className={classes.mainBox}>
          <div className={classes.boxDisplay}>
            { showSubcategoryTable()}    
          </div>
            {showSubcategoryForm()}
        </div>)
}