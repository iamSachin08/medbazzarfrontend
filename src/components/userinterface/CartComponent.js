import PaymentDetails from "./PaymentDetail";
import ShowCart from "./ShowCart";

export default function CartComponent(){
    return(
    <div style={{width:'100%',height:'auto',display:'flex',justifyContent:'space-between'}}>
        <div style={{width:'70%',marginLeft:50,background:''}}>
            <ShowCart/>

        </div>
        <div style={{width:'30%'}} >
            <PaymentDetails/>

        </div>

    </div>
    )
}