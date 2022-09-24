import { useForm } from "react-hook-form";
import { IoCarSportOutline } from 'react-icons/io5';
import vectorCar from '../assests/images/profileCars.png';
import { Link } from "react-router-dom";
import { useNavigate, useLocation } from "react-router-dom";
import { useState } from "react";
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { SendOtp } from '../services/AuthenticationAPI'
import PreLoader from "../preloader";
import { ForgotPasswordAPI } from '../services/ForgotPasswordAPI';
import Tostify from "./Tostify";


export default function ForgotPassword() {
    document.body.style.backgroundColor = "#F1F3F6";
    const navigate = useNavigate();
    const location = useLocation();
    var propsData = location.state ? location.state : false;
    const [passType, setPassType] = useState('password');
    const [iconVisible, setVisible] = useState(false);
    const [showLoader, setLoader] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false)



    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitMail = data => {
        setLoader(true);
        SendOtp(data.emailId).then(response => {
            if (response.isSuccess) {
                setLoader(false);
                navigate('/otpAuth', { state: { data: data, rePath: "/ForgotPassword", from: "forgotpassword" } });
            }
            else {
                setLoader(false);
            }
        })
    };

    const updatePassword = data => {
        data.emailId = propsData.emailId
        ForgotPasswordAPI(data).then(response => {
            if (response.isSuccess) {
                setShowSuccess(true);
                setLoader(true);
                setInterval(function () {
                    setShowSuccess(false);
                    setLoader(false);
                    navigate('/Signin');
                }, 2000)

            }
            else {
                setShowError(true);
                setInterval(function () {
                    setShowError(false)
                }, 4000)
            }
        })
    }

    const showPassword = () => {

        setPassType(passType === 'password' ? 'text' : 'password');
        setVisible(!iconVisible)

    }

    return (
        <>
            {showSuccess && 
            <Tostify  message="Update Successfully" type="success"/>
            }
            {showerror &&
                <Tostify type="error" />
            }
            <div className="container mt-5 bg-light">
                <div className="row">
                    <div className="col-md-6 col-12 login-leftView">
                        {leftPart()}
                    </div>
                    <div className='col-md-6 col-12' style={{ backgroundColor: "#ffffff" }}>
                        {propsData ? newPasswordUi() : enterMailUi()}
                    </div>
                </div>
            </div>

            {showLoader && <PreLoader />}
        </>
    )

    function leftPart() {
        return (
            <>
                <section className="p-5 text-center container mt-5 ">
                    <div className="row py-lg-5 ">
                        <div className="col-lg-12 col-md-8 mx-auto mt-5">
                            <h1 className="fw-bold display-3">C<IoCarSportOutline />Rentz</h1>
                            <img src={vectorCar} className="rounded mx-auto d-block mt-5" width={300} height={100} alt="Profile" />
                        </div>
                    </div>
                </section>
            </>
        )
    }
    function enterMailUi() {
        return (
            <>
                <form onSubmit={handleSubmit(submitMail)}>
                    <div className='card-transparent mt-5'>
                        <div className="card-body">
                            <div className="d-flex justify-content-center mt-5  fs-4">
                                <span className="card-title fw-bold">C<IoCarSportOutline />Rentz </span>
                            </div>
                            <div className="form-outline m-3 mb-3">
                                <label className="fs-4 fw-bold mb-2">Forgot your password? </label>
                                <input type="text" className="form-control  form-control-lg"
                                    placeholder="Enter email used to setup your account"
                                    id="emailId"
                                    aria-invalid={errors.emailId ? "true" : "false"}
                                    {...register('emailId', { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })}
                                />
                                {errors.emailId && (
                                    <span role="alert" className="text-danger">
                                        Enter valid email address
                                    </span>
                                )}
                            </div>
                            <div className="d-grid gap-2 mb-2  d-md-flex justify-content-md-center btn-gps">
                                <input className="btn btn-warning btn-lg" type="submit" value="Get OTP" />
                            </div>
                            <div className="d-flex justify-content-center fs-6 mb-4">
                                <span className="fw-normal">Return to <Link to="/Signin" className="text-decoration-underline text-primary">SignIn </Link></span>
                            </div>
                        </div>
                    </div>

                </form>
            </>
        )
    }

    function newPasswordUi() {
        return (
            <>
                <form onSubmit={handleSubmit(updatePassword)}>
                    <div className='card-transparent mt-5'>
                        <div className="card-body">
                            <div className="d-flex justify-content-center mt-5  fs-4">
                                <span className="card-title fw-bold">C<IoCarSportOutline />Rentz </span>
                            </div>
                            <div className="form-outline m-3">
                                <label className="fs-6 fw-bold mb-2">Enter new password <span className="text-danger"> * </span></label>
                                <div className="input-group mb-3">
                                    <input type={passType} className="form-control password form-control-lg"
                                        placeholder="Enter Password...."
                                        id="password"
                                        name="password"
                                        aria-invalid={errors.password ? "true" : "false"}
                                        {...register('password', {
                                            required: true, minLength: {
                                                value: 8
                                            }
                                        })}
                                    />
                                    <div className="input-group-append">
                                        <span className="form-control form-control-lg border-right-0 bg-white" onClick={showPassword} >
                                            {iconVisible ? <AiOutlineEye /> : <AiOutlineEyeInvisible />}
                                        </span>
                                    </div>


                                </div>
                                {errors.password && (
                                    <span role="alert" className="text-danger">
                                        Password must have at least 8 characters
                                    </span>
                                )}
                            </div>
                            <div className="d-grid gap-2 mb-2  d-md-flex justify-content-md-center btn-gps">
                                <input className="btn btn-warning btn-lg" type="submit" value="Update" />
                            </div>
                        </div>
                    </div>

                </form>
            </>
        )
    }
}