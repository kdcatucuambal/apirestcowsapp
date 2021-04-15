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

        const payments = await paymentDB.find({ where: { user: userTokenId }, order: { paymentDate: "DESC" } });
        res.send(payments);
    }

    static getPaymentsForChart = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const paymentDB = getRepository(Payments);

        const payments = await paymentDB.find({ where: { user: userTokenId }, order: { paymentDate: "DESC" }, take: 12 });
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
        const { paymentDate, paymentToDate,
            paymentFromDate, paymentLiterValue,
            paymentTotalLiters, paymentTotal } = req.body;
        const paymentDB = getRepository(Payments);
        const tempRecDB = getRepository(TempRecord);
        const userDB = getRepository(Users);

        const payment: Payments = new Payments();

        const recordsFound = await tempRecDB.find({
            where:
            {
                tempRecordDate: Between(paymentFromDate, paymentToDate),
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
        payment.paymentDate = paymentDate;
        payment.paymentFromDate = paymentFromDate;
        payment.paymentToDate = paymentToDate;
        payment.paymentLiterValue = paymentLiterValue;
        payment.paymentTotalLiters = paymentTotalLiters;
        payment.paymentTotal = paymentTotal;
        payment.user = await userDB.findOne(userTokenId);

        let response = null;

        try {
            response = await paymentDB.save(payment);
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }

        const responseDeleted = await tempRecDB.delete({ tempRecordDate: Between(paymentFromDate, paymentToDate), user: userTokenId });

        res.json({
            "message": "Payment created successfully!",
            "response_id": response.paymentId,
            "tempRecords": responseDeleted
        });

    }


    static deletePaymentById = async (req: Request, res: Response) => {
        const userTokenId = res.locals.jwtPayload.id;
        const { id } = req.params;
        const paymentDB = getRepository(Payments);
        const recordsDB = getRepository(Records);
        let paymentFound: Payments = null;
        try {
            paymentFound = await paymentDB.findOneOrFail(id,
                { where: { user: userTokenId }, loadRelationIds: true });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", error });
        }

        const records: number[] = <number[]><unknown>paymentFound.records;
        let affected = 0;
        if (records.length > 0) {
            const r = await recordsDB.delete(records);
            affected = r.affected;
        }


        const response = await paymentDB.delete(id);
        res.json({
            "message": "Payment deleted successfully!",
            "affected": response.affected + affected
        });
    }



}