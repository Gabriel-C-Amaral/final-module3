// import productRepository from '../repository/productRepository'
const productRepository = require('../repository/productRepository')


 const createProduct = async (product: any) => {

     const newProduct = await productRepository.createProduct(product)
     if (!newProduct) {
        throw new Error("Cannot create product");       
        
     }

     return newProduct
}

module.exports = {createProduct}