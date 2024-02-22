import {AppBar,Box,Toolbar} from '@mui/material';
import logo from '../../assests/logo.png'
import ShoppingCartOutlinedIcon from '@mui/icons-material/ShoppingCartOutlined';
import PersonOutlineOutlinedIcon from '@mui/icons-material/PersonOutlineOutlined';
import CallOutlinedIcon from '@mui/icons-material/CallOutlined';
import Drawer from '@mui/material/Drawer';
import Paper from '@mui/material/Paper';
import InputBase from '@mui/material/InputBase';
import IconButton from '@mui/material/IconButton';
import SearchIcon from '@mui/icons-material/Search';
import { Divider,  ListItemButton, ListItemIcon } from "@mui/material";
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import DashboardIcon from '@mui/icons-material/Dashboard';
import DraftsIcon from '@mui/icons-material/Drafts';
import LogoutIcon from '@mui/icons-material/Logout';
import { HomeStyle } from '../../screens/userinterface/HomeCss';

import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import MenuOutlinedIcon from '@mui/icons-material/MenuOutlined';
import { useState } from 'react';
import { useNavigate } from "react-router-dom";
import { serverURL } from "../../services/FetchnodeServices";

export default function Header(){

  var classes = HomeStyle()
  var navigate = useNavigate()

  const [status,setStatus]=useState(false)

  const theme = useTheme();
  const matches = useMediaQuery(theme.breakpoints.down('sm'));

  const handleDrawer=()=>{
    setStatus(true)
  }
  const handleClose=()=>{
    setStatus(false)
  }

  const drawerList=()=>{
    return(<Paper>
    <div className={classes.leftBarStyle}>
        <img src={`${serverURL}/images/sachin.jpg.jpg`} style={{width:70,height:70,borderRadius:35}}/>
        <div className={classes.nameStyle} >{'Sachin Sharma'}</div>
        <div className={classes.emailStyle} >{'iamSachin192@gmail.com'}</div>
        <div className={classes.phoneStyle} >{'+919516164015'}</div>
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
</Paper>)}

  const secondrySearchBar=()=>{
    return(
      <Box sx={{ flexGrow: 1 }}>
   <AppBar style={{background:'#fff'}} position="static">
     <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
         <MenuOutlinedIcon onClick={handleDrawer} style={{fontSize:30,cursor:'pointer', color:'#000'}}/>
         {searchBarComponent()}
         <div style={{display:'flex',width:70,justifyContent:'space-between'}} >
           <PersonOutlineOutlinedIcon style={{fontSize:30,color:'#000'}}/>
           <CallOutlinedIcon style={{fontSize:30,color:'#000'}}/>
         </div>
     </Toolbar>
   </AppBar>
   <div>
     
   </div>
 </Box>)
 }
    
  const searchBarComponent=()=>{
    return (
      <Paper
        component="form"
        sx={{ p: '2px 4px',margin:1, display: 'flex', alignItems: 'center', width: '50%' }}
      >
       
        <InputBase
          sx={{ ml: 1, flex: 1 }}
          placeholder="Search Products Here..."
          inputProps={{ 'aria-label': 'search google maps' }}
        />
        <IconButton type="button" sx={{ p: '10px' }} aria-label="search">
          <SearchIcon />
        </IconButton>
       
      </Paper>
    );
}
    return(<div>
         <Box sx={{ flexGrow: 1 }}>
      <AppBar style={{background:'#fff'}} position="static">
        <Toolbar style={{display:'flex',justifyContent:'space-between'}}>
            <img src={logo} style={{width:150}}/>
            {!matches?searchBarComponent():<div></div>}
            <div style={{display:'flex',width:!matches?110:50,justifyContent:'space-between'}} >
              {!matches?<PersonOutlineOutlinedIcon style={{fontSize:30,color:'#000'}}/>:<div></div>}
              {<ShoppingCartOutlinedIcon style={{fontSize:30,color:'#000'}}/>}
              {!matches?<CallOutlinedIcon style={{fontSize:30,color:'#000'}}/>:<div></div>}
            </div>
        </Toolbar>
      </AppBar>
      <div>
        {matches? secondrySearchBar():<div></div>}
      
      </div>


      <Drawer
            anchor={'left'}
            open={status}
            onClose={handleClose}
          >
           {drawerList()}
          </Drawer>
        
    </Box>

    </div>)
}