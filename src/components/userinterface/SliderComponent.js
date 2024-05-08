import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../services/FetchnodeServices";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createRef } from "react";

export default function SliderComponent(props){
    var sld = createRef()

    var settings = {
        dots: false,
        autoplay:true,
        infinite: true,
        speed: 5000,
        slidesToShow: 3,
        slidesToScroll: 1
      };

    var banners = props?.data

    var images = Object.values(banners)[0]?.picture.split(",")

    const ShowSlide=()=>{
        return images?.map((item)=>{
            return <div><img src={`${serverURL}/images/${item}`} style={{width:'95%',marginLeft:'auto',marginRight:'auto',display:'block',height:'auto',borderRadius:10}}/></div>
        })
    }

    const handleBackward=()=>{
        sld.current.slickNext()

    }

    const handleForward=()=>{
         
        sld.current.slickPrev()
    }

    return(
        <div style={{width:'95%',position:'relative'}}> 
            <div style={{zIndex:2,top:'40%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',background:'#95a5a6',opacity:0.6,height:40,width:40,borderRadius:20}}>
             <ArrowBackIosNewIcon  onClick={handleBackward} />
            </div>
    
             <Slider ref={sld} {...settings}>{ShowSlide()}</Slider>

            <div style={{zIndex:2,right:'0.09%',top:'40%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',background:'#95a5a6',opacity:0.6,height:40,width:40,borderRadius:20}}>
             <ArrowForwardIosIcon onClick={handleForward}/>
            </div>
        </div>);

}