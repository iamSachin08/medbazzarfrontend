import { BrowserRouter as Router,Routes,Route } from "react-router-dom";
import AdminLogin from "./screens/admin/AdminLogin";
import AdminDashboard from "./screens/admin/AdminDashboard";
import Concern from "./screens/admin/Concern";
import Home from "./screens/userinterface/Home";
import HomeCare from "./screens/userinterface/ProductDetailPage";

import ProductDetail from "./screens/admin/ProductDetail";
import ProductDetailPage from "./screens/userinterface/ProductDetailPage";
import PlusMinusComponent from "./components/userinterface/PlusMinusComponent";

function App() {
  return (
    <div>
      <Router>
        <Routes>

          <Route element={<AdminLogin/>} path={'/adminlogin'}/>
          <Route element={<AdminDashboard/>} path={'/admindashboard/*'}/> 
          <Route element={<Home/>} path={'/home'}/>  
          <Route element={<ProductDetailPage/>} path={'/productdetailpage'}/>  
          <Route element={<PlusMinusComponent/>} path={'/plus'} />   
         
         


        </Routes>
      </Router>
    </div>
  );
}

export default App;
