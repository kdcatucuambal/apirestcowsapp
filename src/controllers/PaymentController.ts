import { Between, getRepository } from "typeorm";
import { Request, Response } from "express";
import { Payments } from "../entity/Payments";
import { TempRecord } from "../entity/TempRecord";
import { Records } from "../entity/Records";
import { Users } from "../entity/Users";

export class PaymentController {

    static getPayments = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const paymentDB = getRepository(Payments);

        const payments = await paymentDB.find({ where: { user: userTokenId } });
        res.send(payments);
    }

    static getPaymentById = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const { id } = req.params;
        const paymentDB = getRepository(Payments);
        let paymentFound = null;
        try {
            paymentFound = await paymentDB.findOneOrFail(id,
                { where: { user: userTokenId }, relations: ['records'] });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", error });
        }

        res.send(paymentFound);

    }

    static newPayment = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const { date, toDate, fromDate, literValue, totalLiters, paymentTotal } = req.body;
        const paymentDB = getRepository(Payments);
        const tempRecDB = getRepository(TempRecord);
        const userDB = getRepository(Users);

        const payment: Payments = new Payments();

        const recordsFound = await tempRecDB.find({
            where:
            {
                tempRecordDate: Between(fromDate, toDate),
                user: userTokenId
            },
            order: { tempRecordDate: "DESC" }
        });

        const recordsCreated: Records[] = [];
        for (const record of recordsFound) {
            const newRecord = new Records();
            newRecord.recordAfternoon = record.tempRecordAfternoon;
            newRecord.recordMorning = record.tempRecordMorning;
            newRecord.recordDate = record.tempRecordDate;
            newRecord.recordDescription = record.tempRecordDescription;
            recordsCreated.push(newRecord);
        }
        payment.records = recordsCreated;
        payment.paymentDate = date;
        payment.paymentFromDate = fromDate;
        payment.paymentToDate = toDate;
        payment.paymentLiterValue = literValue;
        payment.paymentTotalLiters = totalLiters;
        payment.paymentTotal = paymentTotal;
        payment.user = await userDB.findOne(userTokenId);

        let response = null;

        try {
            response = await paymentDB.save(payment);
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }

        const responseDeleted = await tempRecDB.delete({ tempRecordDate: Between(fromDate, toDate) });

        res.json({
            "message": "Payment created successfully!",
            "response": response,
            "tempRecords": responseDeleted
        });

    }



}