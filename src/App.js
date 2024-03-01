import { BrowserRouter, Route, Routes } from "react-router-dom";
import './App.css';
import Header from "./components/commonPages/Header";
import Home from "./components/mainPages/Home";
import CreateProduct from "./components/mainPages/CreateProduct";
import ProductDetail from "./components/commonPages/ProductDetail";

function App() {
  return (
    <BrowserRouter>
      <Header />
      <Routes>
        <Route path='/' element={<Home/>}></Route>
        <Route path="/createProduct/:id" element={<CreateProduct/>}></Route>
        <Route path="/createProduct" element={<CreateProduct/>}></Route>

        <Route path='/productdetail/:id' element={<ProductDetail/>}></Route>

      </Routes>
    </BrowserRouter>
  );
}

export default App;
