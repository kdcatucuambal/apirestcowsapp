import { getRepository } from "typeorm";
import { Request, Response } from "express";
import * as jwt from "jsonwebtoken";
import config from "./../config/config"
import { validate } from 'class-validator';
import { Users } from "../entity/Users";

export class AuthController {
    static login = async (req: Request, res: Response) => {
        const { email, password } = req.body;
        if (!(email && password)) {
            res.status(400).json(
                { message: 'Username & Password are required!' }
            );
        }

        const userRepository = getRepository(Users);
        let user: Users;
        try {
            user = await userRepository.
                findOneOrFail({ where: { userEmail: email } });
        } catch (error) {
            return res.status(400).json(
                { message: 'Username or Password are incorrect!' }
            );
        }

        if (!user.checkPassword(password)) {
            return res.status(400).json(
                { message: 'Username & Password are incorrect!' }
            );
        }

        const token = jwt.sign({
            id: user.userId,
            email: user.userEmail,
            name: user.userName
        }, config.jwtSecret, { expiresIn: '1h' });

        res.json({
            message: 'OK',
            token,
            id: user.userId,
            name: user.userName,
            email: user.userEmail
        })


    }
}