import { model, Schema, Types, Document } from "mongoose";
import productDetail from "./productDetail";

export interface IDetail extends Document {
    productName: string
    quantity: number
    price: number
    subTotal: number
}

interface ICart extends Document {
    detail: IDetail[]
    total: number
}
const cartSchema = new Schema<ICart>(
    {
        detail: [{
            productName: {
                type: String,                        
            },
            quantity: {
                type: Number,
            },
            price: {
                type: Number,
            },
            subTotal: {
                type: Number,                
            }
        }],
        total: {
            type: Number,
            default: 0
        }
    },
)

export default model<ICart>("Cart" , cartSchema)