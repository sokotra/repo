import axios from "axios";

// const baseUrl = 'http://localhost:8080/user-service';
const baseUrl = 'https://carentz.stackroute.io/user-service';


export const registerUsers = (details) => {
    var data = {
        isSuccess: false,
        data:'',
    };
   return axios.post(`${baseUrl}/api/v1/${details.type}/register`, details)
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
