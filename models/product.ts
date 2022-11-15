import { model, Schema, SchemaTypes, Types, Document, ObjectId } from "mongoose";
import provider from "./provider";

interface IProduct {
    name: string
    price: number
    stock: number
    provider: ObjectId
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
        },
        provider: {
            type: Schema.Types.ObjectId,
            ref: "Provider"
        }
    }
)

export default model<IProduct>("Product", productSchema);