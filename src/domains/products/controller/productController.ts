// import  productService  from '../services/productService'
const productService = require('../services/productService')
import { Request, Response } from "express";


const newProduct = async(req: Request, res: Response) => {

 try {
    if (!req.file || !req.file.filename) {
       throw new Error("cannot find file");       
    }
    // const imagePath = req.file ? req.file.filename : undefined ;
    if (!req.file.filename) {
      throw new Error("cannot find file");
   }
    const {filename} = req.file

    const newProductData = {
      ...req.body,
      image: filename, // This adds the image filename to the new product data
    };
    const product = await productService.createProduct(newProductData)

    res.status(201).json(product); // Respond with the created product

 } catch (error) {
    res.status(500).json(error);
 }
}

module.exports = {newProduct}