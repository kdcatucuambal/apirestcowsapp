import { Router } from 'express';

import routeAuth from "./AuthRoute";
import routeUser from "./UserRoute";


const routes = Router();

routes.use('/users', routeUser);
routes.use('/auth', routeAuth);


routes.use("/", (req, res) => {
    res.send(`<h3>WELCOME API REST COWS SYS</h3>`)
})

export default routes;