import { InferSchemaType, Schema, Model, model, Types } from "mongoose";

const userSchema = new Schema({
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
        required: true,
        default: false
    },
    wallet: {
        type: Number,
        required: true
    }
}, {
    timestamps: true
})

export type User = InferSchemaType<typeof userSchema>

export const UserModel: Model<User> = model('User', userSchema)