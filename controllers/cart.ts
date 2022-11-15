import { Request, Response } from "express";
import cartModel from "../models/cart"
import productModel from "../models/product";
import productDetailModel from "../models/productDetail"

export const cartController = {
    getCart: async (req: Request, res: Response) => {
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
    addProduct: async (req: Request, res: Response) => {
        try {
            const myProduct = await productModel.findOne({name: req.body.name})
            const myCart = await cartModel.find()
            const myProductDetailIdx = myCart[0].detail.findIndex((pd) => pd.productName === req.body.name) //accedo al carrito en la pos 0 y busco dentro de details algun pd que coincida con el tipo de dato y nombre que busco  //(---)compara el tipo de dato y lo buscado
            if (!myProduct) { //no existe
                res.status(404).send(`El producto ${req.body.name} no existe`)
                return
            } else{
                if (myProductDetailIdx === -1) { //o sea que no existe (-1 quiere decir que no existe) un product detail con ese nombre de producto
                    if (myProduct.stock >= 1) {
                        const newPD = new productDetailModel({
                            productName: myProduct.name,
                            quantity: 1,
                            price: myProduct.price,
                            subTotal: myProduct.price * 1
                        })
                        await newPD.save()
                        myCart[0].detail.push(newPD)
                        myProduct.stock -= 1
                        await myProduct.save()
                        //Cart
                        myCart[0].total += myProduct.price
                        //
                        await myCart[0].save()
                    } else {
                        res.status(404).send(`El producto ${req.body.name} no tiene stock`)
                        return
                    }
                } else {
                    const myDetail = myCart[0].detail[myProductDetailIdx]
                    if (myDetail) {
                        if (myProduct.stock >= 1) {
                            myDetail.quantity += 1
                            myProduct.stock -= 1
                            myDetail.subTotal = myDetail.price * myDetail.quantity
                            //Cart
                            myCart[0].total += myProduct.price
                            //
                            await myProduct.save()
                            await myCart[0].save()
                        } else {
                            res.status(404).send(`El producto ${req.body.name} no tiene stock`)
                            return
                        }
                    }
                }
            }
            await res.send(myCart)
        } catch (error) {
            res.status(500).send(error)
        }
    },
    deleteProduct: async (req: Request, res: Response) => {

        const myProduct = await productModel.findOne({name: req.body.name})
        const myCart = await cartModel.find()
        const myProductDetailIdx = myCart[0].detail.findIndex((pd) => pd.productName === req.body.name) //recorre todos los product details con en el nombre del producto
        //const id = await productDetailModel.findOneAndDelete(productName === req.body.name)
        if (!myProduct){
            res.status(404).send(`El producto ${req.body.name} no existe`)
            return
        } else {
            if (myProductDetailIdx === -1) {
                res.status(404).send(`El detalle del producto ${req.body.name} no esta en el carrito`)
                return
            } else {
                const myDetail = myCart[0].detail[myProductDetailIdx]
                if (myDetail){
                    //delete myCart[0].detail[myProductDetailIdx] //funciona pero no se guarda y queda la posicion vacia pero existente
                    //delete(myCart[0].detail[myProductDetailIdx]) //funciona pero no se guarda y queda la posicion vacia pero existente
                    myProduct.stock += myDetail.quantity
                    myCart[0].detail.splice(myProductDetailIdx, 1) //Borra el PD solicitado, primero la pos del objeto a eliminar y dps la cantidad
                    await myProduct.save()
                    //Cart
                    myCart[0].total -= myDetail.subTotal
                    //
                    await myCart[0].save()
                }
            }
        }
        await res.send(myCart)
    },
}