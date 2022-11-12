import { Request, Response } from "express";
import cartModel from "../models/cart"
import productModel from "../models/product";
import productDetailModel from "../models/productDetail"

/*export*/ const cartController = {
    getCart:async (req: Request, res: Response) => {
        try {
            const allCart = await cartModel.find()
            if (allCart.length == 0) {
            const newCart = new cartModel()
            await newCart.save()
            res.send(newCart)
        }else {
            res.send(allCart[0])
        }
        } catch (error) {
            res.status(500).send(error)
        }
    },
    addProduct:async (req: Request, res: Response) => {
        try {
            const myProduct = await productModel.findOne({name: req.body.name})
            const myCart = await cartModel.find()
            const myProductDetailIdx = myCart[0].detail.findIndex((pd) => pd.productName === req.body.name) //accedo al carrito en la pos 0 y busco dentro de details algun pd que coincida con el tipo de dato y nombre que busco  //(---)compara el tipo de dato y lo buscado
            if (!myProduct) { //no existe
                res.status(404).send('El producto seleccionado no existe.')
            } else{
                if (myProductDetailIdx === -1) { //o sea que no existe (-1 quiere decir que no existe) un product detail con ese nombre de producto
                const newPD = new productDetailModel({
                    productName: myProduct.name,
                    quantity: 1,
                    price: myProduct.price,
                    subTotal: myProduct.price * 1
                })
                await newPD.save()
                myCart[0].detail.push(newPD)
                await myCart[0].save()
                } else {
                    const myDetail = myCart[0].detail[myProductDetailIdx]
                    if (myDetail) {
                        myDetail.quantity += 1
                        myDetail.subTotal = myDetail.price * myDetail.quantity
                        await myCart[0].save()
                    }
                }
            }
            await res.send(myCart)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    pruebasCart: async (req: Request, res: Response) => {
        try {



        } catch (error) {
            res.status(500).send(error)
        }
    }
}