import { Request, Response } from "express";
import { Product, ProductModel } from "../models/product";


//Create Product
export const createProduct = async (req: Request, res: Response) => {
  
    try {
      const newProduct: Product = req.body; // Get product data from the request body  
      
      const user = new ProductModel(newProduct); 
      await user.save(); 
      res.status(201).json(user); // Respond with the created product
    } catch (error) {
      res.status(500).json({ error: "Could not create product" });
    }
  };

//List all the products

export const getAllProducts = async (req: Request, res: Response) => {
    try {
        const products = await ProductModel.find({}); // Find all products
        res.status(200).json(products);        
    } catch (error) {
        res.status(500).json({ error: "Could not find the products" });
    }
}

// Get Product by ID

export const getProductById = async (req: Request, res: Response) => {
    try {
        const productId = req.body.id; 

        const product = await ProductModel.findById(productId);
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        res.status(200).json(product);
    } catch (error) {
        
        res.status(500).json({ error: "Invalid Product ID" });
    }
};