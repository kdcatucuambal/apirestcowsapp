import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Observations } from "./../entity/Observations";
import { TypesObservations } from "./../entity/TypesObservations";

export class TypeObsController {
    static getTypesObs = async (req: Request, res: Response) => {
        const typeDB = getRepository(TypesObservations);
        const types = await typeDB.find()
        res.send(types);
    }
    static getTypesObsById = async (req: Request, res: Response) => {
        const typeDB = getRepository(TypesObservations);
        const { id } = req.params;
        let typeFound = null;

        try {
            typeFound = await typeDB.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({ message: "There are no data", error });
        }

        res.send(typeFound);
    }
    static newTypeObs = async (req: Request, res: Response) => {
        const typeDB = getRepository(TypesObservations);
        const { typeName } = req.body;
        const typeNew = new TypesObservations();
        typeNew.typeName = typeName;
        let response = null;
        try {
            response = await typeDB.save(typeNew);
        } catch (error) {
            return res.status(404).json({ message: "Something goes wrong", error })
        }
        res.send(response);
    }
    static updateTypeObs = async (req: Request, res: Response) => {
        const typeDB = getRepository(TypesObservations);
        const { id } = req.params;
        const { typeName } = req.body;
        let typeFound: TypesObservations = null;
        try {
            typeFound = await typeDB.findOneOrFail(id);
        } catch (error) {
            return res.status(404).json({ message: "There are no data", error });
        }

        typeFound.typeName = typeName;
        let response = null;
        try {
            response = await typeDB.save(typeFound);
        } catch (error) {
            return res.status(404).json({ message: "Something goes wrong", error })
        }
        res.send(response);
    }


    static deleteTypeObs = async (req: Request, res: Response) => {
        const typeDB = getRepository(TypesObservations);
        const { id } = req.params;
        let response = null;
        try {
            response = await typeDB.delete(id);
        } catch (error) {
            return res.status(404).json({ message: "Something goes wrong", error })
        }
        res.send(response);
    }

}
