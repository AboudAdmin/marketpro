import React from 'react';
import { Link } from 'react-router-dom';
import { useCart } from '../context/CartContext';
import QuantityControl from '../helper/QuantityControl';

const CartSection = () => {
  const { cart, removeFromCart, updateQuantity } = useCart();

  // حساب الإجمالي الفرعي
  const subtotal = cart.reduce(
    (total, item) => total + (item.price * item.quantity),
    0
  );

  // حساب الضريبة (افتراضي 10%)
  const tax = subtotal * 0.1;

  // حساب الإجمالي النهائي
  const total = subtotal + tax;

  return (
    <section className="cart py-80">
      <div className="container container-lg">
        <div className="row gy-4">
          <div className="col-xl-9 col-lg-8">
            <div className="cart-table border border-gray-100 rounded-8 px-40 py-48">
              {cart.length === 0 ? (
                <div className="text-center py-40">
                  <h4>سلة التسوق فارغة</h4>
                  <Link to="/shop" className="btn btn-main mt-20">
                    العودة للتسوق
                  </Link>
                </div>
              ) : (
                <>
                  <div className="overflow-x-auto scroll-sm scroll-sm-horizontal">
                    <table className="table style-three">
                      <thead>
                        <tr>
                          <th className="h6 mb-0 text-lg fw-bold">حذف</th>
                          <th className="h6 mb-0 text-lg fw-bold">اسم المنتج</th>
                          <th className="h6 mb-0 text-lg fw-bold">السعر</th>
                          <th className="h6 mb-0 text-lg fw-bold">الكمية</th>
                          <th className="h6 mb-0 text-lg fw-bold">المجموع</th>
                        </tr>
                      </thead>
                      <tbody>
                        {cart.map((item) => (
                          <tr key={item.id}>
                            <td>
                              <button
                                type="button"
                                className="remove-tr-btn flex-align gap-12 hover-text-danger-600"
                                onClick={() => removeFromCart(item.id)}
                              >
                                <i className="ph ph-x-circle text-2xl d-flex" />
                                إزالة
                              </button>
                            </td>
                            <td>
                              <div className="table-product d-flex align-items-center gap-24">
                                <Link
                                  to={`/product-details/${item.id}`}
                                  className="table-product__thumb border border-gray-100 rounded-8 flex-center"
                                >
                                  <img
                                    src={`http://localhost:5000/upload/${item.image}`}
                                    alt={item.name}
                                    style={{ width: '80px', height: '80px', objectFit: 'cover' }}
                                  />
                                </Link>
                                <div className="table-product__content text-start">
                                  <h6 className="title text-lg fw-semibold mb-8">
                                    <Link
                                      to={`/product-details/${item.id}`}
                                      className="link text-line-2"
                                    >
                                      {item.name}
                                    </Link>
                                  </h6>
                                </div>
                              </div>
                            </td>
                            <td>
                              <span className="text-lg h6 mb-0 fw-semibold">
                                {item.price} ر.س
                              </span>
                            </td>
                            <td>
                              <QuantityControl
                                initialQuantity={item.quantity}
                                onQuantityChange={(newQuantity) =>
                                  updateQuantity(item.id, newQuantity)
                                }
                              />
                            </td>
                            <td>
                              <span className="text-lg h6 mb-0 fw-semibold">
                                {(item.price * item.quantity).toFixed(2)} ر.س
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                  <div className="flex-between flex-wrap gap-16 mt-16">
                    <div className="flex-align gap-16">
                      <input
                        type="text"
                        className="common-input"
                        placeholder="كود الخصم"
                      />
                      <button
                        type="submit"
                        className="btn btn-main py-18 w-100 rounded-8"
                      >
                        تطبيق الخصم
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>

          {cart.length > 0 && (
            <div className="col-xl-3 col-lg-4">
              <div className="cart-sidebar border border-gray-100 rounded-8 px-24 py-40">
                <h6 className="text-xl mb-32">إجمالي السلة</h6>
                <div className="bg-color-three rounded-8 p-24">
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two">المجموع الفرعي</span>
                    <span className="text-gray-900 fw-semibold">
                      {subtotal.toFixed(2)} ر.س
                    </span>
                  </div>
                  <div className="mb-32 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two">التوصيل</span>
                    <span className="text-gray-900 fw-semibold">مجاني</span>
                  </div>
                  <div className="mb-0 flex-between gap-8">
                    <span className="text-gray-900 font-heading-two">الضريبة</span>
                    <span className="text-gray-900 fw-semibold">
                      {tax.toFixed(2)} ر.س
                    </span>
                  </div>
                </div>
                <div className="bg-color-three rounded-8 p-24 mt-24">
                  <div className="flex-between gap-8">
                    <span className="text-gray-900 text-xl fw-semibold">الإجمالي النهائي</span>
                    <span className="text-gray-900 text-xl fw-semibold">
                      {total.toFixed(2)} ر.س
                    </span>
                  </div>
                </div>
                <Link
                  to="/checkout"
                  className="btn btn-main mt-40 py-18 w-100 rounded-8"
                >
                  إتمام الشراء
                </Link>
              </div>
            </div>
          )}
        </div>
      </div>
    </section>
  );
};

export default CartSection;