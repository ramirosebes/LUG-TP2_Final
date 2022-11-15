import { Request, Response } from "express";
import productModel from "../models/product";
import productDetailModel from "../models/productDetail";

const productController = {
    getProduct:async (req: Request, res: Response) => {
        try
        {
            const allProducts = await productModel.find()
            res.status(200).send(allProducts)
        }
        catch (error)
        {
            res.status(500).send(error)
        }
    },
    getSpecificProduct:async (req: Request, res: Response) => {
        const myProduct = await productModel.findOne({name: req.body.name})
        if(myProduct == null){
            res.send('El producto seleccionado no existe.')
        } else{
            res.send(myProduct)
        }
        
    }
}

export default productController