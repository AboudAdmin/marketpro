import React, { useEffect , useState  } from "react";
import Preloader from "../helper/Preloader";
import HeaderTwo from "../components/HeaderTwo";
import Breadcrumb from "../components/Breadcrumb";
import ShopSection from "../components/ShopSection";
import ShippingTwo from "../components/ShippingTwo";
import FooterTwo from "../components/FooterTwo";
import ColorInit from "../helper/ColorInit";
import ScrollToTop from "react-scroll-to-top";
import { useParams } from "react-router-dom";


const CategoryPage = () => { 
     
    const {id} = useParams(); // Get the category ID from the URL
    console.log('Category ID from URL:', id); // Log the category ID

        
    
    

  return (
    <>
      {/* ColorInit */}
      <ColorInit color={true} />

      {/* ScrollToTop */}
      <ScrollToTop smooth color="#FA6400" />

      {/* Preloader */}
      <Preloader />

      {/* HeaderOne */}
      <HeaderTwo category={true} />

      {/* Breadcrumb */}
      <Breadcrumb title={"Shop"} />

      {/* ShopSection */}
      <ShopSection categoryid ={id} />

      {/* ShippingTwo */}
      <ShippingTwo />

      {/* FooterTwo */}
      <FooterTwo />


    </>
  );
};

export default CategoryPage;