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

const globalRouter = express.Router();

globalRouter.get(routes.home, home);
globalRouter.get(routes.search, search);

globalRouter.get(routes.join, getjoin);
globalRouter.post(routes.join, postjoin);

globalRouter.get(routes.login, getlogin);
globalRouter.post(routes.login, postlogin);

globalRouter.get(routes.logout, logout);

export default globalRouter;
