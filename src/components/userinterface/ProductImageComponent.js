//import redBull from "../../assests/redBull.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../services/FetchnodeServices";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
export default function ProductImageComponent(){

    var settings1 = {
        dots: false,
        autoplay:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    var settings2 = {
        dots: true,
        autoplay:true,
        infinite: true,
        speed: 500,
        slidesToShow: 4,
        slidesToScroll: 1,

    };
     
     var productDetail=[{productdetailid:1,categoryid:1,subcategoryid:1,brandid:1,productid:1,productsubname:'redBull',desciption:'energy drink ',weight:'12',weigthtype:'ml',type:'gram',type:'drink',packaging:'d',quantity:'1',price:500,Offerprice:555,offertype:'2',picture:"redBull.png,r2.jpg,r1.jpg,redBull.png,r2.jpg,r1.jpg"}]

     var images = Object.values(productDetail)[0].picture.split(",")

     const ShowProductDetailSlider1=()=>{
        return images.map((item)=>{
            return <div><img src={`${serverURL}/images/${item}`} style={{width:300,display:'block',background:'',display:'block',marginLeft:'auto',marginRight:'auto'}}/></div>
        })
    }
    const ShowProductDetailSlider2=()=>{
        return images.map((item)=>{
            return <div><img src={`${serverURL}/images/${item}`} style={{ width:150,display:'block',background:'',display:'block',marginLeft:'auto',marginRight:'auto'}}/></div>
        })
    }

    return(<div style={{width:'100%',heigth:'auto',display:'flex',fontFamily:'Kanit',color:'#fff',background:''}}>
        <div style={{width:'100%'}}>
            <div style={{color:'#000',display:'flex',justifyContent:'right',margin:5}} >
            <FavoriteBorderIcon style={{marginRight:15}} />
            <ShareIcon style={{marginRight:25}}/>
            </div>                                                          
            <div style={{}}><Slider {...settings1}>{ShowProductDetailSlider1()}</Slider></div>
        
        <div><Slider {...settings2}>{ShowProductDetailSlider2()}</Slider></div>
        
        </div>
        

    </div>)


}