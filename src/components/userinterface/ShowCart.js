import { serverURL } from "../../services/FetchnodeServices"
import DeleteOutlineIcon from '@mui/icons-material/DeleteOutline';
import BookmarkAddOutlinedIcon from '@mui/icons-material/BookmarkAddOutlined';
import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AddBoxOutlinedIcon from '@mui/icons-material/AddBoxOutlined';
export default function ShowCart(){
    var product = [
        {
          productdetailid: 2,
          categoryid: 7,
          subcategoryid: 8,
          brandid: 2,
          productid: 5,
          productsubname: "REAL JUICE",
          weight: 1,
          weighttype: "LTR",
          type: "juice",
          packaging: "box",
          qty: 10,
          price: 128,
          offerprice: 27,
          offertype: "eos",
          description: "Real Power Juice, Mixed Fruit, ",
          picture: "realjuice.jpg",
          concernid: 1,
        },
        
    {
      productdetailid: 3,
      categoryid: 8,
      subcategoryid: 9,
      brandid: 3,
      productid: 6,
      productsubname: "PONDS",
      weight: 275,
      weighttype: "ml",
      type: "cream",
      packaging: "box",
      qty: 8,
      price: 275,
      offerprice: 0,
      offertype: "eos",
      description: "Ponds Vitamin Body Lotion, ",
      picture: "ponds.jpg",
      concernid: 2,
    },
    {
      productdetailid: 4,
      categoryid: 9,
      subcategoryid: 10,
      brandid: 4,
      productid: 7,
      productsubname: "LORIAL SHAMPOO",
      weight: 340,
      weighttype: "ml",
      type: "shampoo",
      packaging: "bottle",
      qty: 7,
      price: 319,
      offerprice: 300,
      offertype: "eos",
      description: "Loreal Paris Shampoo, ",
      picture: "lorial.png",
      concernid: 3,
    }
    ]
    
   

    const ShowProductImage = (item) => {
        const images = item.picture.split(",");
       return images.map((item)=>{
           return <div><img src={`${serverURL}/images/${item}`} 
                      style={{width:'50%',display:'block'}}/>
                  </div>
       })
    }

    const CartBox = ()=>{
        return product.map((item) => {
            return(<div 
            style={{border:'solid 1px',
            width:'92%',
            display:'block',
            padding:15,
            borderColor:'#bdc3c7',
            marginTop:7}}
            >

            <div style={{display:'flex'}}> 
            
                <div style={{width:200,display:'block'}}>
                  {ShowProductImage(item)}
                </div>

                <div style={{width:'85%',marginLeft:-100,marginTop:-5}}>

                    <div style={{fontSize:"1.5em",fontWeight:'700'}}>
                      {item.description}
                      {item.weight}
                      {item.weighttype}
                    </div>

                    <div style={{fontSize:'0.8em',fontWeight:'500',color:'grey',marginTop:3}}>
                        <span >{item.productsubname} </span>
                        <span style={{margin:3}}> |  </span>
                        <span>{item.weight} </span>
                        <span>{item.weighttype} </span>
                    </div>

                    <div style={{marginTop:8}}>
                        {item.offerprice == 0 ? 
                        <div style={{fontSize:'1.5em',fontWeight:'bolder'}}> 
                          &#x20B9;{item.price}

                        </div>
                        :
                        <div >
                            <span style={{fontSize:'1.5em',fontWeight:'bolder'}}>
                                &#x20B9;{item.offerprice}
                            </span>
                            <span style={{fontSize:'1.1em',fontWeight:'500',color:'grey',margin:5}} >
                                <s >
                                    MRP &#x20B9;{item.price}
                                </s>
                            </span>
                     
                        </div>}
                    </div>

                    <div style={{display:'flex',alignItems:'center'}} >
                    <span>
                        <AccessTimeIcon style={{fontSize:'small',color:'red',marginBottom:-2}}/>
                    </span>    
                    <span style={{margin:5,fontSize:'0.8em',color:'grey'}} >
                        Delivery Within
                    </span>
                    <span style={{margin:5,fontSize:'0.9em',fontWeight:'bold'}} >
                        1-3 Days
                    </span>

                </div>

                <div style={{marginTop:10,marginBottom:10}}>
                     <hr/>
                </div>

                <div style={{display:'flex',alignItems:'center'}}>
                    <span>
                        <DeleteOutlineIcon style={{color:'red',fontSize:'1.8em'}}/>
                    </span>     
                    <span style={{color:'red',margin:6,fontSize:'1.0em'}}>
                        Remove
                    </span>

                    <span style={{marginLeft:25}}>
                         <BookmarkAddOutlinedIcon style={{fontSize:'1.8em'}}/>
                    </span> 
                    <span style={{margin:6,fontSize:'1.0em'}}>
                        Add to Favourites
                    </span>
                </div>

            </div>
        </div>

      </div>)})
    }


 return( 
    <div style={{width:"100%",fontFamily:'kanit',background:''}} >
        <div style={{fontSize:'1.6em',fontWeight:'bolder'}}>
            {product.length} Items in Your Cart
        </div>
    

        <div style={{fontSize:'0.9em',fontWeight:'550',color:'grey',marginTop:'1.0em'}}>
            Prescription Not Required
        </div>
        {CartBox()}

        <div style={{marginBottom:500,marginTop:10,display:'flex',alignItems:'center'}}>
            <span>
               <AddBoxOutlinedIcon style={{fontSize:'1.8em',marginTop:5}}/>
            </span>
            <span style={{fontWeight:'bolder',fontSize:'1.0em',margin:10}}>
              Add more items
            </span>

        </div>
    </div>)
}