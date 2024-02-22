import ProductImageComponent from "./ProductImageComponent";
import ProductInformationComponent from "./ProductInformationComponent";

export default function ProductDetailComponent (){
    return(<div style={{width:'95%',height:'auto',display:'flex',justifyContent:'space-between'}}>
        <div style={{width:'50%'}}>
            <ProductImageComponent/>
        </div>

        <div style={{width:'48%'}}>
            <ProductInformationComponent/>
        </div>
        
        
    </div>)
}