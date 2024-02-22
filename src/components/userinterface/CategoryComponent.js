import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import { serverURL } from "../../services/FetchnodeServices";
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { createRef } from "react";
export default function CategoryComponent(props){
    var sld = createRef()
    var settings = {
        dots: false,
  
        infinite: true,
 
        slidesToShow: 7,
        slidesToScroll: 1
    };

    var category=[{categoryid:1,categoryname:'s',picture:"21.webp,22.webp,23.webp,24.webp,26.webp,27.webp,28.webp"}]

    var images = Object.values(category)[0].picture.split(",")

    const ShowCategorySlide=()=>{
        return images.map((item)=>{
            return <div><img src={`${serverURL}/images/${item}`}
             style={{
                boxShadow:'1px 1px 1px 0px #00000045',
                width:'80%',
                marginLeft:'auto',
                borderRadius:15,
                marginRight:'auto',
                height:'auto',
                display:'block'}}/>
                </div>
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
         <div style={{margin:'0px 5px 0px 20px',fontWeight:700,fontSize:16}}><h4>{props?.title}</h4></div>
            <div style={{zIndex:2,right:'97.5%',top:'55%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',background:'#95a5a6',opacity:0.4,height:30,width:30,borderRadius:15}}>
             <ArrowBackIosNewIcon onClick={handleBackward} />
            </div>
    
             <Slider ref={sld}{...settings}>{ShowCategorySlide()}</Slider>

            <div style={{zIndex:2,right:'0.09%',top:'55%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',background:'#95a5a6',opacity:0.4,height:30,width:30,borderRadius:15}}>
             <ArrowForwardIosIcon onClick={handleForward}/>
            </div>
        </div>);

}