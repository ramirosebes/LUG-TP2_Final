import { model, Schema, Types, Document } from "mongoose";
import productDetail from "./productDetail";


const cartSchema = new Schema(
    {
        detail: [{
            productName: {
                type: String,
            },
            subTotal: {
                type: Number
            }
        }],
        total: {
            type: Number,
            default: 0
        }
    },
    /*{
        timestamps: true
    }*/
)

export default model("Cart" , cartSchema)