import CategoryComponent from "../../components/userinterface/CategoryComponent"
import Header from "../../components/userinterface/Header"
import MenuBar from "../../components/userinterface/MenuBar"
import ProductComponent from "../../components/userinterface/ProductComponent"
import SliderComponent from "../../components/userinterface/SliderComponent"
import BrandComponent from "../../components/userinterface/BrandComponent"
import FooterComponent from "../../components/userinterface/FooterComponent"
import ShowCart from "../../components/userinterface/ShowCart"

import { useEffect, useState } from "react"
import { getData, postData } from "../../services/FetchnodeServices"
import ConcernComponent from "../../components/userinterface/ConcernComponent"

export default function Home()
{   const [bannerList , setBannerList] = useState([])
    const [brandList , setBrandList] = useState([])
    const [categoryList , setCategoryList] = useState([])
    const [concernList , setConcernList] = useState([])
    const [productListOffer , setProductListOffer] = useState([])
    const [pageRefresh , setPageRefresh] = useState(false)

    const fetchAllBanners = async() => {
        var result = await postData('userinterface/show_all_banners',{bannertype:'General'})
        setBannerList(result.data)
    }
    
    const fetchAllBrands = async() => {
        var result = await getData('userinterface/show_all_brands')
        setBrandList(result.data)
    }
    
    const fetchAllCategory = async() => {
        var result = await getData('userinterface/show_all_category')
        setCategoryList(result.data)
    }
    
    const fetchAllConcern = async() => {
        var result = await getData('userinterface/show_all_concern')
        setConcernList(result.data)
    }

    const fetchAllProductDetails = async(offertype) => {
        var result = await postData('userinterface/display_all_product_detail_by_offer',{offertype})
        setProductListOffer(result.data)
        //alert(JSON.stringify(result))
    }

    useEffect(function(){

        fetchAllConcern()
        fetchAllBanners()
        fetchAllBrands()
        fetchAllCategory()
        fetchAllProductDetails('Month end Sale')
    },[])

    return(<div style={{background:''}}>
        <Header />
        
        <div style={{marginTop:20,display:'flex',justifyContent:'center'}}>
            <SliderComponent data={bannerList} />
           
        </div>
        <div style={{marginTop:20,display:'flex',justifyContent:'center'}}>
            <BrandComponent title="Brands"  data={brandList}/>
           
        </div>
        <div style={{marginTop:20,display:'flex',justifyContent:'center'}}>
            <CategoryComponent  data={categoryList}  title="Browse by Category"/>
           
        </div>

        <div style={{marginTop:20,display:'flex',marginBottom:20,justifyContent:'center'}}>
            <ProductComponent pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} title="Month End Sale" data={productListOffer}/>
           
        </div>

        <div style={{marginTop:20,marginBottom:50,display:'flex',justifyContent:'center'}}>
            <ConcernComponent  data={concernList}  title="Shop By Concern"/>
           
        </div>
       

        <div style={{marginTop:'auto',display:'flex'}}>
            <FooterComponent/>
           
        </div>

        {/* <div style={{marginTop:30,display:'flex'}}>
            <CartComponent/>
           
        </div>

        <div style={{marginTop:'auto',display:'flex'}}>
            <FooterComponent/>
           
        </div> */}


       

    </div>)
}