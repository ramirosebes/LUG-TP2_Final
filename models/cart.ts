import { model, Schema, Types, Document } from "mongoose";
import productDetail from "./productDetail";


const cartSchema = new Schema(
    {
        detail: [{
            productName: {
                type: String,
                ref: "ProductDetail"
                
            },
            subTotal: {
                type: Number,
                ref: "ProductDetail"
                
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