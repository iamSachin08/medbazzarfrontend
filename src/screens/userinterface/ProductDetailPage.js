import FooterComponent from "../../components/userinterface/FooterComponent";
import Header from "../../components/userinterface/Header";
import ProductDetailComponent from "../../components/userinterface/ProductDetailComponent";

export default function ProductDetailPage (){
    return(<div>
        <Header/>
        <div style={{marginTop:20,marginBottom:550,display:'flex',justifyContent:'center'}}>
            <ProductDetailComponent/>
           
        </div>

        <div style={{marginTop:'auto',display:'flex'}}>
            <FooterComponent/>
           
        </div>
    </div>)
}