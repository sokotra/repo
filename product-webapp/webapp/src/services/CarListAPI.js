import axios from "axios";

// const baseUrl = 'http://localhost:8080/bookings-management';
const baseUrl = 'https://carentz.stackroute.io/bookings-management';



export const getCars = (getDetails) => {
    var data = {
        isSuccess: false,
        data:'',
    };
    const params = {
        location: getDetails.location,
        from: getDetails.from,
        to: getDetails.to
    }
   return axios.get(`${baseUrl}/api/v4/getallavailablevehicle`,{params})
    .then( (response) => {
        data.isSuccess = true;
        data.data = response.data;
        return data
    } )
    .catch(err => {
        data.isSuccess = false;
        data.data = err
        return data
    })

}

export const FilterCars = (uploadData, dates) => {
    var data = {
        isSuccess: false,
        data:'',
    };

    const config = {
        headers: {
            'Content-Type': 'application/json',
            'Accept': 'application/json',
        },
        params: {
            from: dates.from,
            to: dates.to,
            veh: JSON.stringify(uploadData)
        }
    }
    return axios.get(`${baseUrl}/api/v4/getvehiclebyfilters`,config)
    .then( (response) => {
        data.isSuccess = true;
        data.data = response.data;
        return data
    } )
    .catch(err => {
        data.isSuccess = false;
        data.data = err
        return data
    })
}