import Axios from "axios";
import {StatusCode} from "./status_codes";
import { toast } from 'react-toastify';
import {Navigate} from "./Navigate"




export const authenticated ={ enabled : false};

export const accessToken = "eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiIxZjNhN2NhYWRiMDZiMzgzZDZmZjI3ODRiYTg2ZmFiYiIsInN1YiI6IjY2MGFlMTI2YzhhNWFjMDE3Yzc4Nzc4NCIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.vzfdlIbyYRzUSfoBfH2Fo3lirddzsNp1eLxNqPfjkqQ";

export const http = Axios;

http.defaults.baseURL = 'http://localhost:1955/rest/';


//http.defaults.headers.common['Authorization'] ="Bearer "+ localStorage.getItem("JWT_TOKEN");

http.interceptors.request.use(request=>requestHandler(request));


http.interceptors.response.use(resp=>responseHandler(resp),error=>errorHandler(error));


export const ACCOUNT_ID = 21172441;
const errorHandler=(error)=> {

    let errorResponse = error.response;
    console.log(errorResponse);
    if (errorResponse.status === StatusCode.UNAUTHORIZED) {
        authenticated.enabled=false;
        console.log("toast => "+toast);
        toast.error(errorResponse.status);

        Navigate("/log");
    }
    return error;
}

const responseHandler=(resp)=>{
    authenticated.enabled=true;

    console.log(resp);
    return resp;
}

const requestHandler=(req)=>{
   // console.log("token => "+localStorage.getItem("JWT_TOKEN"));
    req.headers['Authorization']="Bearer "+accessToken;
    return req;
}