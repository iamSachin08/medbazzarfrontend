import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard";
import Cart from "../src/screens/userinterface/Cart"
import Home from "./screens/userinterface/Home";


import ProductDetail from "./screens/admin/ProductDetail";
import ProductDetailPage from "./screens/userinterface/ProductDetailPage";
import LoginPage from "./screens/userinterface/LoginPage";


function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route element={<AdminLogin/>} path={'/adminlogin'}/>
          <Route element={<AdminDashboard/>} path={'/admindashboard/*'}/> 
          <Route element={<Home/>} path={'/home'}/>  
          <Route element={<ProductDetailPage/>} path={'/productdetailpage'}/>  
          <Route element={<Cart/>} path={'/cart'}/> 
          <Route element={<LoginPage/>} path={'/loginpage'}/>
           
         
         


        </Routes>
      </Router>
    </div>
  );
}

export default App;
