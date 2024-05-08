import { useState,useEffect } from "react";
import TitleComponent from "../../components/TitleComponent"
import { productDetailStyle } from "./ProductDetailCss"
import { Avatar, Button, Grid,TextField } from "@mui/material"
import {FormControl,MenuItem,Select,InputLabel} from '@mui/material';
import { postData,getData } from "../../services/FetchnodeServices";
import Swal from "sweetalert2";
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { useMemo } from "react";

export default  function ProductDetail(){
    var classes=productDetailStyle()

    const modules = useMemo(() => ({
        toolbar: {
          container: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            ['bold', 'italic', 'underline', "strike"],
            [{ 'list': 'ordered' }, { 'list': 'bullet' },
            { 'indent': '-1' }, { 'indent': '+1' }],
            ['image', "link","video"],
            [{ 'color': ['#000000', '#e60000', '#ff9900', '#ffff00', '#008a00', '#0066cc', '#9933ff', '#ffffff', '#facccc', '#ffebcc', '#ffffcc', '#cce8cc', '#cce0f5', '#ebd6ff', '#bbbbbb', '#f06666', '#ffc266', '#ffff66', '#66b966', '#66a3e0', '#c285ff', '#888888', '#a10000', '#b26b00', '#b2b200', '#006100', '#0047b2', '#6b24b2', '#444444', '#5c0000', '#663d00', '#666600', '#003700', '#002966', '#3d1466'] }]
          ],
          
        },
      }), [])

    const [picture,setPicture] = useState({file:[],bytes:''})
    const [error,setError] = useState({})
    const [categoryId,setCategoryId] = useState('')
    const [subCategoryId,setSubCategoryId] = useState('')
    const [brandId,setBrandId] = useState('')
    const [productId,setProductId] = useState('')
    const [productSubName,setProductSubName] = useState('')
    const [weight,setWeight] = useState('')
    const [weightType,setWeightType] =  useState('')
    const [type,setType] = useState('')
    const [packaging,setPackaging] = useState('')
    const [quantity,setQuantity] = useState('')
    const [price,setPrice] = useState('')
    const [offerPrice,setOfferPrice] = useState('')
    const [offerType,setOfferType] = useState('')
    const [categoryList,setCategoryList] = useState([])
    const [subCategoryList,setSubCategoryList] = useState([])
    const [brandList,setBrandList] = useState([])
    const [productList,setProductList]= useState([])
    const [description,setDescription]=useState('')
    const [concernId,setConcern]=useState('')
    const [concernList,setConcernList] = useState([])


    const handleReset=()=>{
        setCategoryId('')
        setSubCategoryId('')
        setBrandId('')
        setProductId('')
        setProductSubName('')
        setWeight('')
        setWeightType('')
        setType('')
        setPackaging('')
        setQuantity('')
        setPrice('')
        setOfferPrice('')
        setOfferType('')
        setPicture('')
        setConcern('')
        setDescription('')
        



    }

    const fetchAllConcern = async() => {
        var result = await getData('concern/display_all_concern')
        if(result.status)
        {setConcernList(result.data)}
    }
    useEffect(function(){fetchAllConcern()},[])

    const fillAllConcern = () => {
        return concernList.map((item)=>{
            return <MenuItem value={item.concernid}>{item.concernname}</MenuItem>
        })
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

    const handlePicture=(event)=>{
        //alert( JSON.stringify( event.target.files))
     //   var file=await Object.values(event.target.files).map((item)=>{
       //     return item
       //})

       if(Object.values(event.target.files).length<=3)
       { 
        alert("Pls Upload 3 or More File")
       }
       else
       {
        setPicture({file:Object.values(event.target.files),bytes:event.target.files})
       } 
    }

    const handleSubmit=async()=>{
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
        if(concernId.length==0)
        {
            handleError('concernId','Pls Choose Concern...')
            submit=false;
        }
        if(description.length==0)
        {
            handleError('description','Pls Input Description')
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
        if(picture.bytes.length==0)
        {
            handleError('picture','Pls Choose Picture...')
            submit=false
        }
        if(submit)
        {
            var formData= new FormData()
            formData.append('categoryid',categoryId)
            formData.append('subcategoryid',subCategoryId)
            formData.append('brandid',brandId)
            formData.append('productid',productId)
            formData.append('productsubname',productSubName)
            formData.append('concernid',concernId)
            formData.append('description',description)
            formData.append('weight',weight)
            formData.append('weighttype',weightType)
            formData.append('type',type)
            formData.append('packaging',packaging)
            formData.append('quantity',quantity)
            formData.append('price',price)
            formData.append('offerprice',offerPrice)
            formData.append('offertype',offerType)
            picture.file.map((item,i)=>{
                formData.append('picture'+i,item)
            })
           
            
            var result=await postData('productdetail/submit_product_detail',formData)
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

    const showImages=()=>{
        return picture?.file?.map((item)=>{
            return (<div style={{margin:2}} > <Avatar alt="Remy Sharp" src={URL.createObjectURL(item)} variant="rounded" /></div>)
        })
    }

    
    return(<div className={classes.mainBox}>
        <div className={classes.Box}>
           <Grid container spacing={2}>

            <Grid item xs={12}>
                <TitleComponent title="Add Product Detail"  page="/admindashboard/displayallproductdetails" />
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
                <FormControl fullWidth>
                    <InputLabel>Concern</InputLabel>
                    <Select
                    label="Concern"
                    value={concernId}
                    error={error.concernId}
                    onChange={(event)=>setConcern(event.target.value)}
                    onFocus={()=>handleError('concernId',null)}>
                        {fillAllConcern()}
                         
                    </Select>
                </FormControl>
                {error.concernId?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.concernId}</span>:<></>}

            </Grid>

            <Grid item xs={12}>
                
                <ReactQuill  onFocus={()=>handleError('description',null)} modules={modules} theme="snow" value={description} onChange={(e)=>setDescription(e)} />
                {error.description?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.description}</span>:<></>}
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
                        <MenuItem value="mg" >mg</MenuItem>
                        <MenuItem value="gm" >gm</MenuItem>
                        <MenuItem value="kg" >kg</MenuItem>
                        <MenuItem value="mm" >mm</MenuItem>
                        <MenuItem value="litre">litre</MenuItem>
                        <MenuItem value="ml">ml</MenuItem>
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
                        <MenuItem value="Powder">Powder</MenuItem>
                        <MenuItem value="Spray">Spray</MenuItem>
                        <MenuItem value="Gel">Gel</MenuItem>
                        <MenuItem value="Cream">Cream</MenuItem>
                        <MenuItem value="Bar">Bar</MenuItem>
                        <MenuItem value="Lotion">Lotion</MenuItem>
                        <MenuItem value="Juice">Juice</MenuItem>
                        <MenuItem value="Other">Other</MenuItem>
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
                    <MenuItem value="Packs">Packs</MenuItem>           
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
                    <MenuItem value="Month end Sale" >Month End Sale</MenuItem>
                    <MenuItem value=" De Diwal offer" >De Diwali Offer</MenuItem>
                    <MenuItem value="Sale 50%" >Sale 50%</MenuItem> 
                    </Select>
                </FormControl>
                {error.offerType?<span style={{fontSize:13,fontFamily:'kanit',margin:'2%',color:'#d32f2f'}}>{error.offerType}</span>:<></>}

            </Grid>
            
            <Grid item xs={6}>
                <Button variant="contained" component="label" fullWidth>
                    Upload
                    <input type="file" hidden accept="image/*" onChange={handlePicture} multiple />
                </Button>
            </Grid>

            <Grid item xs={6} style={{display:'flex',justifyContent:'center'}} >
                 {showImages()}
            </Grid>

            <Grid item xs={6}>
                <Button  onClick={handleSubmit}  variant="contained" fullWidth>
                    Submit
                </Button>
            </Grid>

            <Grid item xs={6}>
                <Button variant="contained" onClick={handleReset} fullWidth>
                    Reset
                </Button>
            </Grid>

           </Grid>
        </div>
    </div>)
}