
import { useEffect, useState } from 'react';
import { useLocation, useNavigate } from "react-router-dom"
import { LazyLoadImage } from 'react-lazy-load-image-component';
import { useForm } from "react-hook-form";
import {getCars, FilterCars} from '../services/CarListAPI';
import { HiLocationMarker } from 'react-icons/hi';
import {FaCarSide, FaFilter} from 'react-icons/fa';
import {GiGasPump, GiGearStickPattern, GiCarSeat, GiTowTruck} from 'react-icons/gi';
import {BiRupee} from 'react-icons/bi';
import FindCars from './FindCars';
import { useDispatch } from 'react-redux';
import { setDateSelected } from '../store/actions';
import PreLoader from '../preloader';

export default function CarList() {
    document.body.style.backgroundColor = "#F1F3F6";
    const location = useLocation();
    const navigate = useNavigate();
    const searchData = location.state?.searchDate;
    const[carList, setList] = useState(null);
    const[seats, setSeats] = useState(0);
    const [showLoader, setLoader] = useState(false);
    const[showFilter, setFilter] =useState(false);
    const { register, handleSubmit } = useForm();
    const dispatch=useDispatch();

    useEffect(() => {
        fetchList();
        dispatch(setDateSelected(searchData))
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [searchData])

    const fetchList = () => {
        getCars(searchData).then( response => {
            if(response.isSuccess && response.data.length > 0) {
                setList(response.data);
            }
            else {
                setList(null);
            }
    }) 

    }
    const getCarDetails = (vehicleNo) => {
        // eslint-disable-next-line no-unused-expressions
                setLoader(true);
                setTimeout(function () {
                    setLoader(false);
                    localStorage.getItem("MyToken") ? navigate('/cardetails/'+vehicleNo) : navigate("/Signin", {state:'/cardetails/'+vehicleNo});
                }, 1000);
    }
    const onFilter = async(data ) => {
        data.available = true;
        data.location = searchData.location;
        if(data.seats === "0") {
             data.seats = null;
        }
        for(var val in data) {
            if(data[val] === '' || data[val] === null) {
                delete data[val];
            }
        }
        FilterCars(data, searchData).then( response => {
            if(response.isSuccess ) {
                setList(response.data);
            }
            else {
                setList(null);
            }
            
        })
    }

    const displayFilter = () => {
        setFilter(current => !current);
    }

    return(
        <>
        {(carList !== null && (
            <div className='container-fluid'>
                <FindCars page = "List" searchDate = {searchData} />
                <div className='row mt-5'>
                    {filterView()}
                    <div className='col-12 col-md-8 scroll-sidebar'>
                        <div className='row pb-5 mb-4 '>
                            {(carList.length > 0 && showList()) ||
                             listError()}                     
                        </div>
                    </div>
                </div>
            </div>
            )) || 
            (carList === null && listError())}

            {showLoader && <PreLoader />}
        </>
    )

function filterView() {
    return(
        <>
        <div className='col-md-3 col-12 mb-4'>
                        <div className='card border-0'>
                            <div className='card-body'>
                                <h4 className='d-flex justify-content-start' onClick={displayFilter}><span className='text-secondary toggle-filter'> <FaFilter  /> </span>  Filter</h4>
                                <div className={!showFilter ? 'filter-content': 'filter-content-visiable'}>
                                <form onSubmit={handleSubmit(onFilter)}>
                                <ul className="list-group list-group-flush rounded-3">
                                    <li className="list-group-item d-flex justify-content-between align-items-center bg-light mt-4 fs-5 fw-normal">
                                            Brands
                                    </li>
                                    <div className='mt-4'>
                                    <select type="text" className="form-control form-control-lg border-0 border-bottom" 
                                            id="brandName" {...register('brandName', { required: false })}>
                                                

                                                
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
                                    </div>
                                    <li className="list-group-item d-flex justify-content-between align-items-center bg-light mt-3 fs-5 fw-normal">
                                        Transmission
                                    </li>  
                                    <div className='mt-4'>
                                    <div className="btn-group btn-group-lg ms-5" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" className="btn-check" name="btnradio" id="Automatic" value="Automatic" {...register('transmission', { required: false })}  />
                                        <label className="btn btn-outline-secondary" htmlFor="Automatic">Automatic</label>

                                        <input type="radio" className="btn-check" name="btnradio" id="Manual" value="Manual" {...register('transmission', { required: false })} />
                                        <label className="btn btn-outline-secondary" htmlFor="Manual">Manual</label>
                                        </div>
                                    </div>  
                                    <li className="list-group-item d-flex justify-content-between align-items-center  bg-light mt-4 fs-5 fw-normal">
                                        seats
                                    </li>
                                    <div className='mt-4'>
                                    <input type="range" className="form-range" min="0" max="8" value={seats} id="seats"
                                    {...register('seats', { required: false, onChange: (e)=>setSeats(e.target.value) })}/>
                                    <span id="rangeval">capacity : {seats}</span>
                                    </div> 
                                    <li className="list-group-item d-flex justify-content-between align-items-center bg-light mt-3 fs-5 fw-normal">
                                        Category
                                    </li>
                                    <div className='mt-4'>
                                        <select type="text" className="form-control form-control-lg border-0 border-bottom"  
                                            id="category"
                                            {...register('category', { required: false })}>
                                                <option value="" selected="true" disabled="disabled">Select</option>
                                                <option value="Hatchback">Hatchback</option>
                                                <option value="Sedan">Sedan</option>
                                                <option value="SUV">SUV</option>
                                        </select>
                                    </div> 
                                    <li className="list-group-item d-flex justify-content-between align-items-center mt-3 bg-light fs-5 fw-normal">
                                        Fuel Type
                                    </li>  
                                    <div className='mt-4'>
                                    <div className="btn-group btn-group-lg ms-5" role="group" aria-label="Basic radio toggle button group">
                                        <input type="radio" className="btn-check" name="btnradio" id="Petrol" value="Petrol" {...register('fuel', { required: false })}  />
                                        <label className="btn btn-outline-secondary" htmlFor="Petrol">Petrol</label>

                                        <input type="radio" className="btn-check" name="btnradio" id="Diesel" value="Diesel" {...register('fuel', { required: false })} />
                                        <label className="btn btn-outline-secondary" htmlFor="Diesel">Diesel</label>

                                        <input type="radio" className="btn-check" name="btnradio" id="LPG" value="LPG" {...register('fuel', { required: false })} />
                                        <label className="btn btn-outline-secondary" htmlFor="LPG">LPG</label>
                                        </div>
                                    </div>                                   
                                 </ul>
                                 <div className="d-grid gap-2 col-4 mt-4 mx-auto">
                                    <input className="btn btn-warning" type="submit" value =" Filter "/>
                                </div>
                                </form>
                                </div>
                                
                            </div>
                        </div>
                    </div>
        </>
    )

}


function showList() {
    return(
        <>
        {carList.map((value) => {
            return(
                <div className='col-lg-4 col-md-6 mb-4 mb-lg-4'>
                    <div className='card rounded border-1 listCard'>
                        <div className='card-body p-4' onClick={() => getCarDetails(value.vehicleNo)}>
                        <LazyLoadImage src={value.image} alt="" className="card-img-top embed-responsive-item" width="200" height="200"/>
                        <div className='row mt-3'>
                            <div className='col-md-6'>
                                <h5> {value.brandName}</h5>
                            </div>
                            <div className='col-md-6'>
                                <div className="d-flex bd-highlight">
                                    <p className='fs-4 fw-normal'><BiRupee />{value.fare} <span className='fs-6 text-secondary'> /day</span></p>
                                </div>
                            </div>
                        </div>
                        <div className='row'>
                        <span className='text-secondary fs-6'>{value.modelName}</span>
                        </div>
                        <div className='row mt-3'>
                          <span >   <HiLocationMarker style={{color:"red"}}  size={20}/> {value.location} </span>
                        </div>
                        
                        
                        <ul className="social mb-0 list-inline mt-3">
                            <li className="list-inline-item m-0 text-secondary me-1">
                            <span className="badge rounded-pill bg-light text-secondary"><FaCarSide  size={20}/> {value.category}</span>
                            </li>
                            <li className="list-inline-item m-0 text-secondary me-1">
                            <span className="badge rounded-pill bg-light text-secondary"><GiGasPump  size={20}/> {value.fuel}</span>
                            </li>
                            <li className="list-inline-item m-0 text-secondary me-1">
                            <span className="badge rounded-pill bg-light text-secondary"><GiGearStickPattern  size={20}/>  {value.transmission}</span>
                            </li>
                            <li className="list-inline-item m-0 text-secondary me-1 mt-2">
                            <span className="badge rounded-pill bg-light text-secondary"><GiCarSeat  size={20}/>  {value.seats}</span>
                            </li>
                        </ul>
                        </div>
                    </div>
                 </div>
            )
        })}
        </>
    )
}

function listError() {
    return(
        <>
        <div className='container mt-5'>
                    <div className='text-secondary display-1  text-center'><GiTowTruck size={400} style={{opacity:"0.5"}}/></div>
                    <h1 className='text-secondary display-1 text-center'>OOPs!!!</h1>
                    <p className='text-secondary display-6  text-center'>No Cars found</p>
                </div>
        </>
    )
}

}