import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { useCart } from '../context/CartContext';

const Checkout = () => {
    const [selectedPayment, setSelectedPayment] = useState("payment1");
    const [loading, setLoading] = useState(false);
    const { cart, calculateTotals, clearCart } = useCart();

    const [error, setError] = useState(null);
    const [cartItems, setCartItems] = useState([]);
    const [total, setTotal] = useState(0);
    const navigate = useNavigate();

    console.log(cart);


    const formik = useFormik({
        initialValues: {
            fullName: '',
            email: '',
            phone: '',
            country: '',
            city: '',
            address: '',
            postalCode: ''
        },
        validationSchema: Yup.object({
            fullName: Yup.string().required('Full name is required'),
            email: Yup.string().email('Invalid email').required('Required'),
            phone: Yup.string().required('Phone number is required'),
            country: Yup.string().required('Country is required'),
            city: Yup.string().required('City is required'),
            address: Yup.string().required('Address is required'),
            postalCode: Yup.string().required('Postal code is required'),
        }),
        onSubmit: async (values) => {
            try {
                setLoading(true);
                
                const orderData = {
                    userID: 1, // يجب استبدالها بالقيمة الفعلية للمستخدم
                    fullName: values.fullName,
                    email: values.email,
                    phone: values.phone,
                    country: values.country,
                    city: values.city,
                    address: values.address,
                    postalCode: values.postalCode,
                    total: total,
                    items: cart,
                    status: 'en attente',
                    paymentMethod: selectedPayment === 'payment1' ? 'bank_transfer' : 
                                  selectedPayment === 'payment2' ? 'check' : 'cash_on_delivery'
                };
                console.log(orderData);

                const response = await fetch("http://localhost:5000/api/orders", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify(orderData)
                });

                if (!response.ok) throw new Error("Order creation failed");
                
                 navigate('/order-confirmation');
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
    });

    const handlePaymentChange = (event) => {
        setSelectedPayment(event.target.id);
    };

    return (
        <section className="checkout py-80">
            <div className="container container-lg">
                {error && <div className="mb-24 p-16 bg-red-100 text-red-700 rounded-8">{error}</div>}
                
                <form onSubmit={formik.handleSubmit}>
                    <div className="row">
                        <div className="col-xl-9 col-lg-8">
                            <div className="pe-xl-5">
                                <div className="row gy-3">
                                    {/* Full Name */}
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="common-input border-gray-100"
                                            placeholder="Full Name"
                                            {...formik.getFieldProps('fullName')}
                                        />
                                        {formik.touched.fullName && formik.errors.fullName && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.fullName}</div>
                                        )}
                                    </div>

                                    {/* Email */}
                                    <div className="col-12">
                                        <input
                                            type="email"
                                            className="common-input border-gray-100"
                                            placeholder="Email Address"
                                            {...formik.getFieldProps('email')}
                                        />
                                        {formik.touched.email && formik.errors.email && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.email}</div>
                                        )}
                                    </div>

                                    {/* Phone */}
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="common-input border-gray-100"
                                            placeholder="Phone Number"
                                            {...formik.getFieldProps('phone')}
                                        />
                                        {formik.touched.phone && formik.errors.phone && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.phone}</div>
                                        )}
                                    </div>

                                    {/* Country */}
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="common-input border-gray-100"
                                            placeholder="Country"
                                            {...formik.getFieldProps('country')}
                                        />
                                        {formik.touched.country && formik.errors.country && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.country}</div>
                                        )}
                                    </div>

                                    {/* City */}
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="common-input border-gray-100"
                                            placeholder="City"
                                            {...formik.getFieldProps('city')}
                                        />
                                        {formik.touched.city && formik.errors.city && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.city}</div>
                                        )}
                                    </div>

                                    {/* Address */}
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="common-input border-gray-100"
                                            placeholder="Full Address"
                                            {...formik.getFieldProps('address')}
                                        />
                                        {formik.touched.address && formik.errors.address && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.address}</div>
                                        )}
                                    </div>

                                    {/* Postal Code */}
                                    <div className="col-12">
                                        <input
                                            type="text"
                                            className="common-input border-gray-100"
                                            placeholder="Postal Code"
                                            {...formik.getFieldProps('postalCode')}
                                        />
                                        {formik.touched.postalCode && formik.errors.postalCode && (
                                            <div className="text-red-500 text-sm mt-1">{formik.errors.postalCode}</div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary Sidebar */}
                        <div className="col-xl-3 col-lg-4">
                            <div className="checkout-sidebar">
                                {/* ... (keep your existing order summary code) ... */}
                                
                                <button
                                    type="submit"
                                    className="btn btn-main mt-40 py-18 w-100 rounded-8 mt-56"
                                    disabled={loading}
                                >
                                    {loading ? 'Processing...' : 'Place Order'}
                                </button>
                            </div>
                        </div>
                    </div>
                </form>
            </div>
        </section>
    );
};

export default Checkout;