import express from 'express';
import routes from '../routes';
import { home, search } from '../controller/videoControllers';
import {
  getlogin,
  postlogin,
  logout,
  getjoin,
  postjoin,
} from '../controller/userController';
import { onlyPublic, onlyPrivate } from '../middleware';

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

//=============================join=============================
globalRouter.get(routes.join, onlyPublic, getjoin);
globalRouter.post(routes.join, onlyPublic, postjoin, postlogin);

//=============================login=============================
globalRouter.get(routes.login, onlyPublic, getlogin);
globalRouter.post(routes.login, onlyPublic, postlogin);

globalRouter.get(routes.logout, onlyPrivate, logout);

export default globalRouter;
