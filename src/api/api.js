import axios from "axios";
import {env} from "../app/config.js";


export const api = axios.create({
    baseURL: env.BASE_API
})