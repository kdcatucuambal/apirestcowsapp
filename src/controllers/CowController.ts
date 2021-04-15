import { getRepository, ILike } from "typeorm";
import { Request, Response } from "express";
import { Users } from "../entity/Users";
import { Cows } from "../entity/Cows";

export class CowController {

    static getCows = async (req: Request, res: Response) => {
        const { id } = res.locals.jwtPayload;
        const userBD = getRepository(Users);
        const cowBD = getRepository(Cows);
        const user: Users = await userBD.findOne(id);
        const cows = await cowBD.find({ where: { user: user }, order: { cowId: 'DESC' } })
        res.send(cows);
    }

    static getCowById = async (req: Request, res: Response) => {
        const { id } = res.locals.jwtPayload;
        const idCow = req.params.id;
        const cowBD = getRepository(Cows);
        let cowFound: Cows;
        try {
            cowFound = await cowBD.findOneOrFail({ where: { user: id, cowId: idCow } })
        } catch (error) {
            return res.status(404).json({ message: "There are no data", error });
        }
        res.send(cowFound);

    }

    /**
     * 
     * @param req Http Request
     * @param res Http Response
     *  - You might send two params into your URL:
     *  -Param1 -> Take: Indicate the elements number to consult 
     *  -Param2 -> Skip: Indicate from where start to consult
     * @return List of cows
     */
    static getCowsForLazyLoading = async (req: Request, res: Response) => {
        const { skip, take } = req.params;
        const { id } = res.locals.jwtPayload;
        const cowBD = getRepository(Cows);
        const cows = await cowBD.find({
            where: { user: id },
            order: { cowId: 'DESC' },
            take: Number.parseInt(take),
            skip: Number.parseInt(skip)
        });
        res.send(cows);;
    }

    static getCount = async (req: Request, res: Response) => {
        const { id } = res.locals.jwtPayload;
        const cowBD = getRepository(Cows);
        const count: number = await cowBD.count({ where: { user: id } });
        res.json({ total: count })

    }


    static getMatchingCowsByValue = async (req: Request, res: Response) => {
        const userIdToken = res.locals.jwtPayload.id;
        const { text } = req.params;
        const finalParam = `%${text}%`;
        const cowsDB = getRepository(Cows);
        let cows: Cows[] = null;
        cows = await cowsDB.find(
            {
                where: {
                    cowName: ILike(finalParam),
                    user: userIdToken
                }
            });
        res.send(cows);
    }



    static newCow = async (req: Request, res: Response) => {
        const { id } = res.locals.jwtPayload;
        const { cowName, cowRace, cowBirthDate, cowBuyDate, cowPrice, cowDescription, cowImage } = req.body;
        const userBD = getRepository(Users);
        const cowBD = getRepository(Cows);
        const user: Users = await userBD.findOne(id);
        const cow = new Cows();
        cow.cowName = cowName;
        cow.cowDescription = cowDescription;
        cow.cowRace = cowRace;
        cow.cowBirthDate = cowBirthDate;
        cow.cowBuyDate = cowBuyDate;
        cow.cowPrice = cowPrice;
        cow.cowImage = cowImage;
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
        const { cowName, cowRace, cowBirthDate, cowBuyDate, cowPrice, cowDescription, cowImage } = req.body;
        const cowBD = getRepository(Cows);
        let cowFound: Cows = null;

        try {
            cowFound = await cowBD.findOneOrFail(id, { relations: ["user"] });
            cowFound.cowName = cowName;
            cowFound.cowDescription = cowDescription;
            cowFound.cowRace = cowRace;
            cowFound.cowBirthDate = cowBirthDate;
            cowFound.cowBuyDate = cowBuyDate;
            cowFound.cowPrice = cowPrice;
            cowFound.cowImage = cowImage;
        } catch (error) {
            return res.status(404).json(
                { message: 'Cow not found!' }
            );
        }


        if (cowFound.user.userId !== userId) {
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
            cowFound = await cowBD.findOneOrFail(id, { relations: ["user"] });
            cowFound.cowActive = active;
        } catch (error) {
            return res.status(404).json(
                { message: 'Cow not found!', error }
            );
        }

        if (cowFound.user.userId !== userId) {
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


    static deleteCow = async (req: Request, res: Response) => {
        const userId = res.locals.jwtPayload.id;
        const { id } = req.params;
        const cowBD = getRepository(Cows);


        let cowFound: Cows = null;

        try {
            cowFound = await cowBD.findOneOrFail(id, { loadRelationIds: true });
        } catch (error) {
            return res.status(404).json({ message: "There are no data", error });
        }

        if (userId !== cowFound.user) {
            return res.status(404).json({ message: "There are no permission" });
        }

        let response = null;
        try {
            response = await cowBD.delete(id);
        } catch (error) {
            return res.status(404).json({ message: "Something goes wrong", error });
        }


        res.json({
            "message": "Cows deleted successfully!",
            "affected": response.affected
        });
    }


}

