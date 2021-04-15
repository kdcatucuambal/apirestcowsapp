import { getRepository, Between } from "typeorm";
import { Request, Response } from "express";
import { TempRecord } from "../entity/TempRecord";

export class TempRecordController {

    static getTempRecords = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const tempRecDB = getRepository(TempRecord);
        const records = await tempRecDB.find({ where: { user: userIdToken }, order: { tempRecordDate: "DESC" } });
        res.send(records);
    }

    static getTempRecorById = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { id } = req.params;
        const tempRecDB = getRepository(TempRecord);

        let recordFound: TempRecord = null;

        try {
            recordFound = await tempRecDB.findOneOrFail(id, { loadRelationIds: true, order: { tempRecordDate: "DESC" } });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", records: [] });
        }

        if (userIdToken !== recordFound.user) {
            return res.status(404).json({ message: "There are no data", records: [] });
        }
        delete recordFound['user'];
        res.send(recordFound);
    }


    static getTempRecordsLimit = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const tempRecDB = getRepository(TempRecord);
        const records = await tempRecDB.find({ where: { user: userIdToken }, order: { tempRecordDate: "DESC" }, take: 7 });
        res.send(records);
    }


    static getTempRecordsByDates = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { from, to } = req.params;
        const tempRecDB = getRepository(TempRecord);
        const recordsFound = await tempRecDB.find({
            where:
            {
                tempRecordDate: Between(from, to),
                user: userIdToken
            },
            order: { tempRecordDate: "DESC" }
        });
        res.send(recordsFound);

    }

    static newTempRecord = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { tempRecordMorning, tempRecordAfternoon, tempRecordDescription, tempRecordDate } = req.body;
        const tempRecDB = getRepository(TempRecord);

        const recordsFound: TempRecord[] = await tempRecDB.find({
            where: {
                tempRecordDate: tempRecordDate,
                user: userIdToken
            }
        });

        if (recordsFound.length !== 0) {
            return res.status(404).json({ message: "Error date" });
        }

        const record = new TempRecord();
        record.user = userIdToken;
        record.tempRecordMorning = tempRecordMorning;
        record.tempRecordAfternoon = tempRecordAfternoon;
        record.tempRecordDescription = tempRecordDescription;
        record.tempRecordDate = tempRecordDate;

        let response = null;

        try {
            response = await tempRecDB.save(record);
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }

        res.json({
            "message": "TempRecord created successfully!",
            "response": response
        });
    }

    static updateTempRecord = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { tempRecordMorning, tempRecordAfternoon, tempRecordDescription } = req.body;
        const { id } = req.params;
        const tempRecDB = getRepository(TempRecord);
        let recordFound: TempRecord = null;
        try {
            recordFound = await tempRecDB.findOneOrFail(id, { loadRelationIds: true });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", records: [] });
        }
        if (userIdToken !== recordFound.user) {
            return res.status(404).json({ message: "There are no permission" });
        }
        recordFound.tempRecordMorning = tempRecordMorning;
        recordFound.tempRecordAfternoon = tempRecordAfternoon;
        recordFound.tempRecordDescription = tempRecordDescription;
        let response = null;
        try {
            response = await tempRecDB.save(recordFound);
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }
        res.json({
            "message": "TempRecord updated successfully!",
            "response": response
        });
    }

    static deleteTempRecord = async (req: Request, res: Response) => {

        const userIdToken = res.locals.jwtPayload.id;
        const { id } = req.params;
        const tempRecDB = getRepository(TempRecord);
        let recordFound: TempRecord = null;

        try {
            recordFound = await tempRecDB.findOneOrFail(id, { loadRelationIds: true });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", records: [] });
        }
        if (userIdToken !== recordFound.user) {
            return res.status(404).json({ message: "There are no permission" });
        }

        const response = await tempRecDB.delete(id);

        res.json({
            "message": "TempRecord deleted successfully!",
            "affected": response.affected
        });
    }

}