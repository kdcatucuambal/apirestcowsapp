import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Users } from "../entity/Users";
import { Cows } from "../entity/Cows";

export class CowController {

    static getCows = async (req: Request, res: Response) => {
        const { id } = res.locals.jwtPayload;
        const userBD = getRepository(Users);
        const cowBD = getRepository(Cows);
        let user: Users = await userBD.findOne(id);
        let cows = await cowBD.find({ where: { user: user } })
        res.send(cows);
    }

    static newCow = async (req: Request, res: Response) => {
        const { id } = res.locals.jwtPayload;
        const { name, race, birthDate, buyDate, price, description, image } = req.body;
        const userBD = getRepository(Users);
        const cowBD = getRepository(Cows);
        const user: Users = await userBD.findOne(id);
        const cow = new Cows();
        cow.cowName = name;
        cow.cowDescription = description;
        cow.cowRace = race;
        cow.cowBirthDate = birthDate;
        cow.cowBuyDate = buyDate;
        cow.cowPrice = price;
        cow.cowImage = image;
        cow.user = user;
        let response: any;
        try {
            response = await cowBD.save(cow);
        } catch (error) {
            return res.status(409).json({
                message: 'User incorrect',
                error
            });
        }
        
        res.json({
            "Message": "Cow created",
            "Response": response
        })
    }

    static updateCow = async (req: Request, res: Response) => {
        const userId: number = res.locals.jwtPayload.id;
        const { id } = req.params;
        const { name, race, birthDate, buyDate, price, description, image } = req.body;
        const cowBD = getRepository(Cows);
        let cowFound: Cows = null;

        try {
            cowFound = await cowBD.findOneOrFail(id, { relations: ["user"] });
            cowFound.cowName = name;
            cowFound.cowDescription = description;
            cowFound.cowRace = race;
            cowFound.cowBirthDate = birthDate;
            cowFound.cowBuyDate = buyDate;
            cowFound.cowPrice = price;
            cowFound.cowImage = image;
        } catch (error) {
            return res.status(404).json(
                { message: 'Cow not found!' }
            );
        }
       
     
        if ( cowFound.user.userId !== userId) {
            return res.status(404).json(
                { message: 'You do not have permission for this cow' }
            );
        }


        let response: any = null;
        try {
            response = await cowBD.save(cowFound);
            delete response['user']
        } catch (error) {
            return res.status(404).json(
                { message: 'Something goes wrong!', error }
            );
        }

        
        res.json({
            "Message": "Cow updated successfully",
            "Response": response
        })

    }

    static updateActiveCow = async (req: Request, res: Response) => {
        const userId: number = res.locals.jwtPayload.id;
        const { id } = req.params;
        const { active } = req.body;
        const cowBD = getRepository(Cows);
        let cowFound: Cows = null;

        try {
            cowFound = await cowBD.findOneOrFail(id, { relations: ["user"]});
            cowFound.cowActive = active;
        } catch (error) {
            return res.status(404).json(
                { message: 'Cow not found!', error }
            );
        }

        if ( cowFound.user.userId !== userId) {
            return res.status(404).json(
                { message: 'You do not have permission for this cow' }
            );
        }


        let response: any = null;
        try {
            response = await cowBD.save(cowFound);
            delete response['user']
        } catch (error) {
            return res.status(404).json(
                { message: 'Cow not found!', error }
            );
        }

        res.json({
            "Message": "Cow updated successfully",
            "Response": response
        })
    }



}

