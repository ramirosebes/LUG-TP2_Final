import { model, Schema, SchemaTypes, Types, Document } from "mongoose";


const productSchema = new Schema(
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

export default model("Product", productSchema);