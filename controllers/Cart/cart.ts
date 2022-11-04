import { Request, Response } from "express";
import cartModel from "../../models/cart"
import productModel from "../../models/product";
import prodductDetailModel from "../../models/product_detail"

export const cartController = {
    getCart:async (req: Request, res: Response) => {
        const allCart = await cartModel.find()
            if (allCart.length == 0) {
            const newCart = new cartModel()
            await newCart.save()
            res.send(newCart)
        }
        else {
            res.send(allCart[0])
        }
    },

}