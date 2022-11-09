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

            //Variables Globales


            //Checkeo que el producto exista
            if (myProduct == null) { //Comparo con null
                //Si no existe...
                res.send('El producto seleccionado no existe.') //Si no existe = nulo

            } else{ //Si existe...
                //Checkeo si ya existe un Product Detail con el nombre del producto ingresado
                if (myProductDetail == null) {
                //Si no existe dicho Product Detail
                //Creo el nuevo ProductDetail
                const newPD = new productDetailModel({
                    productName: myProduct.name,
                    quantity: 1,
                    price: myProduct.price,
                    subTotal: myProduct.price
                })
                newPD.save()
                //Cart

                res.send(newPD)

                } else if (myProductDetail != null){ //Si el ProductDetail no es nulo
                    //Product Detail//

                    //Vriables
                    const newQuantity: any = myProductDetail.quantity + 1
                    const newPrice: any = myProductDetail.price
                    const newSubtotal: any = newQuantity * newPrice

                    myProductDetail.quantity = newQuantity
                    myProductDetail.subTotal = newSubtotal
                    //await productDetailModel.findOneAndUpdate({productName: myProduct.name}, {quantity: newQuantity, subTotal: newSubtotal})
                    myProductDetail.save()

                    //Cart
                    myCart[0].detail.push(myProductDetail)


                    res.send(myCart)
                }
                //meter validacion si el carrito existe o no (if myCart == null...)   
            }
            
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