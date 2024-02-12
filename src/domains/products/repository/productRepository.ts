import { ProductModel } from "../models/product"
import { CreateProductDTO } from "../dtos/createProductDTO"



export const createProduct = async (newProduct: CreateProductDTO) => {
    const product = await ProductModel.create(newProduct)
    return product
    
}