import {api} from "./api.js";
import {endpoint} from "./endpoint.js";

class AuthServices{
    login(payload){
        return api.post(`${endpoint.auth}/login`, payload);
    }

    register(payload){
        return api.post(`${endpoint.auth}/register`, payload);
    }

    refreshToken(){
        return api.post(`${endpoint.auth}/refresh`);
    }

}

export const authServices = new AuthServices()