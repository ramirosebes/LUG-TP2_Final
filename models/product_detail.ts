import { model, Schema, SchemaType, SchemaTypes, Types, Document } from "mongoose";


const productDetailSchema = new Schema(
    {
        product: {
            type: Schema.Types.ObjectId,
            ref: "Product"
        },
        quantity: {
            type: Number,
            require: true
        },
        price: {
            type: Number,
            require: true
        },
        subTotal: {
            type: Number,
            require: true
        }
    },
    {
        timestamps: true
    }
)

export default model("Product_Detail", productDetailSchema)