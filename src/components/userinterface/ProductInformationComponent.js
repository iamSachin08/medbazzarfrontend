//import redBull from "../../assests/redBull.png"
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { Button } from "@mui/material";

export default function ProductInformationComponent(){
     
    return(<div style={{width:'100%',heigth:'auto',display:'flex',fontFamily:'Kanit',color:''}}>
        
        
        <div style={{width:'100%' ,color:'#000'}}>
            <div style={{fontSize:23,fontWeight:'bolder'}}> 
             RedBull Energy Drink, Sugar Free 250ml 
             <div style={{fontSize:16,fontWeight:'bold',marginTop:-1}} >  <a href="#"> Red Bull India .250ml.</a> </div>
             <div style={{fontSize:23,fontWeight:'bolder'}} > &#8377; 125 </div>
             <div style={{fontSize:14,fontWeight:'bold'}} > (Incl. all Taxes) </div>
             <hr />
            </div>

            <div style={{marginTop:-5}}>
                <div style={{fontSize:18,fontWeight:'bolder'}}><s style={{color:'grey'}}>MPR:&#8377;150</s> (Save&#8377;150 - 21%off)</div>
                <div  style={{fontWeight:'bold',fontSize:18,marginTop:10}}>Weight Type</div>
                <div style={{marginTop:5}} > 
                    <Button variant="outlined" >MM</Button>
                    <Button variant="outlined"  style={{marginLeft:15}}> Ml</Button>
                    <Button variant="outlined"  style={{marginLeft:15}}> L</Button>

                </div>
            </div>

            <div >
            <div  style={{fontWeight:'bold',fontSize:18,marginTop:15}}>Type</div>
                <div style={{marginTop:5}} > 
                    <Button variant="outlined" >BOTTLE</Button>
                    <Button variant="outlined"  style={{marginLeft:15}}>STRIP</Button>
                    <Button variant="outlined"  style={{marginLeft:15}}>PACK</Button>

                </div>
            </div>

            <div>
            <div  style={{fontWeight:'bold',fontSize:20,marginTop:15}}>
                Super Saving (2 Offers)
            </div>
            <hr style={{marginTop:15}}/>     
            </div>

           <div style={{display:'flex',marginTop:10}}>
            <div style={{border:'solid 1px',width:'35%',height:'auto',padding:10,borderRadius:15}}>
                <div style={{color:'red'}}>ICIC Bank</div>
                <div><hr/></div>
                <div style={{fontSize:14,fontWeight:'500'}}> Rs.2000 Cashback on ICICI, HDFC, KOTAK, ONECARD, INDUSIND & BOB Bank credit card transactions</div>
                <div style={{fontSize:14,fontWeight:'500',marginTop:10}}>View All..</div>
            </div>
             <div style={{border:'solid 1px',width:'35%',height:'auto',padding:10,marginLeft:20,borderRadius:15}}>
                <div style={{color:'blue'}}>SBI Bank</div>
                <div><hr/></div>
                <div style={{fontSize:14,fontWeight:'500'}}>Rs.2000 Cashback on SBI ONECARD, INDUSIND & BOB Bank credit card transactions</div>
                <div style={{fontSize:14,fontWeight:'500',marginTop:10}}>View All..</div>
            </div>
            </div>

            <div style={{border:'solid 1px',width:'100%',height:'auto',padding:10,borderRadius:15,marginTop:10}}>
                <div style={{fontSize:20,fontWeight:'bold'}}>Product Description</div>
                <div><hr/></div>
                <div style={{fontSize:14,fontWeight:'300'}}> Red Bull is a brand of energy drinks created and owned by the Austrian company Red Bull GmbH. With a market share of 43%, it is the most popular energy drink brand as of 2020, and the third most valuable soft drink brand, behind Coca-Cola and Pepsi Red Bull is an energy drink in an 8.4-ounce slim can with a distinctive blue and silver .</div>
            </div>

        </div>

    </div>)


}