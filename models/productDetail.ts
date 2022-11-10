import { model, Schema, SchemaType, SchemaTypes, Types, Document } from "mongoose";
import { IDetail } from "./cart";


const productDetailSchema = new Schema<IDetail>(
    {
        productName: {
            type: String
        },
        quantity: {
            type: Number,
            default: 0,
        },
        price: {
            type: Number,
        },
        subTotal: {
            type: Number,
        }
    },
)

export default model<IDetail>("ProductDetail", productDetailSchema)