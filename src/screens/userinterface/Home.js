import CategoryComponent from "../../components/userinterface/CategoryComponent"
import Header from "../../components/userinterface/Header"
import MenuBar from "../../components/userinterface/MenuBar"
import ProductComponent from "../../components/userinterface/ProductComponent"
import SliderComponent from "../../components/userinterface/SliderComponent"
import BrandComponent from "../../components/userinterface/BrandComponent"
import FooterComponent from "../../components/userinterface/FooterComponent"
import ShowCart from "../../components/userinterface/ShowCart"
import CartComponent from "../../components/userinterface/CartComponent"

export default function Home()
{
    return(<div>
        <Header />
        
        <div style={{marginTop:20,display:'flex',justifyContent:'center'}}>
            <SliderComponent/>
           
        </div>
        <div style={{marginTop:20,display:'flex',justifyContent:'center'}}>
            <BrandComponent title="Brands"/>
           
        </div>
        <div style={{marginTop:20,display:'flex',justifyContent:'center'}}>
            <CategoryComponent title="Browse by Category"/>
           
        </div>

        <div style={{marginTop:20,display:'flex',marginBottom:500,justifyContent:'center'}}>
            <ProductComponent title="Trending Products"/>
           
        </div>

        <div style={{marginTop:'auto',display:'flex'}}>
            <FooterComponent/>
           
        </div>

        <div style={{marginTop:30,display:'flex'}}>
            <CartComponent/>
           
        </div>

        <div style={{marginTop:'auto',display:'flex'}}>
            <FooterComponent/>
           
        </div>


       

    </div>)
}