import axios from "axios";

const API_BASE_URL_DB = 'http://localhost:7799/db/prodotti'

export const apiClientDb = axios.create({
    baseURL: API_BASE_URL_DB,
    timeout: 30000,
    headers: {'Content-Type': 'application/json'}
});