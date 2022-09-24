import { useState } from "react";
import { useForm } from "react-hook-form";
import { useLocation, useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import Tostify from "./Tostify";
import { VerifyOtp } from '../services/AuthenticationAPI'

export default function TwoFactorAuth() {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const location = useLocation();
    const navigate = useNavigate();
    const [otpSuccess, setOtpSuccess] = useState(false);
    const [otpFailure, setOtpFailure] = useState(false);
    var propsData = location.state ? location.state : false;


    const onSubmit = data => {
        document.body.style.backgroundColor = "#F1F3F6";
        data.emailId = propsData.data.emailId;
        VerifyOtp(data).then(response => {
            if(response.isSuccess) {
                setOtpSuccess(true);
                setTimeout(function () {
                    navigate(propsData.rePath, {state:propsData.data})
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

    return (
        <>
            {propsData.data.emailId? OTPpage() : <PageNotFound /> }
        </>
    )

    function OTPpage() {
        return (
            <>
                {otpSuccess && <Tostify message="OTP verified!!!" type="success" />}
                {otpFailure && <Tostify message="Please enter valid OTP" type="error" />}
                <form onSubmit={handleSubmit(onSubmit)}>
                    <section className="p-5  container mt-5 ">
                        <div className="row py-lg-5 ">
                            <div className="col-lg-6 col-md-8 mx-auto mt-5">
                                <div className="card">
                                    <div className="card-body">
                                        <div className="d-flex justify-content-center mt-3  fs-4">
                                            <span className="card-title fw-bold">Verification required</span>
                                        </div>
                                        <div className="d-flex justify-content-center  fs-5 ">
                                            <span className="card-title fw-light"> We've sent an OTP to the email <b>{propsData.data.emailId}</b></span>
                                        </div>
                                        <div className="form-outline m-3 mb-4">
                                            <label className="fs-6 fw-bold mb-2">Enter OTP</label>
                                            <input type="number" className="form-control  form-control-lg"
                                                placeholder="Enter OTP...."
                                                id="otp"
                                                aria-invalid={errors.otp ? "true" : "false"}
                                                {...register('otp', { required: true})}
                                            />
                                            {errors.otp && (
                                                <span role="alert" className="text-danger">
                                                    This feild is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="d-grid gap-2 mb-2  d-md-flex justify-content-md-center btn-gps">
                                            <input className="btn btn-warning btn-lg" type="submit" value="Continue" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                </form>
            </>
        )
    }
}