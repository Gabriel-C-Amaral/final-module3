import { InferSchemaType, Schema, Model, model, Types } from "mongoose";

const productSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
    },
    deletedAt: {
        type: Date,
        default: null
    },
    description: {
        type: String,
        required: true
    }

}, {
    timestamps: true
})

export type Product = InferSchemaType<typeof productSchema>

export const UserModel: Model<Product> = model('User', productSchema)