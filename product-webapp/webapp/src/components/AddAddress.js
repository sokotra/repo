import { useForm } from "react-hook-form";
import { useNavigate, useLocation } from "react-router-dom";
import { fetchUsers } from "../store/actions";
import { editDetails } from '../services/MyProfileAPI';
import { useDispatch } from "react-redux";
import { useState } from "react";
import PreLoader from "../preloader";
import PageNotFound from "./PageNotFound";




export default function AddAddress() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const location = useLocation();
    var propsData = location.state ? location.state : false;
    const [showLoader, setLoader] = useState(false);
    const [showerror, setShowError] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();

    const updateAddress = async (data) => {
       const uploadDetails = {
            emailId : propsData.userInfo.emailId,
            address: data
        }
        editDetails(uploadDetails).then(res => {
            if (res.isSuccess) {
                dispatch(fetchUsers(propsData.userInfo.emailId))
                setLoader(true);
                        setTimeout(function () {
                            setLoader(false);
                            navigate(propsData.rePath);
                        }, 1000);
            }
            else {
                setShowError(true);
                setTimeout(function () {
                    setShowError(false);
                }, 4000);
            }
        });
    }
    return (
        <>
        {showerror ?
                    <div className="alert alert-danger text-center" role="alert">
                        Something wrong please try again later!!!
                    </div> : <></>
                }
        {propsData ? 
                <div className="container h-75">
                    <div className="row justify-content-center align-items-center h-100">
                        <div className="col-md-5 mt-5">
                            <div className="card border-2">
                                <div className="card-body ">
                                    <div className="d-flex justify-content-center  fs-4">
                                        <span className="card-title fw-bold">Hi! {propsData.userInfo.name}</span>
                                    </div>
                                    <div className="d-flex justify-content-center  fs-4">
                                        <div className="fs-6 text-secondary">Please update your address and proceed next.</div>
                                    </div>
                                    <form onSubmit={handleSubmit(updateAddress)}>
                                        <div className="form-outline mt-2 mb-4">
                                            <label className="fs-6 fw-bold mb-2">Door No <span className="text-danger"> * </span></label>
                                            <input type="text" className="form-control form-control-lg"
                                                placeholder="AddressLine 1..."
                                                id="houseNumber"
                                                aria-invalid={errors.houseNumber ? "true" : "false"}
                                                {...register('houseNumber', { required: true })}
                                            />
                                            {errors.houseNumber && (
                                                <span role="alert" className="text-danger">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="fs-6 fw-bold mb-2">AddressLine <span className="text-danger"> * </span></label>
                                            <input type="text" className="form-control form-control-lg"
                                                placeholder="AddressLine2..."
                                                id="line1"
                                                aria-invalid={errors.line1 ? "true" : "false"}
                                                {...register('line1', { required: true })}
                                            />
                                            {errors.line1 && (
                                                <span role="alert" className="text-danger">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="fs-6 fw-bold mb-2">City <span className="text-danger"> * </span></label>
                                            <select type="text" className="form-control form-control-lg"
                                                id="city"
                                                aria-invalid={errors.city ? "true" : "false"}
                                                {...register('city', { required: true })}>
                                                <option value="" selected="true" disabled="disabled">city...</option>
                                                <option value="DELHI">Delhi</option>
                                                <option value="CHENNAI">Chennai</option>
                                                <option value="MUMBAI">Mumbai</option>
                                                <option value="KOLKATA">Kolkata</option>
                                                <option value="BANGALORE">Bangalore</option>
                                            </select>
                                            {errors.city && (
                                                <span role="alert" className="text-danger">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="fs-6 fw-bold mb-2">State <span className="text-danger"> * </span></label>
                                            <select type="text" className="form-control form-control-lg"
                                                id="state"
                                                aria-invalid={errors.state ? "true" : "false"}
                                                {...register('state', { required: true })}>
                                                <option value="" selected="true" disabled="disabled">State...</option>
                                                <option value="New Delhi">New Delhi</option>
                                                <option value="Tamilnadu">Tamilnadu</option>
                                                <option value="Maharashtra">Maharashtra</option>
                                                <option value="West bengal">West Bengal</option>
                                                <option value="Karnataka">Karnataka</option>
                                            </select>
                                            {errors.state && (
                                                <span role="alert" className="text-danger">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="fs-6 fw-bold mb-2">Pincode <span className="text-danger"> * </span></label>
                                            <input type="text" className="form-control form-control-lg"
                                                placeholder="Pincode..."
                                                id="pincode"
                                                aria-invalid={errors.pincode ? "true" : "false"}
                                                {...register('pincode', { required: true })}
                                            />
                                            {errors.pincode && (
                                                <span role="alert" className="text-danger">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="form-outline mb-4">
                                            <label className="fs-6 fw-bold mb-2">Country <span className="text-danger"> * </span></label>
                                            <input type="text" className="form-control form-control-lg"
                                                placeholder="Country..."
                                                id="country"
                                                aria-invalid={errors.country ? "true" : "false"}
                                                {...register('country', { required: true })}
                                            />
                                            {errors.country && (
                                                <span role="alert" className="text-danger">
                                                    This field is required
                                                </span>
                                            )}
                                        </div>
                                        <div className="d-grid gap-2 d-md-flex justify-content-md-end btn-gps">
                                            <input className="btn btn-warning" type="submit" value="Update" />
                                        </div>
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                : <PageNotFound />}

            {showLoader && <PreLoader />}
        </>
    )
}