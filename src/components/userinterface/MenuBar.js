import { useState,useEffect } from "react";
import {AppBar,Box,Toolbar,Button,MenuItem,Menu} from '@mui/material';
import { getData,serverURL,postData } from "../../services/FetchnodeServices";

export default function MenuBar(){
    const [categoryList,setCategoryList] = useState([])
    const [subCategoryList,setSubCategoryList] = useState([])
    const [anchorEl,setAnchorEl]=useState(null)
    const open = Boolean(anchorEl)

    const handleClick=(categoryid,event)=>{
   
        fetchAllSubCategory(categoryid)
        setAnchorEl(event.currentTarget)

    }
    const handleClose=()=>{
        setAnchorEl(null)
    }

    const fetchAllCategory=async()=>{
    var result=await getData('userinterface/display_all_category')
    if(result.status)
    {setCategoryList(result.data)}}

  useEffect(function(){fetchAllCategory()},[])

  

  const fetchAllSubCategory=async(cid)=>{
    var  result=await postData('userinterface/fetch_all_subcategory_by_categoryid',{categoryid:cid})
    if(result.status)
    {
        setSubCategoryList(result.data)
    }
 }


 
  
 const showAllCategory=()=>{
    return categoryList.map((item)=>{
        return <Button onClick={(event)=>handleClick(item.categoryid,event)} style={{color:'#000f'}}>{item.categoryname}</Button> 
    })
 }

 const showAllSubCategory=()=>{
    return subCategoryList.map((item)=>{
        return <MenuItem>{item.subcategoryname}</MenuItem> 
    })
 }


  return( <div> <Box sx={{ flexGrow: 1 }}>
    <AppBar style={{background:'#fff'}} position="static">
      <Toolbar style={{display:'flex',justifyContent:'center'}}>
        {showAllCategory()}
         <Menu
         anchorEl={anchorEl}
         open={open}
         onClose={handleClose}>
          {showAllSubCategory()}


         </Menu>
      </Toolbar>
    </AppBar></Box></div>)

}