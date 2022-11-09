import { Request, Response } from "express";
import cartModel from "../models/cart"
import productModel from "../models/product";
import productDetailModel from "../models/productDetail"

export const cartControllerNew = {
    addProduct:async (req: Request, res: Response) => {
        addProduct:async (req: Request, res: Response) => {
            try {
                //Busco el Producto con el nombre colocado en PostMan
                const myProduct = await productModel.findOne({name: req.body.name})
    
                //Checkeo que el producto exista
                if (myProduct == null) { //Si no existe...
    
                    res.send('El producto seleccionado no existe.') //Si no existe = null
    
                } else{ //Si existe...
    
                    const myProductDetail = await productDetailModel.findOne({productName: req.body.name})
                    if (myProductDetail == null) { //Checkeo si ya existe un Product Detail con el nombre del producto ingresado
                    //Si no existe dicho Product Detail
                    //Creo el nuevo ProductDetail
                    const newPD = new productDetailModel()
    
                    const name: any = myProduct.name
                    const price: any = myProduct.price
                    const quantity: any = 0
    
                    newPD.productName = name
                    newPD.quantity += 1
                    newPD.price = price
                    newPD.subTotal = price * newPD.quantity
                    newPD.save()
                    } else if (myProductDetail != null){
                        myProductDetail.quantity += 1
                    }
    
                    //Creo el nuevo ProductDetail
                    const newPD = new productDetailModel()
    
                    const name: any = myProduct.name
                    const price: any = myProduct.price
                    const quantity: any = 0
    
    
                    newPD.productName = name
                    newPD.quantity += 1
                    newPD.price = price
                    newPD.subTotal = price * newPD.quantity
                    newPD.save()
                    res.send(newPD)
    
                    
    
                }
    
    
                
                
            //res.send(product)
            } catch (error) {
                res.status(500).send(error)
            }
        }
    },
    addProductNew:async (req: Request, res: Response) => {
        try {
            //Busco si existe el Producto con el nombre colocado en PostMan
            const myProduct = await productModel.findOne({name: req.body.name})
            const myProductDetail = await productDetailModel.findOne({productName: req.body.name})
            const myCart = await cartModel.find()

            //Checkeo que el producto exista
            if (myProduct == null) { //Si no existe...

                res.send('El producto seleccionado no existe.') //Si no existe = null

            } else{ //Si existe...

                if (myProductDetail == null) { //Checkeo si ya existe un Product Detail con el nombre del producto ingresado
                //Si no existe dicho Product Detail
                //Creo el nuevo ProductDetail

                //Product Detail
                const newPD = new productDetailModel({})

                //Variables
                const name: any = myProduct.name
                const price: any = myProduct.price 
                const quantity: any = 1
                const subTotal: any = price * quantity

                newPD.productName = name
                newPD.quantity = quantity
                newPD.price = price
                newPD.subTotal = subTotal
                newPD.save()

                //Cart

                res.send(newPD)

                } else if (myProductDetail != null){
                    //Product Detail//

                    //Vriables
                    const newQuantity: any = myProductDetail.quantity + 1
                    const newPrice: any = myProductDetail.price
                    const newSubtotal: any = newQuantity * newPrice

                    myProductDetail.quantity = newQuantity
                    myProductDetail.subTotal = newSubtotal
                    //await productDetailModel.findOneAndUpdate({productName: myProduct.name}, {quantity: newQuantity, subTotal: newSubtotal})
                    myProductDetail.save()

                    //Cart//
                    myCart[0].detail[0].productName == myProduct.name //myCart[0] especifica que de toda la Array de Carritos, se selecciono la que esta en la posicion 0 (que es la unica existente)
                    var myCartTotal: any = myCart[0].total
                    

                    for (let i=0; i<myCart[0].detail.length; i++){
                        if (myCart[0].detail[i].productName == myProduct.name) {
                            myCart[0].detail[i].productName = myProductDetail.productName
                            myCart[0].detail[i].subTotal = myProductDetail.subTotal
                            myCartTotal = myCart[0].detail[i].subTotal
                            myCart[0].total += myCartTotal
                        }
                    }



                    

                    res.send(/*No anda*/)
                }
                //myCart[0].detail[0].productName = 

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
