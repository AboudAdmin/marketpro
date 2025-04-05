import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';

const Account = () => {
    const navigate = useNavigate();
    
    // State for forms
    const [loginData, setLoginData] = useState({
        email: '',
        password: '',
        remember: false
    });

    const [registerData, setRegisterData] = useState({
        name: '',
        email: '',
        password: '',
        phone: '',
        adresse: '',
        role: 'client' // القيمة الافتراضية
    });

    const [message, setMessage] = useState({
        text: '',
        type: ''
    });

    // Handlers
    const handleLoginChange = (e) => {
        const { name, value, type, checked } = e.target;
        setLoginData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleRegisterChange = (e) => {
        const { name, value } = e.target;
        setRegisterData(prev => ({
            ...prev,
            [name]: value
        }));
    };

    const resetRegisterForm = () => {
        setRegisterData({
            name: '',
            email: '',
            password: '',
            phone: '',
            adresse: '',
            role: 'client'
        });
    };

    const handleLogin = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:5000/api/auth/connexion', {
                email: loginData.email,
                password: loginData.password
            });

            setMessage({ text: 'تم تسجيل الدخول بنجاح', type: 'success' });
            
            // حفظ بيانات المستخدم في localStorage
            localStorage.setItem('user', JSON.stringify(response.data));
            console.log('User data:', response.data);
            
            // توجيه المستخدم إلى الصفحة الرئيسية بعد 2 ثانية
             setTimeout(() => {
                 navigate('/index-two');
             }, 2000);

        } catch (error) {
            setMessage({ 
                text: error.response?.data?.error || 'فشل تسجيل الدخول: البريد الإلكتروني أو كلمة المرور غير صحيحة',
                type: 'error' 
            });
        }
    };

    const handleRegister = async (e) => {
        e.preventDefault();
        try {
            // التحقق من صحة البيانات
            if (!registerData.email.includes('@')) {
                throw new Error('البريد الإلكتروني غير صالح');
            }

            if (registerData.password.length < 6) {
                throw new Error('كلمة المرور يجب أن تكون 6 أحرف على الأقل');
            }

            if (!registerData.phone) {
                throw new Error('رقم الهاتف مطلوب');
            }

            const response = await axios.post('http://localhost:5000/api/auth/inscription', {
                name: registerData.name,
                email: registerData.email,
                password: registerData.password,
                phone: registerData.phone,
                adresse: registerData.adresse,
                role: registerData.role
            });

            setMessage({ text: 'تم التسجيل بنجاح', type: 'success' });
            
            // تعبئة بيانات تسجيل الدخول تلقائياً
            setLoginData({
                email: registerData.email,
                password: registerData.password,
                remember: false
            });
            
            resetRegisterForm();

        } catch (error) {
            setMessage({ 
                text: error.response?.data?.error || error.message || 'حدث خطأ أثناء التسجيل',
                type: 'error' 
            });
        }
    };

    return (
        <section className="account py-80">
            <div className="container container-lg">
                {message.text && (
                    <div className={`alert alert-${message.type === 'success' ? 'success' : 'danger'}`}>
                        {message.text}
                    </div>
                )}

                <div className="row gy-4">
                    {/* Login Form */}
                    <div className="col-xl-6 pe-xl-5">
                        <form onSubmit={handleLogin}>
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40 h-100">
                                <h6 className="text-xl mb-32">تسجيل الدخول</h6>
                                
                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        البريد الإلكتروني<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="common-input"
                                        value={loginData.email}
                                        onChange={handleLoginChange}
                                        required
                                    />
                                </div>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        كلمة المرور<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="common-input"
                                        value={loginData.password}
                                        onChange={handleLoginChange}
                                        required
                                    />
                                </div>

                                <div className="mb-24 d-flex align-items-center">
                                    <input
                                        type="checkbox"
                                        name="remember"
                                        id="remember"
                                        checked={loginData.remember}
                                        onChange={handleLoginChange}
                                    />
                                    <label htmlFor="remember" className="ms-8">
                                        تذكرني
                                    </label>
                                </div>

                                <div className="mb-24 mt-48">
                                    <button type="submit" className="btn btn-main py-18 px-40 w-100">
                                        تسجيل الدخول
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>

                    {/* Register Form */}
                    <div className="col-xl-6">
                        <form onSubmit={handleRegister}>
                            <div className="border border-gray-100 hover-border-main-600 transition-1 rounded-16 px-24 py-40">
                                <h6 className="text-xl mb-32">إنشاء حساب جديد</h6>
                                
                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        الاسم الكامل<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="text"
                                        name="name"
                                        className="common-input"
                                        value={registerData.name}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        البريد الإلكتروني<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="email"
                                        name="email"
                                        className="common-input"
                                        value={registerData.email}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        كلمة المرور (6 أحرف على الأقل)<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="password"
                                        name="password"
                                        className="common-input"
                                        value={registerData.password}
                                        onChange={handleRegisterChange}
                                        minLength="6"
                                        required
                                    />
                                </div>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        رقم الهاتف<span className="text-danger">*</span>
                                    </label>
                                    <input
                                        type="tel"
                                        name="phone"
                                        className="common-input"
                                        value={registerData.phone}
                                        onChange={handleRegisterChange}
                                        required
                                    />
                                </div>

                                <div className="mb-24">
                                    <label className="text-neutral-900 text-lg mb-8 fw-medium">
                                        العنوان
                                    </label>
                                    <input
                                        type="text"
                                        name="adresse"
                                        className="common-input"
                                        value={registerData.adresse}
                                        onChange={handleRegisterChange}
                                    />
                                </div>

                                <div className="mt-48">
                                    <button type="submit" className="btn btn-main py-18 px-40 w-100">
                                        إنشاء حساب
                                    </button>
                                </div>
                            </div>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    );
};

export default Account;