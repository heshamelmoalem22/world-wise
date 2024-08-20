/* eslint-disable react/jsx-no-undef */
/* eslint-disable no-unused-vars */
import { BrowserRouter,  Navigate,  Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import PageNotFound from "./pages/PageNotFound";
import AppLayout from "./pages/AppLayout";
import Login from "./pages/Login";
import CityList from "./components/CityList";

import CountryList from "./components/CountryList";
import City from "./components/City";
import Form from "./components/Form";
import { CitiesProvider } from "./contexts/CitiesContext";
import { AuthProvider } from "./contexts/FakeAuth";

function App() {
 
  return (
    <AuthProvider>
    <CitiesProvider>
      <BrowserRouter>
      <Routes>
        <Route path="/" element={<Homepage/>}/>
        <Route path="Product" element={<Product/>}/>
        <Route path="Pricing" element={<Pricing/>}/>
        <Route path="Login" element={<Login/>}/>
        <Route path="app" element={<AppLayout/>}>
        <Route index  element={<Navigate replace to="cities"/>}/>
        <Route path="cities" element={<CityList />}/>
       <Route path="cities/:id" element={<City/>}/>
       
       
        <Route path="countries" element={<CountryList  />}/>
       <Route path="form" element={<Form/>}/>
        </Route>
        
        

        <Route path="*" element={<PageNotFound/>}/>
        

      </Routes>
      
      </BrowserRouter>
      </CitiesProvider>
      </AuthProvider>
      
    
  )
}

export default App