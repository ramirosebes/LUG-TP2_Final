import { Request, Response } from "express";
import providerModel from "../models/provider";

const providerController = {
    getProvider:async (req: Request, res: Response) => {
        try
        {
            const allProvider = await providerModel.find()
            res.status(200).send(allProvider)
        }
        catch (error)
        {
            res.status(500).send(error)
        }
    },
}

export default providerController