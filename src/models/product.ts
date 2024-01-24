import { InferSchemaType, Schema, Model, model, Types } from "mongoose";

const productSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    deletedAt: {
        type: Date,
        default: null
    },
    isAdministrator: {
        type: Boolean,
        required: true
    }
}, {
    timestamps: true
})

export type Product = InferSchemaType<typeof productSchema>

export const UserModel: Model<Product> = model('User', productSchema)