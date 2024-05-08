import { Grid } from "@mui/material";
import lp from "../../assests/lp.png"

export default function LoginImage(){
    return(
        <Grid container spacing={2}>
            <Grid item xs={12}>
                <div >
                <img src={lp} width="100%" />
                </div>
            </Grid>
        </Grid>
    )
}