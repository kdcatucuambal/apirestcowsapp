import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Observations } from "./../entity/Observations";
import { TypesObservations } from "./../entity/TypesObservations";
import { Cows } from "./../entity/Cows";
import { Users } from "../entity/Users";

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


    static newObservation = async (req: Request, res: Response) => {

    }

    static updateObservation = async (req: Request, res: Response) => {

    }

    static deleteObservation = async (re: Request, res: Response) => {

    }



}