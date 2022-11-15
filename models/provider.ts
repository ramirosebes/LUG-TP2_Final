import { model, Schema, Document, SchemaType, SchemaTypes, Types } from "mongoose";

interface IProvider extends Document { //Modelo dentro del codigo
    name: string
    adress: string
}

const providerSchema = new Schema<IProvider>(
    {
        name: {
            type: String,
        },
        adress: {
            type: String
        }
    }
)

export default model<IProvider>("Provider", providerSchema)