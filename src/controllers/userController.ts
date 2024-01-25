import { Request, Response } from "express";
import { UserModel, User } from "../models/user";

// Create USER

export const createUser = async (req: Request, res: Response) => {
    try {
      const newUser: User = req.body; // Get user data from the request body
  
      // Check if a user with the same email already exists
      const existingUser = await UserModel.findOne({ email: newUser.email });
      if (existingUser) {
        return res.status(400).json({ error: "Email already exists" });
      }
  
      const user = new UserModel(newUser); // Create a new instance of UserModel
      await user.save(); // Save the user to the database
      res.status(201).json(user); // Respond with the created user
    } catch (error) {
      res.status(500).json({ error: "Could not create user" });
    }
  };