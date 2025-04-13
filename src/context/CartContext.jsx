import React, { createContext, useState, useContext } from 'react';

// إنشاء كونтекست السلة
const CartContext = createContext();

// مكون Provider لتوفير بيانات السلة لكل التطبيق
export const CartProvider = ({ children }) => {
  // حالة السلة (cart) لتخزين المنتجات
  const [cart, setCart] = useState([]);

  /**
   * دالة إضافة منتج للسلة
   * @param {Object} product - المنتج المراد إضافته
   */
  const addToCart = (product) => {
    // التحقق من توفر المنتج في المخزون
    if (product.stock <= 0) {
      alert('المنتج غير متوفر في المخزون');
      return;
    }

    setCart((prevCart) => {
      // البحث عن المنتج إذا كان موجودًا بالسلة
      const existingItem = prevCart.find((item) => item.id === product.id);
      
      // إذا كان المنتج موجودًا بالفعل
      if (existingItem) {
        // التحقق من عدم تجاوز الكمية للمخزون المتاح
        if (existingItem.quantity >= product.stock) {
          alert('وصلت للحد الأقصى للمخزون المتاح لهذا المنتج');
          return prevCart;
        }
        // زيادة الكمية إذا كان متاحًا
        return prevCart.map((item) => 
          item.id === product.id 
            ? { ...item, quantity: item.quantity + 1 } 
            : item
        );
      }
      // إذا كان المنتج جديدًا، إضافته للسلة
      return [...prevCart, { ...product, quantity: 1 }];
    });
  };

  /**
   * دالة إزالة منتج من السلة
   * @param {number} productId - أي دي المنتج المراد إزالته
   */
  const removeFromCart = (productId) => {
    setCart((prevCart) => prevCart.filter((item) => item.id !== productId));
  };

  /**
   * دالة تحديث كمية المنتج
   * @param {number} productId - أي دي المنتج
   * @param {number} newQuantity - الكمية الجديدة
   */
  const updateQuantity = (productId, newQuantity) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === productId) {
          const product = prevCart.find(p => p.id === productId);
          // التحقق من عدم تجاوز الكمية للمخزون
          if (newQuantity > product.stock) {
            alert('الكمية المطلوبة تتجاوز المخزون المتاح');
            return item;
          }
          // تحديث الكمية
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  // دالة حساب المجموع الكلي للسلة
  const calculateTotal = () => {
    return cart.reduce((total, item) => 
      total + (item.finalPrice || item.price) * item.quantity, 0);
  };

  // القيم المتاحة لكل المكونات الأطفال
  const value = {
    cart,
    addToCart,
    removeFromCart,
    updateQuantity,
    calculateTotal,
    // معلومات إضافية يمكن إضافتها لاحقًا
    cartCount: cart.reduce((count, item) => count + item.quantity, 0),
    isCartEmpty: cart.length === 0
  };

  return (
    <CartContext.Provider value={value}>
      {children}
    </CartContext.Provider>
  );
};

// هوك لاستخدام الكونتكست في المكونات
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error('useCart must be used within a CartProvider');
  }
  return context;
};