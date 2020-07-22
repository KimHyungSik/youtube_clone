import express from 'express';
import routes from '../routes';
import { postregisterView } from '../controller/videoControllers';

const apiRouter = express.Router();

apiRouter.post(routes.register, postregisterView);

export default apiRouter;
