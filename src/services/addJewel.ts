import { Request, Response } from "express";
import { UserModel } from "../models/user";


export const addToUserWallet = async (req: Request, res: Response) => {
    const { email, amountToAdd } = req.body;

    try {
        // Find the user by email
        const user = await UserModel.findOne({ email: email });
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }

        // Add the amount to the user's wallet
        user.wallet += amountToAdd;

        // Save the updated user
        await user.save();

        // Respond with the updated user info
        res.status(200).json({
            message: "Wallet updated successfully",
            user: {
                email: user.email,
                wallet: user.wallet
            }
        });
    } catch (error) {
        console.error("Error updating user wallet:", error);
        res.status(500).json({ error: "Failed to update user wallet" });
    }
};
