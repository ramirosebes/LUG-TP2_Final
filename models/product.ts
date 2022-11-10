import { model, Schema, SchemaTypes, Types, Document } from "mongoose";

interface IProduct {
    name: string
    price: number
    stock: number
}
const productSchema = new Schema<IProduct>(
    {
        name: {
            type: String,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        stock: {
            type: Number,
            require: true
        }
    }
)

export default model<IProduct>("Product", productSchema);