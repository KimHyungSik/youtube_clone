import express from 'express';
import routes from '../routes';
import {
  user,
  user_detail,
  edit_profile,
  change_password,
} from '../controller/userController';
import { onlyPrivate } from '../middleware';

const userRouter = express.Router();

userRouter.get(routes.edit_profile, onlyPrivate, edit_profile);
userRouter.get(routes.change_password, onlyPrivate, change_password);
userRouter.get(routes.me, user_detail);
userRouter.get(routes.user_detail(), onlyPrivate, user_detail);

export default userRouter;
