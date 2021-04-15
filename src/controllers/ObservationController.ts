import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Observations } from "./../entity/Observations";
import { TypesObservations } from "./../entity/TypesObservations";
import { Cows } from "./../entity/Cows";


export class ObservationController {

    static getObservations = async (req: Request, res: Response) => {
        //Get User id logged
        const { id } = res.locals.jwtPayload;
        const observationBD = getRepository(Observations);
        const typeObsBD = getRepository(TypesObservations);
        const cowBD = getRepository(Cows);

        const observations: Observations[] = await observationBD
            .createQueryBuilder("observations").loadAllRelationIds()
            .innerJoin("observations.cow", "cow")
            .innerJoin("cow.user", "user")
            .where("user.userId = :userId", { userId: id })
            .orderBy("observations.observationDate", "DESC").getMany();

        for (const obs of observations) {
            const cowId = obs.cow;
            const cowFound = await cowBD.findOne(cowId, { select: ["cowName", "cowActive", "cowId"] });
            obs.cow = cowFound;
            const typeId = obs.type;
            const typeFound = await typeObsBD.findOne(typeId);
            obs.type = typeFound;
        }

        res.send(observations);
    }

    static getObservationsByCow = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { id } = req.params;
        const observationBD = getRepository(Observations);
        const cowBD = getRepository(Cows);

        let cowFound: Cows = null;

        try {
            cowFound = await cowBD.findOneOrFail(id, { loadRelationIds: true });
        } catch (error) {
            return res.json({ message: "There are no data", observations: [] });
        }

        const userId = cowFound.user;

        if (userId !== userIdToken) {
            return res.json({ message: "There are no data", observations: [] });
        }

        const obs: Observations[] = await observationBD.find({ where: { cow: id }, relations: ["type"] });

        res.send(obs);
    }


    static getObservationById = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { id } = req.params;
        const observationBD = getRepository(Observations);

        let obsFound: Observations = null;

        try {
            obsFound = await observationBD.findOneOrFail(id, { relations: ['cow', 'cow.user', 'type'] });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", error: error });
        }

        if (obsFound.cow.user.userId !== userIdToken) {
            return res.status(400).json({
                message: "There are no data",
                response: "You do not have permission for this element"
            });
        }

        delete obsFound.cow["user"]
        delete obsFound.cow["cowBirthDate"]
        delete obsFound.cow["cowBuyDate"]
        delete obsFound.cow["cowDescription"]
        delete obsFound.cow["cowImage"]
        delete obsFound.cow["cowPrice"]
        delete obsFound.cow["cowRace"]

        res.send(obsFound);

    }

    static newObservation = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { type, cow, observationDescription, observationPrice, observationDate } = req.body;
        const observationBD = getRepository(Observations);
        const typeObsBD = getRepository(TypesObservations);
        const cowBD = getRepository(Cows);

        let typeFound: TypesObservations = null;
        let cowFound: Cows = null;

        try {
            typeFound = await typeObsBD.findOneOrFail(type);
        } catch (error) {
            return res.status(404).json({ message: "There are no data", response: error });
        }

        try {
            cowFound = await cowBD.findOneOrFail(cow, { relations: ['user'] });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", response: error });
        }


        if (userIdToken !== cowFound.user.userId) {
            return res.status(400).json({
                message: "There are no data",
                response: "You do not have permission for this element"
            });
        }

        const observation: Observations = new Observations();

        observation.cow = cowFound;
        observation.type = typeFound;
        observation.observationDate = observationDate;
        observation.observationDescription = observationDescription;
        observation.observationPrice = observationPrice;

        let response = null;
        try {
            response = await observationBD.save(observation);
            delete response.cow['user']
            response.cow = cow;
            response.type = type;
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }

        res.json({
            "message": "Observation created successfully!",
            "response": response
        })

    }

    static updateObservation = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { type, observationDescription, observationPrice, observationDate } = req.body;
        //Observation ID
        const { id } = req.params;

        const observationBD = getRepository(Observations);
        const typeObsBD = getRepository(TypesObservations);

        let obsFound: Observations = null;
        let typeFound: TypesObservations = null;

        try {
            obsFound = await observationBD.findOneOrFail(id, { relations: ['cow', 'cow.user'] });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", response: error });
        }

        if (obsFound.cow.user.userId !== userIdToken) {
            return res.status(400).json({
                message: "There are no data",
                response: "You do not have permission for this element"
            });
        }

        try {
            typeFound = await typeObsBD.findOneOrFail(type);
        } catch (error) {
            return res.status(404).json({ message: "There are no data", response: error });
        }

        obsFound.observationDescription = observationDescription;
        obsFound.observationPrice = observationPrice;
        obsFound.type = typeFound;
        obsFound.observationDate = observationDate;


        let response = null;

        try {
            response = await observationBD.save(obsFound);
            delete response.cow['user']
            response.cow = obsFound.cow.cowId;
        } catch (error) {
            return res.status(406).json({ message: "Something goes wrong", response: error });
        }

        res.json({
            "message": "Observation updated successfully!",
            "response": response
        })

    }

    static deleteObservation = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;

        const { id } = req.params;
        const observationBD = getRepository(Observations);

        let obsFound: Observations = null;

        try {
            obsFound = await observationBD.findOneOrFail(id, { relations: ['cow', 'cow.user'] });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", response: error });
        }

        if (obsFound.cow.user.userId !== userIdToken) {
            return res.status(400).json({
                message: "There are no data",
                response: "You do not have permission for this element"
            });
        }


        const response = await observationBD.delete(id);

        res.json({
            "message": "Observation deleted successfully!",
            "affected": response.affected
        })

    }



}