import { ProductModel } from "../models/product"



export const createProduct = async (newProduct: any) => {
    const product = await ProductModel.create(newProduct)
    return product
    
}