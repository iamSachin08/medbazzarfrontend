//import redBull from "../../assests/redBull.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../services/FetchnodeServices";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import { Grid } from "@mui/material";
export default function ProductImageComponent(props){

    var settings1 = {
        dots: false,
        autoplay:true,
        infinite: true,
        speed: 500,
        slidesToShow: 1,
        slidesToScroll: 1
    };
    var settings2 = {
        dots: false,
        autoplay:true,
        infinite: true,
        speed: 2000,
        slidesToShow: 4,
        slidesToScroll: 1,
        vertical: true,
        verticalSwiping:true,
        swipeToSlide:true

    };
     
     var productDetail=props?.item
     
     
     var images = productDetail.multi_picture.split(",")

     const ShowProductDetailSlider1=()=>{
        return images.map((item)=>{
            return <div><img src={`${serverURL}/images/${item}`} style={{width:400,height:'auto',display:'block',background:'',display:'block'}}/></div>
        })
    }
    const ShowProductDetailSlider2=()=>{
        return images.map((item)=>{
            return <div><img src={`${serverURL}/images/${item}`} style={{ width:80,height:'auto',display:'block',aspectRatio:2/2}}/></div>
        })
    }

    return(
    <div style={{width:'100%',heigth:'auto',display:'flex',fontFamily:'Kanit',color:'#fff'}}>

        <div style={{width:'100%'}}>
            <div style={{color:'#000',display:'flex',justifyContent:'right',margin:5}} >
            <FavoriteBorderIcon style={{marginRight:15}} />
            <ShareIcon style={{marginRight:25}}/>
        </div>    

         <Grid container spacing={2} >

            <Grid item xs={3} style={{display:'flex',alignItems:'center',justifyContent:'center'}}>
                <div style={{width:'60%'}}>
                <Slider {...settings2}>
                    {ShowProductDetailSlider2()}
                </Slider>
                </div>
            </Grid>

            <Grid item xs={9}>

                <Slider {...settings1}>
                     {ShowProductDetailSlider1()}
                </Slider>
            </Grid>

        </Grid>
        {/* <div style={{width:'100%',display:'flex',alignItems:'center',justifyContent:'center',marginTop:20   }} >
            <div style={{width:'60%'}}>
               
            </div>
        </div> */}
        
        </div>
        

    </div>)


}