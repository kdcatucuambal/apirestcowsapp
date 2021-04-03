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

    static getTempRecordsByDates = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { from, to } = req.params;
        const tempRecDB = getRepository(TempRecord);
        // const fromT = '2020-01-01';
        // const toT = '2020-01-10';
        const recordsFound = await tempRecDB.find({ where: { tempRecordDate: Between(from, to), user: userIdToken }, order: { tempRecordDate: "DESC" } });
        res.send(recordsFound);

    }

    static newTempRecord = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { morning, afternoon, description, date } = req.body;
        const tempRecDB = getRepository(TempRecord);
        const recordsFound: TempRecord[] = await tempRecDB.find({
            where: {
                tempRecordDate: date,
                user: userIdToken
            }
        });
        
        if (recordsFound.length !== 0) {
            return res.status(404).json({ message: "Error date" });
        }

        const record = new TempRecord();
        record.user = userIdToken;
        record.tempRecordMorning = morning;
        record.tempRecordAfternoon = afternoon;
        record.tempRecordDescription = description;
        record.tempRecordDate = date;

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
        const { morning, afternoon, description } = req.body;
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
        recordFound.tempRecordMorning = morning;
        recordFound.tempRecordAfternoon = afternoon;
        recordFound.tempRecordDescription = description;
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