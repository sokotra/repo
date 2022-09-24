import { BsCheckCircleFill } from 'react-icons/bs';
import { FaTimesCircle } from 'react-icons/fa';
import { MdLogout } from 'react-icons/md';
import { FiEdit } from 'react-icons/fi';
import { TiTick, TiCancel } from 'react-icons/ti';
import { useState } from 'react';
import { editDetails } from '../services/MyProfileAPI';
import { useNavigate, Link } from "react-router-dom";
import PreLoader from '../preloader';
import { fetchUsers } from "../store/actions";
import { useDispatch } from "react-redux";
import DefaultImg from '../assests/images/defaultImage.png';
import PageNotFound from './PageNotFound';
import Tostify from './Tostify';
import { useSelector } from "react-redux";
import UserCarBookings from '../pages/UserCarBookings';


export default function MyProfile() {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    const [selectedProfile, setSelectedProfile] = useState(localStorage.getItem('MyProfile') ? JSON.parse(localStorage.getItem('MyProfile')) : false);
    const { setType } = useSelector(state => state);
    const [showeditName, setEditName] = useState(false);
    const [showeditNumber, setEditNumber] = useState(false);
    const [newName, setNewName] = useState("");
    const [newNumber, setNewNumber] = useState("");
    const [showProfile, setShowProfile] = useState(true);
    const [showBooking, setShowBooking] = useState(false);
    const [showLoader, setLoader] = useState(false);
    const [emptyFeild, setErrorEmpty] = useState(false);
    const [updateSuccess, setUpdateSuccess] = useState(false)


    const getEditAddress = () => {
        navigate('/AddAddress', { state: { userInfo: selectedProfile, rePath: "/profile" } })
    }

    const onSubmit = updateData => {
        updateData.emailId = selectedProfile.emailId;

        editDetails(updateData).then(response => {
            if (response.isSuccess) {
                setUpdateSuccess(true)
                //dispatch(fetchUsers(selectedProfile.emailId));
                setLoader(true);
                setTimeout(function () {
                    setSelectedProfile(response.data);
                     localStorage.setItem("MyProfile", JSON.stringify(response.data));
                    setNewName("");
                    setNewName("");
                    setLoader(false);
                    setUpdateSuccess(false)


                }, 2000);
            }
        })


    }

    const updateName = () => {
        if (newName !== '') {
            var updateDetails = {
                name: newName
            }
            setEditName(false);
            onSubmit(updateDetails)
        }
        else {
            setErrorEmpty(true);
            setTimeout(function () {
                setErrorEmpty(false);
            }, 4000)
        }
    }

    const updateNumber = () => {
        if (newNumber !== '') {
            var updateDetails = {
                mobileNumber: newNumber
            }
            setEditNumber(false);
            onSubmit(updateDetails)
        }
        else {
            setErrorEmpty(true);
            setTimeout(function () {
                setErrorEmpty(false);
            }, 4000)
        }
    }

    const updateImages = async (event) => {
        var updateDetails = {
            image: await convertImage(event.target.files)
        }
        onSubmit(updateDetails)
    }

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

    const logout = () => {
        setLoader(true);
        setTimeout(function () {
            setLoader(false);
            localStorage.clear();
            navigate('/Signin')
        }, 2000);

    }

    return (
        <>
            {emptyFeild && <Tostify message="Field is empty" type="error" />}
            {updateSuccess && <Tostify message="Update Successfully" type="success" />}
            {selectedProfile ?
                <div className="container-fluid mt-5">
                    <div className="row">
                        <div className="col-md-3 mt-5 profile-leftView">
                            {leftView()}
                        </div>
                        <div className="col-md-8 mt-5">
                            {rightView()}
                        </div>
                    </div>
                </div>
                : <PageNotFound />}

            {showLoader && <PreLoader />}
        </>
    )

    function rightView() {
        return (
            <>
                {showProfile && profileView()}
                {showBooking && <UserCarBookings />}
            </>
        )
    }

    function leftView() {
        return (
            <>
                <div className="card mb-4 mb-lg-0 h-100" >
                    <div className="card-body p-0">
                        <ul className="list-group">
                            <li className="list-group-item">
                                <div className="d-flex justify-content-center fs-4 mt-3">
                                    <img src={selectedProfile.image ?
                                        selectedProfile.image
                                        : DefaultImg} alt="profile"
                                        className="rounded-circle border border-secondary " width={150} height={150} />
                                </div>
                                <div className="d-flex justify-content-center  fs-4">
                                    <span className="card-title fw-normal">{selectedProfile.name}</span>
                                </div>
                                <div className="d-flex justify-content-center fs-5">
                                    <span className="card-title fw-light">{selectedProfile.mobileNumber}</span>
                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="ms-5">
                                    <p className='fs-5 fw-normal'>Phone number {selectedProfile.mobileNumber ? <BsCheckCircleFill style={{ color: "green" }} /> :
                                        <FaTimesCircle style={{ color: "red" }} />} </p>
                                    <p className='fs-5 fw-normal'>Email address {selectedProfile.emailId ? <BsCheckCircleFill style={{ color: "green" }} /> :
                                        <FaTimesCircle style={{ color: "red" }} />}</p>
                                    <p className='fs-5 fw-normal'>profile picture {selectedProfile.image ? <BsCheckCircleFill style={{ color: "green" }} /> :
                                        <FaTimesCircle style={{ color: "red" }} />}</p>
                                    <p className='fs-5 fw-normal'>Address {selectedProfile.address ? <BsCheckCircleFill style={{ color: "green" }} /> :
                                        <FaTimesCircle style={{ color: "red" }} />}</p>

                                </div>

                            </li>
                            <li className="list-group-item">
                                <div className="ms-5">
                                    <p
                                        className={showProfile ? 'btn fs-5 fw-bold m-2' : 'btn fs-5 fw-normal m-2'}
                                        onClick={() => {
                                            setShowBooking(false);
                                            setShowProfile(true)
                                        }}
                                    >
                                        MyAccount
                                    </p>

                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="ms-5">
                                    {setType && setType === 'client' ?
                                        <p
                                            className={showBooking ? 'btn fs-5 fw-bold m-2' : 'btn fs-5 fw-normal m-2'}
                                            onClick={() => {
                                                setShowBooking(true);
                                                setShowProfile(false)
                                            }}
                                        >
                                            Booking details
                                        </p>
                                        :
                                        <Link to="/Vendordashboard"
                                            className= 'btn fs-5 fw-normal m-2'
                                        >
                                            Dashboard
                                        </Link>
                                    }

                                </div>
                            </li>
                            <li className="list-group-item">
                                <div className="ms-5">
                                    <p className='btn fs-5 fw-normal m-2' onClick={logout}>Logout <MdLogout style={{ color: "red" }} /></p>

                                </div>
                            </li>
                        </ul>
                    </div>

                </div>
            </>
        )
    }


    function profileView() {
        return (
            <>
                <div className='card mb-4 mb-lg-0 h-100'>
                    <div className="d-flex justify-content-center fs-4 m-4 ">
                        <span className='fs-4 fw-normal'>My Account</span>
                    </div>
                    <hr />
                    <div className="d-flex justify-content-center fs-4 mt-3">

                        <img src={selectedProfile.image ?
                            selectedProfile.image
                            : DefaultImg} alt="profile"
                            className="rounded-circle border border-secondary " width={150} height={150} />
                        <label className='text-secondary' htmlFor="image"><FiEdit style={{ cursor: "pointer" }} /></label>
                        <input type="file"
                            id="image"
                            multiple
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={updateImages} />
                    </div>
                    <div className='row ms-5 mt-5'>
                        <div className='col-md-6 mt-5'>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <span className='fs-5 fw-bold'>
                                        Name :
                                    </span>
                                </div>
                                <div className='col-md-6'>
                                    {!showeditName &&
                                        <span className='text-secondary fw-normal fs-5'> {selectedProfile.name} <FiEdit style={{ cursor: "pointer" }} onClick={() => setEditName(true)} /> </span>}
                                    {showeditName &&
                                        <div className='input-group'>
                                            <input type="text" className='form-control' onChange={e => setNewName(e.target.value)} />
                                            <span className='input-group-text bg-light'><TiTick style={{ color: "green", cursor: "pointer" }} onClick={updateName} /></span>
                                            <span className='input-group-text bg-light'><TiCancel style={{ color: "red", cursor: "pointer" }} onClick={() => setEditName(false)} /></span>
                                        </div>
                                    }

                                </div>
                            </div>
                        </div>
                        <div className='col-md-6  mt-5'>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <span className='fs-5 fw-bold'>
                                        Email :
                                    </span>
                                </div>
                                <div className='col-md-6'>
                                    <span className='text-secondary fw-normal fs-5'> {selectedProfile.emailId}</span>
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6  mt-5'>
                            <div className='row'>
                                <div className='col-md-2'>
                                    <span className='fs-5 fw-bold'>
                                        Phone:
                                    </span>
                                </div>
                                <div className='col-md-6'>
                                    {!showeditNumber &&
                                        <span className='text-secondary fw-normal fs-5'> {selectedProfile.mobileNumber} <FiEdit style={{ cursor: "pointer" }} onClick={() => setEditNumber(true)} /> </span>
                                    }
                                    {showeditNumber &&
                                        <div className='input-group'>
                                            <input type="number" className='form-control' onChange={e => setNewNumber(e.target.value)} />
                                            <span className='input-group-text bg-light'><TiTick style={{ color: "green", cursor: "pointer" }} onClick={updateNumber} /></span>
                                            <span className='input-group-text bg-light'><TiCancel style={{ color: "red", cursor: "pointer" }} onClick={() => setEditNumber(false)} /></span>
                                        </div>
                                    }
                                </div>
                            </div>
                        </div>
                        <div className='col-md-6  mt-5'>
                            <div className='row'>
                                <div className='col-md-3'>
                                    <span className='fs-5 fw-bold'>
                                        Address :
                                    </span>
                                </div>
                                {selectedProfile.address &&
                                    <div className='col-md-5'>
                                        <span className='text-secondary fw-normal fs-5'>
                                            {selectedProfile.address.houseNumber},
                                            {selectedProfile.address.line1}, <br />
                                            {selectedProfile.address.city}, <br />
                                            {selectedProfile.address.state}, {selectedProfile.address.pincode}, <br />
                                            {selectedProfile.address.country},
                                        </span>
                                    </div>
                                }
                                <div className='col-1'>
                                    <span className='text-secondary fw-normal fs-5'>
                                        <FiEdit style={{ cursor: "pointer" }} onClick={getEditAddress} />
                                    </span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </>
        )
    }
}