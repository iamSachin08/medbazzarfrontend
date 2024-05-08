import ProductImageComponent from "../../components/userinterface/ProductImageComponent";
import ProductInformationComponent from "../../components/userinterface/ProductInformationComponent";
import { useLocation } from "react-router-dom";
import { Grid } from "@mui/material";
import { useState } from "react";
import Header from "../../components/userinterface/Header";
import FooterComponent from "../../components/userinterface/FooterComponent";


export default function ProductDetailComponent (props){
    const [pageRefresh , setPageRefresh] = useState(false)

    var location = useLocation()
    var item = location?.state?.data

    return(
        <div>
            <Header/>
  
    <Grid container spacing={1} style={{width:'95%',height:'auto',display:'flex',justifyContent:'space-between'}}>
        <Grid item xs={6} style={{width:'50%'}}>
            <ProductImageComponent item={item} />
        </Grid>

        <Grid item xs={6} style={{width:'50%'}}>
            <ProductInformationComponent item={item} pageRefresh={pageRefresh} setPageRefresh={setPageRefresh} />
        </Grid>
        
        
    </Grid>
    <div style={{marginTop:200,display:'flex'}}>
            <FooterComponent/>
           
        </div>
    </div>)
}