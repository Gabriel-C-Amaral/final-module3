import { Request, Response } from "express";
import { UserModel } from "../models/user";
import { ProductModel } from "../models/product"; 

// Redeem a product by a user
export const redeemProduct = async (req: Request, res: Response) => {
    const { userId, productId } = req.body;

    try {
        const user = await UserModel.findById(userId);
        const product = await ProductModel.findById(productId);

        // Check if user and product exist
        if (!user) {
            return res.status(404).json({ error: "User not found" });
        }
        if (!product) {
            return res.status(404).json({ error: "Product not found" });
        }

        // Check if user has enough balance to redeem the product
        if (user.wallet < product.price) {
            return res.status(400).json({ error: "Insufficient wallet balance to redeem this product" });
        }

        // Subtract product price from user's wallet
        user.wallet -= product.price;

        // If it has an redeemed product list: user.redeemedProducts.push(product);

        await user.save();

        res.status(200).json({
            message: "Product redeemed successfully",
            user: {
                email: user.email,
                wallet: user.wallet,
                // redeemedProducts: user.redeemedProducts, // Include this line if tracking redeemed products
            }
        });
    } catch (error) {
        console.error("Error redeeming product:", error);
        res.status(500).json({ error: "Failed to redeem product" });
    }
};
