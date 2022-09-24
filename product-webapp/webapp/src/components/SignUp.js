/* eslint-disable no-cond-assign */
import { useForm } from "react-hook-form";
import { IoCarSportOutline } from 'react-icons/io5';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import profilePng from '../assests/images/profile.png';
import vectorCar from '../assests/images/profileCars.png';
import { registerUsers } from '../services/SignUpAPI';
import Tostify from "./Tostify";
import { SendOtp, VerifyOtp } from '../services/AuthenticationAPI'
import PreLoader from "../preloader";

export default function SignUp() {
    document.body.style.backgroundColor = "#F1F3F6";
    const navigate = useNavigate();
    const [passType, setPassType] = useState('password');
    const [iconVisible, setVisible] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [errormsg, setErrormsg] = useState("");
    const [showLoader, setLoader] = useState(false);
    const [otpSuccess, setOtpSuccess] = useState(false);
    const [userEmail, setUserEmail] = useState("");
    const [showEmailView, setEmailView] = useState(true);
    const [showOtpView, setOtpView] = useState(false);
    const [showRegistrationView, setRegistrationView] = useState(false);
    const [otpFailure, setOtpFailure] = useState(false);



    const { register, handleSubmit, formState: { errors } } = useForm();

    const submitMail = data => {
        setLoader(true);
        SendOtp(data.emailId).then(response => {
            if (response.isSuccess) {
                setLoader(false);
                setUserEmail(data.emailId);
                setEmailView(false);
                setOtpView(true);
                setRegistrationView(false);
            }
            else {
                setLoader(false)
                alert("error")
            }
        })
    };
    const submitOTP = data => {
        data.emailId = userEmail;
        VerifyOtp(data).then(response => {
            if (response.isSuccess) {
                setOtpSuccess(true);
                setTimeout(function () {
                    setEmailView(false);
                    setOtpView(false);
                    setRegistrationView(true);

                    setOtpSuccess(false);
                }, 2000)
            }
            else {
                setOtpFailure(true);
                setTimeout(function () {
                    setOtpFailure(false);
                }, 4000)
            }
        })
    }

    const onSubmit = data => {
        registerUsers(data).then(response => {
            if (response.isSuccess) {
                setShowSuccess(true);
                setTimeout(function () {
                    setShowSuccess(false);
                    navigate('/Signin');

                }, 4000);

            }
            else {
                setErrormsg(response.data.response.data ? response.data.response.data : "Something went wrong please try again later!!...")
                setShowError(true);
                setTimeout(function () {
                    setShowError(false);
                }, 4000);
            }
        })
    };

    const showPassword = () => {

        setPassType(passType === 'password' ? 'text' : 'password');
        setVisible(!iconVisible)

    }
    return (
        <>
            {showerror && <Tostify message={errormsg} type="error" />}
            {showSuccess && <Tostify message="Registration Success" type="success" />}
            {otpSuccess && <Tostify message="OTP verified!!!" type="success" />}
            {otpFailure && <Tostify message="Please enter valid OTP" type="error" />}
            <div className="container mt-2 bg-light">
                <div className="row">
                    <div className="col-md-6 col-12 login-leftView">
                        {leftPart()}
                    </div>
                    <div className='col-md-6 col-12' style={{ backgroundColor: "#ffffff" }}>
                        {signinUi()}
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
                            <h1 className="fw-bold display-1">C<IoCarSportOutline />Rentz</h1>
                            <img src={vectorCar} className="rounded mx-auto d-block mt-5" width={400} height={200} alt="Profile" />
                        </div>
                    </div>
                </section>
            </>
        )
    }


    function signinUi() {
        return (
            <>
                <div className='card-transparent mt-5'>
                    <img src={profilePng} className="rounded mx-auto d-block mt-3" width="150" height="150" alt="Profile" />
                    <div className='card-body'>
                        <div className="d-flex justify-content-center mt-3  fs-4">
                            <span className="card-title fw-bold">Welcome to C<IoCarSportOutline />Rentz </span>
                        </div>
                        <div className="d-flex justify-content-center fs-4 mb-4">
                            <span className="card-title fw-normal">Register </span>
                        </div>
                        {showEmailView && getEmail()}
                        {showOtpView && getOtp()}
                        {showRegistrationView && registration()}
                        <div className="d-flex justify-content-center fs-6 mb-4">
                            <span className="fw-normal">Already registered ? <Link to="/SignIn" className="text-decoration-underline text-primary">SignIn </Link></span>
                        </div>

                    </div>


                </div>

            </>
        )
    }

    function getEmail() {
        return (
            <>
                <form onSubmit={handleSubmit(submitMail)}>
                    <div className="form-outline m-3 mb-3">
                        <label className="fs-6 fw-bold mb-2">Email <span className="text-danger"> * </span></label>
                        <input type="text" className="form-control  form-control-lg"
                            placeholder="Enter email id...."
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
                        <input className="btn btn-warning btn-lg" type="submit" value="Continue" />
                    </div>
                </form>
            </>
        )
    }

    function getOtp() {
        return (
            <>
                <form onSubmit={handleSubmit(submitOTP)}>
                    <div className="form-outline m-3 mb-3">
                        <div className="d-flex justify-content-center mt-3  fs-4">
                            <span className="card-title fw-bold">Verification required</span>
                        </div>
                        <div className="d-flex justify-content-center  fs-5 ">
                            <span className="card-title fw-light"> We've sent an OTP to the email <b>{userEmail}</b></span>
                        </div>
                        <div className="form-outline m-3 mb-4">
                            <label className="fs-6 fw-bold mb-2">Enter OTP</label>
                            <input type="number" className="form-control  form-control-lg"
                                placeholder="Enter OTP...."
                                id="otp"
                                aria-invalid={errors.otp ? "true" : "false"}
                                {...register('otp', { required: true })}
                            />
                            {errors.otp && (
                                <span role="alert" className="text-danger">
                                    This feild is required
                                </span>
                            )}
                        </div>
                    </div>
                    <div className="d-grid gap-2 mb-2  d-md-flex justify-content-md-center btn-gps">
                        <input className="btn btn-warning btn-lg" type="submit" value="verify OTP" />
                    </div>
                </form>
            </>
        )
    }

    function registration() {
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="d-flex justify-content-center fs-4 mb-2">
                        <div className="btn-group btn-group-lg ms-5" role="group" aria-label="Basic radio toggle button group">
                            <input type="radio" className="btn-check" name="btnradio" id="User" value="client" {...register('type', { required: true })} />
                            <label className="btn btn-outline-secondary" htmlFor="User">client</label>

                            <input type="radio" className="btn-check" name="btnradio" id="Vendor" value="vendor" {...register('type', { required: true })} />
                            <label className="btn btn-outline-secondary" htmlFor="Vendor">Vendor</label>
                            {errors.type && (<span role="alert" className="fs-5 ms-3 fw-normal text-danger"> Select type</span>)}

                        </div>

                    </div>
                    <div className="row justify-content-center">
                        <div className="col-md-10">
                            <div className="form-outline m-3 mb-2">
                                <label className="fs-6 fw-bold mb-2">Name <span className="text-danger"> * </span></label>
                                <input type="text" className="form-control  form-control-lg"
                                    placeholder="Enter Name..."
                                    id="name"
                                    aria-invalid={errors.name ? "true" : "false"}
                                    {...register('name', { required: true, minLength: { value: 3 } })}
                                />
                                {errors.name && (
                                    <span role="alert" className="text-danger">
                                        Enter Valid name
                                    </span>
                                )}
                            </div>

                        </div>

                        <div className="col-md-10">
                            <div className="form-outline m-3 mb-2">
                                <label className="fs-6 fw-bold mb-2">Email <span className="text-danger"> * </span></label>
                                <input type="text" className="form-control  form-control-lg"
                                    placeholder="Enter email id...."
                                    id="emailId"
                                    value={userEmail}
                                    disabled
                                    aria-invalid={errors.emailId ? "true" : "false"}
                                    {...register('emailId', { required: true, pattern: { value: /^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}$/i } })}
                                />
                                {errors.emailId && (
                                    <span role="alert" className="text-danger">
                                        Enter valid email address
                                    </span>
                                )}
                            </div>

                        </div>
                        <div className="col-md-10">
                            <div className="form-outline m-3 mb-2">
                                <label className="fs-6 fw-bold mb-2">Mobile Number <span className="text-danger"> * </span></label>
                                <input type="text" className="form-control  form-control-lg"
                                    placeholder="Enter Mobile number..."
                                    id="mobileNumber"
                                    aria-invalid={errors.mobileNumber ? "true" : "false"}
                                    {...register('mobileNumber', {
                                        required: true, pattern: { value: /^[0-9]+$/i }, minLength: {
                                            value: 8
                                        }
                                    })}
                                />
                                {errors.mobileNumber && (
                                    <span role="alert" className="text-danger">
                                        Enter valid Mobile number
                                    </span>
                                )}
                            </div>

                        </div>
                        <div className="col-md-10">
                            <div className="form-outline m-3">
                                <label className="fs-6 fw-bold mb-2">Password <span className="text-danger"> * </span></label>
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

                        </div>
                    </div>

                    <div className="d-grid gap-2 mb-2  d-md-flex justify-content-md-center btn-gps">
                        <input className="btn btn-warning btn-lg" type="submit" value="SignUp" />
                    </div>

                </form>
            </>
        )
    }
}