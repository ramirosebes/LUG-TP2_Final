import { model, Schema, Types, Document } from "mongoose";
import productDetail from "./product_detail";


const cartSchema = new Schema(
    {
       productDetails: [{
            type: Schema.Types.ObjectId,
            ref: "Product_Detail"
       }],
       total: {
            type: Number,
            default: 0
       }
    },
    {
        timestamps: true
    }
)

export default model("Model" , cartSchema)