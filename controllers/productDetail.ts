import { Request, Response } from "express";
import productDetailModel from "../models/productDetail";

const productDetailController = {
    getProductDetail:async (req: Request, res: Response) => {
        try
        {
            const allProductsDetail = await productDetailModel.find()
            res.status(200).send(allProductsDetail)
        }
        catch (error)
        {
            res.status(500).send(error)
        }
    },
}

export default productDetailController