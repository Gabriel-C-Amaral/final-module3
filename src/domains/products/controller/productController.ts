// import  productService  from '../services/productService'
const productService = require('../services/productService')
import { Request, Response } from "express";
import { CreateProductDTO } from "../dtos/createProductDTO";


const newProduct = async (req: Request, res: Response) => {
   try {
       // Validate the presence of the uploaded file
       if (!req.file || !req.file.filename) {
           throw new Error("File is required");
       }

       // Extract filename from the uploaded file
       const { filename } = req.file;

       // Create a new instance of CreateProductDTO with the request body and the image filename
       const createProductDto = new CreateProductDTO({
           ...req.body,
           image: filename, // Add the image filename to the product data
       });

       // Use the DTO to create a new product via the productService
       const product = await productService.createProduct(createProductDto);

       // Respond with the created product
       res.status(201).json(product);
   } catch (error) {
       res.status(500).json({ message: error.message });
   }
};

module.exports = { newProduct };