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
        return api.post(endpoint.inventory, payload);
    }

    updateOne(id, payload){
        return api.patch(`${endpoint.inventory}/${id}`, payload)
    }

    deleteOne(id){
        return api.delete(`${endpoint.inventory}/${id}`)
    }
}

export const inventoryServices = new InventoryServices()