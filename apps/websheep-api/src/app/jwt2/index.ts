import * as bodyParser from 'body-parser';
import * as cors from 'cors';
import { Router } from 'express';
import { jwtAuthMiddleware } from '../jwt1/jwt-auth.middleware';

import { docsRouter } from '../shared/docs/docs.router';
import { farmsRouter } from '../shared/farm/farms.router';
import { farmersRouter } from '../shared/farmer/farmers.router';
import { sheepRouter } from '../shared/sheep/sheep.router';
import { tokensJwtRouter } from '../shared/token/tokens.jwt.router';

export const jwt1Router = Router();

jwt1Router.use(cors());
jwt1Router.use(bodyParser.json());

jwt1Router.use(docsRouter);
jwt1Router.use(tokensJwtRouter);

jwt1Router.use(jwtAuthMiddleware, farmersRouter);
jwt1Router.use(jwtAuthMiddleware, farmsRouter);
jwt1Router.use(jwtAuthMiddleware, sheepRouter);
