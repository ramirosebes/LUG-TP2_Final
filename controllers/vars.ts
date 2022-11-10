import { Request, Response } from "express";
import cartModel from "../models/cart"
import productModel from "../models/product";
import productDetailModel from "../models/productDetail"

export const cartController = {
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
            //Queries
            //Busco si existe el Producto con el nombre colocado en PostMan
            const myProduct = await productModel.findOne({name: req.body.name})
            const myProductDetail = await productDetailModel.findOne({productName: req.body.name})
            const myCart = await cartModel.find()

            //Variables        
            //const stock = myProduct?.stock

            if (myProduct == null) {
                res.status(100).send('El producto seleccionado no existe.')
            } else if (myProduct != null){
                if (myProductDetail == null) {
                if(myProduct.stock != null && myProduct.stock >= req.body.cantidad){
                    const price: any = myProduct.price
                    const quantity: any = myProduct.stock
                    const newSubTotal = price * quantity

                    const newPD = new productDetailModel({
                        productName: myProduct.name,
                        quantity: req.body.cantidad,
                        price: myProduct.price,
                        subTotal: newSubTotal
                    })
                    myProduct.stock = myProduct.stock - quantity
                    newPD.save()
                    myProduct.save()
                } else if(myProduct.stock != null && myProduct.stock < req.body.quantity){
                    res.status(400).send(`Stock insuficiente del producto ${myProduct.name}`)
                }
                } else if (myProductDetail != null){ //Si el ProductDetail no es nulo
                    //Vriables
                    const newQuantity = myProductDetail.quantity + req.body.quantity

                    if(myProduct.stock != null && myProduct.stock >= newQuantity){
                        
                        /*const newPrice: any = myProduct.price
                        const newSubtotal: any = newQuantity * newPrice
                        myProductDetail.quantity = newQuantity
                        myProductDetail.subTotal = newSubtotal
                        myProduct.stock = myProduct.stock - newQuantity
                        myProductDetail.save()
                        myProduct.save()*/
                        
                    } else if (myProduct.stock != null && myProduct.stock >= newQuantity){
                        res.status(400).send(`Stock insuficiente del producto ${myProduct.name}}`)
                    }
                }
            }
            const otherProductDetail: any = await productDetailModel.findOne({productName: req.body.name})
           
            await myCart[0].detail.push(otherProductDetail)
            
            

            await res.send(myCart)

        //res.send(product)
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