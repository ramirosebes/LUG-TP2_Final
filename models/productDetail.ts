import { model, Schema, SchemaType, SchemaTypes, Types, Document } from "mongoose";


const productDetailSchema = new Schema(
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
    /*{
        timestamps: true
    }*/
)

export default model("ProductDetail", productDetailSchema)