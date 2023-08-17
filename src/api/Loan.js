import {api} from "./api.js";
import {endpoint} from "./endpoint.js";

class LoanServices{
    getAll(){
        return api.get(endpoint.loan)
    }

    getByID(id){
        return api.get(`${endpoint.loan}/${id}`)
    }

    createOne(payload){
        return api.post(endpoint.loan, payload);
    }

    updateOne(id, payload){
        return api.patch(`${endpoint.loan}/${id}`, payload, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    deleteOne(id){
        return api.delete(`${endpoint.loan}/${id}`)
    }
}

export const loanServices = new LoanServices()