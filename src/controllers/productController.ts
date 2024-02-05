import { Request, Response } from "express";
import { Product, ProductModel } from "../models/product";

//Create Product
export const createProduct = async (req: Request, res: Response) => {
  
    try {
      const imagePath = req.file ? req.file.filename : undefined ;

      const newProductData = {
        ...req.body,
        image: imagePath, // This adds the image filename to the new product data
      };

      const product = new ProductModel(newProductData); 
      await product.save(); 
      res.status(201).json(product); // Respond with the created product
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