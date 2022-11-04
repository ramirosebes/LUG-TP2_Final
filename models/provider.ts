import { model, Schema, Document } from "mongoose";


const providerSchema = new Schema(
    {
        name: {
            type: String,
            require: true
        },
        adress: {
            type: String
        }
    }
)

export default model("Provider", providerSchema)