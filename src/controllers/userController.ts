import { Request, Response } from "express";
import { UserModel, User } from "../models/user";
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken';



// Create USER

export const createUser = async (req: Request, res: Response) => {
  
    try {
      const imagePath = req.file ? req.file.filename : undefined ;

      // const newUser: User = req.body; // Get user data from the request body
      const newProductData = {
        ...req.body,
        image: imagePath, // This adds the image filename to the new product data
      };


  
      // Check if a user with the same email already exists
      const existingUser = await UserModel.findOne({ email: newProductData.email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
      req.body.password = await bcrypt.hash(req.body.password, 10) // Encrypt password using bcrypt
  
      const user = new UserModel(newProductData); 
      await user.save(); 
      res.status(201).json(user); // Respond with the created user
    } catch (error) {
      res.status(500).json({ error: "Could not create user" });
    }
  };



  // Login USER

export const loginUser = async (req: Request, res: Response) => {
  try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await UserModel.findOne({ email });
      if (!user) {
          return res.status(404).json({ error: "User not found" });
      }

      // Compare submitted password with the hashed password in the database
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
          return res.status(400).json({ error: "Invalid credentials" });
      }

      // Generate JWT token
      const payload = { userId: user._id, isAdmin: user.isAdministrator }; 
      const token = jwt.sign(payload, process.env.JWT_SECRET!, { expiresIn: '1h' }); // the "!" its an non-null asssertion to bypass typescript

      res.status(200).json({ 
          message: "Login successful", 
          token: token,
          userId: user._id,
          isAdmin: user.isAdministrator
      });
  } catch (error) {
      res.status(500).json({ error: "Server error" });
  }
};