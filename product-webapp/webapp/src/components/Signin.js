import { useForm } from "react-hook-form";
import { IoCarSportOutline } from 'react-icons/io5';
import { AiOutlineEye, AiOutlineEyeInvisible } from 'react-icons/ai';
import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import profilePng from '../assests/images/profile.png';
import vectorCar from '../assests/images/profileCars.png';
import { loginUsers } from '../services/SignInAPI';
import { useDispatch } from "react-redux";
import { setAuthToken, fetchUsers, setUserType } from "../store/actions";
import { useLocation, useNavigate } from "react-router-dom";
import PreLoader from "../preloader";
import Tostify from "./Tostify";



export default function SignIn() {
    document.body.style.backgroundColor = "#F1F3F6";
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const propsData = location.state ? location.state : false;
    const [passType, setPassType] = useState('password');
    const [iconVisible, setVisible] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [showLoader, setLoader] = useState(false);

    const { register, handleSubmit, formState: { errors } } = useForm();

    useEffect(() => {
        localStorage.clear();
    }, [])
    const onSubmit = data => {
        loginUsers(data).then(response => {
            if (response.isSuccess) {
                const role = (response.data.role).toLowerCase();
                dispatch(setAuthToken(response.data.token));
                dispatch(setUserType(role));
                dispatch(fetchUsers(data.emailId));
                setLoader(true);
                setTimeout(function () {
                    setLoader(false);
                    role && role === 'client' ?
                        propsData ? navigate(propsData) : navigate("/") :
                        navigate('/Vendordashboard');
                }, 1000);
            }
            else {
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
            {showerror &&
                <Tostify message="Email and password doesn't match" type="error" />
            }
            <div className="container mt-5 bg-light">
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
                            <img src={vectorCar} className="rounded mx-auto d-block mt-5" width={500} height={300} alt="Profile" />
                        </div>
                    </div>
                </section>
            </>
        )
    }


    function signinUi() {
        return (
            <>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <div className='card-transparent mt-5'>
                        <img src={profilePng} className="rounded mx-auto d-block mt-5" width="150" height="150" alt="Profile" />
                        <div className='card-body'>
                            <div className="d-flex justify-content-center mt-3  fs-4">
                                <span className="card-title fw-bold">Welcome to C<IoCarSportOutline />Rentz </span>
                            </div>
                            <div className="d-flex justify-content-center fs-4 mb-4">
                                <span className="card-title fw-normal">Login </span>
                            </div>
                            <div className="row justify-content-center">

                                <div className="col-md-10">
                                    <div className="form-outline m-3 mb-2">
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
                                <div className="col-md-10">
                                    <div className="d-flex justify-content-end fs-6 mb-1">
                                        <Link to="/ForgotPassword"><span className="fw-normal text-decoration-underline text-secondary">Forgot Password?</span></Link>
                                    </div>
                                </div>
                            </div>

                            <div className="d-grid gap-2 mb-2  d-md-flex justify-content-md-center btn-gps">
                                <input className="btn btn-warning btn-lg" type="submit" value="Login" />
                            </div>
                            <div className="d-flex justify-content-center fs-6 mb-4">
                                <span className="fw-normal">New User ? <Link to="/SignUp" className="text-decoration-underline text-primary">Create new account </Link></span>
                            </div>




                        </div>
                    </div>
                </form>
            </>
        )
    }
}