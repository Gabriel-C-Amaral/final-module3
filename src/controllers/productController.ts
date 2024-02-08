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

export const editProduct = async (req: Request, res: Response) => {
  const productData = req.body;
  const { id } = productData; // Extract the ID from the body

  if (!id) {
      return res.status(400).json({ error: "Product ID must be provided" });
  }

  try {
      const { id: _, ...updateData } = productData;

      if (req.file) {
          updateData.image = req.file.filename; // Update the image path if a new file is uploaded
      }

      // Find the product by ID and update it with the provided data
      const updatedProduct = await ProductModel.findByIdAndUpdate(id, updateData, { new: true, runValidators: true }); // validate the Schema before applying the update

      if (!updatedProduct) {
          return res.status(404).json({ error: "Product not found" });
      }

      res.status(200).json(updatedProduct);
  } catch (error) {
      console.error("Error updating product:", error);
      res.status(500).json({ error: "Failed to update product" });
  }
};