import { BrowserRouter, Route, Routes } from "react-router-dom";
import RouteScrollToTop from "./helper/RouteScrollToTop";
import PhosphorIconInit from "./helper/PhosphorIconInit";
import HomePageOne from "./pages/HomePageOne";
import HomePageTwo from "./pages/HomePageTwo";
import ShopPage from "./pages/ShopPage";
import ProductDetailsPageOne from "./pages/ProductDetailsPageOne";
import ProductDetailsPageTwo from "./pages/ProductDetailsPageTwo";
import CartPage from "./pages/CartPage";
import CheckoutPage from "./pages/CheckoutPage";
import AccountPage from "./pages/AccountPage";
import BlogPage from "./pages/BlogPage";
import BlogDetailsPage from "./pages/BlogDetailsPage";
import ContactPage from "./pages/ContactPage";
import CategoryPage from "./pages/CategoryPage";
import { CartProvider } from "./context/CartContext";  

function App() {
  return (
    <BrowserRouter>
      {/* تغليف التطبيق بـ CartProvider */}
      <CartProvider>
        <RouteScrollToTop />
        <PhosphorIconInit />
        <Routes>
          <Route exact path="/" element={<HomePageOne />} />
          <Route exact path="/index-two" element={<HomePageTwo />} />
          <Route exact path="/shop" element={<ShopPage />} />
          <Route exact path="/category/:id" element={<CategoryPage />} />
          <Route exact path="/product-details" element={<ProductDetailsPageOne />} />
          <Route exact path="/product-details-two/:id" element={<ProductDetailsPageTwo />} />
          <Route exact path="/cart" element={<CartPage />} />
          <Route exact path="/checkout" element={<CheckoutPage />} />
          <Route exact path="/account" element={<AccountPage />} />
          <Route exact path="/blog" element={<BlogPage />} />
          <Route exact path="/blog-details" element={<BlogDetailsPage />} />
          <Route exact path="/contact" element={<ContactPage />} />
        </Routes>
      </CartProvider>
    </BrowserRouter>
  );
}

export default App;
