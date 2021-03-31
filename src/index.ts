import "reflect-metadata";
import {createConnection, getRepository} from "typeorm";

import * as express from "express";
import * as cors from "cors";
import * as helmet from "helmet";

import routes from "./routes";

const PORT = process.env.PORT || 3000;

createConnection().then(async connection => {
    const app = express();
    app.use(cors());
    app.use(helmet())
    app.use(express.json());
    app.use('/', routes);
    app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
}).catch(error => console.log(error));
