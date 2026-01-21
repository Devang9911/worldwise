import "./App.css";
import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";
import Home from "./pages/Home";
import Product from "./pages/Product";
import Pricing from "./pages/Pricing";
import Login from "./pages/Login";
import PageNotFound from "./pages/PageNotFound";
import Navbar from "./components/Navbar";
import Signup from "./pages/Signup";
import AppLayout from "./pages/AppLayout";
import City from "./pages/City";
import Countries from "./pages/Countries";
import CityList from "./components/CityList";
import Form from "./components/Form";

function App() {
  return (
    <>
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route index element={<Home />} />
          <Route path="/product" element={<Product />} />
          <Route path="/pricing" element={<Pricing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="app" element={<AppLayout />}>
            <Route index element={<Navigate replace to="city" />} />
            <Route path="city" element={<CityList />} />
            <Route path="city/:id" element={<City />} />
            <Route path="countries" element={<Countries />} />
            <Route path="form" element={<Form />} />
          </Route>
          <Route path="*" element={<PageNotFound />} /> // when no routes match
          to path then display "page not found"
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
