import type { Product } from "../types/ProductType"
import { apiClientDb } from "./axios.Api"

export const getAllProducts = async () =>{
    const response = await apiClientDb.get<Product[]>('/all')
    return response.data
}

export const addNewProduct = async (nuovo:Product) => {
    const response = await apiClientDb.post('/add', nuovo)
    return response.data
}

export const changePrize = async (id: number, nuovoPrezzo: number) =>{
    const response = await apiClientDb.put(`/${id}`,{ prezzo: nuovoPrezzo })
    return response.data
}

export const deleteProduct = async (id: number) => {
    const response = await apiClientDb.delete(`/delete/${id}`)
    return response.data
}