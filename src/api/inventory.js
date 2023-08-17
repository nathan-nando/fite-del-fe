import {api} from "./api.js";
import {endpoint} from "./endpoint.js";

class InventoryServices{
    getAll(){
        return api.get(endpoint.inventory)
    }

    getByID(id){
        return api.get(`${endpoint.inventory}/${id}`)
    }

    createOne(payload){
        return api.post(endpoint.inventory, payload, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        });
    }

    updateOne(id, payload){
        return api.patch(`${endpoint.inventory}/${id}`, payload, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }

    deleteOne(id){
        return api.delete(`${endpoint.inventory}/${id}`, {
            headers: {Authorization: `Bearer ${localStorage.getItem('token')}`}
        })
    }
}

export const inventoryServices = new InventoryServices()