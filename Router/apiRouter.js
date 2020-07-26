import express from 'express';
import routes from '../routes';
import {
  postregisterView,
  postAddCommnet,
} from '../controller/videoControllers';

const apiRouter = express.Router();

apiRouter.post(routes.register, postregisterView);
apiRouter.post(routes.addComment, postAddCommnet);

export default apiRouter;
