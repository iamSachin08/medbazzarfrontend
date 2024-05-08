import Button from '@mui/material/Button';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AccessTimeFilledIcon from '@mui/icons-material/AccessTimeFilled';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Slider from "react-slick";
import {serverURL} from "../../services/FetchnodeServices"
import AddShoppingCartIcon from '@mui/icons-material/AddShoppingCart';
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import { createRef } from "react";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { Grid } from '@mui/material';
import PlusMinusComponent from './PlusMinusComponent';
import {useDispatch} from "react-redux"
import logo from "../../assests/logo.png"
import { useNavigate } from 'react-router-dom';
import {useSelector} from "react-redux"
export default function ProductComponent(props) {

  const theme = useTheme();
  var sld = createRef();
  var dispatch = useDispatch()
  var navigate = useNavigate()

  var productFromRedux = useSelector(state=>state.data)
  var productRedux = Object.values(productFromRedux)
 

  var product = props?.data
    
   
  const handleChange =(v,item)=>{
    if(v>0)
    {
      item['qty']=v
      dispatch({type:'ADD_PRODUCT',payload:[item.productdetailid,item]})
      
    }
    else
    {
      dispatch({type:'DELETE_PRODUCT',payload:[item.productdetailid]})
    }  
    props.setPageRefresh(!props.pageRefresh)
  }

  const matchesMd = useMediaQuery(theme.breakpoints.down('md'));
  const matchesSm = useMediaQuery(theme.breakpoints.down('sm'));
  const matchesXs = useMediaQuery(theme.breakpoints.down('xs'));


  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: matchesMd ? 3:  7 ,
    slidesToScroll: 2,
    
  };

  const handleForward = () => {
    sld.current.slickPrev();
  };

  const handleBackward = () => {
    sld.current.slickNext();
    
  };

  const handleProductDetail = (item) =>
  {
    navigate('/productdetailpage',{state:{data:item}})
  }

  const showSlide = (item) => {
    
   
    return(<div style={{ display: "flex", justifyContent: "center" }}>
          <img
            src={`${serverURL}/images/${item.picture}`}
            style={{ width: "70%", borderRadius: 0, height: "auto",aspectRatio:3/3 }}
          />
        </div>)
     
    };

  const ProductDetail = () =>{
    return product.map((item) => {
      return(
      <div   >
        <div 
        style={{
          cursor:'pointer',
          fontFamily:'kanit',
          width:'80%',
          height:'auto',
          display: "flex",
          justifyContent: "center",
          margin:'0 auto',
        }}>
          <Grid container spacing={1}>
            <Grid item xs={12}
            style={{display:'flex',justifyContent:'right'}}>
              <BookmarkAddOutlinedIcon/>
            </Grid>

            <Grid item xs={12}>
             <div onClick={()=>handleProductDetail(item)}>
              {showSlide(item)}
            </div>
            </Grid>

            <Grid
                item
                xs={12}
                style={{
                  display: "flex",
                  justifyContent: "flex-end",
                  marginTop: -7,
                }}
              >
                <img src={logo} style={{ width:matchesMd? "3.0em":"5.0em" }} />
              </Grid>
            
            
            <Grid item xs={12}>
            <div style={{
                  fontSize: matchesMd?"0.7em":"1.0em",
                  display: "flex",
                  fontWeight: "bold",
                  margin: 2,
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "-webkit-box",
                  WebkitLineClamp: "2",
                  WebkitBoxOrient: "vertical",
                }}>  
                {item.description.length<=20?<div>{item.description}<div>&nbsp;</div></div>:item.description}
              </div>  
                
                <div style={{fontSize: matchesMd?"0.7em":"1.0em"}}>{item.weight} {item.weighttype}</div>
              
              
            </Grid>

            <Grid item xs={12}
                style={{
                  fontSize: matchesMd ? "0.9em" : "1.2em",
                  display: "flex",
                  marginTop: -5,
                  fontWeight: "bolder ",
                }}
              >
              {item.offerprice==0?  

                <span>
                   &#x20B9;{item.price}
                </span>

                :

                <div>
                   <span style={{fontWeight:600,color:'grey',textDecoration:"line-through",marginRight:5}}>
                      &#x20B9;{item.price}
                   </span>

                  <span> 
                    &#x20B9;{item.offerprice}
                  </span>

               </div>
              }
            </Grid>

            <Grid item xs={12} style={{marginTop:-10}}>
                <hr/>
            </Grid>

            <Grid item xs={12} style={{marginTop:-15, display:'flex',alignItems:'center'}}>
              <span ><AccessTimeFilledIcon style={{fontSize:matchesMd?'0.9em':'1.2em',marginBottom:-4}}/></span>
              <span style={{fontSize:matchesMd?'0.6em':'0.8em'}}>Delivery Within </span>
              <span style={{fontSize:matchesMd?'0.6em':'0.8em',fontWeight:'bolder',marginLeft:2 }}>1-3 Days</span>
            </Grid>

            <Grid item xs={12} style={{ display: "flex",alignItems:'center' }}>
              <Grid item xs={6} >
                  <PlusMinusComponent  qty={productFromRedux[item?.productdetailid]?.qty===undefined?0:productFromRedux[item?.productdetailid]?.qty} onChange={(v)=>handleChange(v,item)} width={80}  />
                </Grid>

                <Grid item xs={6}>
                  <Button
                      variant="text"
                       style={{color:'#fff',marginLeft:15,background:'#00391c',fontSize:matchesMd ? '0.2em':'0.65em'}}
                       onClick={()=>navigate("/cart")}
                      
                    >
                     Buy Now
                  </Button>
                </Grid>
            </Grid>

          </Grid>

        </div>

      </div>)
    })
  }

  return(<div style={{width:'95%',position:'relative',fontFamily:'kanit'}}>
    <div style={{ fontWeight: "bold",fontSize: 17, margin: "5px 0px 15px 15px",}}>
      {props?.title}

    </div>
    {matchesMd?<div></div>:<div>
    <div
        style={{
          display: "flex",
          width: 35,
          height: 35,
          borderRadius: 19,
          background: "#bdc3c7",
          alignItems: "center",
          justifyContent: "center",
          opacity: 0.6,
          position: "absolute",
          zIndex: 2,
          top: "40%",
          left: "0.09%",
        }}
      >
      <ArrowBackIosIcon  onClick={handleBackward} />
      </div>

      <div
        style={{
          display: "flex",
          width: 35,
          height: 35,
          borderRadius: 19,
          background: "#bdc3c7",
          alignItems: "center",
          justifyContent: "center",
          cursor: "pointer",
          opacity: 0.6,
          position: "absolute",
          zIndex: 2,
          top: "40%",
          right: "0.09%",
          cursor: "pointer",
        }}
      >
     <ArrowForwardIosIcon onClick={handleForward} />
      </div>

      </div>}
    <Slider {...settings}  ref={sld}>
        {ProductDetail()}
      </Slider>

  </div>)

}