import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Purchases } from "./../entity/Purchases";
import { Users } from "../entity/Users";
import { UtilItem } from "../models/UtilModel";
import { Products } from "../entity/Products";
import { Items } from "../entity/Items";

export class PurchaseController {

    static getPurchases = async (req: Request, res: Response) => {
        const { id } = res.locals.jwtPayload;
        const purchaseDB = getRepository(Purchases);
        let purchases: Purchases[] = await purchaseDB.find({ where: { user: id }, relations: ['items'] });
        res.send(purchases);
    }

    static getPurchaseByPaymentStatus = async (req: Request, res: Response) => {
        const { id } = res.locals.jwtPayload;
        const { status } = req.params;
        const purchaseDB = getRepository(Purchases);
        let purchases: Purchases[] = await purchaseDB.find({ where: { user: id, purchasePaid: status } });
        res.send(purchases);
    }



    static getPurchaseById = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const { id } = req.params;
        const purchaseDB = getRepository(Purchases);

        let purchaseFound: Purchases = null;

        try {
            purchaseFound = await purchaseDB.findOneOrFail(id, { where: { user: userTokenId } })
        } catch (error) {
            return res.status(404).json({ message: "There are no data" });
        }

        res.send(purchaseFound);
    }

    static newPurchase = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const { date, description, paid, items } = req.body;
        const purchaseDB = getRepository(Purchases);
        const userDB = getRepository(Users);
        const utilItems: UtilItem[] = items;
        const purchase = new Purchases();
        purchase.purchaseDate = date;
        purchase.purchaseDescription = description;
        purchase.purchasePaid = paid;
        purchase.user = await userDB.findOne(userTokenId);
        const itemsBuy: Items[] = [];
        let totalPay: number = 0;
        for (const item of utilItems) {
            const itemFinally: Items = await PurchaseController.newItem(item);
            totalPay += Number(itemFinally.itemSubtotal);
            itemsBuy.push(itemFinally);
        }
        purchase.items = itemsBuy;
        purchase.purchaseTotal = totalPay.toString();
        let response = null;
        try {
            response = await purchaseDB.save(purchase);
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }
        delete purchase['user']
        res.send(response);
    }


    static updatePurchase = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const { date, description } = req.body;
        const items: UtilItem[] = req.body.items;
        const { id } = req.params;
        const purchaseDB = getRepository(Purchases);
        let purchaseFound: Purchases = null;
        try {
            purchaseFound = await purchaseDB.findOneOrFail({
                where: {
                    user: userTokenId,
                    purchaseId: id,
                    purchasePaid: false
                },
                relations: ['items', 'items.product']
            })
        } catch (error) {
            return res.status(404).json({ message: "There are no data", error });
        }

        let totalPay: number = 0;

        for (const item of items) {
            const pos = PurchaseController.isProductInList(item.productId, purchaseFound.items);
            const newItem = await PurchaseController.newItem(item);
            console.log("Pos: " + pos);

            if (pos !== -1) {
                //UPDATE ITEM
                purchaseFound.items[pos].itemPrice = newItem.itemPrice;
                purchaseFound.items[pos].product = newItem.product;
                purchaseFound.items[pos].itemQuantity = newItem.itemQuantity;
                purchaseFound.items[pos].itemSubtotal = newItem.itemSubtotal;
            } else {
                //ADD ITEM
                purchaseFound.items.push(newItem);
            }

            totalPay += Number(newItem.itemSubtotal);
        }

        purchaseFound.purchaseDescription = description;
        purchaseFound.purchaseDate = date;
        purchaseFound.purchaseTotal = totalPay.toString();

        let response = null;
        try {
            response = await purchaseDB.save(purchaseFound);
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }

        res.send(response);


    }

    static updatePaidPurchase = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const { id } = req.params;
        const purchaseDB = getRepository(Purchases);

        let purchaseFound: Purchases = null;
        try {
            purchaseFound = await purchaseDB.findOneOrFail({ where: { user: userTokenId, purchaseId: id } })
        } catch (error) {
            return res.status(404).json({ message: "There are no data" });
        }

        if (purchaseFound.purchasePaid) {
            return res.status(404).json({ message: "The purchase is already paid" });
        }

        purchaseFound.purchasePaid = true;

        let response = null;
        try {
            response = await purchaseDB.save(purchaseFound);
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }

        res.send(response);
    }


    static deletePurchase = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const { id } = req.params;
        const purchaseDB = getRepository(Purchases);
        const itemsDB = getRepository(Items);
        let purchaseFound: Purchases = null;
        try {
            purchaseFound = await purchaseDB.findOneOrFail({
                where: {
                    user: userTokenId,
                    purchaseId: id,
                    purchasePaid: false
                },
                loadRelationIds: true
            })
        } catch (error) {
            return res.status(404).json({ message: "There are no data" });
        }

        const items: number[] = <number[]><unknown>purchaseFound.items;
        const { affected } = await itemsDB.delete(items);
        const response = await purchaseDB.delete(id);

        res.json({
            "message": "Purchase deleted successfully!",
            "affected": response.affected + affected
        });

    }

    static deleteItem = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const { id } = req.params;
        const purchaseDB = getRepository(Purchases);
        const itemsDB = getRepository(Items);
        let itemFound = null;
        try {
            itemFound = await itemsDB.createQueryBuilder("items").loadAllRelationIds()
                .innerJoin("items.product", "product")
                .innerJoin("product.user", "user")
                .where("user.userId = :userId AND items.itemId = :itemId",
                    { userId: userTokenId, itemId: id }).getOneOrFail();

        } catch (error) {
            return res.status(404).json({ message: "There are no data", error });
        }

        const purchaseId: number = <number><unknown>itemFound.purchase;
        const purchase = await purchaseDB.findOne(purchaseId, { relations: ["items"] });

        if (purchase.items.length === 1) {
            return res.status(404).json({ message: "Error to Delete", "error": "You cannot delete the only item" });
        }

        if (purchase.purchasePaid === true) {
            return res.status(404).json({ message: "Error to Delete", "error": "You cannot delete a purchase paid" });
        }

        let total = 0;
        for (const item of purchase.items) {
            if (item.itemId !== Number(id)) {
                total += Number(item.itemSubtotal);
            }
        }
        purchase.purchaseTotal = total.toString();
        try {
            await purchaseDB.save(purchase);
        } catch (error) {
            return res.status(404).json({ message: "Error Update", error });
        }
        const response = await itemsDB.delete(id);
        res.json({
            "message": "Item deleted successfully!",
            "affected": response.affected
        });
    }

    static newItem = async (utilItem: UtilItem): Promise<Items> => {
        const productDB = getRepository(Products);
        const productFound = await productDB.findOne(utilItem.productId);
        const item = new Items();

        let priceSaved = "";
        if (Number(utilItem.price) === 0) {
            priceSaved = productFound.productCommonPrice;
        } else {
            priceSaved = utilItem.price;
        }
        item.itemPrice = priceSaved;
        item.itemQuantity = utilItem.quantity.toString();
        item.product = productFound;
        item.itemSubtotal = (utilItem.quantity * Number(priceSaved)).toString();
        return item;
    }

    static isProductInList = (productId: number, items: Items[]): number => {
        let pos = 0;
        for (const item of items) {
            if (productId === item.product.productId) {
                return pos;
            }
            pos++;
        }

        return -1;
    }

}