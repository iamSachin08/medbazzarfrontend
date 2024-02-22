import { DashboardStyle } from "./AdminDashboardCss"
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import { Divider, Grid, ListItemButton, ListItemIcon } from "@mui/material";
import Paper from '@mui/material/Paper';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoutIcon from '@mui/icons-material/Logout';

import Categories from "./Categories";
import DisplayAllCategory from "./DisplayAllCategory"
import Brand from "./Brand";
import DisplayAllBrands from "./DisplayAllBrands";
import Subcategory from "./Subcategory";
import DisplayAllSubCategory from "./DisplayAllSubCategory";
import Product from "./Product";
import DisplayAllProducts from "./DisplayAllProducts";
import ProductDetail from "./ProductDetail";
import DisplayAllProductDetail from "./DisplayAllProductDetail";
import Banner from "./Banner";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchnodeServices";

import Concern from "./Concern"

export default function AdminDashboard(){
    const classes=DashboardStyle()
    var navigate=useNavigate()
    var adminData=JSON.parse(localStorage.getItem('ADMIN'))

    return(
        <Box sx={{ flexGrow: 1 }}>
        <AppBar position="sticky">
          <Toolbar varient="dense" >
            <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
              MedBazzar
            </Typography>
          </Toolbar>
        </AppBar>
        <Grid container spaces={3} style={{paddingInlineStart:5}}>
            <Grid item xs={2.2}>
                <Paper>
                    <div className={classes.leftBarStyle}>
                        <img src={`${serverURL}/images/${adminData.picture}`} style={{width:70,height:70,borderRadius:35}}/>
                        <div className={classes.nameStyle} >{adminData.adminname}</div>
                        <div className={classes.emailStyle} >{adminData.emailid}</div>
                        <div className={classes.phoneStyle} >{adminData.mobileno}</div>
                    </div>
                    <div className={classes.menuStyle}>
                        <List>
                            <Divider/>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/admindashboard')} >
                                    <ListItemIcon>
                                        <DashboardIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>Dashboard</span>}/> 
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/admindashboard/displayallcategory')} >
                                    <ListItemIcon>
                                        <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>Category List</span>}/> 
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/admindashboard/displayallsubcategory')} >
                                    <ListItemIcon>
                                      <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>Sub Categories</span>}/> 
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/admindashboard/concern')} >
                                    <ListItemIcon>
                                      <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>Concern</span>}/> 
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/admindashboard/displayallbrands')} >
                                    <ListItemIcon>
                                     <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>Brands List</span>}/> 
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/admindashboard/displayallproducts')} >
                                    <ListItemIcon>
                                     <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>Products List</span>}/> 
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/admindashboard/displayallproductdetails')} >
                                    <ListItemIcon>
                                      <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>ProductDetail List</span>}/> 
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/admindashboard/banner')} >
                                    <ListItemIcon>
                                     <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>Banners</span>}/> 
                                </ListItemButton>
                            </ListItem>

                            <ListItem disablePadding>
                                <ListItemButton>
                                    <ListItemIcon>
                                     <DraftsIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>Sales Report</span>}/> 
                                </ListItemButton>
                            </ListItem>

                            <Divider/>
                            <ListItem disablePadding>
                                <ListItemButton onClick={()=>navigate('/adminlogin')}>
                                    <ListItemIcon>
                                      <LogoutIcon/>
                                    </ListItemIcon>
                                    <ListItemText primary={<span className={classes.menuItemStyle}>Log Out</span>}/> 
                                </ListItemButton>
                            </ListItem>


                        </List>


                    </div>


                </Paper>

            </Grid>
                <Grid item xs={9.8} style={{padding:20}}>
                  <Routes>
                        <Route element={<Categories/>} path={'/category'}/>
                        <Route element={<DisplayAllCategory/>} path={'/displayallcategory'}/>
                        <Route element={<Brand/>} path={'/brand'}/>
                        <Route element={<DisplayAllBrands/>} path={'/displayallbrands'}/>
                        <Route element={<Subcategory/>} path={'/subcategory'}/>
                        <Route element={<DisplayAllSubCategory/>} path={'/displayallsubcategory'}/>
                        <Route element={<Product/>} path={'/product'} />
                        <Route element={<DisplayAllProducts/>} path={'/displayallproducts'}/>
                        <Route element={<ProductDetail/>}  path={'/productdetail'}/>
                        <Route element={<DisplayAllProductDetail/>} path={'/displayallproductdetails'}/>
                        <Route element={<Banner/>} path={'/banner'}/>
                        <Route element={<Concern/>} path={'/concern'}/>

                    </Routes>

                </Grid>

            
        </Grid>


      </Box>
    )

} 