import { useState,useEffect } from "react"
import { productDetailStyle } from "./ProductDetailCss"
import MaterialTable from "@material-table/core"
import { getData, serverURL,postData } from "../../services/FetchnodeServices"
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import { Avatar, Button, Grid,TextField } from "@mui/material"
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import TitleComponent from "../../components/TitleComponent";
import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

export default function DisplayAllProductDetail(){
    var navigate=useNavigate()

   var classes=productDetailStyle()

    const [productDetailData,setProductDetailData]=useState([])
    const [open,setOpen]=useState(false)
    const [picture,setPicture]= useState({file:'md.png',bytes:''})
    const [error,setError]= useState({})
    const [categoryId,setCategoryId]= useState('')
    const [subCategoryId,setSubCategoryId]= useState('')
    const [brandId,setBrandId]= useState('')
    const [productId,setProductId]=useState('')
    const [productSubName,setProductSubName]= useState('')
    const [weight,setWeight]= useState('')
    const [weightType,setWeightType]=  useState('')
    const [type,setType]= useState('')
    const [packaging,setPackaging]= useState('')
    const [quantity,setQuantity]= useState('')
    const [price,setPrice]= useState('')
    const [offerPrice,setOfferPrice]= useState('')
    const [offerType,setOfferType]= useState('')
    const [categoryList,setCategoryList]= useState([])
    const [subCategoryList,setSubCategoryList]= useState([])
    const [brandList,setBrandList]=useState([])
    const [productList,setProductList]= useState([])
    const [showBtn,setShowBtn]=useState(false)
    const [tempPicture,setTempPicture]=useState('')
    const [productDetailId,setProductDetailId]=useState('')
    const [description,setDescription]=useState('')
    const handleCancel=()=>{
        setPicture({file:tempPicture,bytes:''})
        setShowBtn(false)
    }

    const handlePicture=(event)=>{
      setPicture({file:URL.createObjectURL(event.target.files[0]),bytes:event.target.files[0]})
      setShowBtn(true)
  }

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

  const handleCategoryChange=(event)=>{
      setCategoryId(event.target.value)
      fetchAllSubCategory(event.target.value)
  }

  const fetchAllSubCategory=async(cid)=>{
      var  result=await postData('subcategory/fetch_all_subcategory_by_categoryid',{categoryid:cid})
      if(result.status)
      {
          setSubCategoryList(result.data)
      }
  }
  useEffect(function(){fetchAllSubCategory()},[])

  const fillAllSubCategory=()=>{
      return  subCategoryList.map((item)=>{
          return <MenuItem value={item.subcategoryid} >{item.subcategoryname}</MenuItem>
      })
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
  const handleBrandChange=(event)=>{
      setBrandId(event.target.value)
      fetchAllProducts(event.target.value)

  }
  const fetchAllProducts=async(bid)=>{
      var  result=await postData('product/fetch_all_product_by_brandid',{brandid:bid})
      if(result.status)
      {
          setProductList(result.data)
      }
  }
  useEffect(function(){fetchAllProducts()},[])

  const fillAllProducts=()=>{
      return  productList.map((item)=>{
          return <MenuItem value={item.productid} >{item.productname}</MenuItem>
      })
  }




  

  const handleError=(label,msg)=>{
      setError((prev)=>({...prev,[label]:msg}))

  }


   const fetchAllProductDetail=async()=>{
    var result=await getData('productdetail/display_all_product_detail')
    if(result.status)
    {
        setProductDetailData(result.data)
    }
  }
   useEffect(function(){fetchAllProductDetail()},[])

   const handleClose=()=>{
    setOpen(false)

   }

   const handleEditData=async()=>{
    var submit=true;
    if(categoryId.length==0)
    {
        handleError('categoryId','Pls Choose Category')
        submit=false
    }
    if(subCategoryId.length==0)
    {
        handleError('subCategoryId','Pls Choose Sub Category...')
        submit=false
    }
    if(brandId.length==0)
    {
        handleError('brandId','Pls Choose brand... ')
        submit=false
    }
    if(productId.length==0)
    {
        handleError('productId','Pls Choose Product...')
        submit=false
    }
    if(productSubName.length==0)
    {
        handleError('productSubName','Pls Enter Product SubName...')
        submit=false
    }
    if(description.length==0)
    {
        handleError('description','Pls Write Description')
        submit=false
    }
    if(weight.length==0)
    {
        handleError('weight','Pls Enter Weight...')
        submit=false
    }
    if(weightType.length==0)
    {
        handleError('weightType','Pls Choose Weight Type..')
        submit=false
    }
    if(type.length==0)
    {
        handleError('type','Pls Choose Type...')
        submit=false
    }
    if(packaging.length==0)
    {
        handleError('packaging','Pls Choose Packaging...')
        submit=false
    }
    if(quantity.length==0)
    {
        handleError('quantity','Pls Enter Quantity...')
        submit=false
    }
    if(price.length==0)
    {
        handleError('price','Pls Enter Price...')
        submit=false
    }
    if(offerPrice.length==0)
    {
        handleError('offerPrice','Pls Enter Offer Price...')
        submit=false
    }
    if(offerType.length==0)
    {
        handleError('offerType','Pls Choose Offer Type...')
        submit=false
    }
    if(submit)
    {
      var body={productdetailid:productDetailId,categoryid:categoryId,subcategoryid:subCategoryId,brandid:brandId,productid:productId,productsubname:productSubName,description:description,weight:weight,weighttype:weightType,type:type,packaging:packaging,quantity:quantity,price:price,offerprice:offerPrice,offertype:offerType}
      var result=await postData('productdetail/edit_productdetail_data',body)
      
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
          icon: "error",
          title: result.message,
          timer:1500,
          toast:'true'
          });
       }
      
      fetchAllProductDetail()

   
    }

   }

   const handleEditPicture=async()=>{
    var submit=true;
    if(picture.bytes.length==0)
    {
        handleError('picture','Pls Choose Icon')
        submit=false;
    }
    if(submit)
    {
        var formData=new FormData()
        formData.append('productdetailid',productDetailId)
        formData.append('picture',picture.bytes)
        var result=await postData('productdetail/edit_productdetail_picture',formData)
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
            icon: "error",
            title: result.message,
            timer:1500,
            toast:'true'
            });
        }
        fetchAllProductDetail()
    }
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
          var body={productdetailid:rowData.productdetailid}
          var result=await postData('productdetail/delete_productdetail_data',body)
          if (result.status)
          {
          Swal.fire({toast:true,title:"Deleted",icon:"success"})
          fetchAllProductDetail()
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







   const handleOpen=(rowData)=>{
    setOpen(true)
    
    fetchAllProducts(rowData.brandid)
    fetchAllSubCategory(rowData.categoryid)
    setProductDetailId(rowData.productdetailid)
    setCategoryId(rowData.categoryid)
    setSubCategoryId(rowData.subcategoryid)
    setBrandId(rowData.brandid)
    setProductId(rowData.productid)
    setProductSubName(rowData.productsubname)
    setDescription(rowData.description)
    setWeight(rowData.weight)
    setWeightType(rowData.weighttype)
    setType(rowData.type)
    setPackaging(rowData.packaging)
    setQuantity(rowData.quantity)
    setPrice(rowData.price)
    setOfferPrice(rowData.offerprice)
    setOfferType(rowData.offertype)
    setPicture({file:`${serverURL}/images/${rowData.picture}`,bytes:''})
    setTempPicture(`${serverURL}/images/${rowData.picture}`)
   
   }


   const ShowProductdetailForm=()=>{
    return(<Dialog
          open={open}
          close={handleClose}
          maxWidth={"l"}>
            <DialogContent>
            <div className={classes.Box}>
           <Grid container spacing={3}>

            <Grid item xs={12}>
                <TitleComponent title="Add Product Detail" listicon="list.png"/>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Category</InputLabel>
                    <Select
                    label="Category"
                    value={categoryId}
                    error={error.categoryId}
                    onChange={handleCategoryChange}
                    onFocus={()=>handleError('categoryId',null)}>    

                     {fillAllCategory()}    
                    </Select>
                    {error.categoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}> {error.categoryId}</span>:<></>}
                </FormControl>

            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Sub Category</InputLabel>
                    <Select
                    label="Sub Category"
                    value={subCategoryId}
                    error={error.subCategoryId}
                    onChange={(event)=>setSubCategoryId(event.target.value)}
                    onFocus={()=>handleError('subCategoryId',null)}>
                        {fillAllSubCategory()}
                        
                    </Select>
                    {error.subCategoryId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.subCategoryId}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Brand</InputLabel>
                    <Select
                    label="Brand"
                    value={brandId}
                    onChange={handleBrandChange}
                    error={error.brandId}
                    onFocus={()=>handleError('brandId',null)}>
                        {fillAllBrand()}    
                    </Select>
                    {error.brandId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.brandId}</span>:<></>}
                </FormControl>

            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Product</InputLabel>
                    <Select
                    label="Product"
                    value={productId}
                    error={error.productId}
                    onChange={(event)=>setProductId(event.target.value)}
                    onFocus={()=>handleError('productId',null)}>
                        {fillAllProducts()}  
                    </Select>
                </FormControl>
                {error.productId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.productId}</span>:<></>}

            </Grid>

            <Grid item xs={6}>
                <TextField label="Product Sub Name" onChange={(event)=>setProductSubName(event.target.value)} onFocus={()=>handleError('productSubName',null)} value={productSubName} error={error.productSubName}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.productSubName}</span>} fullWidth/>
            </Grid>
            <Grid item xs={6}>
                <TextField label="Product Descripton" onFocus={()=>handleError('description',null)} value={description}  helperText={<span style={{fontFamily:'kanit',fontSize:13}}>{error.description}</span> } error={error.description} onChange={(event)=>setDescription(event.target.value)} fullWidth/>
            </Grid>

            <Grid item xs={3}>
                <TextField label="Weight" onChange={(event)=>setWeight(event.target.value)} onFocus={()=>handleError('weight',null)} value={weight} error={error.weight}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.weight}</span>} fullWidth/>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Weight Type</InputLabel>
                    <Select
                    label="Weigth Type"
                    value={weightType}
                    error={error.weightType}
                    onChange={(event)=>setWeightType(event.target.value)}
                    onFocus={()=>handleError('weightType',null)}>
                        <MenuItem value="MG" >MG</MenuItem>
                        <MenuItem value="Gram" >Gram</MenuItem>
                        <MenuItem value="L" >L</MenuItem>
                        <MenuItem value="ML">ML</MenuItem>
                    </Select>
                    {error.weightType?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.weightType}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Type</InputLabel>
                    <Select
                     label="Type"
                     value={type}
                     error={error.type}
                     onChange={(event)=>setType(event.target.value)}
                     onFocus={()=>handleError('type',null)}>
                        <MenuItem value="Capsules" >Capsules</MenuItem>
                        <MenuItem value="Injection">Injection</MenuItem>
                        <MenuItem value="Tablet" >Tablet</MenuItem>
                        <MenuItem value="Syrup" >Syrup</MenuItem>
                        <MenuItem value="Tube">Tube</MenuItem>
                    </Select>
                    {error.type?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.type}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Packaging</InputLabel>
                    <Select
                      label="Packaging"
                      value={packaging}
                      error={error.packaging}
                      onChange={(event)=>setPackaging(event.target.value)}
                      onFocus={()=>handleError('packaging',null)}>
                    <MenuItem value="Single Bottal" >Single Bottal</MenuItem>
                    <MenuItem value="Box" >Box</MenuItem>
                    <MenuItem value="Strip">Strip</MenuItem> 
                    <MenuItem value="Bottle">Bottal</MenuItem>               
                    </Select>
                    {error.packaging?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.packaging}</span>:<></>}
                </FormControl>
            </Grid>

            <Grid item xs={3}>
                <TextField label="Quantity" onChange={(event)=>setQuantity(event.target.value)}  value={quantity} onFocus={()=>handleError('quantity',null)} error={error.quantity} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.quantity}</span>} fullWidth/>

            </Grid>

            <Grid item xs={3}>
                <TextField label="Price" onChange={(event)=>setPrice(event.target.value)}   error={error.price} value={price} onFocus={()=>handleError('price',null)}  helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.price}</span>} fullWidth/>
            </Grid>

            <Grid item xs={3}>
                <TextField label="Offer Price" onChange={(event)=>setOfferPrice(event.target.value)}  error={error.offerPrice} value={offerPrice} onFocus={()=>handleError('offerPrice',null)} helperText={<span style={{fontFamily:'kanit', fontSize:13 }} >{error.offerPrice}</span>} fullWidth/>
            </Grid>

            <Grid item xs={3}>
                <FormControl fullWidth>
                    <InputLabel>Offer Type</InputLabel>
                    <Select
                    label="Offer Type"
                    value={offerType}
                    error={error.offerType}
                    onChange={(event)=>setOfferType(event.target.value)} 
                    onFocus={()=>handleError('offerType',null)}>
                    <MenuItem value="Bumper Offer" >Bumper Offer</MenuItem>
                    <MenuItem value="Diwali Dhamaka" >Diwali Dhamaka</MenuItem>
                    <MenuItem value=" De Diwal offer" >De Diwali Offer</MenuItem>
                    <MenuItem value="Sale 50%" >Sale 50%</MenuItem> 
                    </Select>
                </FormControl>
                {error.offerType?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.offerType}</span>:<></>}

            </Grid>
            
            <Grid item xs={6}>
            {showBtn?<div style={{height:100,width:'100%',justifyContent:'space-evenly',display:'flex',alignItems:'center'}} ><Button variant="contained" onClick={handleEditPicture}>Save</Button><Button variant="contained" onClick={handleCancel} >Cancel</Button></div>:<div style={{height:100,width:'100%',justifyContent:'space-evenly',display:'flex',alignItems:'center'}} >
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input type="file" hidden accept="image/*" onChange={handlePicture} multiple />
                </Button>
                </div>}
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
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



    )
   }




    function ShowAllProductDetail() {
        return (
          <MaterialTable
            title="Product Details"
            columns={[
              { title: 'ProductDetailId', field: 'productdetailid' },
              { title: 'Category', render:(rowData)=><div><div> {rowData.categoryname}</div><div>{rowData.subcategoryname}</div></div>},
             
              { title: 'Brand', render:(rowData)=><div><div> {rowData.brandname}</div><div>{rowData.productname}</div><div>{rowData.productsubname}</div><div>{rowData.weight} {rowData.weighttype}</div></div>},
              { title: 'Type', render:(rowData)=><div><div>{rowData.quantity} {rowData.type}</div><div>{rowData.packaging}</div></div>},
           
              { title: 'Price', render:(rowData)=><div><div><s>&#8377;{rowData.price}</s></div><div>&#8377;{rowData.offerprice}</div></div>},
              { title: 'Offer Type', field: 'offertype' },
              { title: 'Icon', field: 'picture',render:(rowData)=><><img src={`${serverURL}/images/${rowData.picture.split(",")[0]}`} style={{width:60,height:60,borderRadius:30}} /> </>},
              
              
            ]}
            options={{
                paging:true,
                pageSize:3,       // make initial page size
                emptyRowsWhenPaging: false,   // To avoid of having empty rows
                pageSizeOptions:[3,5,7,9,10],    // rows selection options
              }}
            data={productDetailData}        
            actions={[
              {
                icon: 'edit',
                tooltip: 'Edit Product details',
                onClick: (event, rowData) => handleOpen(rowData)
              },
              {
                icon: 'delete',
                tooltip: 'Delete Product Details',
                onClick: (event, rowData) => handleDelete(rowData)
              },
              {
                icon: 'add',
                tooltip: 'Add New Product',
                isFreeAction: true,
                onClick: (event) => navigate('/admindashboard/productdetail')
              }
            ]}
          />
        )
      }

      return(<div className={classes.mainBox}>
        <div className={classes.boxDisplay}>
            {ShowAllProductDetail()}
        </div>
        {ShowProductdetailForm()}

      </div>)
}