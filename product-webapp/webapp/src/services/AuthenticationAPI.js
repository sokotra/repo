import axios from "axios";

//const baseUrl = 'http://localhost:8080/email-service';
const baseUrl = 'https://carentz.stackroute.io/email-service';


export const SendOtp = (emailId) => {
    var data = {
        isSuccess: false,
        data:'',
    };
    const params = {
        emailId : emailId
    }
   return axios.post(`${baseUrl}/api/v6/sendOtp`,null,{params})
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

export const VerifyOtp = (OtpDetails) => {
    var data = {
        isSuccess: false,
        data:'',
    };
    const params = {
        otp :parseInt(OtpDetails.otp),
        emailId: OtpDetails.emailId
    }
    console.log("Check once",params)
   return axios.post(`${baseUrl}/api/v6/verifyOtp`, null, {params})
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

export const EmailService = (emailData) => {
    var data = {
        isSuccess: false,
        data:'',
    };

    var reqData = {
        to : JSON.parse(localStorage.getItem("MyProfile")).emailId,
        body : JSON.stringify(emailData)
    }

    console.log("EmailDataaa",reqData);
   
   return axios.post(`${baseUrl}/api/v6/email`, reqData)
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