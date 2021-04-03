import { getRepository, ILike, Like } from "typeorm";
import { Request, Response } from "express";
import { Products } from ".././entity/Products";

export class ProductController {

    static getProducts = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const productDB = getRepository(Products);
        const products: Products[] = await productDB.find({ where: { user: userIdToken } })
        res.send(products);
    }

    static getProductById = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { id } = req.params;
        const productDB = getRepository(Products);

        let productFound: Products = null;

        try {
            productFound = await productDB.findOneOrFail(id, { loadRelationIds: true });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", products: [] });
        }

        if (userIdToken !== productFound.user) {
            return res.status(404).json({ message: "There are no data", products: [] });
        }

        delete productFound['user'];
        delete productFound['items'];

        res.send(productFound);
    }

    static getMatchingProductsByName = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { text } = req.params;
        const finalParam = `%${text}%`;
        const productDB = getRepository(Products);
        let products: Products[] = null;
        products = await productDB.find(
            {
                where: {
                    productName: ILike(finalParam),
                    user: userIdToken
                }
            });
            
        res.send(products);
    }

    static newProduct = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { name, commonPrice } = req.body;

        const productDB = getRepository(Products);

        const product = new Products();
        product.productName = name;
        product.productCommonPrice = commonPrice;
        product.user = userIdToken;

        let response = null;

        try {
            response = await productDB.save(product);
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }

        res.json({
            "message": "Product created successfully!",
            "response": response
        })
    }

    static updateProduct = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { id } = req.params;
        const { name, commonPrice } = req.body;
        const productDB = getRepository(Products);

        let productFound: Products = null;

        try {
            productFound = await productDB.findOneOrFail(id, { loadRelationIds: true });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", product: null });
        }

        if (userIdToken !== productFound.user) {
            return res.status(404).json({ message: "There are no permission", product: null });
        }

        productFound.productName = name;
        productFound.productCommonPrice = commonPrice;

        let response = null;

        try {
            response = await productDB.save(productFound);
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }

        delete productFound['user'];
        delete productFound['items'];
        res.json({
            "message": "Product updated successfully!",
            "response": response
        })
    }

    static deleteProduct = async (req: Request, res: Response) => {

        const userIdToken = res.locals.jwtPayload.id;
        const { id } = req.params;
        const productDB = getRepository(Products);

        let productFound: Products = null;

        try {
            productFound = await productDB.findOneOrFail(id, { loadRelationIds: true });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", product: null });
        }

        if (userIdToken !== productFound.user) {
            return res.status(404).json({ message: "There are no permission", product: null });
        }

        const response = await productDB.delete(id);

        res.json({
            "message": "Product deleted successfully!",
            "affected": response.affected
        });
    }


}