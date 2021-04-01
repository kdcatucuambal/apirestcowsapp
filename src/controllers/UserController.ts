import { getRepository } from "typeorm";
import { Request, Response } from "express";
import { Users } from "../entity/Users";

export class UserController {

    
    static getAllUsers = async (req: Request, res: Response) => {
        const userBD = getRepository(Users);
        let users = [];
        try {
            users = await userBD.find({ relations: ['cows'] });
        } catch (error) {
            return res.status(404).json({
                message: 'Something goes wrong'
            })
        }

    
        res.send(users);
    }


    static createUser = async (req: Request, res: Response) => {
        const userDB = getRepository(Users);
        const { email, name, password } = req.body;

        const user = new Users();
        user.userName = name;
        user.userPassword = password;
        user.userEmail = email;
        let response: any;

        try {
            user.hashPassword();
            response = await userDB.save(user);
        } catch (error) {
            return res.status(409).json({
                message: 'User incorrect',
                error
            });
        }

        res.json({
            "Message": "User created",
            "Response": response
        })
    }


}

