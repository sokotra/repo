import axios from "axios";

//const baseUrl = 'http://localhost:8080/authentication-service';
const baseUrl = 'https://carentz.stackroute.io/authentication-service';


export const loginUsers = (details) => {
    var data = {
        isSuccess: false,
        data:'',
    };
   return axios.post(`${baseUrl}/api/v2/login`, details)
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

