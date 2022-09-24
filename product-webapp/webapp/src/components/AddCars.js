import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { UploadCars } from '../services/AddCarsAPI';
import { RiProfileFill } from 'react-icons/ri';
import { BsFillTelephoneFill } from 'react-icons/bs';
import { GrMail } from 'react-icons/gr';
import { FaLocationArrow } from 'react-icons/fa';
import { Link } from "react-router-dom";
import DefaultImg from '../assests/images/defaultImage.png';
import PageNotFound from "./PageNotFound";
import Tostify from "./Tostify";

export default function AddCars() {
    const navigate = useNavigate();
    const selectedProfile = localStorage.getItem('MyProfile') ? JSON.parse(localStorage.getItem('MyProfile')) : false;
    const [userInfo, setUserInfo] = useState(null);
    const [step1, setStep1] = useState(true);
    const [step2, setStep2] = useState(false);
    const [step3, setStep3] = useState(false);
    const [showSuccess, setShowSuccess] = useState(false);
    const [showerror, setShowError] = useState(false);
    const [fileName, setFilename] = useState('');
    const [totWords, setWords] = useState(0);
    const { register, handleSubmit, formState: { errors } } = useForm();


    useEffect(() => {
        fetchUserDetails();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const fetchUserDetails = () => {
        selectedProfile ? setUserInfo(selectedProfile) : setUserInfo(null)

    }

    const submitPage1 = async () => {
        handleClick2();
    }

    const submitPage2 = async () => {
        handleClick3();
    }



    const onSubmit = async (data) => {

        data.image = await convertImage(data.image);
        data.vendorEmailId = userInfo.emailId;
        data.location = userInfo.address.city;
        data.colour = data.colour.toUpperCase()
        UploadCars(data)
            .then(response => {
                if (response.isSuccess) {

                    setShowSuccess(true);
                    setTimeout(function () {
                        setShowSuccess(false);
                        navigate('/Vendordashboard');
                    }, 2000);

                }
                else {
                    setShowError(true);
                    setTimeout(function () {
                        setShowError(false);
                    }, 4000);
                }
            })
    };

    const convertImage = value => {
        return new Promise((resolve, reject) => {
            const getImg = new FileReader();
            getImg.readAsDataURL(value[0]);
            getImg.onload = () => {
                resolve(getImg.result);
            };
            getImg.onerror = (error) => reject(error);
        })
    }

    const handleClick1 = event => {
        event.target.style.color = 'blue';
        setStep1(true);
        setStep2(false);
        setStep3(false);
    }

    const handleClick2 = event => {
        setStep1(false);
        setStep2(true);
        setStep3(false);
    }

    const handleClick3 = event => {
        setStep1(false);
        setStep2(false);
        setStep3(true);
    }
    // ----Main Component-----
    return (
        (userInfo != null && (
            <>
                {showSuccess && <Tostify message="Your car details uploaded successfully!!!" type="success" />}

                {showerror && <Tostify type="error" />}
                {(userInfo.address !== null && addCars()) || (navigate('/AddAddress', { state: { userInfo: userInfo, rePath: "/AddCars" } }))}

            </>)) || (userInfo === null && <PageNotFound />)
    )


    function addCars() {
        return (
            <>
                <div className="container-fluid mt-5">
                    <div className="row">
                        {profileView()}
                        <div className="col-12 col-md-8">
                            <div id="stepper1" className="bs-stepper  bg-white">
                                <div className="bs-stepper-header">
                                    <div className="step" data-target="#test-l-2">
                                        <span className="step-trigger" >
                                            <span className="bs-stepper-circle">1</span>
                                            <span className={step1 ? "bs-stepper-label text-primary" : "bs-stepper-label"}>Step 1</span>
                                        </span>
                                    </div>
                                    <div className="line"></div>
                                    <div className="step" data-target="#test-l-2">
                                        <span className="step-trigger" >
                                            <span className="bs-stepper-circle">2</span>
                                            <span className={step2 ? "bs-stepper-label text-primary" : "bs-stepper-label"}>Step 2</span>
                                        </span>
                                    </div>
                                    <div className="line"></div>
                                    <div className="step" data-target="#test-l-2">
                                        <span className="step-trigger" >
                                            <span className="bs-stepper-circle">3</span>
                                            <span className={step3 ? "bs-stepper-label text-primary" : "bs-stepper-label"}>Step 3</span>
                                        </span>
                                    </div>
                                </div>
                                <div className="bs-stepper-content">
                                    <form onSubmit={handleSubmit(onSubmit)}>
                                        {step1 && (
                                            <div>
                                                {vehicleDetails()}
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end btn-gps">
                                                    <span className="btn btn-primary me-md-2" type="button" onClick={handleSubmit(submitPage1)}>Next</span>
                                                </div>
                                            </div>

                                        )}
                                        {step2 && (
                                            <>
                                                {addressDetails()}
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end btn-gps">
                                                    <span className="btn btn-secondary me-md-2" type="button" onClick={handleClick1}>Back</span>
                                                    <span className="btn btn-primary" type="button" onClick={handleSubmit(submitPage2)}>Next</span>
                                                </div>
                                            </>


                                        )}
                                        {step3 && (
                                            <>
                                                {uploadDetails()}
                                                <div className="d-grid gap-2 d-md-flex justify-content-md-end btn-gps">
                                                    <span className="btn btn-secondary me-md-2" type="button" onClick={handleClick2}>Back</span>
                                                    <input className="btn btn-warning" type="submit" value="Upload" />
                                                </div>
                                            </>
                                        )}
                                    </form>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }



    function profileView() {
        return (
            <>
                <div className="col-12 col-md-3 mb-2 vendors-profile">
                    <div className="card border-0">
                        <div className="d-flex justify-content-center fs-4">
                            <img src={userInfo.image ? userInfo.image : DefaultImg} alt="profile"
                                className="rounded-circle img-fluid border border-secondary " style={{ width: "150px" }} />
                        </div>
                        <div className="card-body">
                            <div className="d-flex justify-content-center  fs-4">
                                <span className="card-title fw-bold">{userInfo.name}</span>
                            </div>
                            <div className="d-flex justify-content-center ">
                                <span className="card-title fs-5 text-secondary"><GrMail /> {userInfo.emailId} </span>
                            </div>
                            <div className="d-flex justify-content-center ">
                                <span className="card-title fs-5 text-secondary"><BsFillTelephoneFill />   {userInfo.mobileNumber}</span>
                            </div>
                            <div className="d-flex justify-content-center ">
                                <span className="card-title fs-5 text-secondary"><FaLocationArrow />   {userInfo.address.city}</span>
                            </div>
                            <div className="d-flex justify-content-center mt-3">
                                <Link to="/profile" className="btn btn-warning btn-sm"><RiProfileFill />  View Profile</Link>
                            </div>
                        </div>


                    </div>
                </div>

            </>
        )
    }

    function vehicleDetails() {
        return (

            <div className="row m-3">
                <label className="fs-4 text-center fw-bolder mb-5"> Vehicle Details</label>
                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Vehicle Number <span className="text-danger"> * </span></label>
                        <input type="text" className="form-control form-control-lg"
                            placeholder="Enter your Vehicle number..."
                            id="vehicle_no"
                            aria-invalid={errors.vehicle_no ? "true" : "false"}
                            {...register('vehicleNo', { required: true })}
                        />
                        {errors.vehicle_no && (
                            <span role="alert" className="text-danger">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>



                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Brand Name <span className="text-danger"> * </span></label>
                        <select type="text" className="form-control form-control-lg"
                            id="brandName"
                            aria-invalid={errors.brandName ? "true" : "false"}
                            {...register('brandName', { required: true })}>


                            <option value="" selected="true" disabled="disabled">Select</option>
                            <option value="Hyundai">Hyundai</option>
                            <option value="Maruti Suzuki">Maruti Suzuki</option>
                            <option value="Tata">Tata</option>
                            <option value="Kia">Kia</option>
                            <option value="Mahindra">Mahindra</option>
                            <option value="Toyota">Toyota</option>
                            <option value="Renault">Renault</option>
                            <option value="Honda">Honda</option>


                        </select>
                        {errors.brandName && (
                            <span role="alert" className="text-danger">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Model Name <span className="text-danger"> * </span></label>
                        <input type="text" className="form-control form-control-lg"
                            placeholder="Enter your Car's Model name..."
                            id="modelName"
                            aria-invalid={errors.modelName ? "true" : "false"}
                            {...register('modelName', { required: true })}
                        />
                        {errors.modelName && (
                            <span role="alert" className="text-danger">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Colour <span className="text-danger"> * </span></label>
                        <input type="text" className="form-control form-control-lg"
                            placeholder="Enter your Car's colour..."
                            id="colour"
                            aria-invalid={errors.colour ? "true" : "false"}
                            {...register('colour', { required: true })}
                        />
                        {errors.colour && (
                            <span role="alert" className="text-danger">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>
                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Year of purchase<span className="text-danger"> * </span></label>
                        <input type="number" className="form-control form-control-lg"
                            placeholder="Enter manufacturing year..."
                            id="yearOfpurchase"
                            aria-invalid={errors.yearOfpurchase ? "true" : "false"}
                            {...register('yearOfpurchase', { required: true })}
                        />
                        {errors.yearOfpurchase && (
                            <span role="alert" className="text-danger">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Catagory <span className="text-danger"> * </span></label>
                        <select className="form-control form-control-lg"
                            id="category"
                            aria-invalid={errors.category ? "true" : "false"}
                            {...register('category', { required: true })}>

                            <option value="" selected="true" disabled="disabled">Select</option>
                            <option value="Hatchback">Hatchback</option>
                            <option value="Sedan">Sedan</option>
                            <option value="SUV">SUV</option>
                        </select>
                        {errors.category && (
                            <span role="alert" className="text-danger">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Fuel <span className="text-danger"> * </span></label>
                        <select className="form-control form-control-lg"
                            id="fuel"
                            aria-invalid={errors.fuel ? "true" : "false"}
                            {...register('fuel', { required: true })}>

                            <option value="" selected="true" disabled="disabled">Select</option>
                            <option value="Petrol">Petrol</option>
                            <option value="Diesel">Diesel</option>
                            <option value="LPG">LPG</option>
                        </select>
                        {errors.fuel && (
                            <span role="alert" className="text-danger">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Transmission <span className="text-danger"> * </span></label>
                        <select className="form-control form-control-lg"
                            id="transmission"
                            aria-invalid={errors.transmission ? "true" : "false"}
                            {...register('transmission', { required: true })}>

                            <option value="" selected="true" disabled="disabled">Select</option>
                            <option value="Manual">Manual</option>
                            <option value="Automatic">Automatic</option>
                        </select>
                        {errors.transmission && (
                            <span role="alert" className="text-danger">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Seats <span className="text-danger"> * </span></label>
                        <select className="form-control form-control-lg"
                            id="seats"
                            aria-invalid={errors.seats ? "true" : "false"}
                            {...register('seats', { required: true })}>
                            <option value="" selected="true" disabled="disabled">Select</option>
                            <option value="4">4</option>
                            <option value="5">5</option>
                            <option value="6">6</option>
                            <option value="7">7</option>
                            <option value="8">8</option>
                        </select>
                        {errors.seats && (
                            <span role="alert" className="text-danger">
                                This field is required
                            </span>
                        )}
                    </div>
                </div>

                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Average Milage <span className="text-danger"> * </span></label>
                        <input type="text" className="form-control form-control-lg"
                            placeholder="Enter Average milage of the car..."
                            id="average"
                            aria-invalid={errors.average ? "true" : "false"}
                            {...register('average', {
                                required: true, pattern: {
                                    value: /^(0|[1-9]\d*)(\.\d+)?$/
                                }
                            })}
                        />
                        {errors.average && (
                            <span role="alert" className="text-danger">
                                Enter Correct Format
                            </span>
                        )}
                    </div>
                </div>
                <div className="col-sm col-md-6">
                    <div className="form-outline mb-4">
                        <label className="fs-6 fw-bolder mb-2">Price <span className="fw-lighter text-secondary"> /day </span> <span className="text-danger"> * </span></label>
                        <input type="text" className="form-control form-control-lg"
                            placeholder="Enter per day amount..."
                            id="fare"
                            aria-invalid={errors.fare ? "true" : "false"}
                            {...register('fare', {
                                required: true, pattern: {
                                    value: /^(0|[1-9]\d*)(\.\d+)?$/
                                }
                            })}
                        />
                        {errors.fare && (
                            <span role="alert" className="text-danger">
                                Enter number only in this feild
                            </span>
                        )}
                    </div>
                </div>
            </div>

        )
    }

    function addressDetails() {
        return (
            <>
                <div className="row m-3">
                    <div className="col-sm col-md-6">
                        <div className="form-outline mb-4">
                            <label className="fs-6 fw-bolder mb-2">Description <span className="text-danger"> * </span> </label>
                            <textarea className="form-control form-control-lg textarea"
                                placeholder="Enter description of the vehicle..."
                                id="description"
                                maxLength="80"
                                aria-invalid={errors.description ? "true" : "false"}
                                {...register('description', { required: true, onChange: (e) => setWords(e.target.value.length) })}
                            />
                            <p className="text-end text-secondary mt-1">{totWords}/80 words</p>
                            {errors.description && (
                                <span role="alert" className="text-danger">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                </div>

            </>

        )
    }

    function uploadDetails() {

        return (
            <div className="m-3">
                <div className="row">
                    <div className="col-sm col-md-6">
                        <div className="form-outline mb-4">
                            <label className="fs-6 fw-bolder mb-2">Upload image <span className="text-danger"> * </span></label>
                            <label htmlFor="image" className="btn btn-outline-secondary btn-block btn-outlined ms-2">Choose Image</label>
                            <input type="file"
                                id="image"
                                multiple
                                accept="image/*"
                                style={{ display: "none" }}
                                aria-invalid={errors.image ? "true" : "false"}
                                {...register('image', { required: true, onChange: (e) => { setFilename(e.target.files[0].name) } })}
                            />
                            <span className="fs-6 text-secondary fw-lighter ms-2">{fileName}</span>
                            <br />
                            {errors.image && (
                                <span role="alert" className="text-danger">
                                    This field is required
                                </span>
                            )}
                        </div>
                    </div>
                </div>

            </div>
        )
    }
}